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
 * Generate a core/tab-panel block (tab content region; Gutenberg 23.1+ WCAG naming).
 *
 * @param string       $label   The label of the tab.
 * @param string|array $content The content of the tab, either as a string or pre-parsed blocks.
 * @param string       $anchor  Optional anchor/ID for the tab.
 * @return array The core/tab-panel parsed block structure.
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

	// Inner markup mirrors core/tab-panel save (section tabpanel).
	$inner_html_start = '<section role="tabpanel" class="wp-block-tab-panel" id="' . esc_attr( $tab_id ) . '">';
	$inner_html_end   = '</section>';

	$inner_content = array( $inner_html_start );
	foreach ( $parsed_content as $_block ) {
		$inner_content[] = null;
	}
	$inner_content[] = $inner_html_end;

	return array(
		'blockName'    => 'core/tab-panel',
		'attrs'        => $attrs,
		'innerBlocks'  => $parsed_content,
		'innerHTML'    => $inner_html_start . $inner_html_end,
		'innerContent' => $inner_content,
	);
}

/**
 * Build a core/tab-panels block wrapping core/tab-panel children.
 *
 * @param array  $tab_panel_blocks Parsed core/tab-panel blocks.
 * @param array  $attrs            Optional attributes for the tab-panels block.
 * @param string $wrapper_html     Optional custom HTML for the wrapper element.
 * @return array The core/tab-panels parsed block structure.
 */
function build_core_tab_panels( array $tab_panel_blocks, array $attrs = array(), string $wrapper_html = '' ): array {
	$base_class   = 'wp-block-tab-panels';
	$custom_class = ! empty( $attrs['className'] ) ? ' ' . $attrs['className'] : '';
	$opening_tag  = '<div class="' . esc_attr( trim( $base_class . $custom_class ) ) . '">';
	$closing_tag  = '</div>';

	if ( ! empty( $wrapper_html ) ) {
		$tag_processor = new WP_HTML_Tag_Processor( $wrapper_html );
		if ( $tag_processor->next_tag( array( 'class_name' => 'wp-block-tab-panels' ) ) ) {
			$wrapper_class = $tag_processor->get_attribute( 'class' ) ?? 'wp-block-tab-panels';
			$wrapper_style = $tag_processor->get_attribute( 'style' ) ?? '';

			$merged_class = $wrapper_class . $custom_class;

			$opening_tag = '<div class="' . esc_attr( $merged_class ) . '"';
			if ( ! empty( $wrapper_style ) ) {
				$opening_tag .= ' style="' . esc_attr( $wrapper_style ) . '"';
			}
			$opening_tag .= '>';
		}
	}

	$inner_content = array( $opening_tag );
	foreach ( $tab_panel_blocks as $_ ) {
		$inner_content[] = null;
	}
	$inner_content[] = $closing_tag;

	return array(
		'blockName'    => 'core/tab-panels',
		'attrs'        => $attrs,
		'innerBlocks'  => $tab_panel_blocks,
		'innerHTML'    => $opening_tag . $closing_tag,
		'innerContent' => $inner_content,
	);
}

/**
 * Build a core/tab block (tab button; Gutenberg 23.1+).
 *
 * @param string $menu_item_anchor Full anchor for pairing (e.g. tab-1-button).
 * @param array  $attrs            Optional attributes (block supports). Anchor in $attrs is overwritten.
 * @param string $inner_html       Optional saved button HTML; if empty, a minimal button is generated.
 * @return array The core/tab parsed block structure.
 */
function build_core_tab_button( string $menu_item_anchor, array $attrs = array(), string $inner_html = '' ): array {
	$attrs['anchor'] = $menu_item_anchor;

	if ( empty( $inner_html ) ) {
		$base_class   = 'wp-block-tab';
		$custom_class = ! empty( $attrs['className'] ) ? ' ' . $attrs['className'] : '';
		$inner_html   = '<button type="button" class="' . esc_attr( trim( $base_class . $custom_class ) ) . '" role="tab"></button>';
	}

	return array(
		'blockName'    => 'core/tab',
		'attrs'        => $attrs,
		'innerBlocks'  => array(),
		'innerHTML'    => $inner_html,
		'innerContent' => array( $inner_html ),
	);
}

