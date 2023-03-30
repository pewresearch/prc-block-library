<?php
/**
 * Block Name:
 * Version:           0.2.0
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

	public static $size_styles = array(
		array(
			'name' => 'fluid',
			'label' => 'Fluid',
			'isDefault' => true,
			'inline_style' => '.wp-block-group.is-style-fluid{width: 100%; max-width: 100}%;'
		),
		array(
			'name' => '200-wide',
			'label' => '200px Wide',
			'inline_style' => '.wp-block-group.is-style-200-wide, .wp-block[data-type="core/group"].is-style-200-wide {width: 100%!important; max-width: 200px!important}'
		),
		array(
			'name' => '250-wide',
			'label' => '250px Wide',
			'inline_style' => '.wp-block-group.is-style-250-wide, .wp-block[data-type="core/group"].is-style-250-wide {width: 100%!important; max-width: 250px!important}'
		),
		array(
			'name' => '300-wide',
			'label' => '300px Wide',
			'inline_style' => '.wp-block-group.is-style-300-wide, .wp-block[data-type="core/group"].is-style-300-wide {width: 100%!important; max-width: 300px!important}'
		),
		array(
			'name' => '320-wide',
			'label' => '320px Wide (half the content well)',
			'inline_style' => '.wp-block-group.is-style-320-wide, .wp-block[data-type="core/group"].is-style-320-wide {width: 100%!important; max-width: 320px!important}'
		),
		array(
			'name' => '420-wide',
			'label' => '420px Wide',
			'inline_style' => '.wp-block-group.is-style-420-wide, .wp-block[data-type="core/group"].is-style-420-wide {width: 100%!important; max-width: 420px!important}'
		),
		array(
			'name' => '640-wide',
			'label' => '640px Wide (full content well)',
			'inline_style' => '.wp-block-group.is-style-640-wide, .wp-block[data-type="core/group"].is-style-640-wide {width: 100%!important; max-width: 640p!important}'
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
		foreach( self::$size_styles as $style_args ) {
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

		if ( 'prc-block-theme' === get_template() && ! array_key_exists( 'responsiveContainerQuery', $metadata['attributes'] ) ) {
			$metadata['attributes']['responsiveContainerQuery'] = array(
				'type'    => 'object',
				'default' => array(
					'hideOnDesktop' => false,
					'hideOnTablet'  => false,
					'hideOnMobile'  => false,
				),
			);
		}

		if ( 'prc-block-theme' !== get_template() ) {
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
		if ( 'prc-block-theme' !== get_template() && self::$block_name === $metadata['name'] ) {
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

	public function render_legacy($block_content, $block) {
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

	public function render_new( $block_content, $block ) {
		if ( is_admin() ) {
			return $block_content;
		}
		
		wp_enqueue_style( self::$style_handle );

		$responsive_options = array_key_exists('responsiveContainerQuery', $block['attrs']) ? $block['attrs']['responsiveContainerQuery'] : array();
		$hide_on_desktop = array_key_exists('hideOnDesktop', $responsive_options) ? $responsive_options['hideOnDesktop'] : false;
		$hide_on_tablet = array_key_exists('hideOnTablet', $responsive_options) ? $responsive_options['hideOnTablet'] : false;
		$hide_on_mobile = array_key_exists('hideOnMobile', $responsive_options) ? $responsive_options['hideOnMobile'] : false;
		// using the new WP_HTML_Tag_Processor add data-hi
		$w = new WP_HTML_Tag_Processor( $block_content );
		$w->next_tag();
		if ( $hide_on_desktop ) {
			$w->set_attribute( 'data-hide-on-desktop', 'true' );
		}
		if ( $hide_on_tablet ) {
			$w->set_attribute( 'data-hide-on-tablet', 'true' );
		}
		if ( $hide_on_mobile ) {
			$w->set_attribute( 'data-hide-on-mobile', 'true' );
		}
		return $w;
	}

	public function render( $block_content, $block ) {
		if ( self::$block_name !== $block['blockName'] || is_admin() ) {
			return $block_content;
		}

		if ( 'prc-block-theme' === get_template() ) {
			return $this->render_new($block_content, $block);
		} else {
			return $this->render_legacy($block_content, $block);
		}
	}

}

new CoreGroup(true);
