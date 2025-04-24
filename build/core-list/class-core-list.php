<?php
/**
 * Core List Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use WP_HTML_Tag_Processor;

/**
 * Block Name:        Core List
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */
class Core_List {
	/**
	 * Block name
	 *
	 * @var string
	 */
	public $block_name = 'core/list';

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
		$this->block_json = prc_block_library_manifest( 'core-list' );
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
			$loader->add_action( 'enqueue_block_editor_assets', $this, 'register_editor_assets' );
			$loader->add_filter( 'block_type_metadata', $this, 'add_attributes', 100, 1 );
			$loader->add_filter( 'render_block', $this, 'render', 100, 2 );
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
	 * Register style
	 *
	 * @hook enqueue_block_assets
	 */
	public function register_style() {
		wp_enqueue_style( $this->style_handle );
	}

	/**
	 * Add attributes
	 *
	 * @param mixed $metadata Metadata.
	 * @return mixed
	 */
	public function add_attributes( $metadata ) {
		if ( $this->block_name !== $metadata['name'] ) {
			return $metadata;
		}


		if ( array_key_exists( 'spacing', $metadata['supports'] ) ) {
			$metadata['supports']['spacing']['blockGap'] = true;
		}
		return $metadata;
	}

	/**
	 * Render the "core/list" block
	 *
	 * @hook render_block
	 * @param string $block_content Block content.
	 * @param mixed  $block Block.
	 * @return mixed
	 */
	public function render( $block_content, $block ) {
		if ( 'core/list-item' !== $block['blockName'] || is_admin() ) {
			return $block_content;
		}

		if ( ! array_key_exists( 'attrs', $block ) ) {
			return $block_content;
		}

		$block_gap = \PRC\Platform\Block_Utils\get_block_gap_support_value( $block['attrs'], 'vertical' );

		$tag_processor = new WP_HTML_Tag_Processor( $block_content );
		$html_tag      = 'ul';

		if ( array_key_exists( 'ordered', $block['attrs'] ) && true === $block['attrs']['ordered'] ) {
			$html_tag = 'ol';
		}
		$tag_processor->next_tag( $html_tag );
		$tag_processor->add_class( 'wp-block-list' );
		$tag_processor->set_attribute( 'style', "--block-gap: {$block_gap};" );

		$block_content = $tag_processor->get_updated_html();

		return $block_content;
	}
}
