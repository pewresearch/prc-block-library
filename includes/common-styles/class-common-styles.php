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
class Common_Styles {
	/**
	 * Constructor
	 *
	 * @param mixed $loader The loader.
	 */
	public function __construct( $loader ) {
		require_once plugin_dir_path( __FILE__ ) . '/class-additional-color-supports.php';
		require_once plugin_dir_path( __FILE__ ) . '/baseball-card/class-baseball-card-list.php';
		$this->init( $loader );
	}

	/**
	 * Initialize the class and set its properties.
	 *
	 * @param mixed $loader The loader.
	 */
	public function init( $loader ) {
		$additional_color_supports = new Additional_Color_Supports();

		$loader->add_filter( 'safe_style_css', $this, 'allowed_inline_styles', 10, 1 );
		$loader->add_action( 'enqueue_block_assets', $this, 'register_baseball_card_style', 2 );
		$loader->add_action( 'enqueue_block_assets', $this, 'register_pagination_style', 2 );
		$loader->add_action( 'enqueue_block_assets', $additional_color_supports, 'register_style', 2 );
		$loader->add_action( 'admin_enqueue_scripts', $additional_color_supports, 'reigster_pagination_script', 100 );
		$loader->add_action( 'enqueue_block_assets', $this, 'register_core_style', 2 );
	}

	/**
	 * Add @container css rules to allowed safe style css.
	 *
	 * @hook safe_style_css
	 *
	 * @param mixed $styles The styles.
	 * @return mixed The styles.
	 */
	public function allowed_inline_styles( $styles ) {
		$styles[] = 'container';
		$styles[] = '@container';
		return $styles;
	}

	/**
	 * Register the "Baseball Card" `prc-block-library--baseball-card` support style.
	 *
	 * @hook enqueue_block_assets
	 */
	public function register_baseball_card_style() {
		$asset_file = include plugin_dir_path( __FILE__ ) . 'baseball-card/build/index.asset.php';
		wp_register_style(
			'prc-block-library--baseball-card',
			plugins_url( 'baseball-card/build/style-index.css', __FILE__ ),
			array(),
			$asset_file['version'],
		);
	}

	/**
	 * Register the "Pagination" `prc-block-library--pagination` support style.
	 *
	 * @hook enqueue_block_assets
	 */
	public function register_pagination_style() {
		$asset_file = include plugin_dir_path( __FILE__ ) . 'pagination/build/index.asset.php';
		wp_register_style(
			'prc-block-library--pagination',
			plugins_url( 'pagination/build/style-index.css', __FILE__ ),
			array(),
			$asset_file['version'],
		);
	}

	/**
	 * Enqueue the "Core" `prc-block-library--core` support style everywhere.
	 *
	 * @hook enqueue_block_assets
	 */
	public function register_core_style() {
		$asset_file = include plugin_dir_path( __FILE__ ) . 'core/build/index.asset.php';
		wp_enqueue_style(
			'prc-block-library--core',
			plugins_url( 'core/build/style-index.css', __FILE__ ),
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
		$asset_file = include plugin_dir_path( __FILE__ ) . 'pagination/build/index.asset.php';
		wp_register_script(
			'prc-block-library--pagination',
			plugins_url( 'pagination/build/index.js', __FILE__ ),
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
