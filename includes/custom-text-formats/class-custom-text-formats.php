<?php
namespace PRC\Platform\Blocks;

class Custom_Text_Formats {
	public static $handle = 'prc-block-library-custom-text-formats';
	public $version;

	public function __construct($loader) {
		$this->init($loader);
	}

    public function init($loader) {
		$loader->add_action('enqueue_block_editor_assets', $this, 'init_assets');
	}

	/**
	* Register the build assets.
	* @hook enqueue_block_editor_assets
	*/
	public function init_assets() {
		$asset_file = include(  plugin_dir_path( __FILE__ )  . 'build/index.asset.php' );
		wp_enqueue_script(
			self::$handle,
			plugins_url( 'build/index.js', __FILE__ ),
			$asset_file['dependencies'],
			$asset_file['version'],
		);
	}
}
