<?php
namespace PRC\Platform\Blocks;
use WP_HTML_Tag_Processor;
/**
 * Block Name:        Core List
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */

class Core_List {
	public static $block_json = null;
	public static $version;
	public static $block_name = 'core/list';
	public static $view_script_handle = null;
	public static $editor_script_handle = null;
	public static $style_handle = null;


	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/core-list/build/block.json';
		self::$block_json = \wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		self::$version = self::$block_json['version'];
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action('init', $this, 'register_assets');
			$loader->add_action('enqueue_block_assets', $this, 'register_style');
			$loader->add_action('enqueue_block_editor_assets', $this, 'register_editor_assets');
			$loader->add_filter('block_type_metadata', $this, 'add_attributes', 100, 1);
			$loader->add_filter('render_block', $this, 'render', 100, 2);
		}
	}

	/**
	 * @hook init
	 * @return void
	 */
	public function register_assets() {
		self::$style_handle = register_block_style_handle( self::$block_json, 'style' );
		self::$editor_script_handle = register_block_script_handle( self::$block_json, 'editorScript' );
	}

	public function register_editor_assets() {
		wp_enqueue_script( self::$editor_script_handle );
	}

	/**
	 * @hook enqueue_block_assets
	 */
	public function register_style() {
		wp_enqueue_style( self::$style_handle );
	}


	public function add_attributes( $metadata ) {
		if ( self::$block_name !== $metadata['name'] ) {
			return $metadata;
		}


		if ( array_key_exists( 'spacing', $metadata['supports'] ) ) {
			$metadata['supports']['spacing']['blockGap'] = true;
		}
		return $metadata;
	}

	/**
	* Render the "core/list" block
	* @hook render_block
	* @param string $block_content
	* @param mixed $block
	* @return mixed
	*/
	public function render( $block_content, $block ) {
		if ( self::$block_name !== $block['blockName'] || is_admin() ) {
			return $block_content;
		}

		if ( ! array_key_exists( 'attrs', $block ) ) {
			return $block_content;
		}

		$block_gap = \PRC\Platform\Block_Utils\get_block_gap_support_value($block['attrs'], 'vertical');

		$tag_processor = new WP_HTML_Tag_Processor($block_content);
		$html_tag = 'ul';

		if (array_key_exists( 'ordered', $block['attrs'] ) && true === $block['attrs']['ordered']) {
			$html_tag = 'ol';
		}
		$tag_processor->next_tag($html_tag);
		$tag_processor->add_class('wp-block-list');
		$tag_processor->set_attribute('style', "--block-gap: {$block_gap};");

		$block_content = $tag_processor->get_updated_html();

		return $block_content;

	}
}
