<?php
/**
 * Progress Bar Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use WP_HTML_Tag_Processor;

/**
 * Block Name:        Progress Bar
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Ben Wormald
 *
 * @package           prc-block
 */
class Progress_Bar {
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

	public function render_block_callback( $attributes, $content, $block ) {
		$block_id = wp_unique_id( 'prc-progress-bar-' );
		wp_interactivity_state(
			'prc-block/progress-bar',
			array(
				$block_id => $attributes,
			)
		);
		$tag = new WP_HTML_Tag_Processor( $content );
		$tag->next_tag();
		$tag->set_attribute( 'id', $block_id );
		$tag->set_attribute( 'data-wp-interactive', 'prc-block/progress-bar' );
		$tag->set_attribute( 'data-wp-context', wp_json_encode( array( 'blockId' => $block_id ) ) );
		while ( $tag->next_tag() ) {
			if ( $tag->has_class( 'prc-progress-bar-value' ) ) {
				$tag->set_attribute( 'data-wp-bind--style', 'state.barStyle' );
			}
			if ( $tag->has_class( 'prc-progress-bar-value-text' ) ) {
				$tag->set_attribute( 'data-wp-text', 'state.value' );
			}
		}
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
			PRC_BLOCK_LIBRARY_DIR . '/build/progress-bar',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}
