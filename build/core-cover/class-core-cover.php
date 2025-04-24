<?php
/**
 * Core Cover Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use WP_HTML_Tag_Processor;

/**
 * Block Name:        Core Cover
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Core_Cover {
	/**
	 * Block name
	 *
	 * @var string
	 */
	public $block_name = 'core/cover';

	/**
	 * Block JSON
	 *
	 * @var array
	 */
	public $block_json;

	/**
	 * Editor script handle
	 *
	 * @var string
	 */
	public $editor_script_handle;

	/**
	 * Style handle
	 *
	 * @var string
	 */
	public $style_handle;

	/**
	 * Constructor
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		$this->block_json = prc_block_library_manifest( 'core-cover' );
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
			$loader->add_action( 'enqueue_block_editor_assets', $this, 'register_editor_script' );
			$loader->add_action( 'enqueue_block_assets', $this, 'register_editor_style' );
			$loader->add_filter( 'block_type_metadata', $this, 'add_attributes', 100, 1 );
			$loader->add_filter( 'render_block', $this, 'render', 100, 2 );
		}
	}

	/**
	 * Register assets
	 *
	 * @hook init
	 */
	public function register_assets() {
		$this->editor_script_handle = register_block_script_handle( $this->block_json, 'editorScript' );
		$this->style_handle         = register_block_style_handle( $this->block_json, 'style' );

		register_block_style(
			$this->block_name,
			array(
				'name'  => 'disable-mobile-collapse',
				'label' => 'Disable Mobile Collapse',
			),
		);
	}

	/**
	 * Register editor script
	 *
	 * @hook enqueue_block_editor_assets
	 */
	public function register_editor_script() {
		wp_enqueue_script( $this->editor_script_handle );
	}

	/**
	 * Register editor style
	 *
	 * @hook enqueue_block_assets
	 */
	public function register_editor_style() {
		wp_enqueue_style( $this->style_handle );
	}

	/**
	 * Register additional attributes for the "core/cover" block.
	 *
	 * @hook block_type_metadata
	 * @param mixed $metadata Metadata.
	 * @return mixed
	 */
	public function add_attributes( $metadata ) {
		if ( $this->block_name !== $metadata['name'] ) {
			return $metadata;
		}

		if ( ! array_key_exists( 'mobileUrl', $metadata['attributes'] ) ) {
			$metadata['attributes']['mobileUrl'] = array(
				'type' => 'string',
			);
		}

		if ( ! array_key_exists( 'mobileId', $metadata['attributes'] ) ) {
			$metadata['attributes']['mobileId'] = array(
				'type' => 'number',
			);
		}

		if ( ! array_key_exists( 'tabletUrl', $metadata['attributes'] ) ) {
			$metadata['attributes']['tabletUrl'] = array(
				'type' => 'string',
			);
		}

		if ( ! array_key_exists( 'tabletId', $metadata['attributes'] ) ) {
			$metadata['attributes']['tabletId'] = array(
				'type' => 'number',
			);
		}

		return $metadata;
	}

	/**
	 * Render the "core/cover" block
	 *
	 * @hook render_block
	 * @param string $block_content
	 * @param mixed  $block
	 * @return mixed
	 */
	public function render( $block_content, $block ) {
		if ( $this->block_name !== $block['blockName'] || is_admin() ) {
			return $block_content;
		}

		wp_enqueue_style( $this->style_handle );

		if ( ! function_exists( 'jetpack_is_mobile' ) ) {
			return $block_content;
		}

		$mobile_image_id = array_key_exists( 'mobileId', $block['attrs'] ) ? $block['attrs']['mobileId'] : false;
		$mobile_image    = $mobile_image_id ? wp_get_attachment_image_src( $mobile_image_id, 'full' ) : false;
		$mobile_image    = $mobile_image ? $mobile_image[0] : false;

		// Replace the image with the mobile image if on a mobile device.
		$image_attrs = null;
		if ( 'mobile' === \PRC\Platform\get_current_device() && preg_match( '/<img(.*?)>/', $block_content, $matches ) && false !== $mobile_image ) {
			$image_attrs   = $matches[1];
			$image_attrs   = preg_replace( '/src=".*?"/', 'src="' . $mobile_image . '"', $image_attrs );
			$block_content = preg_replace( '/<img(.*?)>/', '<img' . $image_attrs . '>', $block_content );
		}

		return $block_content;
	}
}
