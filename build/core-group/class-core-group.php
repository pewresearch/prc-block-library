<?php
/**
 * Core Group Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use WP_HTML_Tag_Processor;
use MatthiasMullie\Minify;

/**
 * Block Name:        Core Group
 * Version:           1.0.0
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */
class Core_Group {
	/**
	 * Block JSON
	 *
	 * @var array
	 */
	public $block_json;

	/**
	 * Editor script handle
	 *
	 * @var string
	 */
	public $editor_script_handle;

	/**
	 * Style handle
	 *
	 * @var string
	 */
	public $style_handle;

	/**
	 * Size styles
	 *
	 * @var array
	 */
	public static $size_styles = array(
		array(
			'name'  => 'dynamic-wide',
			'label' => 'Dynamic Width',
		),
	);

	/**
	 * Constructor
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		$block_json       = prc_block_library_manifest( 'core-group' );
		$this->block_json = $block_json;
		$this->init( $loader );
	}

	/**
	 * Initialize the block
	 *
	 * @param mixed $loader Loader.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'register_new_styles', 10 );
			$loader->add_action( 'init', $this, 'register_assets' );
			$loader->add_action( 'enqueue_block_editor_assets', $this, 'register_editor_assets' );
			$loader->add_filter( 'block_type_metadata_settings', $this, 'add_settings', 100, 2 );
			$loader->add_filter( 'render_block', $this, 'render', 100, 2 );
		}
	}

	/**
	 * Register new styles
	 *
	 * @hook init
	 * @return void
	 */
	public function register_new_styles() {
		foreach ( self::$size_styles as $style_args ) {
			register_block_style(
				'core/group',
				$style_args,
			);
		}
	}

	/**
	 * Register assets
	 *
	 * @hook init
	 * @return void
	 */
	public function register_assets() {
		$this->editor_script_handle = register_block_script_handle( $this->block_json, 'editorScript' );
		$this->style_handle         = register_block_style_handle( $this->block_json, 'style' );
	}

	/**
	 * Register editor style
	 *
	 * @hook enqueue_block_assets
	 * @return void
	 */
	public function register_editor_style() {
		wp_enqueue_style( $this->style_handle );
		// @TODO: Need to rework the divider to use design tokens throughout.
		// $styles = $this->generate_divider_styles();
		// if ( is_wp_error( $styles ) ) {
		// return;
		// }
		// wp_add_inline_style( $this->style_handle, $styles );
	}


	/**
	 * Register editor assets
	 *
	 * @hook enqueue_block_editor_assets
	 * @return void
	 */
	public function register_editor_assets() {
		wp_enqueue_script( $this->editor_script_handle );
		wp_enqueue_style( $this->style_handle );
	}

	/**
	 * Register additional settings, like context, for the core-group block.
	 * Currently we're allowing the group block to have grid context.
	 * There is no active use case for this, more an experiment to see what uses may emerge.
	 * Also adds dividerColor attribute for interior divider functionality.
	 *
	 * @hook block_type_metadata_settings 100, 2
	 * @param mixed $settings
	 * @param mixed $metadata
	 * @return mixed
	 */
	public function add_settings( array $settings, array $metadata ) {
		if ( 'core/group' === $metadata['name'] ) {
			$settings['supports']['interactivity'] = true;
			$settings['uses_context']              = array_merge(
				array_key_exists( 'uses_context', $settings ) ? $settings['uses_context'] : array(),
				array(
					'grid/column/desktop/span',
					'grid/column/desktop/start',
					'grid/column/desktop/row',
					'grid/column/tablet/span',
					'grid/column/tablet/start',
					'grid/column/tablet/row',
					'grid/column/mobile/span',
					'grid/column/mobile/start',
					'grid/column/mobile/row',
				)
			);
			// Add dividerColor attribute if not already present
			if ( ! array_key_exists( 'dividerColor', $settings['attributes'] ) ) {
				$settings['attributes']['dividerColor'] = array(
					'type'    => 'string',
					'default' => null,
				);
			}
		}
		return $settings;
	}

	/**
	 * Render the core/group block
	 * Adds interior divider support and enqueues necessary styles.
	 *
	 * @hook render_block 100, 2
	 * @param mixed $block_content
	 * @param mixed $block
	 * @return mixed
	 */
	public function render( $block_content, $block ) {
		if ( 'core/group' !== $block['blockName'] || is_admin() ) {
			return $block_content;
		}
		// Ensure group styles enqueued.
		wp_enqueue_style( $this->style_handle );

		// Handle interior divider
		$has_divider_color = array_key_exists( 'dividerColor', $block['attrs'] ) && ! empty( $block['attrs']['dividerColor'] );

		if ( $has_divider_color ) {
			$w = new WP_HTML_Tag_Processor( $block_content );
			if ( $w->next_tag() ) {
				$w->add_class( 'has-interior-divider' );
				$w->add_class( 'has-' . $block['attrs']['dividerColor'] . '-interior-divider-color' );
				$block_content = $w->get_updated_html();
			}

			// Generate and add inline styles for the divider color
			$inline_styles = $this->generate_divider_styles( $block['attrs']['dividerColor'] );
			if ( ! empty( $inline_styles ) ) {
				wp_add_inline_style( $this->style_handle, $inline_styles );
			}
		}

		return $block_content;
	}

	/**
	 * Generate interior divider styles for a specific color.
	 *
	 * @param string $color_slug The color slug to generate styles for.
	 * @return string
	 */
	private function generate_divider_styles( $color_slug ) {
		if ( empty( $color_slug ) ) {
			return '';
		}

		$style = sprintf(
			'.wp-block-group.has-interior-divider.has-%s-interior-divider-color { --divider-color: var(--wp--preset--color--%s); }',
			esc_attr( $color_slug ),
			esc_attr( $color_slug )
		);

		return $style;
	}
}
