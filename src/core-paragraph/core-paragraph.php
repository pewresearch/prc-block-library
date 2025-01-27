<?php
namespace PRC\Platform\Blocks;

/**
 * Block Name:        Core Paragraph
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Core_Paragraph {
	public $block_json;
	public $block_name = 'core/paragraph';
	public $editor_script_handle;
	public $style_handle;
	public $styles = array(
		array(
			'name' => 'has-big-number',
			'label' => 'Big Number',
		)
	);

	public function __construct($loader) {
		$this->block_json = prc_block_library_manifest('core-paragraph');
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action('init', $this, 'register_assets');
			$loader->add_action('enqueue_block_assets', $this, 'register_style');
			$loader->add_action('enqueue_block_editor_assets', $this, 'register_editor_script');
		}
	}

	/**
	 * @hook init
	 * @return void
	 */
	public function register_assets() {
		$this->editor_script_handle = register_block_script_handle( $this->block_json, 'editorScript' );
		$this->style_handle    = register_block_style_handle( $this->block_json, 'style' );
		$this->register_new_styles();
	}

	public function register_new_styles() {
		foreach( $this->styles as $style_args ) {
			register_block_style(
				$this->block_name,
				$style_args,
			);
		}
	}

	/**
	 * @hook enqueue_block_editor_assets
	 */
	public function register_editor_script() {
		wp_enqueue_script( $this->editor_script_handle );
	}

	/**
	 * @hook enqueue_block_assets
	 */
	public function register_style() {
		wp_enqueue_style( $this->style_handle );
	}

}
