<?php
/**
 * Core File Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Core File
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */
class Core_File {
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
	public $block_name = 'core/file';

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
	 * @hook enqueue_block_assets
	 * @return void
	 */
	public function register_style() {
		wp_enqueue_style( $this->style_handle );
	}
}
