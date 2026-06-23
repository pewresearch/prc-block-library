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
			$loader->add_action( 'enqueue_block_assets', $this, 'register_editor_style' );
			$loader->add_filter( 'block_type_metadata_settings', $this, 'add_settings', 100, 2 );
			$loader->add_filter( 'render_block', $this, 'render', 100, 2 );
			$loader->add_filter( 'render_block', $this, 'render_grid_child', 20, 2 );
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
	}


	/**
	 * Register editor assets
	 *
	 * @hook enqueue_block_editor_assets
	 * @return void
	 */
	public function register_editor_assets() {
		wp_enqueue_script( $this->editor_script_handle );
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
			// Add dividerStyle attribute (grid-aware dividers).
			if ( ! array_key_exists( 'dividerStyle', $settings['attributes'] ) ) {
				$settings['attributes']['dividerStyle'] = array(
					'type'    => 'string',
					'default' => 'solid',
				);
			}
			// Add dividerInset attribute (grid-aware dividers).
			if ( ! array_key_exists( 'dividerInset', $settings['attributes'] ) ) {
				$settings['attributes']['dividerInset'] = array(
					'type'    => 'number',
					'default' => 0,
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

		$has_divider_color = array_key_exists( 'dividerColor', $block['attrs'] ) && ! empty( $block['attrs']['dividerColor'] );
		if ( ! $has_divider_color ) {
			return $block_content;
		}

		$divider_color = $block['attrs']['dividerColor'];
		$is_grid       = isset( $block['attrs']['layout']['type'] ) && 'grid' === $block['attrs']['layout']['type'];

		$w = new WP_HTML_Tag_Processor( $block_content );
		if ( ! $w->next_tag() ) {
			return $block_content;
		}

		if ( $is_grid ) {
			// Grid-aware divider: classes + inline CSS variables on the wrapper.
			$w->add_class( 'has-divider' );
			$w->add_class( 'has-' . $divider_color . '-divider-color' );

			$vars   = array();
			$grid_gutter = \PRC\BlockUtils\get_block_gap_support_value( $block['attrs'], 'horizontal' );
			if ( ! empty( $grid_gutter ) ) {
				$vars[] = sprintf( '--grid-gutter:%s;', esc_attr( $grid_gutter ) );
			}
			$vars[] = sprintf( '--divider-color:var(--wp--preset--color--%s);', esc_attr( $divider_color ) );

			$divider_style = $block['attrs']['dividerStyle'] ?? 'solid';
			if ( ! empty( $divider_style ) && 'solid' !== $divider_style ) {
				$vars[] = sprintf( '--divider-style:%s;', esc_attr( $divider_style ) );
			}
			$divider_inset = (int) ( $block['attrs']['dividerInset'] ?? 0 );
			if ( $divider_inset > 0 ) {
				$vars[] = sprintf( '--divider-inset:%dpx;', $divider_inset );
			}

			$existing_style = (string) $w->get_attribute( 'style' );
			$w->set_attribute( 'style', trim( $existing_style . ' ' . implode( ' ', $vars ) ) );
		} else {
			// Legacy stacked interior divider.
			$w->add_class( 'has-interior-divider' );
			$w->add_class( 'has-' . $divider_color . '-interior-divider-color' );

			$inline_styles = $this->generate_divider_styles( $divider_color );
			if ( ! empty( $inline_styles ) ) {
				wp_add_inline_style( $this->style_handle, $inline_styles );
			}
		}

		return $w->get_updated_html();
	}

	/**
	 * Render order CSS variables and divider classes onto a grid-group child.
	 *
	 * Reads the child's own native style.{viewport} order values and the computed
	 * `style.prcGridDivider` bucket; no parent lookup is needed because the order
	 * variables only take effect inside a grid and the divider classes are only
	 * styled when the parent group carries `has-divider`.
	 *
	 * @hook render_block 20, 2
	 * @param string $block_content The block content.
	 * @param array  $block         The block data.
	 * @return string
	 */
	public function render_grid_child( $block_content, $block ) {
		if ( is_admin() || empty( $block_content ) ) {
			return $block_content;
		}
		$style = $block['attrs']['style'] ?? null;
		if ( ! is_array( $style ) ) {
			return $block_content;
		}

		$order_vars = array();
		foreach ( array( 'desktop', 'tablet', 'mobile' ) as $viewport ) {
			$order = $this->get_style_state_value( $style, $viewport, array( 'layout', 'prcOrder' ) );
			if ( null !== $order && '' !== $order ) {
				$order_vars[] = sprintf( '--%s-order:%d;', $viewport, (int) $order );
			}
		}

		$dividers = $style['prcGridDivider'] ?? null;

		if ( empty( $order_vars ) && empty( $dividers ) ) {
			return $block_content;
		}

		$w = new WP_HTML_Tag_Processor( $block_content );
		if ( ! $w->next_tag() ) {
			return $block_content;
		}

		if ( ! empty( $order_vars ) ) {
			if ( $this->style_handle ) {
				wp_enqueue_style( $this->style_handle );
			}
			$existing_style = (string) $w->get_attribute( 'style' );
			$w->set_attribute( 'style', trim( $existing_style . ' ' . implode( ' ', $order_vars ) ) );
		}

		if ( is_array( $dividers ) ) {
			foreach ( array( 'desktop', 'tablet', 'mobile' ) as $viewport ) {
				$flags = $dividers[ $viewport ] ?? null;
				if ( ! is_array( $flags ) ) {
					continue;
				}
				if ( ! empty( $flags['divider'] ) ) {
					$w->add_class( 'has-' . $viewport . '-divider' );
				}
				if ( ! empty( $flags['full'] ) ) {
					$w->add_class( 'is-' . $viewport . '-full-width' );
				}
			}
		}

		return $w->get_updated_html();
	}

	/**
	 * Read a value from the native responsive style-state structure.
	 *
	 * Tolerates both the 23.3.0 `tablet`/`mobile` keys and the later
	 * `@tablet`/`@mobile` keys.
	 *
	 * @param array  $style    Block style attribute.
	 * @param string $viewport `desktop` (base), `tablet`, or `mobile`.
	 * @param array  $path     Property path within the bucket.
	 * @return mixed Stored value, or null.
	 */
	private function get_style_state_value( array $style, string $viewport, array $path ) {
		$bucket = $style;
		if ( 'desktop' !== $viewport ) {
			$bucket = $style[ $viewport ] ?? $style[ '@' . $viewport ] ?? null;
		}
		if ( ! is_array( $bucket ) ) {
			return null;
		}
		foreach ( $path as $key ) {
			if ( ! is_array( $bucket ) || ! array_key_exists( $key, $bucket ) ) {
				return null;
			}
			$bucket = $bucket[ $key ];
		}
		return $bucket;
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
