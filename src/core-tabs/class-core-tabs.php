<?php
/**
 * Core List Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use WP_HTML_Tag_Processor;
use WP_Block;

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
			$loader->add_action( 'init', $this, 'register_assets' );
			$loader->add_action( 'init', $this, 'register_tab_block_bindings' );
			$loader->add_action( 'init', $this, 'register_block_styles' );
			$loader->add_action( 'enqueue_block_editor_assets', $this, 'register_editor_assets' );
			$loader->add_action( 'enqueue_block_assets', $this, 'register_editor_style' );
			$loader->add_filter( 'render_block_context', $this, 'filter_render_block_context', 10, 2 );
			// Render legacy PRC tabs as core/tabs structure.
			// @TODO: Disable before 1.4.3 release, will re-enable in 1.4.4 on Friday 01/25/26.
			// $loader->add_filter( 'render_block_prc-block/tabs', $this, 'render_prc_tabs', 10, 2 );
			// Render modified core/tabs-menu block.
			$loader->add_filter( 'render_block_core/tabs-menu', $this, 'render_core_tabs_menu', 10, 3 );
			// Render modified core/tabs-menu-item block for smart styles.
			$loader->add_filter( 'render_block_core/tabs-menu-item', $this, 'render_core_tabs_menu_item', 10, 3 );
		}
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
	 * Register block styles for tabs-menu-item.
	 *
	 * @hook init
	 * @return void
	 */
	public function register_block_styles() {
		register_block_style(
			'core/tabs-menu-item',
			array(
				'name'  => 'country-flags',
				'label' => __( 'Country Flags', 'prc-block-library' ),
			)
		);
		register_block_style(
			'core/tabs-menu',
			array(
				'name'  => 'active-underline',
				'label' => __( 'Active Underline', 'prc-block-library' ),
			)
		);
	}

	/**
	 * Render core/tabs-menu-item block with smart style modifications.
	 *
	 * @hook render_block_core/tabs-menu-item
	 *
	 * @param string   $block_content Block content.
	 * @param array    $block Block.
	 * @param WP_Block $instance WP_Block instance.
	 * @return string
	 */
	public function render_core_tabs_menu_item( $block_content, $block, $instance ) {
		$attributes = $block['attrs'] ?? array();
		$class_name = $attributes['className'] ?? '';

		// Check if the country-flags style is applied.
		if ( false === strpos( $class_name, 'is-style-country-flags' ) ) {
			return $block_content;
		}

		// Get the tab label from context.
		$tab_label = $instance->context['core/tabs-menu-item-label'] ?? '';
		if ( empty( $tab_label ) ) {
			return $block_content;
		}

		// Get country code from label.
		$country_code = \PRC\Platform\get_country_code_from_name( $tab_label );
		if ( null === $country_code ) {
			return $block_content;
		}

		// Enqueue flag-icons CSS.
		wp_enqueue_style(
			'flag-icons',
			'https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.3.2/css/flag-icons.min.css',
			array(),
			'7.3.2'
		);

		// Build the flag icon markup.
		$flag_markup = '<span class="fi fi-' . esc_attr( $country_code ) . '"></span>';

		// Inject the flag before the label span using regex.
		// The structure is: <a ...><span>Label</span></a>
		// We want: <a ...><span class="fi fi-XX"></span><span>Label</span></a>
		$block_content = preg_replace(
			'/(<a[^>]*>)(<span>)/i',
			'$1' . $flag_markup . '$2',
			$block_content,
			1
		);

		return $block_content;
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
		if ( ( $parsed_block['blockName'] ?? '' ) !== 'core/tab' ) {
			return $context;
		}

		$attrs = $parsed_block['attrs'] ?? array();
		$label = isset( $attrs['label'] ) ? wp_strip_all_tags( (string) $attrs['label'] ) : '';
		if ( $label ) {
			$label                    = str_replace( '&', 'and', $label );
			$context['core/tab-slug'] = sanitize_title( $label );
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
	 * Map prc-block/tabs color attributes to core/tabs-menu-item attributes.
	 *
	 * Mapping:
	 * - customTabActiveColor     -> customActiveBackgroundColor
	 * - customTabActiveTextColor -> customActiveTextColor
	 * - customTabHoverColor      -> customHoverBackgroundColor
	 * - customTabHoverTextColor  -> customHoverTextColor
	 * - customTabInactiveColor   -> style.color.background
	 * - customTabTextColor       -> style.color.text
	 *
	 * @param array $attributes The prc-block/tabs attributes.
	 * @return array The mapped core/tabs-menu-item attributes.
	 */
	private function map_color_attributes( array $attributes ): array {
		$menu_item_attrs = array();

		// Map active state colors.
		if ( ! empty( $attributes['customTabActiveColor'] ) ) {
			$menu_item_attrs['customActiveBackgroundColor'] = $attributes['customTabActiveColor'];
		}
		if ( ! empty( $attributes['customTabActiveTextColor'] ) ) {
			$menu_item_attrs['customActiveTextColor'] = $attributes['customTabActiveTextColor'];
		}

		// Map hover state colors.
		if ( ! empty( $attributes['customTabHoverColor'] ) ) {
			$menu_item_attrs['customHoverBackgroundColor'] = $attributes['customTabHoverColor'];
		}
		if ( ! empty( $attributes['customTabHoverTextColor'] ) ) {
			$menu_item_attrs['customHoverTextColor'] = $attributes['customTabHoverTextColor'];
		}

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

		// Also map preset color slugs if they exist.
		if ( ! empty( $attributes['tabInactiveColor'] ) ) {
			$menu_item_attrs['backgroundColor'] = $attributes['tabInactiveColor'];
		}
		if ( ! empty( $attributes['tabTextColor'] ) ) {
			$menu_item_attrs['textColor'] = $attributes['tabTextColor'];
		}
		if ( ! empty( $attributes['tabActiveColor'] ) ) {
			$menu_item_attrs['activeBackgroundColor'] = $attributes['tabActiveColor'];
		}
		if ( ! empty( $attributes['tabActiveTextColor'] ) ) {
			$menu_item_attrs['activeTextColor'] = $attributes['tabActiveTextColor'];
		}
		if ( ! empty( $attributes['tabHoverColor'] ) ) {
			$menu_item_attrs['hoverBackgroundColor'] = $attributes['tabHoverColor'];
		}
		if ( ! empty( $attributes['tabHoverTextColor'] ) ) {
			$menu_item_attrs['hoverTextColor'] = $attributes['tabHoverTextColor'];
		}

		return $menu_item_attrs;
	}

	/**
	 * Build a core/tab parsed block from a prc-block/tab.
	 *
	 * @param array $tab_block The prc-block/tab parsed block.
	 * @return array The core/tab parsed block.
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

		// Build innerContent with null placeholders for each inner block.
		$inner_content    = array( '<section class="wp-block-tab" id="' . esc_attr( $tab_id ) . '">' );
		$inner_html_parts = array( '<section class="wp-block-tab" id="' . esc_attr( $tab_id ) . '">' );

		foreach ( $tab_inner as $inner_block ) {
			$inner_content[]    = null; // Placeholder for inner block.
			$inner_html_parts[] = '';
		}

		$inner_content[]    = '</section>';
		$inner_html_parts[] = '</section>';

		return array(
			'blockName'    => 'core/tab',
			'attrs'        => $core_tab_attrs,
			'innerBlocks'  => $tab_inner,
			'innerHTML'    => implode( '', $inner_html_parts ),
			'innerContent' => $inner_content,
		);
	}

	/**
	 * Build a core/tab-panels parsed block with core/tab children.
	 *
	 * @param array $core_tab_blocks Array of core/tab parsed blocks.
	 * @return array The core/tab-panels parsed block.
	 */
	private function build_core_tab_panels_block( array $core_tab_blocks ): array {
		// Build innerContent with null placeholders for each tab block.
		$inner_content    = array( '<div class="wp-block-tab-panels">' );
		$inner_html_parts = array( '<div class="wp-block-tab-panels">' );

		foreach ( $core_tab_blocks as $tab_block ) {
			$inner_content[]    = null;
			$inner_html_parts[] = '';
		}

		$inner_content[]    = '</div>';
		$inner_html_parts[] = '</div>';

		return array(
			'blockName'    => 'core/tab-panels',
			'attrs'        => array(),
			'innerBlocks'  => $core_tab_blocks,
			'innerHTML'    => implode( '', $inner_html_parts ),
			'innerContent' => $inner_content,
		);
	}

	/**
	 * Build a core/tabs-menu-item parsed block with color attributes.
	 *
	 * The tabs-menu-item serves as a template block that the tabs-menu
	 * render callback uses to generate each individual tab button.
	 *
	 * @param array $color_attrs The color attributes for the tabs-menu-item.
	 * @return array The core/tabs-menu-item parsed block.
	 */
	private function build_core_tabs_menu_item_block( array $color_attrs ): array {
		$inner_html = '<a class="wp-block-tabs-menu-item wp-block-tabs-menu-item__template" hidden></a>';

		return array(
			'blockName'    => 'core/tabs-menu-item',
			'attrs'        => $color_attrs,
			'innerBlocks'  => array(),
			'innerHTML'    => $inner_html,
			'innerContent' => array( $inner_html ),
		);
	}

	/**
	 * Build a core/tabs-menu parsed block.
	 *
	 * @param array $tabs_menu_item_attrs The color attributes for the inner tabs-menu-item.
	 * @param bool  $is_vertical Whether the tabs are vertical.
	 * @return array The core/tabs-menu parsed block.
	 */
	private function build_core_tabs_menu_block( array $tabs_menu_item_attrs, bool $is_vertical ): array {
		// Build the tabs-menu-item template with color attributes.
		$tabs_menu_item = $this->build_core_tabs_menu_item_block( $tabs_menu_item_attrs );

		// Layout attributes stay on tabs-menu (color attrs are now on tabs-menu-item).
		$tabs_menu_attrs = array();
		if ( $is_vertical ) {
			$tabs_menu_attrs['layout'] = array(
				'type'        => 'flex',
				'flexWrap'    => 'nowrap',
				'orientation' => 'vertical',
			);
		}

		$orientation_class = $is_vertical ? ' is-vertical' : '';

		return array(
			'blockName'    => 'core/tabs-menu',
			'attrs'        => $tabs_menu_attrs,
			'innerBlocks'  => array( $tabs_menu_item ),
			'innerHTML'    => '<div class="wp-block-tabs-menu' . $orientation_class . '" role="tablist"></div>',
			'innerContent' => array(
				'<div class="wp-block-tabs-menu' . $orientation_class . '" role="tablist">',
				null, // Placeholder for tabs-menu-item template.
				'</div>',
			),
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

		// 2. Convert prc-block/tab blocks to core/tab blocks.
		$core_tab_blocks = array();
		foreach ( $inner_blocks as $tab_block ) {
			if ( 'prc-block/tab' !== ( $tab_block['blockName'] ?? '' ) ) {
				continue;
			}
			$core_tab_blocks[] = $this->build_core_tab_block( $tab_block );
		}

		// 3. Build core/tabs-menu with tabs-menu-item template containing mapped color attributes.
		$color_attrs = $this->map_color_attributes( $attributes );
		$is_vertical = 'vertical' === ( $attributes['orientation'] ?? 'horizontal' );

		$tabs_menu  = $this->build_core_tabs_menu_block( $color_attrs, $is_vertical );
		$tab_panels = $this->build_core_tab_panels_block( $core_tab_blocks );

		// 4. Build core/tabs with proper innerHTML/innerContent.
		$tabs_inner_html = '<div class="wp-block-tabs"></div>';

		return array(
			'blockName'    => 'core/tabs',
			'attrs'        => $core_tabs_attrs,
			'innerBlocks'  => array( $tabs_menu, $tab_panels ),
			'innerHTML'    => $tabs_inner_html,
			'innerContent' => array(
				'<div class="wp-block-tabs">',
				null, // tabs-menu placeholder
				null, // tab-panels placeholder
				'</div>',
			),
		);
	}

	/**
	 * Generate the tabs list context from converted core/tab blocks.
	 * This mirrors the logic in block_core_tabs_generate_tabs_list().
	 *
	 * @param array $converted The converted core/tabs block structure.
	 * @return array The tabs list for context.
	 */
	private function generate_tabs_list_context( array $converted ): array {
		$tabs_list = array();

		// Find tab-panels block in innerBlocks.
		foreach ( $converted['innerBlocks'] ?? array() as $inner_block ) {
			if ( 'core/tab-panels' === ( $inner_block['blockName'] ?? '' ) ) {
				$tab_index = 0;
				foreach ( $inner_block['innerBlocks'] ?? array() as $tab_block ) {
					if ( 'core/tab' === ( $tab_block['blockName'] ?? '' ) ) {
						$attrs     = $tab_block['attrs'] ?? array();
						$tab_label = $attrs['label'] ?? '';

						// Get the ID from attrs or from innerHTML.
						$tab_id = $attrs['anchor'] ?? '';
						if ( empty( $tab_id ) && ! empty( $tab_block['innerHTML'] ) ) {
							$tag_processor = new WP_HTML_Tag_Processor( $tab_block['innerHTML'] );
							if ( $tag_processor->next_tag( array( 'class_name' => 'wp-block-tab' ) ) ) {
								$tab_id = $tag_processor->get_attribute( 'id' ) ?? '';
							}
						}
						if ( empty( $tab_id ) ) {
							$tab_id = 'tab-' . $tab_index;
						}

						$tabs_list[] = array(
							'id'    => $tab_id,
							'label' => esc_html( (string) $tab_label ),
							'index' => $tab_index,
						);
						++$tab_index;
					}
				}
				break;
			}
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

		// Pre-generate the core/tabs-list context that core/tabs-menu needs.
		// This is necessary because the render_block_context filter that normally
		// generates this context may not propagate it correctly to children
		// when rendering programmatically.
		$tabs_list = $this->generate_tabs_list_context( $converted );

		$context = array(
			'core/tabs-list' => $tabs_list,
		);

		// Use WP_Block with context to properly render with context propagation.
		$wp_block = new WP_Block( $converted, $context );
		return $wp_block->render();
	}

	/**
	 * Render core/tabs-menu block.
	 *
	 * @hook render_block_core/tabs-menu
	 *
	 * @param string $block_content Block content.
	 * @param array  $block Block.
	 * @return string
	 */
	public function render_core_tabs_menu( $block_content, $block, $instance ) {
		wp_enqueue_script_module(
			$this->view_script_module_handle,
			plugins_url( '/build/core-tabs/view.js', PRC_BLOCK_LIBRARY_FILE ),
			$this->view_script_module_deps,
			$this->view_script_module_ver
		);

		$context = $instance->context ?? array();
		$tabs_id = $context['core/tabs-id'] ?? false;

		// Handle mobile dropdown functionality.
		$attributes            = $block['attrs'] ?? array();
		$mobile_dropdown       = $attributes['mobileDropdown'] ?? false;
		$mobile_dropdown_width = $attributes['mobileDropdownWidth'] ?? 768;

		$tag_processor = new WP_HTML_Tag_Processor( $block_content );
		$tag_processor->next_tag( array( 'class_name' => 'wp-block-tabs-menu' ) );
		$tag_processor->set_attribute( 'data-wp-init--add-event-listeners', 'core/tabs::callbacks.addEventListeners' );

		wp_interactivity_state(
			'core/tabs',
			array(
				$tabs_id => array(
					'mobileDropdownEnabled' => $mobile_dropdown,
					'mobileDropdownActive'  => false, // Viewport width is less than mobileDropdownWidth.
					'mobileDropdownWidth'   => $mobile_dropdown_width,
					'dropdownOpen'          => false, // Dropdown is closed.
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
			$dropdown_markup = $this->build_mobile_dropdown_markup( $block, $instance, $tabs_id );

			// Using regex, add dropdown after the wp-block-tabs-menu div.
			$content = preg_replace(
				'/<div\s+[^>]*class="[^"]*\bwp-block-tabs-menu\b[^"]*"[^>]*>.*?<\/div>/is',
				'$0' . $dropdown_markup,
				(string) $content,
				1
			);
		}

		return is_string( $content ) ? $content : $tag_processor->get_updated_html();
	}

	/**
	 * Build the custom mobile dropdown markup with rendered tabs-menu-item blocks.
	 *
	 * @param array    $block    The parsed block.
	 * @param WP_Block $instance The WP_Block instance.
	 * @param string   $tabs_id  The tabs ID.
	 * @return string The dropdown HTML markup.
	 */
	private function build_mobile_dropdown_markup( $block, $instance, $tabs_id ) {
		$context   = $instance->context ?? array();
		$tabs_list = $context['core/tabs-list'] ?? array();

		if ( empty( $tabs_list ) ) {
			return '';
		}

		// Get the first inner block as template (tabs-menu-item).
		$inner_blocks = $block['innerBlocks'] ?? array();
		if ( empty( $inner_blocks ) ) {
			return '';
		}
		$template_block = $inner_blocks[0];

		// Build rendered dropdown items from the tabs-menu-item template.
		$dropdown_items_markup = '';
		foreach ( $tabs_list as $index => $tab ) {
			// Create context for this specific tab.
			$tab_context = array_merge(
				$context,
				array(
					'core/tabs-menu-item-index' => $index,
					'core/tabs-menu-item-id'    => $tab['id'] ?? '',
					'core/tabs-menu-item-label' => $tab['label'] ?? '',
				)
			);

			// Create new WP_Block instance with template and context.
			$tab_block = new WP_Block( $template_block, $tab_context );

			// Render the block and wrap in dropdown item container with click handler to close dropdown.
			$rendered_item          = $tab_block->render();
			$dropdown_items_markup .= '<li class="wp-block-tabs-menu__dropdown-item" role="option" data-wp-on--click="core/tabs::callbacks.handleDropdownItemClick">' . $rendered_item . '</li>';
		}

		// Get the active tab index for initial trigger display.
		$active_tab_index = $context['core/tabs-activeTabIndex'] ?? 0;

		// Render the active tab's menu item to get the full content (with flags, etc.) for SSR.
		$active_tab_context = array_merge(
			$context,
			array(
				'core/tabs-menu-item-index' => $active_tab_index,
				'core/tabs-menu-item-id'    => $tabs_list[ $active_tab_index ]['id'] ?? '',
				'core/tabs-menu-item-label' => $tabs_list[ $active_tab_index ]['label'] ?? '',
			)
		);
		$active_tab_block   = new WP_Block( $template_block, $active_tab_context );
		$rendered_active    = $active_tab_block->render();

		// Extract innerHTML from <a>...</a> to get just the inner content (flags + label spans).
		$trigger_content = '';
		if ( preg_match( '/<a[^>]*>(.*?)<\/a>/s', $rendered_active, $matches ) ) {
			$trigger_content = $matches[1];
		} else {
			// Fallback to escaped label if regex fails.
			$trigger_content = '<span>' . esc_html( html_entity_decode( $tabs_list[ $active_tab_index ]['label'] ?? 'Select a tab' ) ) . '</span>';
		}

		// Build the complete dropdown markup.
		// Use data-wp-watch to update trigger label when activeTabIndex changes.
		$dropdown_markup = sprintf(
			'<div class="wp-block-tabs-menu__dropdown" data-wp-class--is-open="core/tabs::state.isDropdownOpen" data-wp-bind--hidden="core/tabs::state.displayDropdown" data-wp-on-document--click="core/tabs::callbacks.handleClickOutside">
				<button type="button" class="wp-block-tabs-menu__dropdown-trigger" aria-haspopup="listbox" data-wp-on--click="core/tabs::actions.toggleDropdown">
					<span class="wp-block-tabs-menu__dropdown-trigger-label" data-wp-watch="core/tabs::callbacks.updateTriggerLabel">%2$s</span>
					<span class="wp-block-tabs-menu__dropdown-trigger-icon" aria-hidden="true"></span>
				</button>
				<ul class="wp-block-tabs-menu__dropdown-panel" role="listbox">
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
