<?php
namespace PRC\Platform\Blocks;
use WP_Block;
/**
 * Block Name:        Bylines Query
 * Description:       Query the current post for bylines and display them.
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Bylines_Query {
	public function __construct($loader) {
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action('init', $this, 'block_init');
		}
	}

	public function query_bylines($post_id) {
		$byline_terms = get_post_meta( $post_id, 'bylines', true );
		$bylines = array();
		if ( $byline_terms ) {
			foreach ( $byline_terms as $byline_term ) {
				$byline_term_id = $byline_term['termId'];
				$staff = new \PRC\Platform\Staff(false, $byline_term_id);
				if ( is_wp_error( $staff ) ) {
					continue;
				}
				$bylines[] = array(
					'staffId' => $staff->ID,
				);
			}
		}
		return $bylines;
	}

	public function render_block_callback($attributes, $content, $block) {
		$bylines = $this->query_bylines( get_the_ID() );

		$block_attrs = get_block_wrapper_attributes();

		$block_content = '';

		$block_instance = $block->parsed_block;

		// Set the block name to one that does not correspond to an existing registered block.
		// This ensures that for the inner instances of the Staff Query block, we do not render any block supports.
		$block_instance['blockName'] = 'core/null';

		foreach( $bylines as $byline_context ) {
			// Render the inner blocks of the Bylines Query block with `dynamic` set to `false` to prevent calling
			// `render_callback` and ensure that no wrapper markup is included.
			$block_content .= (
				new WP_Block(
					$block_instance,
					$byline_context
				)
			)->render( array( 'dynamic' => false ) );
		}

		return wp_sprintf(
			'<div %1$s>%2$s</div>',
			$block_attrs,
			$block_content
		);
	}

	/**
	* Registers the block using the metadata loaded from the `block.json` file.
	* Behind the scenes, it registers also all assets so they can be enqueued
	* through the block editor in the corresponding context.
	* @hook init
	*
	* @see https://developer.wordpress.org/reference/functions/register_block_type/
	*/
	public function block_init() {
		register_block_type_from_metadata( PRC_BLOCK_LIBRARY_DIR . '/build/bylines-query', [
			'render_callback' => [$this, 'render_block_callback'],
		] );
	}

}
