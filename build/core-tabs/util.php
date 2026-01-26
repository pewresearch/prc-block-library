<?php
/**
 * Utility functions for working with Core Tabs block.
 *
 * @package prc-block-library
 */

declare(strict_types=1);

namespace PRC\Platform\Blocks;

use WP_Block;
use WP_HTML_Tag_Processor;

/**
 * Generate a core/tab block.
 *
 * @param string       $label   The label of the tab.
 * @param string|array $content The content of the tab, either as a string or pre-parsed blocks.
 * @param string       $anchor  Optional anchor/ID for the tab.
 * @return array The core/tab parsed block structure.
 */
function generate_core_tab( string $label, string|array $content = '', string $anchor = '' ): array {
	$parsed_content = is_array( $content ) ? $content : parse_blocks( $content ); // phpcs:ignore Universal.Functions.ForbiddenFunctions.parse_blocksFound

	// Generate tab ID from anchor or label.
	$tab_id = ! empty( $anchor ) ? $anchor : sanitize_title( $label );

	$attrs = array(
		'label' => $label,
	);
	if ( ! empty( $anchor ) ) {
		$attrs['anchor'] = $anchor;
	}

	// Build innerHTML and innerContent for core/tab.
	$inner_html_start = '<section class="wp-block-tab" id="' . esc_attr( $tab_id ) . '">';
	$inner_html_end   = '</section>';

	$inner_content = array( $inner_html_start );
	foreach ( $parsed_content as $block ) {
		$inner_content[] = null; // Placeholder for each inner block.
	}
	$inner_content[] = $inner_html_end;

	return array(
		'blockName'    => 'core/tab',
		'attrs'        => $attrs,
		'innerBlocks'  => $parsed_content,
		'innerHTML'    => $inner_html_start . $inner_html_end,
		'innerContent' => $inner_content,
	);
}

/**
 * Build a core/tab-panels block containing core/tab children.
 *
 * @param array  $core_tab_blocks Array of core/tab parsed blocks.
 * @param array  $attrs           Optional attributes for the tab-panels block.
 *                                The 'className' attribute will be included in the generated HTML.
 * @param string $wrapper_html    Optional custom HTML for the wrapper element.
 *                                If provided, should be the opening tag with classes/styles.
 *                                If empty, a default wrapper will be used.
 * @return array The core/tab-panels parsed block structure.
 */
function build_core_tab_panels( array $core_tab_blocks, array $attrs = array(), string $wrapper_html = '' ): array {
	// Extract opening tag from wrapper HTML or use default.
	$base_class    = 'wp-block-tab-panels';
	$custom_class  = ! empty( $attrs['className'] ) ? ' ' . $attrs['className'] : '';
	$opening_tag   = '<div class="' . esc_attr( $base_class . $custom_class ) . '">';
	$closing_tag   = '</div>';

	if ( ! empty( $wrapper_html ) ) {
		// Use WP_HTML_Tag_Processor to extract the opening div with its attributes.
		$tag_processor = new WP_HTML_Tag_Processor( $wrapper_html );
		if ( $tag_processor->next_tag( array( 'class_name' => 'wp-block-tab-panels' ) ) ) {
			$wrapper_class = $tag_processor->get_attribute( 'class' ) ?? 'wp-block-tab-panels';
			$wrapper_style = $tag_processor->get_attribute( 'style' ) ?? '';

			// Merge wrapper classes with any className from attrs.
			$merged_class = $wrapper_class . $custom_class;

			$opening_tag = '<div class="' . esc_attr( $merged_class ) . '"';
			if ( ! empty( $wrapper_style ) ) {
				$opening_tag .= ' style="' . esc_attr( $wrapper_style ) . '"';
			}
			$opening_tag .= '>';
		}
	}

	$inner_content = array( $opening_tag );
	foreach ( $core_tab_blocks as $tab ) {
		$inner_content[] = null; // Placeholder for each tab.
	}
	$inner_content[] = $closing_tag;

	return array(
		'blockName'    => 'core/tab-panels',
		'attrs'        => $attrs,
		'innerBlocks'  => $core_tab_blocks,
		'innerHTML'    => $opening_tag . $closing_tag,
		'innerContent' => $inner_content,
	);
}

/**
 * Build a core/tabs-menu-item block.
 *
 * This block serves as the template for styling all tab buttons in the tabs-menu.
 *
 * @param array  $attrs      Optional attributes for the tabs-menu-item block.
 *                           Supports color, typography, spacing, border, and shadow attributes.
 *                           The 'className' attribute will be included in the generated HTML.
 * @param string $inner_html Optional custom innerHTML for the tabs-menu-item.
 *                           If provided, should include serialized block support styles.
 *                           If empty, a default template will be used.
 * @return array The core/tabs-menu-item parsed block structure.
 */
