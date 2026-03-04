<?php
/**
 * Flip Card Controller Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Flip Card Controller
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Flip_Card_Controller {
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
		$block_id     = wp_unique_id( 'prc-block-flip-card-controller-' );
		$fixed_height = isset( $attributes['fixedHeight'] ) ? (int) $attributes['fixedHeight'] : null;
		$is_manual_height = $fixed_height > 0;

		$block_wrapper_attrs = get_block_wrapper_attributes(
			array(
				'data-wp-interactive'           => 'prc-block/flip-card-controller',
				'data-wp-context'               => wp_json_encode(
					array(
						'id'          => $block_id,
						'flipped'     => false,
						'minHeight'   => null,
						'fixedHeight' => $fixed_height,
						'initialized' => $is_manual_height,
					)
				),
				'data-wp-class--is-initialized' => 'state.isInitialized',
				'data-wp-class--is-flipped'     => 'state.isFlipped',
				'data-wp-style--min-height'     => 'callbacks.minHeightStyle',
			)
		);

		return wp_sprintf(
			'<div %1$s><div class="wp-block-prc-block-flip-card-controller__inner-blocks">%2$s</div></div>',
			$block_wrapper_attrs,
			$content,
		);
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
			PRC_BLOCK_LIBRARY_DIR . '/build/flip-card-controller',
			array(
				'render_callback' => array( $this, 'render_callback' ),
			)
		);
	}
}
