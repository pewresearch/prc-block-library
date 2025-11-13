<?php
/**
 * Grid Controller Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Grid Controller
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Grid_Controller {
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
	 * Generate CSS custom properties for grid gutter (gap) settings.
	 *
	 * @param array $attributes Block attributes.
	 * @return string Inline CSS string.
	 */
	private function generate_gutter_styles( array $attributes ): string {
		if ( empty( $attributes['style'] ) || ! is_array( $attributes['style'] ) ) {
			return '--grid-gutter: 24px;';
		}
		if ( empty( $attributes['style']['spacing'] ) || ! is_array( $attributes['style']['spacing'] ) ) {
			return '--grid-gutter: 24px;';
		}
		if ( ! array_key_exists( 'blockGap', $attributes['style']['spacing'] ) ) {
			return '--grid-gutter: 24px;';
		}

		$block_gap    = $attributes['style']['spacing']['blockGap'];
		$gutter_value = '24px';

		// Grid controller uses horizontal gap (left).
		if ( is_array( $block_gap ) ) {
			if ( array_key_exists( 'left', $block_gap ) ) {
				$gutter_value = $block_gap['left'];
			} else {
				return '--grid-gutter: 24px;';
			}
		} elseif ( is_string( $block_gap ) ) {
			$gutter_value = $block_gap;
		}

		// Convert preset spacing tokens to CSS variables.
		if ( preg_match( '/^var:preset\|spacing\|(.+)$/', (string) $gutter_value, $matches ) ) {
			$gutter_value = 'var(--wp--preset--spacing--' . $matches[1] . ')';
		}

		return wp_sprintf( '--grid-gutter: %s;', $gutter_value );
	}

	/**
	 * Generate CSS custom properties for divider color settings.
	 *
	 * @param array $attributes Block attributes.
	 * @return string Inline CSS string.
	 */
	private function generate_divider_color_styles( array $attributes ): string {
		$divider_color = $attributes['dividerColor'] ?? '';

		if ( empty( $divider_color ) ) {
			return '';
		}

		// Convert color slug to CSS variable.
		$color_value = 'var(--wp--preset--color--' . $divider_color . ')';

		return wp_sprintf( '--divider-color: %s;', $color_value );
	}

	/**
	 * Render the block callback.
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content Block content.
	 * @return string Rendered block HTML.
	 */
	public function render_block_callback( $attributes, $content ) {
		if ( is_admin() ) {
			return $content;
		}

		$color_css_classes = array();

		// Divider color.
		$has_named_divider_color = array_key_exists( 'dividerColor', $attributes );

		// If has divider color.
		if ( $has_named_divider_color ) {
			// Add has-divider class.
			$color_css_classes[] = 'has-divider';
		}

		if ( $has_named_divider_color ) {
			// Add the divider color class.
			$color_css_classes[] = sprintf( 'has-%s-divider-color', $attributes['dividerColor'] );
		}

		// Generate CSS custom properties for gutter and divider color.
		$gutter_styles  = $this->generate_gutter_styles( $attributes );
		$divider_styles = $this->generate_divider_color_styles( $attributes );
		$inline_styles  = trim( $gutter_styles . ' ' . $divider_styles );

		$vertical_alignment = array_key_exists( 'verticalAlignment', $attributes ) ? $attributes['verticalAlignment'] : 'top';

		$css_classes = array_merge(
			$color_css_classes,
			array(
				'is-vertically-aligned-' . $vertical_alignment,
			)
		);

		$block_attrs = get_block_wrapper_attributes(
			array(
				'class' => \PRC\Platform\Block_Utils\classNames( $css_classes ),
				'style' => $inline_styles,
			)
		);

		return wp_sprintf(
			'<div %1$s>%2$s</div>',
			$block_attrs,
			$content,
		);
	}

	/**
	 * Register the block
	 *
	 * @hook init
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/grid-controller',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}
