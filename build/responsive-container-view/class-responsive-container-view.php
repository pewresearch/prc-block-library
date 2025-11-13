<?php
/**
 * Responsive Container View Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Responsive View
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Responsive_Container_View {
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
		$block_id = array_key_exists( 'id', $attributes ) ? $attributes['id'] : md5( wp_json_encode( $block ) );

		$block_wrapper_attrs = get_block_wrapper_attributes(
			array(
				'id'    => $block_id,
				'style' => 'display: none;',
			)
		);

		$allowed_html = wp_kses_allowed_html( 'post' );
		if ( is_array( $allowed_html ) ) {
			$allowed_html['style']        = true;
			$allowed_html['div']['style'] = true;
			$allowed_html['p']['style']   = true;
		}

		ob_start();
		if ( array_key_exists( 'additionalStyles', $attributes ) && ! empty( $attributes['additionalStyles'] ) ) {
			$styles = preg_replace( '/\.([a-zA-Z0-9_-]+)(?!\s*#)/', '#' . $block_id . ' .$1', $attributes['additionalStyles'] );
			echo '<style>' . $styles . '</style>';
		}
		$style_block = ob_get_clean();

		return wp_sprintf(
			'<div %1$s>%2$s</div>',
			$block_wrapper_attrs,
			wp_kses( $content, $allowed_html ) . $style_block
		);
	}

	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/responsive-container-view',
			array(
				'render_callback' => array( $this, 'render_callback' ),
			)
		);
	}
}
