<?php
/**
 * Icon Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Icon
 * Description:       Renders a Font Awesome icon.
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */
class Icon {
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
		$block_wrapper_attrs = get_block_wrapper_attributes();
		$library             = array_key_exists( 'library', $attributes ) ? $attributes['library'] : '';
		$icon                = array_key_exists( 'icon', $attributes ) ? $attributes['icon'] : '';
		$size                = array_key_exists( 'size', $attributes ) ? $attributes['size'] : '1em';
		$svg                 = \PRC\Platform\Icons\render( $library, $icon, $size );

		return wp_sprintf(
			'<span %1$s>%2$s</span>',
			$block_wrapper_attrs, // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			$svg, // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
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
			PRC_BLOCK_LIBRARY_DIR . '/build/icon',
			array(
				'render_callback' => array( $this, 'render_callback' ),
			)
		);
	}
}
