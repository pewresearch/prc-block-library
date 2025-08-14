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
			$loader->add_action( 'init', $this, 'register_tab_block_bindings' );
			$loader->add_filter( 'render_block_context', $this, 'filter_render_block_context', 10, 2 );
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
	 * @return string Updated HTML.
	 */
	public function render_block_callback( array $attributes, string $content, \WP_Block $block ): string {
		$tag_processor = new WP_HTML_Tag_Processor( $content );
		$tag_processor->next_tag( array( 'class_name' => 'wp-block-prc-block-tab' ) );

		$tag_processor->set_attribute(
			'data-wp-interactive',
			'prc-block/tabs'
		);

		$tab_id = (string) $tag_processor->get_attribute( 'id' );

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

		$classname  = (string) $tag_processor->get_attribute( 'class' );
		$classname .= ' ' . $this->get_typography_classes( $attributes );
		$tag_processor->set_attribute( 'class', $classname );

		$tag_processor->set_attribute( 'role', 'tabpanel' );
		$tag_processor->set_attribute( 'aria-labelledby', 'tab__' . $tab_id );
		$tag_processor->set_attribute( 'data-wp-bind--hidden', '!state.isActiveTab' );
		$tag_processor->set_attribute( 'data-wp-bind--tabindex', 'state.tabIndexAttribute' );

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

	/**
	 * Add slugified label to context as tab/slug for children.
	 *
	 * @param array $context      The current context.
	 * @param array $parsed_block The parsed block array.
	 * @return array Updated context.
	 */
	public function filter_render_block_context( array $context, array $parsed_block ): array {
		if ( ( $parsed_block['blockName'] ?? '' ) !== 'prc-block/tab' ) {
			return $context;
		}
		$attrs = $parsed_block['attrs'] ?? array();
		$label = isset( $attrs['label'] ) ? wp_strip_all_tags( (string) $attrs['label'] ) : '';
		if ( $label ) {
			$label               = str_replace( '&', 'and', $label );
			$context['tab/slug'] = sanitize_title( $label );
		}
		return $context;
	}

	/**
	 * Get the tab label binding.
	 *
	 * @param array    $source_args Source arguments.
	 * @param WP_Block $block The block.
	 * @param string   $attribute_name The attribute name.
	 * @return string The tab label binding.
	 */
	public function get_tab_label_binding( $source_args, $block, $attribute_name ) {
		$context = $block->context;
		return $context['tab/label'] ?? 'Tab Label...';
	}

	/**
	 * Register the tab block bindings.
	 *
	 * @hook init
	 */
	public function register_tab_block_bindings() {
		register_block_bindings_source(
			'tab/label',
			array(
				'label'              => __( 'Tab Label', 'prc-block/tab' ),
				'get_value_callback' => array( $this, 'get_tab_label_binding' ),
				'uses_context'       => array( 'tab/label', 'tab/slug' ),
			)
		);
	}
}
