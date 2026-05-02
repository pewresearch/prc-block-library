<?php
/**
 * Core Accordion Block Extension
 *
 * @package PRC\Platform\Blocks
 */

declare(strict_types=1);

namespace PRC\Platform\Blocks;

use WP_HTML_Tag_Processor;

/**
 * Block Name:        Core Accordion
 * Requires at least: 6.8
 * Requires PHP:      8.1
 * Author:            Pew Research Center
 *
 * Extends the core/accordion block with:
 * - FAQPage structured data support
 * - Entity iframe integration
 *
 * @package prc-block
 */
class Core_Accordion {
	/**
	 * Block name
	 *
	 * @var string
	 */
	public static $block_name = 'core/accordion';

	/**
	 * Block JSON
	 *
	 * @var array
	 */
	public $block_json;

	/**
	 * Style handle
	 *
	 * @var string
	 */
	public $style_handle;

	/**
	 * Editor script handle
	 *
	 * @var string
	 */
	public $editor_script_handle;

	/**
	 * View script handle
	 *
	 * @var string
	 */
	public $view_script_module_handle;

	/**
	 * View script module dependencies
	 *
	 * @var array
	 */
	public $view_script_module_deps;

	/**
	 * View script module version
	 *
	 * @var string
	 */

	public $view_script_module_ver;

	/**
	 * Constructor
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		$this->block_json = prc_block_library_manifest( 'core-accordion' );
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
			$loader->add_action( 'enqueue_block_editor_assets', $this, 'register_editor_script' );
			$loader->add_action( 'enqueue_block_assets', $this, 'register_style' );
			$loader->add_filter( 'render_block', $this, 'render', 10, 3 );
		}
	}

	/**
	 * Register the block's assets.
	 *
	 * @hook init
	 * @return void
	 */
	public function register_assets() {
		$this->style_handle              = register_block_style_handle( $this->block_json, 'style' );
		$this->editor_script_handle      = register_block_script_handle( $this->block_json, 'editorScript' );
		$this->view_script_module_handle = register_block_script_handle( $this->block_json, 'viewScriptModule' );
		$view_asset                      = include PRC_BLOCK_LIBRARY_DIR . '/build/core-accordion/view.asset.php';
		$this->view_script_module_deps   = $view_asset['dependencies'];
		$this->view_script_module_ver    = $view_asset['version'];
	}

	/**
	 * Register the editor script
	 *
	 * @hook enqueue_block_editor_assets
	 * @return void
	 */
	public function register_editor_script() {
		wp_enqueue_script( $this->editor_script_handle );
	}

	/**
	 * Register the view script
	 *
	 * @hook enqueue_block_assets
	 * @return void
	 */
	public function register_style() {
		wp_enqueue_style( $this->style_handle );
	}

	/**
	 * Extract accordion content for structured data.
	 * Traverses the accordion-content blocks to extract headers and panels.
	 *
	 * @param array $inner_blocks Array of inner blocks from the accordion.
	 * @return array Array of accordion items with title and answer.
	 */
	private function extract_accordion_items( array $inner_blocks ): array {
		$items = array();

		foreach ( $inner_blocks as $content_block ) {
			if ( 'core/accordion-content' !== $content_block['blockName'] ) {
				continue;
			}

			$item = array(
				'title'  => '',
				'answer' => '',
			);

			// Extract header and panel from accordion-content
			if ( isset( $content_block['innerBlocks'] ) ) {
				foreach ( $content_block['innerBlocks'] as $inner_block ) {
					if ( 'core/accordion-header' === $inner_block['blockName'] ) {
						// Get title from attributes
						$item['title'] = $inner_block['attrs']['title'] ?? '';
					} elseif ( 'core/accordion-panel' === $inner_block['blockName'] ) {
						// Render the panel content
						$item['answer'] = render_block( $inner_block );
					}
				}
			}

			if ( ! empty( $item['title'] ) ) {
				$items[] = $item;
			}
		}

		return $items;
	}

	/**
	 * Add FAQPage structured data to accordion.
	 *
	 * @param string $content The block content.
	 * @param array  $block   The block data.
	 * @return string Modified content with schema.org markup.
	 */
	private function add_structured_data( string $content, array $block ): string {
		$processor = new WP_HTML_Tag_Processor( $content );

		// Add FAQPage schema to the accordion wrapper.
		if ( $processor->next_tag( array( 'class_name' => 'wp-block-accordion' ) ) ) {
			$processor->set_attribute( 'itemscope', true );
			$processor->set_attribute( 'itemtype', 'https://schema.org/FAQPage' );
		}

		// Process each accordion-item block.
		while ( $processor->next_tag( array( 'class_name' => 'wp-block-accordion-item' ) ) ) {
			$processor->set_attribute( 'itemscope', true );
			$processor->set_attribute( 'itemprop', 'mainEntity' );
			$processor->set_attribute( 'itemtype', 'https://schema.org/Question' );

			// Find the header within this accordion-item.
			if ( $processor->next_tag( array( 'class_name' => 'wp-block-accordion-header' ) ) ) {
				$processor->set_attribute( 'itemprop', 'name' );
			}

			// Find the panel within this accordion-item.
			if ( $processor->next_tag( array( 'class_name' => 'wp-block-accordion-panel' ) ) ) {
				$processor->set_attribute( 'itemscope', true );
				$processor->set_attribute( 'itemprop', 'acceptedAnswer' );
				$processor->set_attribute( 'itemtype', 'https://schema.org/Answer' );

				// Add itemprop="text" to first paragraph.
				if ( $processor->next_tag( 'p' ) ) {
					$processor->set_attribute( 'itemprop', 'text' );
				}
			}
		}

		return $processor->get_updated_html();
	}

	/**
	 * Render callback for the block
	 *
	 * @param string $block_content The block content.
	 * @param array  $block         The block data.
	 * @param object $instance      The block instance.
	 * @return string The modified block content.
	 */
	public function render( string $block_content, array $block, $instance ): string {
		if ( self::$block_name !== $block['blockName'] ) {
			return $block_content;
		}

		// Add FAQPage structured data if enabled.
		$attributes = $block['attrs'] ?? array();
		if ( isset( $attributes['structuredData'] ) && true === $attributes['structuredData'] ) {
			$block_content = $this->add_structured_data( $block_content, $block );
		}

		// @TODO: Check if at least 1 entity-as-iframe block is present in the block content.
		// If not, return the block content as is.
		if ( ! preg_match( '/class="wp-block-prc-block-entity-as-iframe"/', $block_content ) ) {
			return $block_content;
		}

		// Enqueue the entity-iframe support script.
		wp_enqueue_script_module(
			$this->view_script_module_handle,
			plugins_url( '/build/core-accordion/view.js', PRC_BLOCK_LIBRARY_FILE ),
			$this->view_script_module_deps,
			$this->view_script_module_ver
		);

		// Add Interactivity API support for entity iframe support to each accordion item.
		// This is used to toggle the entity iframe when the accordion is opened/closed.
		$tag_processor = new WP_HTML_Tag_Processor( $block_content );
		while ( $tag_processor->next_tag( array( 'class_name' => 'wp-block-accordion-item' ) ) ) {  
			$tag_processor->set_attribute( 'data-wp-run--watch-open', 'core/accordion-extended::callbacks.watchOpenState' );
		}
		$block_content = $tag_processor->get_updated_html();

		return $block_content;
	}
}
