<?php
/**
 * Core Code Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Core Code
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */
class Core_Code {
	/**
	 * Block JSON
	 *
	 * @var array
	 */
	public $block_json;

	/**
	 * Version
	 *
	 * @var string
	 */
	public $version;

	/**
	 * Block name
	 *
	 * @var string
	 */
	public $block_name = 'core/code';

	/**
	 * Style handle
	 *
	 * @var string
	 */
	public $style_handle;

	/**
	 * Constructor
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		$this->block_json = prc_block_library_manifest( 'core-code' );
		$this->version    = $this->block_json['version'];
		$this->init( $loader );
	}

	/**
	 * Initialize the block
	 *
	 * @param mixed $loader Loader.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'register_assets' );
			$loader->add_action( 'enqueue_block_assets', $this, 'register_style' );
		}
	}

	/**
	 * Register assets
	 *
	 * @hook init
	 * @return void
	 */
	public function register_assets() {
		$this->style_handle = register_block_style_handle( $this->block_json, 'style' );
	}

	/**
	 * Register style
	 *
	 * Hijack core/code's stylesheet handle with the PRC style URL when the
	 * block-library style registered successfully. Bail before deregistering
	 * the core handle when the PRC style is missing (incomplete build /
	 * register_block_style_handle returned false) so core styles stay intact
	 * and we do not read ->src on null.
	 *
	 * @hook enqueue_block_assets
	 * @return void
	 */
	public function register_style() {
		global $wp_styles;

		if ( empty( $this->style_handle ) || empty( $wp_styles->registered[ $this->style_handle ] ) ) {
			return;
		}

		$style = $wp_styles->registered[ $this->style_handle ];
		if ( ! is_object( $style ) || empty( $style->src ) ) {
			return;
		}

		wp_deregister_style( 'wp-block-code' );
		wp_register_style( 'wp-block-code', $style->src, array(), $this->version );
	}
}
