<?php
namespace PRC\Platform\Blocks;

/**
 * Block Name:        Core Navigation
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Core_Navigation {

	public static $block_name = "core/navigation";
	public static $block_json = null;
	public static $editor_script_handle = null;
	public static $style_handle = null;

	public function __construct($init = false) {
		if ( true === $init ) {
			$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/core-navigation/build/block.json';
			self::$block_json = wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
			self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );

			add_action( 'init', array($this, 'init_assets') );
			add_action( 'wp_enqueue_scripts', array($this, 'enqueue_assets') );
			add_action( 'enqueue_block_editor_assets', array($this, 'enqueue_assets') );
		}
	}

	public function init_assets() {
		self::$style_handle = register_block_style_handle( self::$block_json, 'style' );
		self::$editor_script_handle = register_block_script_handle( self::$block_json, 'editorScript' );
	}

	public function enqueue_assets() {
		wp_enqueue_style( self::$style_handle );
		if ( is_admin() ) {
			wp_enqueue_script( self::$editor_script_handle );
		}
	}
}

new Core_Navigation(true);
