<?php
/**
 * Core List Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use WP_HTML_Tag_Processor;
use WP_Block;

if ( defined( 'WP_CLI' ) && \WP_CLI ) {
	require_once __DIR__ . '/class-core-tabs-migrate-cli.php';
}

/**
 * Block Name:        Core Tabs
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */
class Core_Tabs {
	/**
	 * Block name
	 *
	 * @var string
	 */
	public $block_name = 'core/tabs';

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
	 * View script module handle
	 *
	 * @var string
	 */
	public $view_script_module_handle;

	public $view_script_module_deps;
	public $view_script_module_ver;

	/**
	 * Stack of mobile dropdown markup to be copied after tab panels.
	 * Uses an array (stack) to handle nested tabs blocks correctly.
	 *
	 * @var array
	 */
	private $pending_dropdown_copies = array();

	/**
	 * Constructor
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		// Ensure utility functions are loaded.
		require_once PRC_BLOCK_LIBRARY_DIR . '/build/core-tabs/util.php';
		$this->block_json = prc_block_library_manifest( 'core-tabs' );
		$this->init( $loader );
	}

	/**
	 * Initialize the block
	 *
	 * @param mixed $loader Loader.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_filter( 'register_block_type_args', $this, 'extend_core_tab_list_uses_context', 10, 2 );
			$loader->add_action( 'init', $this, 'register_assets' );
			$loader->add_action( 'init', $this, 'register_tab_block_bindings' );
			$loader->add_action( 'init', $this, 'register_block_styles' );
			$loader->add_action( 'enqueue_block_editor_assets', $this, 'register_editor_assets' );
			$loader->add_action( 'enqueue_block_assets', $this, 'register_editor_style' );
			$loader->add_filter( 'render_block_context', $this, 'filter_render_block_context', 10, 2 );
			// Render legacy PRC tabs as core/tabs structure.
			// @TODO: Disable before 1.4.3 release, will re-enable in 1.4.4 on Friday 01/25/26.
			// $loader->add_filter( 'render_block_prc-block/tabs', $this, 'render_prc_tabs', 10, 2 );
			// Render modified core/tab-list block.
			$loader->add_filter( 'render_block_core/tab-list', $this, 'render_core_tab_list', 10, 3 );
			// Render core/tabs block with bottom mobile dropdown copy.
			$loader->add_filter( 'render_block_core/tabs', $this, 'render_core_tabs', 10, 3 );
			$loader->add_filter( 'render_block_core/tabs', $this, 'render_core_tabs_entity_iframe', 15, 3 );
		}
	}

	/**
	 * When tabs contain entity-as-iframe, wire prefetch + tab panel visibility sync.
	 *
	 * @hook render_block_core/tabs (priority 15 — after bottom mobile dropdown markup at priority 10)
	 *
	 * @param string   $block_content Block content.
	 * @param array    $block         Block.
	 * @param WP_Block $instance      Block instance.
	 * @return string
	 */
	public function render_core_tabs_entity_iframe( $block_content, $block, $instance ) {
		if ( ! is_string( $block_content ) || ! preg_match( '/wp-block-prc-block-entity-as-iframe/', $block_content ) ) {
			return $block_content;
		}

		$processor = new WP_HTML_Tag_Processor( $block_content );
		while ( $processor->next_tag( array( 'class_name' => 'wp-block-tab-panel' ) ) ) {
			$processor->set_attribute( 'data-wp-watch--sync-entity-iframes', 'core/tabs::callbacks.syncEntityIframeWithTabPanel' );
		}
		$block_content = $processor->get_updated_html();

		$processor = new WP_HTML_Tag_Processor( $block_content );
		while ( $processor->next_tag( array( 'tag_name' => 'BUTTON' ) ) ) {
			if ( 'tab' !== $processor->get_attribute( 'role' ) ) {
				continue;
			}
			$processor->set_attribute( 'data-wp-on--pointerenter', 'core/tabs::callbacks.prefetchEntityIframeOnTabMenuItemPointer' );
		}

		return $processor->get_updated_html();
	}

