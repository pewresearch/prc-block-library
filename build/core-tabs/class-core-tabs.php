<?php
/**
 * Core List Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use WP_HTML_Tag_Processor;

/**
 * Block Name:        Core Tabs
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */
class Core_Tabs {
	/**
	 * Block name
	 *
	 * @var string
	 */
	public $block_name = 'prc-block/tabs'; // @TODO: replace with core/tabs when finally merged into WP core.

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
	 * Constructor
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		// Ensure utility functions are loaded.
		require_once PRC_BLOCK_LIBRARY_DIR . '/build/core-tabs/util.php';
		$this->block_json = prc_block_library_manifest( 'core-tabs' );
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
			$loader->add_action( 'init', $this, 'register_styles' );
			$loader->add_action( 'init', $this, 'register_tab_block_bindings' );
			$loader->add_action( 'enqueue_block_editor_assets', $this, 'register_editor_assets' );
			$loader->add_action( 'enqueue_block_assets', $this, 'register_editor_style' );
			$loader->add_filter( 'render_block_context', $this, 'filter_render_block_context', 10, 2 );
		}
	}

	/**
	 * Register assets
	 *
	 * @hook init
	 * @return void
	 */
	public function register_assets() {
		$this->style_handle         = register_block_style_handle( $this->block_json, 'style' );
		$this->editor_script_handle = register_block_script_handle( $this->block_json, 'editorScript' );
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
	 * Register styles
	 *
	 * @hook init
	 */
	public function register_styles() {
		register_block_style(
			$this->block_name,
			array(
				'name'         => 'links-button',
				'label'        => 'Links with Hover Button',
				'style_handle' => $this->style_handle,
			)
		);

		register_block_style(
			$this->block_name,
			array(
				'name'         => 'outline',
				'label'        => 'Tabs (Outline)',
				'style_handle' => $this->style_handle,
			)
		);
	}

	/**
	 * Add slugified label to context as tab/slug for children.
	 *
	 * @hook render_block_context
	 *
	 * @param array $context      The current context.
	 * @param array $parsed_block The parsed block array.
	 * @return array Updated context.
	 */
	public function filter_render_block_context( array $context, array $parsed_block ): array {
		if ( ( $parsed_block['blockName'] ?? '' ) !== 'prc-block/tab' ) {
			return $context;
		}
		$attrs = $parsed_block['attrs'] ?? array();
		$label = isset( $attrs['label'] ) ? wp_strip_all_tags( (string) $attrs['label'] ) : '';
		if ( $label ) {
			$label               = str_replace( '&', 'and', $label );
			$context['tab/slug'] = sanitize_title( $label );
		}
		return $context;
	}

	/**
	 * Get the tab label binding.
	 *
	 * @param array    $source_args Source arguments.
	 * @param WP_Block $block The block.
	 * @param string   $attribute_name The attribute name.
	 * @return string The tab label binding.
	 */
	public function get_tab_label_binding( $source_args, $block, $attribute_name ) {
		$context = $block->context;
		return $context['tab/label'] ?? 'Tab Label...';
	}

	/**
	 * Register the tab block bindings.
	 *
	 * @hook init
	 */
	public function register_tab_block_bindings() {
		register_block_bindings_source(
			'tab/label',
			array(
				'label'              => __( 'Tab Label', 'prc-block/tab' ),
				'get_value_callback' => array( $this, 'get_tab_label_binding' ),
				'uses_context'       => array( 'tab/label', 'tab/slug' ),
			)
		);
	}
}