function build_core_tabs_menu_item( array $attrs = array(), string $inner_html = '' ): array {
	// Use provided innerHTML or generate default with className support.
	if ( empty( $inner_html ) ) {
		$base_class   = 'wp-block-tabs-menu-item wp-block-tabs-menu-item__template';
		$custom_class = ! empty( $attrs['className'] ) ? ' ' . $attrs['className'] : '';
		$inner_html   = '<a class="' . esc_attr( $base_class . $custom_class ) . '" hidden></a>';
	}

	return array(
		'blockName'    => 'core/tabs-menu-item',
		'attrs'        => $attrs,
		'innerBlocks'  => array(),
		'innerHTML'    => $inner_html,
		'innerContent' => array( $inner_html ),
	);
}

/**
 * Build a core/tabs-menu block.
 *
 * @param array  $attrs                       Optional attributes for the tabs-menu.
 *                                            The 'className' attribute will be included in the generated HTML.
 * @param bool   $is_vertical                 Whether the tabs menu is vertical.
 * @param array  $tabs_menu_item_attrs        Optional attributes for the tabs-menu-item inner block.
 *                                            Supports color, typography, spacing, border, and shadow.
 * @param string $tabs_menu_item_inner_html   Optional custom innerHTML for the tabs-menu-item.
 *                                            If provided, should include serialized block support styles.
 * @return array The core/tabs-menu parsed block structure.
 */
function build_core_tabs_menu( array $attrs = array(), bool $is_vertical = false, array $tabs_menu_item_attrs = array(), string $tabs_menu_item_inner_html = '' ): array {
	$orientation_class = $is_vertical ? ' is-vertical' : '';
	$custom_class      = ! empty( $attrs['className'] ) ? ' ' . $attrs['className'] : '';

	// Build tabs-menu-item inner block
	$tabs_menu_item = build_core_tabs_menu_item( $tabs_menu_item_attrs, $tabs_menu_item_inner_html );

	$opening_tag = '<div class="wp-block-tabs-menu tabs__list' . esc_attr( $orientation_class . $custom_class ) . '" role="tablist">';
	$closing_tag = '</div>';

	return array(
		'blockName'    => 'core/tabs-menu',
		'attrs'        => $attrs,
		'innerBlocks'  => array( $tabs_menu_item ),
		'innerHTML'    => $opening_tag . $closing_tag,
		'innerContent' => array(
			$opening_tag,
			null, // tabs-menu-item placeholder
			$closing_tag,
		),
	);
}

/**
 * Generate the tabs list context from core/tab blocks.
 *
 * @param array $core_tab_blocks Array of core/tab parsed blocks.
 * @return array The tabs list for context.
 */
