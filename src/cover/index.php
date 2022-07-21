<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';

use \WPackio as WPackio;

class Cover_Block extends PRC_Block_Library {
	public static $version = '1.0.2';

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'enqueue_block_editor_assets', array( $this, 'register_script' ) );
			add_filter( 'block_type_metadata', array( $this, 'add_attributes' ), 100, 1 );
			add_filter( 'render_block', array( $this, 'cover_block_render' ), 10, 2 );
		}
	}

	public function enqueue_assets($css = true, $js = false) {
		$enqueue       = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );
		$enqueue->enqueue(
			'blocks',
			'cover',
			array(
				'js'        => $js,
				'css'       => $css,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
	}

	/**
	 * Register additional attributes for group block.
	 * @param mixed $metadata
	 * @return mixed
	 */
	public function add_attributes( $metadata ) {
		if ( 'core/cover' !== $metadata['name'] ) {
			return $metadata;
		}

		if ( ! array_key_exists( 'mobileUrl', $metadata['attributes'] ) ) {
			$metadata['attributes']['mobileUrl'] = array(
				'type'    => 'string',
			);
		}

		if ( ! array_key_exists( 'mobileId', $metadata['attributes'] ) ) {
			$metadata['attributes']['mobileId'] = array(
				'type'    => 'number',
			);
		}

		return $metadata;
	}

	public function cover_block_render( $block_content, $block ) {
		if ( 'core/cover' !== $block['blockName'] || is_admin() ) {
			return $block_content;
		}

		$this->enqueue_assets();

		if ( function_exists('jetpack_is_mobile') ) {
			$mobile_image_id = array_key_exists('mobileId', $block['attrs']) ? $block['attrs']['mobileId'] : false;
			$mobile_image = $mobile_image_id ? wp_get_attachment_image_src( $mobile_image_id, 'full' ) : false;
			$mobile_image = $mobile_image ? $mobile_image[0] : false;

			// Replace the image with the mobile image if we're on a mobile device.
			$image_attrs = null;
			if ( jetpack_is_mobile() && preg_match( '/<img(.*?)>/', $block_content, $matches ) && false !== $mobile_image ) {
				$image_attrs = $matches[1];
				$image_attrs = preg_replace( '/src=".*?"/', 'src="' . $mobile_image . '"', $image_attrs );
				$block_content = preg_replace( '/<img(.*?)>/', '<img' . $image_attrs . '>', $block_content );
			}
		}

		return $block_content;
	}

	/**
	 * Enqueue a modification plugin for the core/group block and override the render_callback
	 *
	 * @uses Enqueue
	 */
	public function register_script() {
		$this->enqueue_assets(true, true);
	}
}

new Cover_Block( true );
