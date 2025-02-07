<?php
/**
 * Block Name:        Details (Collapsible)
 * Requires at least: 6.7
 * Requires PHP:      8.2
 * Author:            Pew Research Center
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use WP_HTML_Tag_Processor;

/**
 * Class that modifies the core/details block.
 */
class Core_Details {
	/**
	 * The block name.
	 *
	 * @var string
	 */
	public $block_name = 'core/details';
	/**
	 * The block manifest.
	 *
	 * @var array
	 */
	public $block_json;
	/**
	 * The editor script handle.
	 *
	 * @var string
	 */
	public $editor_style_handle;
	/**
	 * The editor script handle.
	 *
	 * @var string
	 */
	public $editor_script_handle;

	/**
	 * Constructor
	 *
	 * @param object $loader The loader object.
	 */
	public function __construct( $loader ) {
		$this->block_json = prc_block_library_manifest( 'core-details' );
		$this->init( $loader );
	}

	/**
	 * Initialize the block.
	 *
	 * @param object $loader The loader object.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'register_assets' );
			$loader->add_action( 'init', $this, 'register_styles' );
			$loader->add_action( 'enqueue_block_editor_assets', $this, 'register_editor_assets' );
		}
	}

	/**
	 * Register the block's assets.
	 *
	 * @hook init
	 */
	public function register_assets() {
		$this->editor_script_handle = register_block_script_handle( $this->block_json, 'editorScript' );
		$this->editor_style_handle  = register_block_style_handle( $this->block_json, 'editorStyle' );
	}

	/**
	 * Returns the CSS styles for adding the plus/minus icon to any defined style of the details block.
	 *
	 * @param string $style_name The style name.
	 * @return string The CSS styles.
	 */
	public static function get_new_icon_styles( $style_name ) {
		$open_icon  = \PRC\Platform\Icons\get_icon_as_data_uri( 'light', 'circle-plus', 'black' );
		$close_icon = \PRC\Platform\Icons\get_icon_as_data_uri( 'light', 'circle-minus', 'black' );
		return wp_sprintf( '.wp-block-details.is-style-%1$s > summary::-webkit-details-marker { display: none } .wp-block-details.is-style-%1$s > summary { font-weight: bold; display: flex; align-items: center; font-size: 1.125em; } .wp-block-details.is-style-%1$s > summary:after { content: ""; display: block; margin-left: 0.3em; width: 0.875em; height: 0.875em; background-image: url(%2$s); background-size: contain; background-repeat: no-repeat; } .wp-block-details.is-style-%1$s[open] > summary:after { background-image: url(%3$s); }', $style_name, $open_icon, $close_icon );
	}

	/**
	 * Register the block's style assets.
	 * This is for the front end.
	 *
	 * @hook init
	 */
	public function register_styles() {
		register_block_style(
			$this->block_name,
			array(
				'name'         => 'plus-icon',
				'label'        => 'Plus/Minus Icon',
				'inline_style' => '.wp-block-details.is-style-plus-icon > summary { font-weight: bold; } ' . self::get_new_icon_styles( 'plus-icon' ),
			)
		);

		register_block_style(
			$this->block_name,
			array(
				'name'         => 'pew-knight-co-branded',
				'label'        => 'Knight Co-Branded',
				'inline_style' => wp_sprintf( '.wp-block-details.is-style-pew-knight-co-branded > summary:before { display: flex; background-image: url(%s); width: 183px; height: 35px; content: ""; background-repeat: no-repeat; background-size: contain; background-position: center;} .wp-block-details.is-style-pew-knight-co-branded > summary:after { background-position: right; width: 100%% !important; } .wp-block-details.is-style-pew-knight-co-branded > summary { text-indent: -9999px; }', 'https://pewresearch.org/wp-content/plugins/prc-block-library/assets/pew-knight-logo.svg' ) . self::get_new_icon_styles( 'pew-knight-co-branded' ),
			)
		);
	}

	/**
	 * Filters the core/details block output to remove errant <a/> tags that may be
	 * added when copy/pasting from Word doc.
	 *
	 * @hook render_block
	 * @param string   $block_content The block content.
	 * @param array    $block         The block.
	 * @param WP_Block $block_obj   The block object.
	 * @return string The filtered block content.
	 */
	public function filter_details_output( $block_content, $block, $block_obj ) {
		if ( $this->block_name === $block['name'] ) {
			// If there are <a>...</a> tags like this with no properties whatsoever we need to remove the a tags but keep the text.
			$block_content = preg_replace( '/<a\s*>([^<]*)<\/a>/', '$1', $block_content );
		}
		return $block_content;
	}

	/**
	 * Register the block's editor assets.
	 *
	 * @hook enqueue_block_editor_assets
	 */
	public function register_editor_assets() {
		wp_enqueue_style( $this->editor_style_handle );
		wp_enqueue_script( $this->editor_script_handle );
	}
}
