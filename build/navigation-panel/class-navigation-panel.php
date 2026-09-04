<?php
/**
 * Navigation Panel Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Navigation Panel
 * Description:       A navigation panel container with InnerBlocks, block context, and Interactivity API support.
 * Requires at least: 6.7
 * Requires PHP:      8.2
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */
class Navigation_Panel {

	/**
	 * Constructor.
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		$this->init( $loader );
	}

	/**
	 * Initialize the block.
	 *
	 * @param mixed $loader Loader.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
		}
	}

	/**
	 * Render callback for the block.
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content    Block content.
	 * @param object $block      Block object.
	 * @return string
	 */
	public function render_block_callback( $attributes, $content, $block ) { // phpcs:ignore Generic.CodeAnalysis.UnusedFunctionParameter
		$label =  $attributes['label'] ?? '';
		$returnLabel = ( $attributes['returnLabel'] && ! empty( $attributes['returnLabel'] ) ) ? $attributes['returnLabel'] : 'Return to ' . $label;
		$icon =  $attributes['panelIconId'] ?? 0;
		$block_wrapper_attrs = get_block_wrapper_attributes(
			array(
				'data-wp-interactive' => 'prc-block/navigation-panel',
				'data-wp-context'     => wp_json_encode(
					array(
						'label' => $label,
						'returnLabel' => $returnLabel,
						'icon' => $icon,
					)
				),
			)
		);

		return wp_sprintf(
			'<div %1$s><div class="wp-block-prc-block-navigation-panel__content">%2$s</div></div>',
			$block_wrapper_attrs,
			$content
		);
	}

	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 *
	 * @hook init
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/navigation-panel',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}
