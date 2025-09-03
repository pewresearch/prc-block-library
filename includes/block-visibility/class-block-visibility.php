<?php
/**
 * Block Visibility
 *
 * @package PRC\Platform\Blocks
 */
namespace PRC\Platform\Blocks;

/**
 * Block Visibility
 *
 * @package PRC\Platform\Blocks
 */
class Block_Visibility {
	/**
	 * The common name for script and style assets
	 */
	public static $asset_name = 'prc-block-visibility';

	public function __construct( $loader ) {
		$loader->add_action( 'enqueue_block_editor_assets', $this, 'enqueue_assets', 20 );
	}

	public function enqueue_assets() {
		if ( ! is_admin() ) {
			return;
		}
		$asset_file = include plugin_dir_path( __FILE__ ) . 'build/index.asset.php';
		wp_enqueue_style(
			self::$asset_name,
			plugins_url( 'build/style-index.css', __FILE__ ),
			array(),
			$asset_file['version'],
		);

		wp_enqueue_script(
			self::$asset_name,
			plugins_url( 'build/index.js', __FILE__ ),
			$asset_file['dependencies'],
			$asset_file['version'],
			true,
		);
	}
}
