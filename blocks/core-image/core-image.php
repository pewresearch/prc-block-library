<?php
namespace PRC\Platform\Blocks;
use WP_HTML_Tag_Processor;
/**
 * Block Name:
 * Version:           0.1.0
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Core_Image {
	public static $block_json = null;
	public static $version;
	public static $block_name = 'core/image';
	public static $view_script_handle = null;
	public static $editor_script_handle = null;
	public static $style_handle = null;

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/core-image/build/block.json';
		self::$block_json = \wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		self::$version = self::$block_json['version'];
		$this->init($loader);
	}

	public function init($loader = null) {
		$loader->add_action('init', $this, 'register_assets');
		$loader->add_action('enqueue_block_editor_assets', $this, 'register_editor_script');
		$loader->add_action('enqueue_block_assets', $this, 'register_style');
	}

	/**
	 * @hook init
	 */
	public function register_assets() {
		self::$editor_script_handle = register_block_script_handle( self::$block_json, 'editorScript' );
		self::$style_handle = register_block_style_handle( self::$block_json, 'style' );
	}

	/**
	 * Here we're hijacking the core/image block's style and providing our own.
	 * @hook enqueue_block_assets
	 */
	public function register_style() {
		wp_deregister_style( 'wp-block-image' );
		global $wp_styles;
		$style = $wp_styles->registered[ self::$style_handle ];
		$src = $style->src;
		wp_register_style( 'wp-block-image', $src,  array(), PRC_BLOCK_LIBRARY_VERSION );
	}

	/**
	 * @hook enqueue_block_editor_assets
	 */
	public function register_editor_script() {
		wp_enqueue_script( self::$editor_script_handle );
	}
}

