<?php
/**
 * Tab Block (PRC)
 *
 * @package PRC\Platform\Blocks
 */

declare(strict_types=1);

namespace PRC\Platform\Blocks;

use WP_HTML_Tag_Processor;

/**
 * Server-side handling for `prc-block/tab`.
 */
class Tab {
	/**
	 * Constructor.
	 *
	 * @param mixed $loader Loader instance.
	 */
	public function __construct( $loader ) {
		$this->init( $loader );
	}

	/**
	 * Wire hooks.
	 *
	 * @param mixed $loader Loader instance.
	 */
	public function init( $loader = null ): void {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
		}
	}

	/**
	 * Build typography classnames from named size/family.
	 *
	 * @param array $attributes Block attributes.
	 * @return string Classnames.
	 */
	private function get_typography_classes( array $attributes ): string {
		$typography_classes    = array();
		$has_named_font_family = ! empty( $attributes['fontFamily'] );
		$has_named_font_size   = ! empty( $attributes['fontSize'] );

		if ( $has_named_font_size ) {
			$typography_classes[] = sprintf( 'has-%s-font-size', esc_attr( (string) $attributes['fontSize'] ) );
		}

		if ( $has_named_font_family ) {
			$typography_classes[] = sprintf( 'has-%s-font-family', esc_attr( (string) $attributes['fontFamily'] ) );
		}

		return implode( ' ', $typography_classes );
	}

	/**
	 * Build inline typography styles.
	 *
	 * @param array $attributes Block attributes.
	 * @return string Inline CSS.
	 */
	private function get_typography_styles( array $attributes ): string {
		$typography_styles = array();

		if ( ! empty( $attributes['style']['typography']['fontSize'] ) ) {
			$typography_styles[] = sprintf(
				'font-size: %s;',
				wp_get_typography_font_size_value(
					array(
						'size' => $attributes['style']['typography']['fontSize'],
					)
				)
			);
		}

		if ( ! empty( $attributes['style']['typography']['fontFamily'] ) ) {
			$typography_styles[] = sprintf( 'font-family: %s;', $attributes['style']['typography']['fontFamily'] );
		}

		return implode( '', $typography_styles );
	}

	/**
	 * Render callback for prc-block/tab.
	 *
	 * @param array     $attributes Block attributes.
	 * @param string    $content    Block content.
	 * @param \WP_Block $block The block.
	 *
	 * @return string Updated HTML.
	 */
	public function render_block_callback( array $attributes, string $content, \WP_Block $block ): string {
		$tag_processor = new WP_HTML_Tag_Processor( $content );
		$tag_processor->next_tag( array( 'class_name' => 'wp-block-prc-block-tab' ) );
		$tab_id = (string) $tag_processor->get_attribute( 'id' );

		/**
		 * Add interactivity to the tab element.
		 */
		$tag_processor->set_attribute(
			'data-wp-interactive',
			'prc-block/tabs'
		);
		$tag_processor->set_attribute(
			'data-wp-context',
			wp_json_encode(
				array(
					'tab' => array(
						'id' => $tab_id,
					),
				)
			)
		);

		/**
		 * Process style classnames.
		 */
		$classname  = (string) $tag_processor->get_attribute( 'class' );
		$classname .= ' ' . $this->get_typography_classes( $attributes );
		$tag_processor->set_attribute( 'class', $classname );

		/**
		 * Process accessibility and interactivity attributes.
		 */
		$tag_processor->set_attribute( 'role', 'tabpanel' );
		$tag_processor->set_attribute( 'aria-labelledby', 'tab__' . $tab_id );
		$tag_processor->set_attribute( 'data-wp-bind--hidden', '!state.isActiveTab' );
		$tag_processor->set_attribute( 'data-wp-bind--tabindex', 'state.tabIndexAttribute' );

		/**
		 * Process style attribute.
		 */
		$style  = (string) $tag_processor->get_attribute( 'style' );
		$style .= $this->get_typography_styles( $attributes );
		$tag_processor->set_attribute( 'style', $style );

		return (string) $tag_processor->get_updated_html();
	}

	/**
	 * Register the block with render callback.
	 */
	public function block_init(): void {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/tab',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}
