<?php
/**
 * Block Name:
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */

class CoreGroup extends PRC_Block_Library {

	public static $block_name = 'core/group';
	public static $block_json = null;
	public static $view_script_handle = null;
	public static $editor_script_handle = null;
	public static $style_handle = null;
	public static $styles = array(
		array(
			'name' => 'fluid',
			'label' => 'Fluid',
			'isDefault' => true,
		),
		array(
			'name' => '200-wide',
			'label' => '200px Wide',
		),
		array(
			'name' => '300-wide',
			'label' => '300px Wide',
		),
		array(
			'name' => '420-wide',
			'label' => '420px Wide',
		),
		array(
			'name' => '640-wide',
			'label' => '640px Wide',
		),
	);

	public function __construct($init = false) {
		if ( true === $init ) {
			$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/core-group/build/block.json';
			self::$block_json = wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
			self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );

			add_action( 'init', array($this, 'register_new_styles'), 0 );
			add_action( 'init', array($this, 'init_assets') );
			add_action( 'enqueue_block_editor_assets', array($this, 'register_editor_assets') );
			add_filter( 'block_type_metadata', array( $this, 'add_attributes' ), 100, 1 );
			add_filter( 'block_type_metadata_settings', array( $this, 'add_settings' ), 100, 2 );
			add_filter( 'render_block', array( $this, 'render' ), 10, 2 );
		}
	}

	public function register_new_styles() {
		foreach( self::$styles as $style_args ) {
			register_block_style(
				self::$block_name,
				$style_args,
			);
		}
	}

	public function init_assets() {
		self::$editor_script_handle = register_block_script_handle( self::$block_json, 'editorScript' );
		self::$view_script_handle = register_block_script_handle( self::$block_json, 'viewScript' );
		self::$style_handle    = register_block_style_handle( self::$block_json, 'style' );
	}


	public function register_editor_assets() {
		wp_enqueue_script( self::$editor_script_handle );
		wp_enqueue_style( self::$style_handle );
	}

	/**
	* Register additional attributes for the core-group block.
	* @param mixed $metadata
	* @return mixed
	*/
	public function add_attributes( $metadata ) {
		if ( self::$block_name !== $metadata['name'] ) {
			return $metadata;
		}

		if ( ! array_key_exists( 'isSticky', $metadata['attributes'] ) ) {
			$metadata['attributes']['isSticky'] = array(
				'type'    => 'boolean',
				'default' => false,
			);
		}

		// If you pass an ID to the block, it will be used as the anchor for when the mobile viewpoint is reached.
		if ( ! array_key_exists( 'responsiveAttachId', $metadata['attributes'] ) ) {
			$metadata['attributes']['responsiveAttachId'] = array(
				'type'    => 'string',
			);
		}
		// If you pass a threshold it will be used for the mobile viewpoint attach. If not, the default is 640.
		if ( ! array_key_exists( 'responsiveThreshold', $metadata['attributes'] ) ) {
			$metadata['attributes']['responsiveThreshold'] = array(
				'type'    => 'integer',
				'default' => 640,
			);
		}

		return $metadata;
	}

	/**
	* Register additional settings, like context, for the core-group block.
	* @param mixed $settings
	* @param mixed $metadata
	* @return mixed
	*/
	public function add_settings(array $settings, array $metadata) {
		if ( self::$block_name === $metadata['name'] ) {
			$settings['provides_context'] = array_merge(
				array_key_exists('provides_context', $settings) ? $settings['provides_context'] : array(),
				array(
					'core/group/isSticky' => 'isSticky',
					'core/group/responsiveAttachId' => 'responsiveAttachId',
					'core/group/responsiveThreshold' => 'responsiveThreshold',
				)
			);
		}
		return $settings;
	}

	public function render( $block_content, $block ) {
		if ( self::$block_name !== $block['blockName'] || is_admin() ) {
			return $block_content;
		}

		$is_sticky = is_array($block['attrs']) && array_key_exists('isSticky', $block['attrs']) ? $block['attrs']['isSticky'] : false;
		$responsive_attach_id = is_array($block['attrs']) && array_key_exists('responsiveAttachId', $block['attrs']) ? $block['attrs']['responsiveAttachId'] : false;
		$responsive_threshold = is_array($block['attrs']) && array_key_exists('responsiveThreshold', $block['attrs']) ? $block['attrs']['responsiveThreshold'] : false;

		if ( $is_sticky || $responsive_attach_id || $responsive_threshold ) {
			wp_enqueue_script( self::$view_script_handle );
		}

		wp_enqueue_style( self::$style_handle );

		$block_content = apply_filters( 'prc_group_block_content', $block_content, $block );

		if ( $is_sticky ) {
			$block_content = wp_sprintf(
				'<div class="prc-group-block--sticky">%s</div>',
				$block_content
			);
		}

		if ( $responsive_threshold && $responsive_attach_id ) {
			$id = md5($block_content);
			$block_content = wp_sprintf(
				'<div class="prc-group-block--responsive" data-return-id="%1$s" data-attach-id="%2$s" data-responsive-threshold="%3$s">%4$s</div>',
				$id,
				$responsive_attach_id,
				$responsive_threshold,
				$block_content
			);
		}

		return $block_content;
	}

}

new CoreGroup(true);
