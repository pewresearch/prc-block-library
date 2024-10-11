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
		$loader->add_filter('render_block_core/image', $this, 'share_figure_no_lazy_load_classname_with_img', 10, 2);
		$loader->add_filter(
			'wp_img_tag_add_loading_attr',
			$this,
			'eager_load',
			10,
			3
		);
		$loader->add_filter('dominant_color_img_tag_add_dominant_color', $this, 'disable_dominate_color_for_no_lazy_loading', 10, 5);
		$loader->add_filter('block_type_metadata', $this, 'add_attributes', 100, 1);
	}

	/**
	* Register additional attributes for the core-image block
	* @hook block_type_metadata 100, 1
	* @param mixed $metadata
	* @return mixed
	*/
	public function add_attributes( $metadata ) {
		if ( self::$block_name !== $metadata['name'] ) {
			return $metadata;
		}

		if ( ! array_key_exists( 'disableLazyLoading', $metadata['attributes'] ) ) {
			$metadata['attributes']['disableLazyLoading'] = array(
				'type' => 'boolean',
				'default' => false,
			);
		}

		return $metadata;
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

	/**
	 * Pass the 'no-lazy-load' classname when present on a figure element to the img element within.
	 * @hook render_block_core/image
	 */
	public function share_figure_no_lazy_load_classname_with_img($block_content, $block) {
		$attributes = $block['attrs'];
		$disable_lazy_loading = array_key_exists('disableLazyLoading', $attributes) && $attributes['disableLazyLoading'];
		if ( !$disable_lazy_loading ) {
			return $block_content;
		}
		$tag_processor = new WP_HTML_Tag_Processor($block_content);
		if ( $tag_processor->next_tag([
			'tag_name' => 'figure'
		]) ) {
			$tag_processor->next_tag('img');
			$tag_processor->add_class('no-lazy-load');
			$tag_processor->set_attribute('decoding', 'sync');
			$block_content = $tag_processor->get_updated_html();
		}
		return $block_content;
	}

	/**
	 * When 'no-lazy-load' is present on an image, set the loading attribute to 'eager'.
	 * @hook wp_img_tag_add_loading_attr
	 */
	public function eager_load( $value, $image, $context ) {
		if ( strpos( $image, 'no-lazy-load' ) !== false ) {
			return "eager";
		}

		return $value;
	}

	/**
	 * @hook dominant_color_img_tag_add_dominant_color
	 */
	public function disable_dominate_color_for_no_lazy_loading($enabled, $attachment_id, $image_meta, $filtered_image, $context) {
		if ( strpos( $filtered_image, 'no-lazy-load' ) !== false ) {
			return false;
		}

		return $enabled;
	}
}

