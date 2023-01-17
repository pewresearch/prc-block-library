<?php
/**
 * Block Name:        Core Cover
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class CoreCover extends PRC_Block_Library {

	public static $block_name = "core/cover";
	public static $block_json = null;
	public static $style_handle = null;
	public static $editor_script_handle = null;

	public function __construct($init = false) {
		if ( true === $init ) {
			$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/core-cover/build/block.json';
			self::$block_json = wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
			self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );

			add_action( 'init', array($this, 'init_assets') );
			add_action( 'init', array( $this, 'register_new_styles' ), 0 );
			add_action( 'enqueue_block_editor_assets', array($this, 'register_editor_assets') );
			add_filter( 'block_type_metadata', array( $this, 'add_attributes' ), 100, 1 );
			add_filter( 'render_block', array( $this, 'render' ), 10, 2 );
		}
	}

	public function init_assets() {
		self::$editor_script_handle = register_block_script_handle( self::$block_json, 'editorScript' );
		self::$style_handle         = register_block_style_handle( self::$block_json, 'style' );
	}


	public function register_editor_assets() {
		wp_enqueue_script( self::$editor_script_handle );
		wp_enqueue_style( self::$style_handle );
	}

	public function register_new_styles() {
		register_block_style(
			self::$block_name,
			array(
				'name' => 'disable-mobile-collapse',
				'label' => 'Disable Mobile Collapse',
			),
		);
	}

	/**
	* Register additional attributes for the "core/cover" block.
	* @param mixed $metadata
	* @return mixed
	*/
	public function add_attributes( $metadata ) {
		if ( self::$block_name !== $metadata['name'] ) {
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

		if ( ! array_key_exists( 'tabletUrl', $metadata['attributes'] ) ) {
			$metadata['attributes']['tabletUrl'] = array(
				'type'    => 'string',
			);
		}

		if ( ! array_key_exists( 'tabletId', $metadata['attributes'] ) ) {
			$metadata['attributes']['tabletId'] = array(
				'type'    => 'number',
			);
		}

		return $metadata;
	}

	/**
	* Render the "core/cover" block
	* @param string $block_content
	* @param mixed $block
	* @return mixed
	*/
	public function render( $block_content, $block ) {
		if ( self::$block_name !== $block['blockName'] || is_admin() ) {
			return $block_content;
		}

		wp_enqueue_style( self::$style_handle );

		if ( !function_exists('jetpack_is_mobile') ) {
			return $block_content;
		}

		$mobile_image_id = array_key_exists('mobileId', $block['attrs']) ? $block['attrs']['mobileId'] : false;
		$mobile_image = $mobile_image_id ? wp_get_attachment_image_src( $mobile_image_id, 'full' ) : false;
		$mobile_image = $mobile_image ? $mobile_image[0] : false;

		// Replace the image with the mobile image if on a mobile device.
		$image_attrs = null;
		if ( jetpack_is_mobile() && preg_match( '/<img(.*?)>/', $block_content, $matches ) && false !== $mobile_image ) {
			$image_attrs = $matches[1];
			$image_attrs = preg_replace( '/src=".*?"/', 'src="' . $mobile_image . '"', $image_attrs );
			$block_content = preg_replace( '/<img(.*?)>/', '<img' . $image_attrs . '>', $block_content );
		}

		return $block_content;
	}

}

new CoreCover(true);
