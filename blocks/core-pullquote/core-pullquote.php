<?php
/**
 * Block Name:        Core Pullquote
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */

class CorePullquote extends PRC_Block_Library {

	public static $block_name = "core/pullquote";
	public static $block_json = null;
	public static $style_handle = null;

	public function __construct($init = false) {
		if ( true === $init ) {
			$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/core-pullquote/build/block.json';
			self::$block_json = wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
			self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );

			add_action( 'init', array($this, 'init_assets') );
			add_action( 'admin_enqueue_scripts', array( $this, 'register_assets' ), 0 );
			add_action( 'wp_enqueue_scripts', array( $this, 'register_assets' ) );
		}
	}

	public function init_assets() {
		self::$style_handle = register_block_style_handle( self::$block_json, 'style' );
	}

	public function register_assets() {
		wp_deregister_style( 'wp-block-pullquote' );
		global $wp_styles;
		$style = $wp_styles->registered[ self::$style_handle ];
		$src = $style->src;
		wp_register_style( 'wp-block-pullquote', $src,  array(), self::$version );
	}

}

new CorePullquote(true);
