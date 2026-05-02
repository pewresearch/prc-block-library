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
	 * Resolve tick label for this slide (must match Timeline::render_callback tick ids).
	 *
	 * @param array     $attributes Block attributes.
	 * @param \WP_Block $block     Block instance.
	 * @return string
	 */
	private function resolve_slide_label( array $attributes, $block ): string {
		$name  = $attributes['metadata']['name'] ?? '';
		$label = is_string( $name ) ? trim( $name ) : '';
		if ( '' === $label ) {
			$legacy = $attributes['label'] ?? '';
			$label  = is_string( $legacy ) ? trim( $legacy ) : '';
		}
		if ( '' !== $label ) {
			return $label;
		}

		$slide_index = 0;
		if ( $block instanceof \WP_Block && $block->parent_block instanceof \WP_Block ) {
			foreach ( $block->parent_block->inner_blocks as $i => $inner ) {
				if ( $inner === $block ) {
					$slide_index = (int) $i;
					break;
				}
			}
		}

		// Plain English for stable tick ids (must match Timeline::render_callback).
		return sprintf( 'Slide %d', $slide_index + 1 );
	}

	/**
	 * Render callback for the block
	 *
	 * @param array     $attributes Block attributes.
	 * @param string    $content    Block content.
	 * @param \WP_Block $block      Block object.
	 * @return string
	 */
	public function render_callback( $attributes, $content, $block ) {
		$label    = $this->resolve_slide_label( $attributes, $block );
		$block_id = md5( $label );

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
