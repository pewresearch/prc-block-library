<?php
namespace PRC\Platform\Blocks;
use WP_HTML_Tag_Processor;

/**
 * Block Name:
 * Version:           1.0.0
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */

class Core_Group {
	public static $block_name = 'core/group';
	public static $block_json = null;
	public static $editor_script_handle = null;
	public static $style_handle = null;
	public static $view_script_module_handle = null;

	public static $size_styles = array(
		array(
			'name' => 'fluid',
			'label' => 'Fluid',
			'inline_style' => '.wp-block-group.is-style-fluid{width: 100%; max-width: 100%}'
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
			'inline_style' => '.wp-block-group.is-style-640-wide, .wp-block[data-type="core/group"].is-style-640-wide {width: 100%!important; max-width: 640px!important}'
		),
		array(
			'name' => 'dynamic-wide',
			'label' => 'Dynamic Wide Template',
			'inline_style' => '.wp-block-group.is-style-dynamic-wide, .wp-block[data-type="core/group"].is-style-dynamic-wide {width: 100%!important; max-width: var(--wp--custom--content-size-wide)!important}'
		),
		array(
			'name' => 'collapse-row-on-mobile',
			'label' => 'Collapse Row on Mobile',
			'inline_style' => '.wp-block-group.is-style-collapse-row-on-mobile, .wp-block[data-type="core/group"].is-style-collapse-row-on-mobile {width: 100%!important; max-width: 100%!important}'
		)
	);

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/core-group/build/block.json';
		self::$block_json = \wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		$this->init($loader);
	}

	public function init($loader = null) {
		if (null !== $loader) {
			$loader->add_action( 'init', $this, 'register_new_styles', 10 );
			$loader->add_action( 'init', $this, 'register_assets' );
			$loader->add_action( 'enqueue_block_editor_assets', $this, 'register_editor_assets' );
			$loader->add_action( 'enqueue_block_assets', $this, 'register_editor_style' );
			$loader->add_filter( 'block_type_metadata', $this, 'add_attributes', 100, 1 );
			$loader->add_filter( 'block_type_metadata_settings', $this, 'add_settings', 100, 2 );
			$loader->add_filter( 'render_block', $this, 'render', 100, 2 );
		}
	}

	/**
	 * @hook init
	 * @return void
	 */
	public function register_new_styles() {
		foreach( self::$size_styles as $style_args ) {
			register_block_style(
				self::$block_name,
				$style_args,
			);
		}
	}

	/**
	 * @hook init
	 * @return void
	 */
	public function register_assets() {
		self::$editor_script_handle = register_block_script_handle( self::$block_json, 'editorScript' );
		self::$style_handle    = register_block_style_handle( self::$block_json, 'style' );
		self::$view_script_module_handle = register_block_script_module_id( self::$block_json, 'viewScriptModule' );
	}

	/**
	 * @hook enqueue_block_editor_assets
	 * @return void
	 */
	public function register_editor_assets() {
		wp_enqueue_script( self::$editor_script_handle );
	}

	/**
	 * @hook enqueue_block_assets
	 * @return void
	 */
	public function register_editor_style() {
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

		if ( ! array_key_exists( 'responsiveContainerQuery', $metadata['attributes'] ) ) {
			$metadata['attributes']['responsiveContainerQuery'] = array(
				'type'    => 'object',
				'default' => array(
					'hideOnDesktop' => false,
					'hideOnTablet'  => false,
					'hideOnMobile'  => false,
				),
			);
		}

		return $metadata;
	}

	/**
	* Register additional settings, like context, for the core-group block.
	* Currently we're allowing the group block to have grid context. There is not active use case for this, more an experiment to see what we may use it for once it's in place.
	* @hook block_type_metadata_settings 100, 2
	* @param mixed $settings
	* @param mixed $metadata
	* @return mixed
	*/
	public function add_settings(array $settings, array $metadata) {
		if ( self::$block_name === $metadata['name'] ) {
			$settings['supports']['interactivity'] = true;
			$settings['uses_context'] = array_merge(
				array_key_exists('uses_context', $settings) ? $settings['uses_context'] : array(),
				array(
					"grid/column/desktop/span",
					"grid/column/desktop/start",
					"grid/column/desktop/row",
					"grid/column/tablet/span",
					"grid/column/tablet/start",
					"grid/column/tablet/row",
					"grid/column/mobile/span",
					"grid/column/mobile/start",
					"grid/column/mobile/row",
				)
			);
		}
		return $settings;
	}

	/**
	 * @hook render_block 100, 2
	 * @param mixed $block_content
	 * @param mixed $block
	 * @return mixed
	 */
	public function render( $block_content, $block ) {
		if ( self::$block_name !== $block['blockName'] || is_admin() ) {
			return $block_content;
		}

		wp_enqueue_style( self::$style_handle );
		// Check if $block_content contains is-style-baseball-card
		if ( strpos( $block_content, 'is-style-baseball-card' ) !== false ) {
			wp_enqueue_style("prc-block-library--baseball-card");
		}
		$is_sticky = array_key_exists('style', $block['attrs']) && array_key_exists('position', $block['attrs']['style']) && array_key_exists('type', $block['attrs']['style']['position']) && $block['attrs']['style']['position']['type'] === 'sticky';
		if ( $is_sticky ) {
			wp_enqueue_script_module( self::$view_script_module_handle );
		}

		$responsive_options = array_key_exists('responsiveContainerQuery', $block['attrs']) ? $block['attrs']['responsiveContainerQuery'] : array();
		$hide_on_desktop = array_key_exists('hideOnDesktop', $responsive_options) ? $responsive_options['hideOnDesktop'] : false;
		$hide_on_tablet = array_key_exists('hideOnTablet', $responsive_options) ? $responsive_options['hideOnTablet'] : false;
		$hide_on_mobile = array_key_exists('hideOnMobile', $responsive_options) ? $responsive_options['hideOnMobile'] : false;
		$is_responsive = $hide_on_desktop || $hide_on_tablet || $hide_on_mobile;

		// using the new WP_HTML_Tag_Processor add data-hide-on-X to the block
		$w = new WP_HTML_Tag_Processor( $block_content );
		if ( $w->next_tag() ) {
			if ( $is_sticky ) {
				$w->set_attribute('data-wp-interactive', wp_json_encode(array(
					'namespace' => 'prc-block/core-group',
				)));
				$w->set_attribute('data-wp-init--sticky', 'callbacks.onInit');
			}

			if ( $is_responsive && $hide_on_desktop ) {
				$w->set_attribute('data-hide-on-desktop', "true");
			}
			if ( $is_responsive && $hide_on_tablet ) {
				$w->set_attribute('data-hide-on-tablet', "true");
			}
			if ( $is_responsive && $hide_on_mobile ) {
				$w->set_attribute('data-hide-on-mobile', "true");
			}
		}

		return $w->get_updated_html();
	}

}
