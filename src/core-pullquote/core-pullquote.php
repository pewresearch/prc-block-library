<?php
namespace PRC\Platform\Blocks;
/**
 * Block Name:        Core Pullquote
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */

class Core_Pullquote {
	public $block_json;
	public $version;
	public $block_name = 'core/pullquote';
	public $style_handle;

	public function __construct($loader) {
		$this->block_json = prc_block_library_manifest('core-pullquote');
		$this->version = $this->block_json['version'];
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action('init', $this, 'register_assets');
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
	 * @hook enqueue_block_assets
	 * @return void
	 */
	public function register_style() {
		wp_deregister_style( 'wp-block-pullquote' );
		global $wp_styles;
		$style = $wp_styles->registered[ $this->style_handle ];
		$src = $style->src;
		wp_register_style( 'wp-block-pullquote', $src,  array(), $this->version );
	}

}

