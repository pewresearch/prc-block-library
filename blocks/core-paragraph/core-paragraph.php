<?php
namespace PRC\Platform\Blocks;

/**
 * Block Name:        Core Paragraph
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Core_Paragraph {
	public static $block_json = null;
	public static $version;
	public static $block_name = 'core/paragraph';
	public static $view_script_handle = null;
	public static $editor_script_handle = null;
	public static $style_handle = null;
	public static $styles = array(
		array(
			'name' => 'has-big-number',
			'label' => 'Big Number',
		)
	);

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/core-paragraph/build/block.json';
		self::$block_json = \wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		self::$version = self::$block_json['version'];
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action('init', $this, 'register_assets');
			$loader->add_action('enqueue_block_assets', $this, 'register_style');
			$loader->add_action('enqueue_block_editor_assets', $this, 'register_editor_script');
			$loader->add_filter('apple_news_initialize_components', $this, 'register_apple_news_callout_component', 10, 1);
			$loader->add_filter('render_block', $this, 'render', 100, 2);
		}
	}

	/**
	 * @hook init
	 * @return void
	 */
	public function register_assets() {
		self::$editor_script_handle = register_block_script_handle( self::$block_json, 'editorScript' );
		self::$style_handle    = register_block_style_handle( self::$block_json, 'style' );
		$this->register_new_styles();
	}

	/**
	 * @hook apple_news_initialize_components
	 * @param mixed $components
	 * @return void
	 */
	public function register_apple_news_callout_component($components) {
		// Register Callout
		if ( !array_key_exists('callout', $components) ) {
			$components['callout'] = '\\Apple_Exporter\\Components\\Core_Paragraph_Big_Number';
		}
		// @TODO: Register a "Alt Card" variation.
		return $components;
	}

	public function register_new_styles() {
		foreach( self::$styles as $style_args ) {
			register_block_style(
				self::$block_name,
				$style_args,
			);
		}
	}

	/**
	 * @hook enqueue_block_editor_assets
	 */
	public function register_editor_script() {
		wp_enqueue_script( self::$editor_script_handle );
	}

	/**
	 * @hook enqueue_block_assets
	 */
	public function register_style() {
		wp_enqueue_style( self::$style_handle );
	}

	/**
	* Render the "core/paragraph" block
	* @hook render_block
	* @param string $block_content
	* @param mixed $block
	* @return mixed
	*/
	public function render( $block_content, $block ) {
		if ( self::$block_name !== $block['blockName'] || is_admin() ) {
			return $block_content;
		}

		// wp_enqueue_style( self::$style_handle );

		return $block_content;
	}

}
