<?php
namespace PRC\Platform\Blocks;

/**
 * Block Name:        Core Navigation
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Core_Navigation {
	public $block_json;
	public $block_name = 'core/navigation';
	public $editor_script_handle;
	public $style_handle;

	public function __construct($loader) {
		$this->block_json = prc_block_library_manifest('core-navigation');
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action('init', $this, 'register_assets');
			$loader->add_action('enqueue_block_assets', $this, 'register_style');
			$loader->add_action('enqueue_block_editor_assets', $this, 'register_editor_script');
			$loader->add_filter('block_type_metadata', $this, 'enforce_no_mobile_menu', 100, 1);
		}
	}

	/**
	 * @hook init
	 * @return void
	 */
	public function register_assets() {
		$this->style_handle = register_block_style_handle( $this->block_json, 'style' );
		$this->editor_script_handle = register_block_script_handle( $this->block_json, 'editorScript' );
	}

	/**
	 * @hook enqueue_block_assets
	 * @return void
	 */
	public function register_style() {
		wp_enqueue_style( $this->style_handle );
	}

	/**
	 * @hook enqueue_block_editor_assets
	 * @return void
	 */
	public function register_editor_script() {
		wp_enqueue_script( $this->editor_script_handle );
	}

	/**
	* Enforces the overlayMenu never attribute
	* @hook block_type_metadata 100, 1
	* @param mixed $metadata
	* @return mixed
	*/
	public function enforce_no_mobile_menu( $metadata ) {
		if ( $this->block_name !== $metadata['name'] ) {
			return $metadata;
		}

		if ( array_key_exists( 'overlayMenu', $metadata['attributes'] ) ) {
			$metadata['attributes']['overlayMenu'] = array(
				'type'    => 'string',
				'default' => 'never',
			);
		}

		return $metadata;
	}
}