/**
 * Build a core/tab-list block with one core/tab button per anchor.
 *
 * @param array  $attrs                     Optional attributes for the tab-list block.
 * @param bool   $is_vertical               Whether the tab list is vertical.
 * @param array  $menu_item_anchors        Anchor string per tab button (e.g. tab-1-button).
 * @param array  $tabs_menu_item_attrs     Shared styling attributes applied to each tab button.
 * @param string $tabs_menu_item_inner_html Optional shared innerHTML for each tab button.
 * @param string $wrapper_html              Optional saved innerHTML for the tab-list wrapper; preserves block-supports classes (layout, color, spacing, etc.) baked in by save.js.
 * @return array The core/tab-list parsed block structure.
 */
function build_core_tab_list( array $attrs = array(), bool $is_vertical = false, array $menu_item_anchors = array(), array $tabs_menu_item_attrs = array(), string $tabs_menu_item_inner_html = '', string $wrapper_html = '' ): array {
	$orientation_class = $is_vertical ? ' is-vertical' : '';
	$custom_class      = ! empty( $attrs['className'] ) ? ' ' . $attrs['className'] : '';

	// Matches core tabs frontend selector (see core/tabs render in Gutenberg).
	$opening_tag = '<div class="wp-block-tabs-list tabs__list' . esc_attr( $orientation_class . $custom_class ) . '" role="tablist">';
	$closing_tag = '</div>';

	// Prefer the saved wrapper markup when available so block-supports classes
	// (layout orientation, color, typography, spacing, etc.) authored in the
	// editor template carry over instead of being silently dropped.
	if ( ! empty( $wrapper_html ) ) {
		$tag_processor = new WP_HTML_Tag_Processor( $wrapper_html );
		if ( $tag_processor->next_tag( array( 'class_name' => 'wp-block-tabs-list' ) ) ) {
			$wrapper_class = $tag_processor->get_attribute( 'class' ) ?? 'wp-block-tabs-list tabs__list';
			$wrapper_style = $tag_processor->get_attribute( 'style' ) ?? '';

			$opening_tag = '<div class="' . esc_attr( $wrapper_class ) . '"';
			if ( ! empty( $wrapper_style ) ) {
				$opening_tag .= ' style="' . esc_attr( $wrapper_style ) . '"';
			}
			$opening_tag .= ' role="tablist">';
		}
	}

	$inner_blocks = array();
	foreach ( $menu_item_anchors as $anchor ) {
		$inner_blocks[] = build_core_tab_button( (string) $anchor, $tabs_menu_item_attrs, $tabs_menu_item_inner_html );
	}

	$inner_content = array( $opening_tag );
	foreach ( $inner_blocks as $_ ) {
		$inner_content[] = null;
	}
	$inner_content[] = $closing_tag;

	return array(
		'blockName'    => 'core/tab-list',
		'attrs'        => $attrs,
		'innerBlocks'  => $inner_blocks,
		'innerHTML'    => $opening_tag . $closing_tag,
		'innerContent' => $inner_content,
	);
}

/**
 * Generate the tabs list context from core/tab-panel blocks (inside core/tab-panels).
 *
 * @param array $tab_panel_blocks Array of core/tab-panel parsed blocks.
 * @return array The tabs list for context.
 */
