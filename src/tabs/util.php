<?php
/**
 * Utility functions for working with tabs
 *
 * @package prc-block-library
 */

namespace PRC\Platform\Blocks;

use WP_Block_Parser_Block, WP_Block;

/**
 * Generate a new tab
 *
 * @param string $label The label of the tab.
 * @param string $content The content of the tab.
 * @param int    $index The index of the tab.
 * @return WP_Block_Parser_Block The tab block
 */
function generate_tab( $label, $content, $index = 0 ) {
	$parsed_content   = is_array( $content ) ? $content : parse_blocks( $content );
	$inner_html_start = wp_sprintf(
		'<section id="%s" class="wp-block-prc-block-tab">',
		sanitize_title( $label )
	);
	$inner_html_end   = '</section>';
	$inner_html       = $inner_html_start . $inner_html_end;
	$nulls            = count( $parsed_content );
	// https://prc-platform.vipdev.lndo.site/pewresearch-org/religious-landscape-study/age-distribution/18-29/?activeChartId=76c7ee9e4967f189010073e95bce97a5&dialogId=a3c4125554ca8d51ba71a2ab5036e0c7
	$tab_block = new WP_Block_Parser_Block(
		'prc-block/tab',
		array(
			'label'    => $label,
			'slug'     => sanitize_title( str_replace( '&', 'and', $label ) ),
			'tabIndex' => $index,
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
 * Create a new set of tabs
 *
 * @param array $tabs An array of tabs to create.
 * @return array An array of blocks representing the tabs
 */
function create_tabs( $tabs = array(), $attributes = array() ) {
	$inner_html    = '';
	$inner_content = array();
	$inner_blocks  = array();
	$tab_index     = 0;

	foreach ( $tabs as $tab ) {
		$new_tab = generate_tab( $tab['label'], $tab['content'], $tab_index );
		do_action( 'qm/lap', 'prc-block/tabs::create_tabs' );
		$inner_html     .= $new_tab->innerHTML; // phpcs:ignore WordPress.NamingConventions.ValidVariableName
		$new_tab         = (array) $new_tab;
		$inner_blocks[]  = $new_tab;
		$inner_content[] = null;
		++$tab_index;
	}

	$tabs = new WP_Block_Parser_Block(
		'prc-block/tabs',
		$attributes,
		$inner_blocks,
		'',
		$inner_content
	);

	return $tabs;
}

/**
 * Render a set of tabs
 *
 * @param array $tabs An array of tabs to render.
 * @return string The rendered tabs
 */
function render_tabs( $tabs = array(), $attributes = array() ) {
	$tabs = create_tabs( $tabs, $attributes );
	return (
		new WP_Block(
			(array) $tabs,
			array()
		)
	)->render();
}
