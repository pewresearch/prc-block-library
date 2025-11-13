<?php
/**
 * Common Styles
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Common Styles
 *
 * @package PRC\Platform\Blocks
 */
class Pagination {
	/**
	 * Constructor
	 *
	 * @param mixed $loader The loader.
	 */
	public function __construct( $loader ) {
		$this->init( $loader );
	}

	/**
	 * Initialize the class and set its properties.
	 *
	 * @param mixed $loader The loader.
	 */
	public function init( $loader ) {
		$loader->add_action( 'enqueue_block_assets', $this, 'register_pagination_style', 2 );
		$loader->add_action( 'admin_enqueue_scripts', $this, 'reigster_pagination_script', 100 );
	}

	/**
	 * Register the "Pagination" `prc-block-library--pagination` support style.
	 *
	 * @hook enqueue_block_assets
	 */
	public function register_pagination_style() {
		$asset_file = include plugin_dir_path( __FILE__ ) . '/build/index.asset.php';
		wp_register_style(
			'prc-block-library--pagination',
			plugins_url( '/build/style-index.css', __FILE__ ),
			array(),
			$asset_file['version'],
		);
	}

	/**
	 * Register the "Pagination" `prc-block-library--pagination` support script.
	 *
	 * @hook admin_enqueue_scripts
	 */
	public function reigster_pagination_script() {
		$asset_file = include plugin_dir_path( __FILE__ ) . '/build/index.asset.php';
		wp_register_script(
			'prc-block-library--pagination',
			plugins_url( '/build/index.js', __FILE__ ),
			array_merge(
				$asset_file['dependencies'],
				array(
					'prc-functions',
				)
			),
			$asset_file['version'],
			true
		);
	}
}