function generate_tabs_list( array $core_tab_blocks ): array {
	$tabs_list = array();
	$tab_index = 0;

	foreach ( $core_tab_blocks as $tab_block ) {
		if ( 'core/tab' !== ( $tab_block['blockName'] ?? '' ) ) {
			continue;
		}

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

	return $tabs_list;
}

/**
 * Create a new set of core/tabs.
 *
 * @param array  $tabs                         An array of tabs to create. Each item should be an
 *                                             associative array with 'label' and 'content' keys.
 *                                             Optionally include 'anchor' for a custom tab ID.
 * @param array  $attrs                        Attributes for the wrapper `core/tabs` block.
 * @param array  $tabs_menu_attributes         Optional attributes for the `core/tabs-menu` block.
 * @param array  $tab_panels_attributes        Optional attributes for the `core/tab-panels` block.
 * @param array  $tabs_menu_item_attrs         Optional attributes for the `core/tabs-menu-item` block.
 *                                             Supports color, typography, spacing, border, and shadow.
 * @param string $tabs_menu_item_inner_html    Optional custom innerHTML for the tabs-menu-item.
 *                                             If provided, should include serialized block support styles.
 * @param string $tab_panels_inner_html        Optional custom innerHTML for the tab-panels wrapper.
 * @return array The core/tabs parsed block structure.
 */
function create_core_tabs(
	array $tabs = array(),
	array $attrs = array(),
	array $tabs_menu_attributes = array(),
	array $tab_panels_attributes = array(),
	array $tabs_menu_item_attrs = array(),
	string $tabs_menu_item_inner_html = '',
	string $tab_panels_inner_html = ''
): array {
	$core_tab_blocks = array();

	// Build core/tab blocks for each tab.
	foreach ( $tabs as $tab ) {
		$label   = isset( $tab['label'] ) ? (string) $tab['label'] : '';
		$content = $tab['content'] ?? '';
		$anchor  = $tab['anchor'] ?? '';

		$core_tab_blocks[] = generate_core_tab( $label, $content, $anchor );
	}

	// Determine orientation.
	$is_vertical = 'vertical' === ( $attrs['orientation'] ?? 'horizontal' );

	// Build tabs-menu attributes, merging with provided attributes.
	$tabs_menu_attrs = $tabs_menu_attributes;
	if ( $is_vertical && ! isset( $tabs_menu_attrs['layout'] ) ) {
		$tabs_menu_attrs['layout'] = array(
			'type'        => 'flex',
			'flexWrap'    => 'nowrap',
			'orientation' => 'vertical',
		);
	}

	$tabs_menu  = build_core_tabs_menu( $tabs_menu_attrs, $is_vertical, $tabs_menu_item_attrs, $tabs_menu_item_inner_html );
	$tab_panels = build_core_tab_panels( $core_tab_blocks, $tab_panels_attributes, $tab_panels_inner_html );

	// Build core/tabs attributes.
	$core_tabs_attrs = array(
		'tabsId'         => $attrs['tabsId'] ?? '',
		'activeTabIndex' => $attrs['activeTabIndex'] ?? 0,
	);
	if ( ! empty( $attrs['metadata'] ) ) {
		$core_tabs_attrs['metadata'] = $attrs['metadata'];
	}
	if ( ! empty( $attrs['style'] ) ) {
		$core_tabs_attrs['style'] = $attrs['style'];
	}
	if ( ! empty( $attrs['align'] ) ) {
		$core_tabs_attrs['align'] = $attrs['align'];
	}
	if ( ! empty( $attrs['className'] ) ) {
		$core_tabs_attrs['className'] = $attrs['className'];
	}

	// Build opening tag with className support.
	$base_class   = 'wp-block-tabs';
	$custom_class = ! empty( $attrs['className'] ) ? ' ' . $attrs['className'] : '';
	$opening_tag  = '<div class="' . esc_attr( $base_class . $custom_class ) . '">';
	$closing_tag  = '</div>';

	return array(
		'blockName'    => 'core/tabs',
		'attrs'        => $core_tabs_attrs,
		'innerBlocks'  => array( $tabs_menu, $tab_panels ),
		'innerHTML'    => $opening_tag . $closing_tag,
		'innerContent' => array(
			$opening_tag,
			null, // tabs-menu placeholder
			null, // tab-panels placeholder
			$closing_tag,
		),
	);
}

/**
 * Render a set of core/tabs.
 *
 * @param array  $tabs                         An array of tabs to render. Each item should be an
 *                                             associative array with 'label' and 'content' keys.
 *                                             Optionally include 'anchor' for a custom tab ID.
 * @param array  $tabs_attributes              Attributes for the wrapper `core/tabs` block.
 * @param array  $tabs_menu_attributes         Optional attributes for the `core/tabs-menu` block.
 * @param array  $tab_panels_attributes        Optional attributes for the `core/tab-panels` block.
 * @param array  $tabs_menu_item_attrs         Optional attributes for the `core/tabs-menu-item` block.
 *                                             Supports color, typography, spacing, border, and shadow.
 * @param string $tabs_menu_item_inner_html    Optional custom innerHTML for the tabs-menu-item.
 *                                             If provided, should include serialized block support styles.
 * @param string $tab_panels_inner_html        Optional custom innerHTML for the tab-panels wrapper element.
 * @return string The rendered HTML.
 */
function render_tabs(
	array $tabs = array(
		array(
			'label'   => 'Tab 1',
			'content' => 'Tab 1 content...',
		),
		array(
			'label'   => 'Tab 2',
			'content' => 'Tab 2 content...',
		),
	),
	array $tabs_attributes = array(),
	array $tabs_menu_attributes = array(),
	array $tab_panels_attributes = array(),
	array $tabs_menu_item_attrs = array(),
	string $tabs_menu_item_inner_html = '',
	string $tab_panels_inner_html = ''
): string {
	$tabs_block      = create_core_tabs( $tabs, $tabs_attributes, $tabs_menu_attributes, $tab_panels_attributes, $tabs_menu_item_attrs, $tabs_menu_item_inner_html, $tab_panels_inner_html );
	$core_tab_blocks = $tabs_block['innerBlocks'][1]['innerBlocks'] ?? array();

	// Generate the tabs list context for core/tabs-menu.
	$tabs_list = generate_tabs_list( $core_tab_blocks );

	$context = array(
		'core/tabs-list' => $tabs_list,
		'core/tabs-id'   => wp_unique_id( 'tabs_' ),
	);

	return ( new WP_Block( $tabs_block, $context ) )->render();
}
