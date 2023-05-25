<?php
/**
 * Block Name:
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class CoreImage extends PRC_Block_Library {

	/**
	 * Register a core block variant.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public static $block_name = "core/image";
	public static $block_json = null;
	public static $editor_script = null;
	public static $view_style_handle = null;

	public function __construct($init = false) {
		if ( true === $init ) {
			$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/core-image/build/block.json';
			self::$block_json = wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
			self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );

			add_action( 'init', array($this, 'init_assets') );
			add_action( 'admin_enqueue_scripts', array( $this, 'register_admin_assets' ) );
			add_action( 'wp_enqueue_scripts', array( $this, 'register_assets' ) );
		}
	}

	public function init_assets() {
		self::$editor_script = register_block_script_handle( self::$block_json, 'editorScript' );
		self::$view_style_handle = register_block_style_handle( self::$block_json, 'style' );
	}

	public function register_assets() {
		wp_deregister_style( 'wp-block-image' );
		global $wp_styles;
		$style = $wp_styles->registered[ self::$view_style_handle ];
		$src = $style->src;
		wp_register_style( 'wp-block-image', $src,  array(), self::$version );
	}

	public function register_admin_assets() {
		$this->register_assets();
		wp_enqueue_script( self::$editor_script );
	}
}

new CoreImage(true);
