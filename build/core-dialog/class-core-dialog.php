<?php
/**
 * Core List Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use WP_HTML_Tag_Processor;

/**
 * Block Name:        Core Dialog
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */
class Core_Dialog {
	/**
	 * Block name
	 *
	 * @var string
	 */
	public $block_name = 'prc-block/dialog'; // @TODO: replace with core/dialog when finally merged into WP core.

	/**
	 * Block JSON
	 *
	 * @var array
	 */
	public $block_json;

	/**
	 * Editor script handle
	 *
	 * @var string
	 */
	public $editor_script_handle;

	/**
	 * Style handle
	 *
	 * @var string
	 */
	public $style_handle;

	/**
	 * View script module handle
	 *
	 * @var string
	 */
	public $view_script_module_handle;

	/**
	 * Constructor
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		require_once PRC_BLOCK_LIBRARY_DIR . '/build/core-dialog/util.php';
		$this->block_json = prc_block_library_manifest( 'core-dialog' );
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
			$loader->add_action( 'enqueue_block_editor_assets', $this, 'register_editor_assets' );
			$loader->add_action( 'enqueue_block_assets', $this, 'register_editor_style' );
			$loader->add_filter( 'render_block_' . $this->block_name . '-element', $this, 'render_block__dialog_element', 10, 2 );
		}
	}

	/**
	 * Register assets
	 *
	 * @hook init
	 * @return void
	 */
	public function register_assets() {
		$this->style_handle              = register_block_style_handle( $this->block_json, 'style' );
		$this->editor_script_handle      = register_block_script_handle( $this->block_json, 'editorScript' );
		$this->view_script_module_handle = register_block_script_module_id( $this->block_json, 'viewScriptModule' );
	}

	/**
	 * Register editor assets
	 *
	 * @hook enqueue_block_editor_assets
	 * @return void
	 */
	public function register_editor_assets() {
		wp_enqueue_script( $this->editor_script_handle );
	}

	/**
	 * Register editor style
	 *
	 * @hook enqueue_block_assets
	 */
	public function register_editor_style() {
		wp_enqueue_style( $this->style_handle );
	}

	/**
	 * Render callback for prc-block/dialog-element
	 *
	 * @param string $block_content The block content.
	 * @param array  $block The block data.
	 *
	 * @hook render_block_prc-block/dialog-element
	 */
	public function render_block__dialog_element( $block_content, $block ) {
		wp_enqueue_script_module( $this->view_script_module_handle );
		$tag = new WP_HTML_Tag_Processor( $block_content );
		$tag->next_tag( 'dialog' );
		$tag->set_attribute( 'data-wp-init--videoSupport', 'callbacks.onVideoInit' );
		$tag->set_attribute( 'data-wp-watch--on-open-start-video', 'callbacks.onOpenStartVideo' );
		$tag->set_attribute( 'data-wp-watch--on-close-stop-video', 'callbacks.onCloseStopVideo' );
		return $tag->get_updated_html();
	}
}
