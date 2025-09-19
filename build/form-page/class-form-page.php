<?php
/**
 * Form Page Block.
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Form Page
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Form_Page {
	/**
	 * Constructor
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		$this->init( $loader );
	}

	/**
	 * Initialize the block
	 *
	 * @param mixed $loader Loader.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
		}
	}

	/**
	 * Adad interactivity api attributes to the block.
	 *
	 * @param array    $attributes Block attributes.
	 * @param string   $content Block content.
	 * @param WP_Block $block Block object.
	 * @return string Block content.
	 */
	public function render_block_callback( $attributes, $content, $block ) {
		$tag = new \WP_HTML_Tag_Processor( $content );
		$tag->next_tag(
			array(
				'class_name' => 'wp-block-prc-block-form-page',
			)
		);
		$id = wp_unique_id( 'prc-block-form-page-' );
		$tag->set_attribute( 'id', $id );

		// Setup interactivity.
		$tag->set_attribute( 'data-wp-interactive', 'prc-block/form' );
		$tag->set_attribute( 'data-wp-bind--hidden', 'state.isPageHidden' );
		$tag->set_attribute( 'data-wp-context', wp_json_encode( array( 'pageId' => $id ) ) );

		return $tag->get_updated_html();
	}

	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @hook init
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/form-page',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}
