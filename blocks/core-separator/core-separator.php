<?php
namespace PRC\Platform\Blocks;
/**
 * Block Name:        Core Separator
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Core_Separator {
	public static $block_json = null;
	public static $version;
	public static $block_name = 'core/separator';
	public static $view_script_handle = null;
	public static $editor_script_handle = null;
	public static $style_handle = null;

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/core-separator/build/block.json';
		self::$block_json = \wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		self::$version = self::$block_json['version'];

	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action('init', $this, 'register_assets');
			$loader->add_action('enqueue_block_editor_assets', $this, 'register_editor_script');
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
	 * @hook enqueue_block_editor_assets
	 * @return void
	 */
	public function register_editor_script() {
		wp_enqueue_script( self::$style_handle );
	}

	public function register_style() {
		wp_enqueue_style( self::$style_handle );
	}

	/**
	* Render the "core/separator" block
	* @hook render_block
	* @param string $block_content
	* @param mixed $block
	* @return mixed
	*/
	public function render( $block_content, $block ) {
		if ( self::$block_name !== $block['blockName'] || is_admin() ) {
			return $block_content;
		}

		return $block_content;
	}

}

