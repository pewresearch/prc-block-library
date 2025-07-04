<?php
/**
 * Core Post Content Block
 *
 * @package PRC\Platform\Blocks
 */

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
	/**
	 * Block JSON
	 *
	 * @var array
	 */
	public $block_json;

	/**
	 * Block name
	 *
	 * @var string
	 */
	public $block_name = 'core/post-content';

	/**
	 * View style handle
	 *
	 * @var string
	 */
	public $view_style_handle;

	/**
	 * Constructor
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		$this->block_json = prc_block_library_manifest( 'core-post-content' );
		$this->init( $loader );
	}

	/**
	 * Initialize the block
	 *
	 * @param mixed $loader Loader.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'register_assets' );
			$loader->add_action( 'enqueue_block_assets', $this, 'register_style' );
			$loader->add_filter( 'render_block', $this, 'render', 100, 2 );
		}
	}

	/**
	 * Register the block's assets.
	 *
	 * @hook init
	 */
	public function register_assets() {
		$this->view_style_handle = register_block_style_handle( $this->block_json, 'style' );
	}

	/**
	 * Register the block's style assets.
	 *
	 * @hook enqueue_block_assets
	 */
	public function register_style() {
		wp_enqueue_style( $this->view_style_handle );
	}

	/**
	 * Render the core/post-content block.
	 * This is a simple hack to get post-content to only render the
	 * image, video, or file on attachment template pages.
	 *
	 * TODO: Commit a core Gutenberg method to handle this.
	 *
	 * @hook render_block
	 * @param string $block_content Block content.
	 * @param mixed  $block Block.
	 * @return mixed
	 */
	public function render( $block_content, $block ) {
		if ( $this->block_name !== $block['blockName'] || is_admin() ) {
			return $block_content;
		}

		wp_enqueue_style( $this->view_style_handle );

		// Simple hack to add the image to an attachment page.
		if ( is_attachment() ) {
			$attachment_id = get_the_ID();
			$mime_type     = get_post_mime_type( $attachment_id );
			// Check if mime_type is an image or video.
			$is_video = strpos( $mime_type, 'video' ) !== false;
			$is_image = strpos( $mime_type, 'image' ) !== false;
			$is_file  = strpos( $mime_type, 'application' ) !== false;
			if ( $is_video ) {
				$meta          = get_metadata( 'post', $attachment_id );
				$videopress_id = array_key_exists( 'videopress_guid', $meta ) && ! empty( $meta['videopress_guid'] ) ? $meta['videopress_guid'][0] : null;
				if ( $videopress_id ) {
					$block_content = apply_filters( 'the_content', '[videopress ' . $videopress_id . ']' );
				}
			} elseif ( $is_image ) {
				$image_url = wp_get_attachment_image_src( $attachment_id, 'large' );
				$full_url  = wp_get_attachment_image_src( $attachment_id, 'full' );
				if ( $image_url ) {
					$image_title   = get_the_title( $attachment_id );
					$block_content = wp_sprintf(
						'<figure class="wp-block-image aligncenter size-large"><img width="%s" height="%s" src="%s" alt="%s" class="wp-image-%s">%s</figure><h5>Download</h5><a href="%s" download>%s</a>',
						$image_url[1],
						$image_url[2],
						$image_url[0],
						$image_title,
						$attachment_id,
						get_the_content( $attachment_id ) ? '<figcaption class="wp-element-caption"' . get_the_content( $attachment_id ) . '</figcaption>' : '',
						$full_url[0],
						$image_title
					);
				}
			} else {
				$block_content = '<p>File type (' . $mime_type . ') not yet supported.</p>';
			}
		}

		return $block_content;
	}
}