	/**
	 * Restore context keys on core/tab-list for PRC extensions (mobile dropdown, etc.)
	 * and enable Custom CSS support.
	 *
	 * Upstream narrowed usesContext to core/tabs-list only; we merge parent-provided
	 * context back so render_block_core/tab-list receives core/tabs-id and active index.
	 *
	 * NOTE: WordPress converts the camelCase `usesContext` from block.json to snake_case
	 * `uses_context` before invoking the `register_block_type_args` filter. The filter
	 * MUST read/write `uses_context`; writing `usesContext` here is a silent no-op and
	 * leaves $tabs_id unresolved at render time, which keys interactivity state by 0
	 * (PHP coerces false to int 0) and breaks the mobile dropdown client-side.
	 *
	 * @param array  $args Block type args.
	 * @param string $name Block name.
	 * @return array
	 */
	public function extend_core_tab_list_uses_context( $args, $name ) {
		if ( 'core/tab-list' !== $name ) {
			return $args;
		}
		$uses_context = $args['uses_context'] ?? array();
		$extra        = array(
			'core/tabs-id',
			'core/tabs-activeTabIndex',
			'core/tabs-editorActiveTabIndex',
		);
		foreach ( $extra as $key ) {
			if ( ! in_array( $key, $uses_context, true ) ) {
				$uses_context[] = $key;
			}
		}
		$args['uses_context'] = $uses_context;

		// Enable Custom CSS block support so saved CSS is applied on the frontend.
		$args['supports']['customCSS'] = true;

		return $args;
	}

