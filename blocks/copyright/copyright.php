<?php
namespace PRC\Platform\Blocks;

/**
 * Block Name:        Copyright Disclaimer
 * Description:       Renders a copyright disclaimer with the current year.
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */

class Copyright {
	public static $block_json = null;
	public static $version;
	public static $block_name;
	public static $dir = __DIR__;
	public static $editor_script_handle;

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/copyright/build/block.json';
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

	public function get_copyright() {
		$year = date('Y');
		return wp_sprintf(
			'© %s Pew Research Center',
			$year
		);
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
			'prc-platform/copyright',
			[
				'label'              => __( 'Copyright', 'prc-platform/copyright' ),
				'get_value_callback' => [$this, 'get_copyright'],
			]
		);
	}

}
