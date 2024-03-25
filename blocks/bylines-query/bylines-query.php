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
	public static $block_json = null;
	public static $version;
	public static $block_name;
	public static $dir = __DIR__;

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/bylines-query/build/block.json';
		self::$block_json = \wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		self::$version = self::$block_json['version'];
		self::$block_name = self::$block_json['name'];
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
					'staffName'      => $staff->name,
					'staffJobTitle'  => $staff->job_title,
					'staffJobTitleExtended'  => $staff->job_title_extended,
					'staffImage'     => is_array($staff->photo) && array_key_exists('thumbnail', $staff->photo) ? $staff->photo['thumbnail'] : null,
					'staffTwitter'   => null,
					'staffExpertise' => $staff->expertise,
					'staffBio'       => $staff->bio,
					'staffBioShort'  => wp_sprintf(
						'<a href="%1$s">%2$s</a> <span>is %3$s</span>',
						$staff->link,
						$staff->name,
						$staff->job_title_extended
					),
					'staffLink'      => $staff->link,
				);
			}
		}
		return $bylines;
	}

	public function render_callback($attributes, $content, $block) {
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
		register_block_type( self::$dir . '/build', array(
			'render_callback' => array($this, 'render_callback')
		) );
	}

}
