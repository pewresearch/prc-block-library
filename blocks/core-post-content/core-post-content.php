<?php
namespace PRC\Platform\Blocks;

/**
 * Block Name:        Post Content
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */

class Core_Post_Content {
	public static $block_json;
	public static $version;

	public static $block_name = "core/post-content";
	public static $view_style_handle = null;

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/core-post-content/build/block.json';
		self::$block_json = wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		self::$version = self::$block_json['version'];
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
	* Register the block's assets.
	* @hook init
	*/
	public function register_assets() {
		self::$view_style_handle = register_block_style_handle( self::$block_json, 'style' );
	}


	/**
	* Register the block's style assets.
	* @hook enqueue_block_assets
	*/
	public function register_style() {
		wp_enqueue_style( self::$view_style_handle );
	}

	/**
	* Render the core/post-content block
	*
	* Add image to post content on attachment template pages.
	*
	* @hook render_block
	* @param string $block_content
	* @param mixed $block
	* @return mixed
	*/
	public function render( $block_content, $block ) {
		if ( self::$block_name !== $block['blockName'] || is_admin() ) {
			return $block_content;
		}

		wp_enqueue_style( self::$view_style_handle );

		// Simple hack to add the image to an attachment page
		if ( is_attachment() ) {
			$image_url = wp_get_attachment_image_src(get_the_ID(), 'full');
			if ($image_url) {
				return '<img src="' . $image_url[0] . '" alt="' . get_the_title() . '" />';
			}
		}

		return $block_content;
	}

}
