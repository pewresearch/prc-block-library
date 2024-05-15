<?php
namespace PRC\Platform\Blocks;
/**
 * Block Name:        Core Pullquote
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */

class Core_Pullquote {
	public static $block_library_version;
	public static $active_theme;
	public static $block_json = null;
	public static $version;
	public static $block_name = 'core/pullquote';
	public static $view_script_handle = null;
	public static $editor_script_handle = null;
	public static $style_handle = null;

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/core-pullquote/build/block.json';
		self::$block_json = \wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		self::$version = self::$block_json['version'];
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action('init', $this, 'register_assets');
			$loader->add_action('enqueue_block_assets', $this, 'register_style');
		}
	}

	/**
	 * @hook init
	 * @return void
	 */
	public function register_assets() {
		self::$style_handle = register_block_style_handle( self::$block_json, 'style' );
	}

	/**
	 * @hook enqueue_block_assets
	 * @return void
	 */
	public function register_style() {
		wp_deregister_style( 'wp-block-pullquote' );
		global $wp_styles;
		$style = $wp_styles->registered[ self::$style_handle ];
		$src = $style->src;
		wp_register_style( 'wp-block-pullquote', $src,  array(), self::$version );
	}

}

