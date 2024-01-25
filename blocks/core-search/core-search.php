<?php
namespace PRC\Platform\Blocks;
/**
 * Block Name:        Core Search
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Core_Search {
	public static $block_name = 'core/search';
	public static $block_json = null;
	public static $style_handle = null;

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/core-search/build/block.json';
		self::$block_json = wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action('init', $this, 'register_assets');
			$loader->add_action('enqueue_block_assets', $this, 'register_style');
			$loader->add_filter('render_block', $this, 'render', 100, 2);
		}
	}

	/**
	 * @hook init
	 * @return void
	 */
	public function register_assets() {
		self::$style_handle = register_block_style_handle(
			self::$block_json,
			'style'
		);
	}

	/**
	 * @hook enqueue_block_assets
	 * @return void
	 */
	public function register_style() {
		wp_enqueue_style( self::$style_handle );
	}

	/**
	* Render the core/search block
	* @hook render_block
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
