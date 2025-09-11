<?php
/**
 * Utility functions for working with PRC Tabs block.
 *
 * @package prc-block-library
 */

declare(strict_types=1);

namespace PRC\Platform\Blocks;

use WP_Block_Parser_Block;
use WP_Block;

/**
 * Generate a new tab block.
 *
 * @param string       $label   The label of the tab.
 * @param string|array $content The content of the tab, either as a string or pre-parsed blocks.
 */
function generate_tab( string $label, string|array $content = '' ): WP_Block_Parser_Block { // phpcs:ignore Universal.Functions.ForbiddenFunctions.parse_blocksFound
	$parsed_content   = is_array( $content ) ? $content : parse_blocks( $content );
	$inner_html_start = wp_sprintf(
		'<section id="%s" class="wp-block-prc-block-tab">',
		sanitize_title( $label )
	);
	$inner_html_end   = '</section>';
	$inner_html       = $inner_html_start . $inner_html_end;
	$nulls            = count( $parsed_content );
	// Link example retained for reference.
	$tab_block = new WP_Block_Parser_Block(
		'prc-block/tab',
		array(
			'label' => $label,
		),
		$parsed_content,
		$inner_html,
		array_merge(
			array( $inner_html_start ),
			array_fill( 0, $nulls, null ),
			array( $inner_html_end )
		)
	);
	return $tab_block;
}

/**
 * Create a new set of tabs.
 *
 * @param array $tabs       An array of tabs to create. Each item should be an
 *                          associative array with 'label' and 'content' keys.
 * @param array $attributes Attributes for the wrapper `prc-block/tabs` block.
 */
function create_tabs( array $tabs = array(), array $attributes = array() ): WP_Block_Parser_Block {
	$inner_content = array();
	$inner_blocks  = array();
	$tab_index     = 0;

	// Build inner blocks for each tab.
	foreach ( $tabs as $tab ) {
		$label           = isset( $tab['label'] ) ? (string) $tab['label'] : '';
		$content         = $tab['content'] ?? '';
		$new_tab         = generate_tab( $label, $content );
		$new_tab_array   = (array) $new_tab;
		$inner_blocks[]  = $new_tab_array;
		$inner_content[] = null;
		++$tab_index;
	}

	// Match save.js structure: wrapper div, title, and empty ul placeholder.
	$title         = 'Tab Contents';
	$wrapper_start = wp_sprintf( '<div class="wp-block-prc-block-tabs %s"><h3 class="tabs__title">%s</h3><ul class="tabs__list"></ul>', esc_attr( $attributes['className'] ?? '' ), esc_html( $title ) );
	$wrapper_end   = '</div>';
	$tabs_block    = new WP_Block_Parser_Block(
		'prc-block/tabs',
		$attributes,
		$inner_blocks,
		$wrapper_start . $wrapper_end,
		array_merge( array( $wrapper_start ), $inner_content, array( $wrapper_end ) )
	);

	return $tabs_block;
}

/**
 * Render a set of tabs.
 *
 * @param array $tabs       An array of tabs to render. Each item should be an
 *                          associative array with 'label' and 'content' keys.
 * @param array $attributes Attributes for the wrapper `prc-block/tabs` block.
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
	array $attributes = array()
): string {
	$tabs_block = create_tabs( $tabs, $attributes );
	return (
		new WP_Block(
			(array) $tabs_block,
			array()
		)
	)->render();
}