function generate_tabs_list( array $tab_panel_blocks ): array {
	$tabs_list = array();
	$tab_index = 0;

	foreach ( $tab_panel_blocks as $tab_block ) {
		if ( 'core/tab-panel' !== ( $tab_block['blockName'] ?? '' ) ) {
			continue;
		}

		$attrs     = $tab_block['attrs'] ?? array();
		$tab_label = $attrs['label'] ?? '';

		$tab_id = $attrs['anchor'] ?? '';
		if ( empty( $tab_id ) && ! empty( $tab_block['innerHTML'] ) ) {
			$tag_processor = new WP_HTML_Tag_Processor( $tab_block['innerHTML'] );
			if ( $tag_processor->next_tag( array( 'class_name' => 'wp-block-tab-panel' ) ) ) {
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
 * @param array  $tabs                         Tab definitions (label, content, optional anchor).
 * @param array  $attrs                        Attributes for the wrapper `core/tabs` block.
 * @param array  $tabs_menu_attributes         Optional attributes for the `core/tab-list` block.
 * @param array  $tab_panel_attributes         Optional attributes for the `core/tab-panels` block.
 * @param array  $tabs_menu_item_attrs         Optional shared attributes for each `core/tab` button.
 * @param string $tabs_menu_item_inner_html    Optional shared innerHTML for each tab button.
 * @param string $tab_panel_inner_html         Optional custom innerHTML for the tab-panels wrapper.
 * @param string $tabs_menu_inner_html         Optional saved innerHTML for the `core/tab-list` wrapper.
 * @param string $tabs_inner_html              Optional saved innerHTML for the outer `core/tabs` wrapper.
 * @return array The core/tabs parsed block structure.
 */
function create_core_tabs(
	array $tabs = array(),
	array $attrs = array(),
	array $tabs_menu_attributes = array(),
	array $tab_panel_attributes = array(),
	array $tabs_menu_item_attrs = array(),
	string $tabs_menu_item_inner_html = '',
	string $tab_panel_inner_html = '',
	string $tabs_menu_inner_html = '',
	string $tabs_inner_html = ''
): array {
	$tab_panel_blocks = array();

	foreach ( $tabs as $tab ) {
		$label   = isset( $tab['label'] ) ? (string) $tab['label'] : '';
		$content = $tab['content'] ?? '';
		$anchor  = $tab['anchor'] ?? '';

		$tab_panel_blocks[] = generate_core_tab( $label, $content, $anchor );
	}

	// Menu item anchors: {tab_id}-button, aligned with each tab panel anchor.
	$menu_item_anchors = array();
	$tab_index           = 0;
	foreach ( $tab_panel_blocks as $panel_block ) {
		$tattrs = $panel_block['attrs'] ?? array();
		$tab_id = $tattrs['anchor'] ?? '';
		if ( empty( $tab_id ) && ! empty( $panel_block['innerHTML'] ) ) {
			$tag_processor = new WP_HTML_Tag_Processor( $panel_block['innerHTML'] );
			if ( $tag_processor->next_tag( array( 'class_name' => 'wp-block-tab-panel' ) ) ) {
				$tab_id = $tag_processor->get_attribute( 'id' ) ?? '';
			}
		}
		if ( empty( $tab_id ) ) {
			$tab_id = 'tab-' . $tab_index;
		}
		$menu_item_anchors[] = $tab_id . '-button';
		++$tab_index;
	}

	$is_vertical = 'vertical' === ( $attrs['orientation'] ?? 'horizontal' );

	$tabs_menu_attrs = $tabs_menu_attributes;
	if ( $is_vertical && ! isset( $tabs_menu_attrs['layout'] ) ) {
		$tabs_menu_attrs['layout'] = array(
			'type'        => 'flex',
			'flexWrap'    => 'nowrap',
			'orientation' => 'vertical',
		);
	}

	$tab_list    = build_core_tab_list( $tabs_menu_attrs, $is_vertical, $menu_item_anchors, $tabs_menu_item_attrs, $tabs_menu_item_inner_html, $tabs_menu_inner_html );
	$tab_panels  = build_core_tab_panels( $tab_panel_blocks, $tab_panel_attributes, $tab_panel_inner_html );
	$core_attrs  = array(
		'tabsId'         => $attrs['tabsId'] ?? '',
		'activeTabIndex' => $attrs['activeTabIndex'] ?? 0,
	);
	if ( ! empty( $attrs['metadata'] ) ) {
		$core_attrs['metadata'] = $attrs['metadata'];
	}
	if ( ! empty( $attrs['style'] ) ) {
		$core_attrs['style'] = $attrs['style'];
	}
	if ( ! empty( $attrs['align'] ) ) {
		$core_attrs['align'] = $attrs['align'];
	}
	if ( ! empty( $attrs['className'] ) ) {
		$core_attrs['className'] = $attrs['className'];
	}

	$base_class   = 'wp-block-tabs';
	$custom_class = ! empty( $attrs['className'] ) ? ' ' . $attrs['className'] : '';
	$opening_tag  = '<div class="' . esc_attr( trim( $base_class . $custom_class ) ) . '">';
	$closing_tag  = '</div>';

	// Prefer the saved wrapper markup when available so block-supports classes
	// (layout, color, spacing, etc.) authored on `core/tabs` in the editor
	// template carry over. core/tabs' render callback finds this wrapper by
	// the `wp-block-tabs` class and decorates it with IAPI directives.
	if ( ! empty( $tabs_inner_html ) ) {
		$tag_processor = new WP_HTML_Tag_Processor( $tabs_inner_html );
		if ( $tag_processor->next_tag( array( 'class_name' => 'wp-block-tabs' ) ) ) {
			$wrapper_class = $tag_processor->get_attribute( 'class' ) ?? 'wp-block-tabs';
			$wrapper_style = $tag_processor->get_attribute( 'style' ) ?? '';

			$opening_tag = '<div class="' . esc_attr( $wrapper_class ) . '"';
			if ( ! empty( $wrapper_style ) ) {
				$opening_tag .= ' style="' . esc_attr( $wrapper_style ) . '"';
			}
			$opening_tag .= '>';
		}
	}

	return array(
		'blockName'    => 'core/tabs',
		'attrs'        => $core_attrs,
		'innerBlocks'  => array( $tab_list, $tab_panels ),
		'innerHTML'    => $opening_tag . $closing_tag,
		'innerContent' => array(
			$opening_tag,
			null,
			null,
			$closing_tag,
		),
	);
}

/**
 * Render a set of core/tabs.
 *
 * @param array  $tabs                         Tab definitions.
 * @param array  $tabs_attributes              Attributes for the wrapper `core/tabs` block.
 * @param array  $tabs_menu_attributes         Optional attributes for the `core/tab-list` block.
 * @param array  $tab_panel_attributes         Optional attributes for the `core/tab-panels` block.
 * @param array  $tabs_menu_item_attrs         Optional attributes for each `core/tab` button.
 * @param string $tabs_menu_item_inner_html    Optional custom innerHTML for tab buttons.
 * @param string $tab_panel_inner_html         Optional custom innerHTML for the tab-panels wrapper.
 * @param string $tabs_menu_inner_html         Optional saved innerHTML for the `core/tab-list` wrapper.
 * @param string $tabs_inner_html              Optional saved innerHTML for the outer `core/tabs` wrapper.
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
	array $tab_panel_attributes = array(),
	array $tabs_menu_item_attrs = array(),
	string $tabs_menu_item_inner_html = '',
	string $tab_panel_inner_html = '',
	string $tabs_menu_inner_html = '',
	string $tabs_inner_html = ''
): string {
	$tabs_block       = create_core_tabs( $tabs, $tabs_attributes, $tabs_menu_attributes, $tab_panel_attributes, $tabs_menu_item_attrs, $tabs_menu_item_inner_html, $tab_panel_inner_html, $tabs_menu_inner_html, $tabs_inner_html );
	$tab_panels_block = $tabs_block['innerBlocks'][1] ?? array();
	$tab_panel_inner  = $tab_panels_block['innerBlocks'] ?? array();
	$tabs_list        = generate_tabs_list( $tab_panel_inner );

	$context = array(
		'core/tabs-list' => $tabs_list,
		'core/tabs-id'   => wp_unique_id( 'tabs_' ),
	);

	return ( new WP_Block( $tabs_block, $context ) )->render();
}
