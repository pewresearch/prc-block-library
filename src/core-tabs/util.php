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
 * Build a core/tab-list block with tabs attribute and button HTML.
 *
 * @param array  $attrs         Optional attributes for the tab-list block (including tabs).
 * @param bool   $is_vertical   Whether the tab list is vertical.
 * @param array  $labels        Tab labels in panel order.
 * @param string $wrapper_html  Optional saved innerHTML for the tab-list wrapper.
 * @return array The core/tab-list parsed block structure.
 */
function build_core_tab_list( array $attrs = array(), bool $is_vertical = false, array $labels = array(), string $wrapper_html = '' ): array {
	$orientation_class = $is_vertical ? ' is-vertical' : '';
	$custom_class      = ! empty( $attrs['className'] ) ? ' ' . $attrs['className'] : '';

	$opening_tag = '<div class="wp-block-tab-list' . esc_attr( $orientation_class . $custom_class ) . '" role="tablist">';
	$closing_tag = '</div>';

	if ( ! empty( $wrapper_html ) ) {
		$tag_processor = new WP_HTML_Tag_Processor( $wrapper_html );
		if ( $tag_processor->next_tag( array( 'class_name' => 'wp-block-tab-list' ) ) ) {
			$wrapper_class = $tag_processor->get_attribute( 'class' ) ?? 'wp-block-tab-list';
			$wrapper_style = $tag_processor->get_attribute( 'style' ) ?? '';

			$opening_tag = '<div class="' . esc_attr( $wrapper_class ) . '"';
			if ( ! empty( $wrapper_style ) ) {
				$opening_tag .= ' style="' . esc_attr( $wrapper_style ) . '"';
			}
			$opening_tag .= ' role="tablist">';
		}
	}

	if ( $is_vertical && ! isset( $attrs['layout'] ) ) {
		$attrs['layout'] = array(
			'type'        => 'flex',
			'flexWrap'    => 'nowrap',
			'orientation' => 'vertical',
		);
	}

	if ( ! isset( $attrs['tabs'] ) ) {
		$attrs['tabs'] = array_map(
			static function ( $label ) {
				return array( 'label' => (string) $label );
			},
			$labels
		);
	}

	$buttons_html = '';
	foreach ( $labels as $label ) {
		$buttons_html .= '<button type="button" role="tab">' . esc_html( (string) $label ) . '</button>';
	}

	$full_inner_html = $opening_tag . $buttons_html . $closing_tag;

	return array(
		'blockName'    => 'core/tab-list',
		'attrs'        => $attrs,
		'innerBlocks'  => array(),
		'innerHTML'    => $full_inner_html,
		'innerContent' => array( $full_inner_html ),
	);
}

/**
 * Generate the tabs list context from core/tab-panel blocks (inside core/tab-panels).
 *
 * The shape MUST match core's `core/tabs-list` context, which Gutenberg 23.5
 * (WordPress/gutenberg#79337) changed to a flat array of tab-ID slug STRINGS
 * (see gutenberg_block_core_tabs_generate_tabs_list(), which returns
 * esc_attr( $tab_id ) values). Core's tab-list render callback consumes this as
 * `$tab_id = $tabs_list[ $tab_index ]` and builds `'tab__' . $tab_id` /
 * aria-controls from it — returning objects here yields broken `tab__Array` ids.
 *
 * @param array $tab_panel_blocks Array of core/tab-panel parsed blocks.
 * @return string[] The tab-ID strings for the core/tabs-list context.
 */
function generate_tabs_list( array $tab_panel_blocks ): array {
	$tabs_list = array();
	$tab_index = 0;

	foreach ( $tab_panel_blocks as $tab_block ) {
		if ( 'core/tab-panel' !== ( $tab_block['blockName'] ?? '' ) ) {
			continue;
		}

		$attrs = $tab_block['attrs'] ?? array();

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

		$tabs_list[] = esc_attr( $tab_id );
		++$tab_index;
	}

	return $tabs_list;
}

/**
 * Create a new set of core/tabs.
 *
 * @param array  $tabs                 Tab definitions (label, content, optional anchor).
 * @param array  $attrs                Attributes for the wrapper `core/tabs` block.
 * @param array  $tabs_menu_attributes Optional attributes for the `core/tab-list` block.
 * @param array  $tab_panel_attributes Optional attributes for the `core/tab-panels` block.
 * @param string $tab_panel_inner_html Optional custom innerHTML for the tab-panels wrapper.
 * @param string $tabs_menu_inner_html Optional saved innerHTML for the `core/tab-list` wrapper.
 * @param string $tabs_inner_html      Optional saved innerHTML for the outer `core/tabs` wrapper.
 * @return array The core/tabs parsed block structure.
 */
function create_core_tabs(
	array $tabs = array(),
	array $attrs = array(),
	array $tabs_menu_attributes = array(),
	array $tab_panel_attributes = array(),
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

	$labels = array();
	foreach ( $tab_panel_blocks as $panel_block ) {
		$tattrs   = $panel_block['attrs'] ?? array();
		$labels[] = $tattrs['label'] ?? '';
	}

	$is_vertical = 'vertical' === ( $attrs['orientation'] ?? 'horizontal' );

	$tab_list   = build_core_tab_list( $tabs_menu_attributes, $is_vertical, $labels, $tabs_menu_inner_html );
	$tab_panels = build_core_tab_panels( $tab_panel_blocks, $tab_panel_attributes, $tab_panel_inner_html );
	$core_attrs = array(
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
 * @param array  $tabs                 Tab definitions.
 * @param array  $tabs_attributes      Attributes for the wrapper `core/tabs` block.
 * @param array  $tabs_menu_attributes Optional attributes for the `core/tab-list` block.
 * @param array  $tab_panel_attributes Optional attributes for the `core/tab-panels` block.
 * @param string $tab_panel_inner_html Optional custom innerHTML for the tab-panels wrapper.
 * @param string $tabs_menu_inner_html Optional saved innerHTML for the `core/tab-list` wrapper.
 * @param string $tabs_inner_html      Optional saved innerHTML for the outer `core/tabs` wrapper.
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
	string $tab_panel_inner_html = '',
	string $tabs_menu_inner_html = '',
	string $tabs_inner_html = ''
): string {
	$tabs_block       = create_core_tabs( $tabs, $tabs_attributes, $tabs_menu_attributes, $tab_panel_attributes, $tab_panel_inner_html, $tabs_menu_inner_html, $tabs_inner_html );
	$tab_panels_block = $tabs_block['innerBlocks'][1] ?? array();
	$tab_panel_inner  = $tab_panels_block['innerBlocks'] ?? array();
	$tabs_list        = generate_tabs_list( $tab_panel_inner );

	$context = array(
		'core/tabs-list' => $tabs_list,
		'core/tabs-id'   => wp_unique_id( 'tabs_' ),
	);

	return ( new WP_Block( $tabs_block, $context ) )->render();
}
