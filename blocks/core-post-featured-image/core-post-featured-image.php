<?php
namespace PRC\Platform\Blocks;
use WP_HTML_Tag_Processor;
/**
 * Block Name:        Core Post Feature Image
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */

class Core_Post_Featured_Image {
	public static $block_json = null;
	public static $version;
	public static $block_name = 'core/post-featured-image';
	public static $view_script_handle = null;
	public static $editor_script_handle = null;
	public static $style_handle = null;


	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/core-post-featured-image/build/block.json';
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
			$loader->add_filter('render_block', $this, 'render', 100, 3);
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


	/**
	* Register additional attributes for the core-group block
	* @hook block_type_metadata 100, 1
	* @param mixed $metadata
	* @return mixed
	*/
	public function add_attributes( $metadata ) {
		if ( self::$block_name !== $metadata['name'] ) {
			return $metadata;
		}

		if ( ! array_key_exists( 'imageSize', $metadata['attributes'] ) ) {
			$metadata['attributes']['imageSize'] = array(
				'type'    => 'string',
				'default' => 'A1',
			);
		}

		if ( ! array_key_exists( 'isChartArt', $metadata['attributes'] ) ) {
			$metadata['attributes']['isChartArt'] = array(
				'type'    => 'boolean',
				'default' => false,
			);
		}

		return $metadata;
	}

	private function get_imgs($image_id, $image_size, $bordered = false) {
		$caption = get_post_field( 'post_excerpt', $image_id );
		$alt     = get_post_meta( $image_id, '_wp_attachment_image_alt', true );
		$imgs = array(
			'desktop' => array(
				'default' => wp_get_attachment_image_src( $image_id, $image_size ),
				'hidpi'   => wp_get_attachment_image_src( $image_id, $image_size . '-HIDPI' ),
			),
			'mobile'  => array(
				'default' => wp_get_attachment_image_src( $image_id, $image_size . '-SMALL' ),
				'hidpi'   => wp_get_attachment_image_src( $image_id, $image_size . '-SMALL-HIDPI' ),
			),
			'bordered' => $bordered,
			'caption' => $caption,
			'alt' => $alt,
		);
		return $imgs;
	}

	/**
	* Render the "core/post-featured-image" block
	* @hook render_block
	* @param string $block_content
	* @param mixed $block
	* @return mixed
	*/
	public function render( $block_content, $block, $wp_block ) {
		if ( self::$block_name !== $block['blockName'] || is_admin() ) {
			return $block_content;
		}

		if ( ! array_key_exists( 'attrs', $block ) ) {
			return $block_content;
		}

		// get img url from $postId at the 'art-direction/get' endpoint
		$postId = $wp_block->context['postId'];
		$url = get_permalink($postId);
		$img_size = array_key_exists('imageSize', $block['attrs']) ? $block['attrs']['imageSize'] : 'A1';
		$chart_art = array_key_exists('isChartArt', $block['attrs']) ? $block['attrs']['isChartArt'] : false;
		$img_obj = \prc_get_art( $postId, $img_size );
		$img_id = array_key_exists('id', $img_obj) ? $img_obj['id'] : null;
		// if no img_url, return block_content
		if ( ! $img_id ) {
			return $block_content;
		}

		$image = $this->get_imgs($img_id, $img_size, $chart_art);

		$sources = array(
			'desktop' => wp_sprintf(
				'<source srcset="%s 1x, %s 2x" media="(min-width: 768px)" width="%s" height="%s">',
				array_key_exists( 0, $image['desktop']['default'] ) ? $image['desktop']['default'][0] : null,
				array_key_exists( 0, $image['desktop']['hidpi'] ) ? $image['desktop']['hidpi'][0] : null,
				array_key_exists( 1, $image['desktop']['default'] ) ? $image['desktop']['default'][1] : null,
				array_key_exists( 2, $image['desktop']['default'] ) ? $image['desktop']['default'][2] : null,
			),
			'mobile'  => wp_sprintf(
				'<source srcset="%s 1x, %s 2x" media="(max-width: 767px)" width="%s" height="%s">',
				array_key_exists( 0, $image['mobile']['default'] ) ? $image['mobile']['default'][0] : null,
				array_key_exists( 0, $image['mobile']['hidpi'] ) ? $image['mobile']['hidpi'][0] : null,
				array_key_exists( 1, $image['mobile']['default'] ) ? $image['mobile']['default'][1] : null,
				array_key_exists( 2, $image['mobile']['default'] ) ? $image['mobile']['default'][2] : null,
			),
		);

		$image_class = \PRC\Platform\Block_Utils\classNames(
			'image',
			'jetpack-lazy-image',
			array(
				$img_size => $img_size,
				'bordered'  => $image['bordered'],
			)
		);

		$block_content = wp_sprintf(
			'<figure class="wp-block-post-featured-image">
				<a href="%1$s" class="%2$s">
					<picture>
						%3$s
						%4$s
						%5$s
					</picture>
				</a>
			</figure>',
			esc_url($url),
			esc_attr( $image_class ),
			$sources['desktop'],
			$sources['mobile'],
			wp_sprintf(
				'<img
					srcset="%1$s"
					width="%2$s"
					height="%3$s"
					alt="%4$s"
				>',
				esc_url($image['desktop']['default'][0]),
				esc_attr($image['desktop']['default'][1]),
				esc_attr($image['desktop']['default'][2]),
				esc_attr($image['alt'])
			)
		);

		return $block_content;
	}
}
