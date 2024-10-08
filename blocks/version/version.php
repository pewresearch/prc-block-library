<?php
namespace PRC\Platform\Blocks;

/**
 * Block Name:        Version
 * Description:       Get the latest version for various PRC_ constants.
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Version {
	public static $block_json = null;
	public static $version;
	public static $block_name;
	public static $dir = __DIR__;
	public static $editor_script_handle;

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/version/build/block.json';
		self::$block_json = \wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		self::$version = self::$block_json['version'];
		self::$block_name = self::$block_json['name'];
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action('init', $this, 'block_init');
			$loader->add_action('init', $this, 'register_assets');
			$loader->add_action('enqueue_block_editor_assets', $this, 'register_editor_script');
		}
	}

	/**
	 * @hook init
	 * @return void
	 */
	public function register_assets() {
		self::$editor_script_handle = register_block_script_handle( self::$block_json, 'editorScript' );
	}

	/**
	 * @hook enqueue_block_editor_assets
	 * @return void
	 */
	public function register_editor_script() {
		wp_enqueue_script( self::$editor_script_handle );
	}

	public function get_version_info_for_block_binding($source_args, $block, $attribute_name) {
		$block_name = $block->name;
		if ( !in_array($block_name, ['core/paragraph']) ) {
			return null;
		}
		$module_to_check = $source_args['module'];
		if ( 'platform' === $module_to_check ) {
			return PRC_PLATFORM_VERSION;
		} if ( 'block-library' === $module_to_check ) {
			return PRC_BLOCK_LIBRARY_VERSION;
		}
		return PRC_PLATFORM_VERSION;
	}

	/**
	* Registers the block using the metadata loaded from the `block.json` file.
	* Behind the scenes, it registers also all assets so they can be enqueued
	* through the block editor in the corresponding context.
	* @hook init
	*
	* @see https://developer.wordpress.org/reference/functions/register_block_type/
	*/
	public function block_init() {
		register_block_bindings_source(
			'prc-platform/version',
			[
				'label'              => __( 'Version Info', 'prc-platform/version' ),
				'get_value_callback' => [$this,'get_version_info_for_block_binding'],
			]
		);
	}

}