	/**
	 * Register assets
	 *
	 * @hook init
	 * @return void
	 */
	public function register_assets() {
		$this->style_handle              = register_block_style_handle( $this->block_json, 'style' );
		$this->editor_script_handle      = register_block_script_handle( $this->block_json, 'editorScript' );
		$this->view_script_module_handle = register_block_script_handle( $this->block_json, 'viewScriptModule' );
		$view_asset                      = include PRC_BLOCK_LIBRARY_DIR . '/build/core-tabs/view.asset.php';
		$this->view_script_module_deps   = $view_asset['dependencies'];
		$this->view_script_module_ver    = $view_asset['version'];
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
	 * Register editor style
	 *
	 * @hook enqueue_block_assets
	 */
	public function register_editor_style() {
		wp_enqueue_style( $this->style_handle );
	}

	/**
	 * Register block styles for core/tab (button) and core/tab-list.
	 *
	 * @hook init
	 * @return void
	 */
	public function register_block_styles() {
		register_block_style(
			'core/tab-list',
			array(
				'name'  => 'country-flags',
				'label' => __( 'Country Flags', 'prc-block-library' ),
			)
		);
		register_block_style(
			'core/tab-list',
			array(
				'name'  => 'active-underline',
				'label' => __( 'Active Underline', 'prc-block-library' ),
			)
		);
		register_block_style(
			'core/tabs',
			array(
				'name'  => 'tabbed',
				'label' => __( 'Tabbed', 'prc-block-library' ),
			)
		);
	}

	/**
	 * Add slugified label to context as core/tab-slug for children.
	 *
	 * @hook render_block_context
	 *
	 * @param array $context      The current context.
	 * @param array $parsed_block The parsed block array.
	 * @return array Updated context.
	 */
	public function filter_render_block_context( array $context, array $parsed_block ): array {
		if ( ( $parsed_block['blockName'] ?? '' ) !== 'core/tab-panel' ) {
			return $context;
		}

		$attrs = $parsed_block['attrs'] ?? array();
		$label = isset( $attrs['label'] ) ? wp_strip_all_tags( (string) $attrs['label'] ) : '';
		if ( $label ) {
			$label                      = str_replace( '&', 'and', $label );
			$context['core/tab-label']  = $label;
			$context['core/tab-slug']   = sanitize_title( $label );
		}
		return $context;
	}

	/**
	 * Get the core/tab-label binding.
	 *
	 * @param array    $source_args Source arguments.
	 * @param WP_Block $block The block.
	 * @param string   $attribute_name The attribute name.
	 * @return string The core/tab-label binding.
	 */
	public function get_tab_label_binding( $source_args, $block, $attribute_name ) {
		$context = $block->context;
		return $context['core/tab-label'] ?? 'Tab Label...';
	}

	/**
	 * Register the tab block bindings.
	 *
	 * @hook init
	 */
	public function register_tab_block_bindings() {
		register_block_bindings_source(
			'core/tab-label',
			array(
				'label'              => __( 'Tab Label' ),
				'get_value_callback' => array( $this, 'get_tab_label_binding' ),
				'uses_context'       => array( 'core/tab-label', 'core/tab-slug' ),
			)
		);
	}

	/**
	 * Resolve a preset-slug / custom-hex attribute pair to a CSS value string.
	 *
	 * Mirrors the client-side resolveColorValue() utility in index.jsx.
	 *
	 * @param array  $attrs      Block attributes.
	 * @param string $slug_key   Attribute name that holds the preset slug (e.g. 'hoverBackgroundColor').
	 * @param string $custom_key Attribute name that holds the custom hex (e.g. 'customHoverBackgroundColor').
	 * @return string CSS value string (var(--wp--preset--color--<slug>) or hex) or empty string.
	 */
	private function resolve_color( array $attrs, string $slug_key, string $custom_key ): string {
		if ( ! empty( $attrs[ $slug_key ] ) ) {
			return 'var(--wp--preset--color--' . sanitize_html_class( $attrs[ $slug_key ] ) . ')';
		}
		return (string) ( $attrs[ $custom_key ] ?? '' );
	}

	/**
	 * Build an inline-style fragment for the four hover/active CSS custom properties
	 * from a given block's attributes.
	 *
	 * Returns an empty string when none of the four pairs are set.
	 *
	 * @param array $attrs Block attributes.
	 * @return string Semicolon-separated CSS declarations, e.g. '--custom-tab-hover-color: var(...); ...'.
	 */
	private function build_hover_active_style( array $attrs ): string {
		$vars = array(
			'--custom-tab-hover-color'      => $this->resolve_color( $attrs, 'hoverBackgroundColor', 'customHoverBackgroundColor' ),
			'--custom-tab-hover-text-color' => $this->resolve_color( $attrs, 'hoverTextColor', 'customHoverTextColor' ),
			'--custom-tab-active-color'     => $this->resolve_color( $attrs, 'activeBackgroundColor', 'customActiveBackgroundColor' ),
			'--custom-tab-active-text-color' => $this->resolve_color( $attrs, 'activeTextColor', 'customActiveTextColor' ),
		);

		$declarations = array();
		foreach ( $vars as $property => $value ) {
			if ( '' !== $value ) {
				$declarations[] = $property . ': ' . $value;
			}
		}

		return implode( '; ', $declarations );
	}

	/**
	 * Map prc-block/tabs color attributes to core/tab button supports (Gutenberg 23.1+).
	 *
	 * @param array $attributes The prc-block/tabs attributes.
	 * @return array The mapped core/tab attributes.
	 */
	private function map_color_attributes( array $attributes ): array {
		$menu_item_attrs = array();

		// Map inactive/base colors to style.color.
		$style_color = array();
		if ( ! empty( $attributes['customTabInactiveColor'] ) ) {
			$style_color['background'] = $attributes['customTabInactiveColor'];
		}
		if ( ! empty( $attributes['customTabTextColor'] ) ) {
			$style_color['text'] = $attributes['customTabTextColor'];
		}
		if ( ! empty( $style_color ) ) {
			$menu_item_attrs['style'] = array( 'color' => $style_color );
		}

		// Preset color slugs (block supports).
		if ( ! empty( $attributes['tabInactiveColor'] ) ) {
			$menu_item_attrs['backgroundColor'] = $attributes['tabInactiveColor'];
		}
		if ( ! empty( $attributes['tabTextColor'] ) ) {
			$menu_item_attrs['textColor'] = $attributes['tabTextColor'];
		}

		return $menu_item_attrs;
	}

	/**
	 * Build a core/tab-panel parsed block from a prc-block/tab.
	 *
	 * @param array $tab_block The prc-block/tab parsed block.
	 * @return array The core/tab-panel parsed block.
	 */
	private function build_core_tab_block( array $tab_block ): array {
		$tab_attrs = $tab_block['attrs'] ?? array();
		$tab_label = $tab_attrs['label'] ?? '';
		$tab_id    = $tab_attrs['anchor'] ?? sanitize_title( $tab_label );
		$tab_inner = $tab_block['innerBlocks'] ?? array();

		$core_tab_attrs = array(
			'label' => $tab_label,
		);

		if ( ! empty( $tab_attrs['anchor'] ) ) {
			$core_tab_attrs['anchor'] = $tab_attrs['anchor'];
		}
		if ( ! empty( $tab_attrs['style'] ) ) {
			$core_tab_attrs['style'] = $tab_attrs['style'];
		}

		// Inner markup mirrors core/tab-panel save (section tabpanel).
		$inner_content    = array( '<section role="tabpanel" class="wp-block-tab-panel" id="' . esc_attr( $tab_id ) . '">' );
		$inner_html_parts = array( '<section role="tabpanel" class="wp-block-tab-panel" id="' . esc_attr( $tab_id ) . '">' );

		foreach ( $tab_inner as $inner_block ) {
			$inner_content[]    = null;
			$inner_html_parts[] = '';
		}

		$inner_content[]    = '</section>';
		$inner_html_parts[] = '</section>';

		return array(
			'blockName'    => 'core/tab-panel',
			'attrs'        => $core_tab_attrs,
			'innerBlocks'  => $tab_inner,
			'innerHTML'    => implode( '', $inner_html_parts ),
			'innerContent' => $inner_content,
		);
	}

	/**
	 * Build a core/tab-panels parsed block wrapping core/tab-panel children.
	 *
	 * @param array $core_tab_panel_blocks Array of core/tab-panel parsed blocks.
	 * @return array The core/tab-panels parsed block.
	 */
	private function build_core_tab_panels_block( array $core_tab_panel_blocks ): array {
		$inner_content    = array( '<div class="wp-block-tab-panels">' );
		$inner_html_parts = array( '<div class="wp-block-tab-panels">' );

		foreach ( $core_tab_panel_blocks as $_tab_panel ) {
			$inner_content[]    = null;
			$inner_html_parts[] = '';
		}

		$inner_content[]    = '</div>';
		$inner_html_parts[] = '</div>';

		return array(
			'blockName'    => 'core/tab-panels',
			'attrs'        => array(),
			'innerBlocks'  => $core_tab_panel_blocks,
			'innerHTML'    => implode( '', $inner_html_parts ),
			'innerContent' => $inner_content,
		);
	}

	/**
	 * Build a core/tab-list parsed block with tabs attribute and button HTML.
	 *
	 * @param array $tabs_menu_attrs Shared attributes for the tab-list block (colors, styles).
	 * @param bool  $is_vertical     Whether the tabs are vertical.
	 * @param array $tab_labels      Tab labels in panel order.
	 * @return array The core/tab-list parsed block.
	 */
	private function build_core_tabs_menu_block( array $tabs_menu_attrs, bool $is_vertical, array $tab_labels ): array {
		$attrs         = $tabs_menu_attrs;
		$attrs['tabs'] = array_map(
			static function ( $label ) {
				return array( 'label' => (string) $label );
			},
			$tab_labels
		);

		if ( $is_vertical ) {
			$attrs['layout'] = array(
				'type'        => 'flex',
				'flexWrap'    => 'nowrap',
				'orientation' => 'vertical',
			);
		}

		$orientation_class = $is_vertical ? ' is-vertical' : '';
		$opening           = '<div class="wp-block-tab-list' . $orientation_class . '" role="tablist">';
		$closing           = '</div>';

		$buttons_html = '';
		foreach ( $tab_labels as $label ) {
			$buttons_html .= '<button type="button" role="tab">' . esc_html( (string) $label ) . '</button>';
		}

		return array(
			'blockName'    => 'core/tab-list',
			'attrs'        => $attrs,
			'innerBlocks'  => array(),
			'innerHTML'    => $opening . $buttons_html . $closing,
			'innerContent' => array( $opening . $buttons_html . $closing ),
		);
	}

	/**
	 * Convert prc-block/tabs parsed block to core/tabs structure.
	 * Returns a parsed block array compatible with WP_Block.
	 *
	 * @param array $block The parsed prc-block/tabs block.
	 * @return array The converted core/tabs block structure as an array.
	 */
	private function convert_prc_tabs_to_core_tabs( array $block ): array {
		$attributes   = $block['attrs'] ?? array();
		$inner_blocks = $block['innerBlocks'] ?? array();

		// 1. Map prc-block/tabs attributes to core/tabs attributes.
		$core_tabs_attrs = array(
			'tabsId'         => $attributes['tabsId'] ?? '',
			'activeTabIndex' => $attributes['activeTabIndex'] ?? 0,
		);

		if ( ! empty( $attributes['metadata'] ) ) {
			$core_tabs_attrs['metadata'] = $attributes['metadata'];
		}
		if ( ! empty( $attributes['style'] ) ) {
			$core_tabs_attrs['style'] = $attributes['style'];
		}
		if ( ! empty( $attributes['align'] ) ) {
			$core_tabs_attrs['align'] = $attributes['align'];
		}
		if ( ! empty( $attributes['className'] ) ) {
			$core_tabs_attrs['className'] = $attributes['className'];
		}

		// 2. Convert prc-block/tab blocks to core/tab-panel blocks.
		$core_tab_panel_blocks = array();
		foreach ( $inner_blocks as $tab_block ) {
			if ( 'prc-block/tab' !== ( $tab_block['blockName'] ?? '' ) ) {
				continue;
			}
			$core_tab_panel_blocks[] = $this->build_core_tab_block( $tab_block );
		}

		// 3. Build core/tab-list with tabs attribute and button HTML.
		$color_attrs = $this->map_color_attributes( $attributes );
		$is_vertical = 'vertical' === ( $attributes['orientation'] ?? 'horizontal' );

		$tab_labels = array();
		foreach ( $core_tab_panel_blocks as $tab_panel_block ) {
			$tattrs     = $tab_panel_block['attrs'] ?? array();
			$tab_labels[] = $tattrs['label'] ?? '';
		}

		$tabs_menu = $this->build_core_tabs_menu_block( $color_attrs, $is_vertical, $tab_labels );
		$tab_panels = $this->build_core_tab_panels_block( $core_tab_panel_blocks );

		// 4. Build core/tabs with proper innerHTML/innerContent.
		$tabs_inner_html = '<div class="wp-block-tabs"></div>';

		return array(
			'blockName'    => 'core/tabs',
			'attrs'        => $core_tabs_attrs,
			'innerBlocks'  => array( $tabs_menu, $tab_panels ),
			'innerHTML'    => $tabs_inner_html,
			'innerContent' => array(
				'<div class="wp-block-tabs">',
				null,
				null,
				'</div>',
			),
		);
	}

	/**
	 * Generate the tabs list context from converted core/tab-panel blocks.
	 *
	 * The shape MUST match core's `core/tabs-list` context, which Gutenberg 23.5
	 * (WordPress/gutenberg#79337) changed to a flat array of tab-ID slug STRINGS
	 * (see gutenberg_block_core_tabs_generate_tabs_list(), which returns
	 * esc_attr( $tab_id ) values). Core's tab-list render callback consumes this as
	 * `$tab_id = $tabs_list[ $tab_index ]` and builds `'tab__' . $tab_id` /
	 * aria-controls from it — returning objects here yields broken `tab__Array` ids.
	 *
	 * @param array $converted The converted core/tabs block structure.
	 * @return string[] The tab-ID strings for the core/tabs-list context.
	 */
	private function generate_tabs_list_context( array $converted ): array {
		$tabs_list = array();

		foreach ( $converted['innerBlocks'] ?? array() as $inner_block ) {
			if ( 'core/tab-panels' !== ( $inner_block['blockName'] ?? '' ) ) {
				continue;
			}
			$tab_index = 0;
			foreach ( $inner_block['innerBlocks'] ?? array() as $tab_panel_block ) {
				if ( 'core/tab-panel' !== ( $tab_panel_block['blockName'] ?? '' ) ) {
					continue;
				}
				$attrs = $tab_panel_block['attrs'] ?? array();

				$tab_id = $attrs['anchor'] ?? '';
				if ( empty( $tab_id ) && ! empty( $tab_panel_block['innerHTML'] ) ) {
					$tag_processor = new WP_HTML_Tag_Processor( $tab_panel_block['innerHTML'] );
					if ( $tag_processor->next_tag( array( 'class_name' => 'wp-block-tab-panel' ) ) ) {
						$tab_id = $tag_processor->get_attribute( 'id' ) ?? '';
					}
				}
				if ( empty( $tab_id ) ) {
					$tab_id = 'tab-' . $tab_index;
				}

				$tabs_list[] = esc_attr( $tab_id );
				++$tab_index;
			}
			break;
		}

		return $tabs_list;
	}

	/**
	 * Render prc-block/tabs by converting it to core/tabs structure.
	 * This provides backwards compatibility for legacy content that hasn't been upgraded in the editor.
	 *
	 * @hook render_block_prc-block/tabs
	 *
	 * @param string $block_content Block content.
	 * @param array  $block Block.
	 * @return string The rendered content.
	 */
	public function render_prc_tabs( $block_content, $block ) {
		$converted = $this->convert_prc_tabs_to_core_tabs( $block );

		// Pre-generate the core/tabs-list context that core/tab-list needs.
		// This is necessary because the render_block_context filter that normally
		// generates this context may not propagate it correctly to children
		// when rendering programmatically.
		$tabs_list = $this->generate_tabs_list_context( $converted );

		$context = array(
			'core/tabs-list' => $tabs_list,
			'core/tabs-id'   => wp_unique_id( 'tabs_' ),
		);

		// Use WP_Block with context to properly render with context propagation.
		$wp_block = new WP_Block( $converted, $context );
		return $wp_block->render();
	}

	/**
	 * Render core/tab-list block.
	 *
	 * @hook render_block_core/tab-list
	 *
	 * @param string $block_content Block content.
	 * @param array  $block Block.
	 * @return string
	 */
	public function render_core_tab_list( $block_content, $block, $instance ) {
		wp_enqueue_script_module(
			$this->view_script_module_handle,
			plugins_url( '/build/core-tabs/view.js', PRC_BLOCK_LIBRARY_FILE ),
			$this->view_script_module_deps,
			$this->view_script_module_ver
		);

		$context = $instance->context ?? array();
		$tabs_id = $context['core/tabs-id'] ?? '';

		// Without a stable tabs id, IAPI state would key on PHP-coerced 0 and the client
		// would never find its slice (state[tabsId] === undefined). Bail rather than
		// emit a silently-broken state shape. See extend_core_tab_list_uses_context.
		if ( '' === $tabs_id ) {
			return $block_content;
		}

		// Handle mobile dropdown functionality.
		$attributes            = $block['attrs'] ?? array();
		$mobile_dropdown       = $attributes['mobileDropdown'] ?? false;
		$mobile_dropdown_width = $attributes['mobileDropdownWidth'] ?? 768;
		$class_name            = $attributes['className'] ?? '';

		if ( false !== strpos( $class_name, 'is-style-country-flags' ) ) {
			$block_content = $this->inject_country_flags_into_tab_list( $block_content );
		}

		$tag_processor = new WP_HTML_Tag_Processor( $block_content );
		$tag_processor->next_tag( array( 'class_name' => 'wp-block-tab-list' ) );
		$tag_processor->set_attribute( 'data-wp-init--add-event-listeners', 'core/tabs::callbacks.addEventListeners' );

		// Merge hover/active CSS custom properties into the wrapper's inline style.
		$hover_active_style = $this->build_hover_active_style( $attributes );
		if ( '' !== $hover_active_style ) {
			$existing_style = $tag_processor->get_attribute( 'style' ) ?? '';
			$merged_style   = '' !== $existing_style
				? rtrim( $existing_style, '; ' ) . '; ' . $hover_active_style
				: $hover_active_style;
			$tag_processor->set_attribute( 'style', $merged_style );
		}

		// Namespace our per-tabs dropdown state under a dedicated `prcMobileDropdown`
		// key. Gutenberg 23.5 (WordPress/gutenberg#79337) stores core's per-block tabs
		// list array at `state[ tabsId ]`; writing our object to that same key clobbers
		// core's array and makes `onTabsInit`'s `tabsList.findIndex()` throw, disabling
		// all tab interactivity.
		wp_interactivity_state(
			'core/tabs',
			array(
				'prcMobileDropdown' => array(
					$tabs_id => array(
						'mobileDropdownEnabled' => $mobile_dropdown,
						'mobileDropdownActive'  => false, // Viewport width is less than mobileDropdownWidth.
						'mobileDropdownWidth'   => $mobile_dropdown_width,
						'dropdownOpen'          => false, // Dropdown is closed.
					),
				),
			)
		);

		// Hide the tabs menu if mobile dropdown is enabled.
		if ( $mobile_dropdown ) {
			$tag_processor->set_attribute( 'data-wp-on-window--resize', 'core/tabs::callbacks.addResizeListener' );
			$tag_processor->set_attribute(
				'data-wp-bind--hidden',
				'core/tabs::state.displayTabsList'
			);
		}

		$content = $tag_processor->get_updated_html();

		if ( $mobile_dropdown ) {
			$dropdown_markup = $this->build_mobile_dropdown_markup( $content, $instance, $tabs_id );

			// Store a copy of the dropdown markup to be placed after tab panels
			// in the render_core_tabs callback.
			$this->pending_dropdown_copies[] = $dropdown_markup;

			// Using regex, add dropdown after the wp-block-tab-list div.
			$content = preg_replace(
				'/<div\s+[^>]*class="[^"]*\bwp-block-tab-list\b[^"]*"[^>]*>.*?<\/div>/is',
				'$0' . $dropdown_markup,
				(string) $content,
				1
			);
		}

		return is_string( $content ) ? $content : $tag_processor->get_updated_html();
	}

	/**
	 * Render core/tabs block with a copy of the mobile dropdown placed after the tab panels.
	 * This provides a bottom dropdown on mobile so users can switch tabs from both above
	 * and below the content.
	 *
	 * @hook render_block_core/tabs
	 *
	 * @param string   $block_content Block content.
	 * @param array    $block Block.
	 * @param WP_Block $instance WP_Block instance.
	 * @return string
	 */
	public function render_core_tabs( $block_content, $block, $instance ) {
		// Check if there is a pending dropdown copy from the tab-list render.
		if ( empty( $this->pending_dropdown_copies ) ) {
			return $block_content;
		}

		$dropdown_markup = array_pop( $this->pending_dropdown_copies );

		// Add the bottom modifier class to the copied dropdown.
		$bottom_dropdown = str_replace(
			'class="wp-block-tabs-list__dropdown"',
			'class="wp-block-tabs-list__dropdown wp-block-tabs-list__dropdown--bottom"',
			$dropdown_markup
		);

		// Insert the bottom dropdown before the final closing </div> of the tabs block.
		$last_div_pos = strrpos( $block_content, '</div>' );
		if ( false !== $last_div_pos ) {
			$block_content = substr( $block_content, 0, $last_div_pos )
				. $bottom_dropdown
				. substr( $block_content, $last_div_pos );
		}

		return $block_content;
	}

	/**
	 * Inject country flag icons into tab-list buttons when the country-flags style is active.
	 *
	 * @param string $block_content Rendered tab-list HTML.
	 * @return string Updated HTML.
	 */
	private function inject_country_flags_into_tab_list( string $block_content ): string {
		$tabs = $this->get_tab_list_data( $block_content );
		if ( empty( $tabs ) ) {
			return $block_content;
		}

		wp_enqueue_style(
			'flag-icons',
			'https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.3.2/css/flag-icons.min.css',
			array(),
			'7.3.2'
		);

		foreach ( $tabs as $tab ) {
			$country_code = \PRC\BlockUtils\get_country_code_from_name( $tab['label'] );
			if ( null === $country_code ) {
				continue;
			}

			$flag_markup   = '<span class="fi fi-' . esc_attr( $country_code ) . '"></span>';
			$new_button    = preg_replace(
				'/(<button[^>]*>)/i',
				'$1' . $flag_markup,
				$tab['html'],
				1
			);
			$block_content = str_replace( $tab['html'], $new_button, $block_content );
		}

		return $block_content;
	}

	/**
	 * Extract rendered tab button HTML from a tab-list block's content.
	 *
	 * @param string $block_content Rendered tab-list HTML.
	 * @return string[] Button outer HTML in document order.
	 */
	private function extract_tab_buttons_from_content( string $block_content ): array {
		if ( ! preg_match( '/<div[^>]*class="[^"]*\bwp-block-tab-list\b[^"]*"[^>]*>(.*?)<\/div>/is', $block_content, $list_match ) ) {
			return array();
		}

		if ( ! preg_match_all( '/<button[^>]*>.*?<\/button>/is', $list_match[1], $button_matches ) ) {
			return array();
		}

		return $button_matches[0];
	}

	/**
	 * Build structured tab data from rendered tab-list content.
	 *
	 * This is the single source of truth for PRC tab-list extensions (country flags,
	 * mobile dropdown). The label is read from the rendered button text — the stable
	 * public contract — rather than the `core/tabs-list` block context, which is a
	 * core-controlled array of tab-ID slugs (no labels) and whose shape changed in
	 * Gutenberg 23.5 (WordPress/gutenberg#79337). Core's own tab-list render callback
	 * likewise operates on the rendered buttons, so this stays aligned with upstream.
	 *
	 * @param string $block_content Rendered tab-list HTML.
	 * @return array<int, array{html: string, label: string}> Tab data in document order.
	 */
	private function get_tab_list_data( string $block_content ): array {
		$tabs = array();
		foreach ( $this->extract_tab_buttons_from_content( $block_content ) as $button_html ) {
			$tabs[] = array(
				'html'  => $button_html,
				'label' => trim( html_entity_decode( wp_strip_all_tags( $button_html ), ENT_QUOTES | ENT_HTML5, 'UTF-8' ) ),
			);
		}
		return $tabs;
	}

	/**
	 * Build the custom mobile dropdown markup from rendered tab-list buttons.
	 *
	 * @param string   $block_content Rendered tab-list HTML (with flags/styles applied).
	 * @param WP_Block $instance      The WP_Block instance.
	 * @param string   $tabs_id       The tabs ID.
	 * @return string The dropdown HTML markup.
	 */
	private function build_mobile_dropdown_markup( $block_content, $instance, $tabs_id ) {
		$context = $instance->context ?? array();

		$tabs = $this->get_tab_list_data( (string) $block_content );
		if ( empty( $tabs ) ) {
			return '';
		}

		$dropdown_items_markup = '';
		foreach ( $tabs as $tab ) {
			$dropdown_items_markup .= '<li class="wp-block-tabs-list__dropdown-item" role="option" data-wp-on--click="core/tabs::callbacks.handleDropdownItemClick">' . $tab['html'] . '</li>';
		}

		$active_tab_index = $context['core/tabs-activeTabIndex'] ?? 0;
		$active_tab       = $tabs[ $active_tab_index ] ?? $tabs[0];

		$trigger_content = '';
		if ( preg_match( '/<button[^>]*>(.*?)<\/button>/s', $active_tab['html'], $matches ) ) {
			$trigger_content = $matches[1];
		} else {
			$trigger_content = '<span>' . esc_html( '' !== $active_tab['label'] ? $active_tab['label'] : 'Select a tab' ) . '</span>';
		}

		$dropdown_markup = sprintf(
			'<div class="wp-block-tabs-list__dropdown" data-wp-class--is-open="core/tabs::state.isDropdownOpen" data-wp-bind--hidden="core/tabs::state.displayDropdown" data-wp-on-document--click="core/tabs::callbacks.handleClickOutside">
				<button type="button" class="wp-block-tabs-list__dropdown-trigger" aria-haspopup="listbox" data-wp-on--click="core/tabs::actions.toggleDropdown">
					<span class="wp-block-tabs-list__dropdown-trigger-label" data-wp-watch="core/tabs::callbacks.updateTriggerLabel">%2$s</span>
					<span class="wp-block-tabs-list__dropdown-trigger-icon" aria-hidden="true"></span>
				</button>
				<ul class="wp-block-tabs-list__dropdown-panel" role="listbox">
					%3$s
				</ul>
			</div>',
			esc_attr( $tabs_id ),
			$trigger_content,
			$dropdown_items_markup
		);

		return $dropdown_markup;
	}
}
