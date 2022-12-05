<?php
/**
 * Block Name:        Core Separator
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class CoreSeparator extends PRC_Block_Library {

	public static $block_name = "core/separator";
	public static $block_json = null;
	public static $style_handle = null;

	public function __construct($init = false) {
		if ( true === $init ) {
			$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/core-separator/build/block.json';
			self::$block_json = wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
			self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );

			add_action( 'init', array($this, 'init_assets') );
			add_action( 'enqueue_block_editor_assets', array($this, 'register_editor_assets') );
			add_filter( 'render_block', array( $this, 'render' ), 10, 2 );
		}
	}

	public function init_assets() {
		self::$style_handle = register_block_style_handle( self::$block_json, 'style' );
	}


	public function register_editor_assets() {
		wp_enqueue_script( self::$style_handle );
	}

	/**
	* Render the "core/separator" block
	* @param string $block_content
	* @param mixed $block
	* @return mixed
	*/
	public function render( $block_content, $block ) {
		if ( self::$block_name !== $block['blockName'] || is_admin() ) {
			return $block_content;
		}

		wp_enqueue_style( self::$style_handle );

		return $block_content;
	}

}

new CoreSeparator(true);
