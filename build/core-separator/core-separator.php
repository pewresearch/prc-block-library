<?php
namespace PRC\Platform\Blocks;
/**
 * Block Name:        Core Separator
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Core_Separator {
	public $block_json;
	public $style_handle;

	public function __construct($loader) {
		$this->block_json = prc_block_library_manifest('core-separator');
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action('init', $this, 'register_assets');
			$loader->add_action('enqueue_block_editor_assets', $this, 'register_editor_script');
			$loader->add_action('enqueue_block_assets', $this, 'register_style');
		}
	}

	/**
	 * @hook init
	 * @return void
	 */
	public function register_assets() {
		$this->style_handle = register_block_style_handle( $this->block_json, 'style' );
	}

	/**
	 * @hook enqueue_block_editor_assets
	 * @return void
	 */
	public function register_editor_script() {
		wp_enqueue_script( $this->style_handle );
	}

	public function register_style() {
		wp_enqueue_style( $this->style_handle );
	}

}

