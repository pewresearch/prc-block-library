<?php
/**
 * Timeline Slide Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:
 * Requires at least: 6.7
 * Requires PHP:      8.2
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */

class Timeline_Slide {
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
	 * Render callback for the block
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content    Block content.
	 * @param object $block      Block object.
	 * @return string
	 */
	public function render_callback( $attributes, $content, $block ) {
		if ( empty( $attributes['metadata']['name'] ) ) {
			return '';
		}

		$block_id = md5( $attributes['metadata']['name'] );

		$block_wrapper_attrs = get_block_wrapper_attributes(
			array(
				'data-wp-interactive'      => 'prc-block/timeline',
				'data-wp-context'          => wp_json_encode(
					array(
						'id' => $block_id,
					)
				),
				'data-wp-class--is-active' => 'callbacks.isTimelineSlideActive',
			)
		);

		return wp_sprintf(
			'<section %1$s>%2$s</section>',
			$block_wrapper_attrs,
			$content,
		);
	}

	/**
	 * Registers the block using the block manifest (if registered). Fails over to the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @hook init
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/timeline-slide',
			array(
				'render_callback' => array( $this, 'render_callback' ),
			)
		);
	}
}
