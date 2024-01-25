<?php
namespace PRC\Platform\Blocks;
/**
 * Block Name:        Code Syntax
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */

class Code_Syntax {
	public static $block_json = null;
	public static $version;
	public static $block_name;
	public static $view_script_handle = null;
	public static $editor_script_handle = null;
	public static $style_handle = null;
	public static $dir = __DIR__;
	public static $monospace_font_src = 'https://use.typekit.net/lih4wwo.css';

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/code-syntax/build/block.json';
		self::$block_json = \wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		self::$version = self::$block_json['version'];
		self::$block_name = self::$block_json['name'];
	}
	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
			$loader->add_action( 'after_setup_theme', $this, 'register_typekit_editor_font' );
		}
	}

	/**
	* Registers the block using the metadata loaded from the `block.json` file.
	* Behind the scenes, it registers also all assets so they can be enqueued
	* through the block editor in the corresponding context.
	* @hook init
	*
	* @see https://developer.wordpress.org/reference/functions/register_block_type/
	*/
	public function block_init() {
		wp_register_style( 'prc-font-monospace', self::$monospace_font_src );
		register_block_type( self::$dir . '/build' );
	}

	/**
	 * @hook after_setup_theme
	 */
	public function register_typekit_editor_font() {
		add_editor_style(self::$monospace_font_src);
	}

	/**
	 * @hook enqueue_block_assets
	 * @return void
	 */
	public function register_typekit_view_font() {
		wp_enqueue_style( 'prc-font-monospace' );
	}
}

