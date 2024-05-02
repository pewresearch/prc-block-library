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
			$image_id = get_the_ID();
			$image_url = wp_get_attachment_image_src( $image_id, 'large' );
			$full_url = wp_get_attachment_image_src( $image_id, 'full' );
			if ($image_url) {
				$image_title = get_the_title( $image_id );

				return wp_sprintf(
					'<figure class="wp-block-image aligncenter size-large"><img width="%s" height="%s" src="%s" alt="%s" class="wp-image-%s">%s</figure><h5>Download</h5><a href="%s" download>%s</a>',
					$image_url[1],
					$image_url[2],
					$image_url[0],
					$image_title,
					$image_id,
					get_the_content($image_id) ? '<figcaption class="wp-element-caption"' . get_the_content($image_id) . '</figcaption>' : '',
					$full_url[0],
					$image_title
				);
			}
		}

		return $block_content;
	}

}
