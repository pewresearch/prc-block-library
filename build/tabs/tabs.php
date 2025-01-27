<?php
namespace PRC\Platform\Blocks;

use WP_HTML_Tag_Processor, WP_Query;

/**
 * Block Name:        Tabs
 * Requires at least: 6.7
 * Requires PHP:      8.2
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */

class Tabs {

	/**
	 * Stores the tabs in memory for passage to block context later.
	 *
	 * @var array
	 */
	public $tabs = array();

	/**
	 * Constructor for the Tabs class.
	 *
	 * @param mixed $loader The loader instance to register hooks with.
	 */
	public function __construct( $loader ) {
		require_once PRC_BLOCK_LIBRARY_DIR . '/src/tabs/util.php';
		$this->init( $loader );
	}

	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
			$loader->add_filter( 'prc_platform_rewrite_query_vars', $this, 'register_active_tab_index_query_var' );
		}
	}

	/**
	 * @hook prc_platform_rewrite_query_vars
	 */
	public function register_active_tab_index_query_var( $query_vars ) {
		$query_vars[] = 'activeTabIndex';
		return $query_vars;
	}

	public function get_color_variables( $attributes ) {
		$tab_background = array_key_exists( 'customTabBackgroundColor', $attributes ) ? $attributes['customTabBackgroundColor'] : '';
		$tab_hover      = array_key_exists( 'customTabHoverColor', $attributes ) ? $attributes['customTabHoverColor'] : '';
		$tab_active     = array_key_exists( 'customTabActiveColor', $attributes ) ? $attributes['customTabActiveColor'] : '';
		$tab_text       = array_key_exists( 'customTabTextColor', $attributes ) ? $attributes['customTabTextColor'] : '';
		$hover_text     = array_key_exists( 'customTabHoverTextColor', $attributes ) ? $attributes['customTabHoverTextColor'] : '';
		$active_text    = array_key_exists( 'customTabActiveTextColor', $attributes ) ? $attributes['customTabActiveTextColor'] : '';

		$styles = array(
			'--custom-tab-background-color'  => $tab_background,
			'--custom-tab-hover-color'       => $tab_hover,
			'--custom-tab-active-color'      => $tab_active,
			'--custom-tab-text-color'        => $tab_text,
			'--custom-tab-hover-text-color'  => $hover_text,
			'--custom-tab-active-text-color' => $active_text,
		);

		$style_string = array_map(
			function ( $key, $value ) {
				return ! empty( $value ) ? $key . ': ' . $value . ';' : '';
			},
			array_keys( $styles ),
			$styles
		);
		$style_string = implode( ' ', array_filter( $style_string ) );

		return $style_string;
	}

	/**
	 * Render the block
	 *
	 * @param array    $attributes Block attributes.
	 * @param string   $content Block content.
	 * @param WP_Block $block WP_Block object.
	 * @return string
	 */
	public function render_block_callback( $attributes, $content, $block ) {
		$styles = $this->get_color_variables( $attributes );

		$url_encoded_active_tab_index = get_query_var( 'activeTabIndex', 0 );
		$url_encoded_active_tab_index = base64_decode( $url_encoded_active_tab_index );
		preg_match( '/__(\d+)$/', $url_encoded_active_tab_index, $matches );
		$active_tab_index = isset( $matches[1] ) ? (int) $matches[1] : 0;

		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'class'               => 'vertical' === $attributes['orientation'] ? 'is-orientation-vertical' : 'is-orientation-horizontal',
				'data-wp-interactive' => 'prc-block/tabs',
				'data-wp-context'     => wp_json_encode(
					array(
						'activeTabIndex' => $active_tab_index,
					)
				),
				'style'               => $styles,
			)
		);

		$innerblocks = $block->parsed_block['innerBlocks'];
		$tabs_list   = array_map(
			function ( $tab ) {
				$attrs = $tab['attrs'];
				return $attrs;
			},
			$innerblocks
		);
		$tabs_markup = '<ul class="prc-block-tabs__list" role="tablist">';
		foreach ( $tabs_list as $tab_index => $tab ) {
			$tab_slug     = $tab['slug'];
			$tab_label    = $tab['label'];
			$tabs_markup .= wp_sprintf( '<li class="prc-block-tabs__list-item"><a id="%1$s" class="prc-block-tabs__tab-label" href="%1$s" data-wp-on--click="actions.handleTabClick" data-tab-index="%2$s" data-wp-bind--aria-selected="state.isActiveTab" data-tab-hash="%4$s">%3$s</a></li>', $tab_slug, $tab_index, $tab_label, base64_encode( $tab_label . '__' . $tab_index ) );
		}
		$tabs_markup .= '</ul>';

		return wp_sprintf(
			'<div %1$s><h3 class="prc-block-tabs__title">%2$s</h3>%3$s%4$s</div>',
			$wrapper_attributes,
			'Contents',
			$tabs_markup,
			$content
		);
	}

	/**
	 * Registers the block using the block manifest (if registered). Fails over to the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @hook init
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/tabs',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}
