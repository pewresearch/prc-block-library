<?php
/**
 * Accordion Controller Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use WP_Block_Type_Registry, WP_HTML_Tag_Processor;

/**
 * Block Name:        Accordion Controller
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Accordion_Controller {
	/**
	 * Constructor
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		$this->init( $loader );
	}

	/**
	 * Initialize the block
	 *
	 * @param mixed $loader Loader.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
		}
	}

	/**
	 * Add structured data to accordion content
	 *
	 * @param string $content Content.
	 * @return string
	 */
	public function add_structured_data_to_accordion( $content ) {
		$processor = new WP_HTML_Tag_Processor( $content );

		$processor->set_attribute( 'itemscope', true );
		$processor->set_attribute( 'itemtype', 'https://schema.org/FAQPage' );

		while ( $processor->next_tag( array( 'class_name' => 'wp-block-prc-block-accordion' ) ) ) {
			$processor->set_attribute( 'itemscope', true );
			$processor->set_attribute( 'itemprop', 'mainEntity' );
			$processor->set_attribute( 'itemtype', 'https://schema.org/Question' );

			if ( $processor->next_tag( array( 'class_name' => 'wp-block-prc-block-accordion__title' ) ) ) {
				$processor->set_attribute( 'itemprop', 'name' );
			}

			if ( $processor->next_tag( array( 'class_name' => 'wp-block-prc-block-accordion__content' ) ) ) {
				$processor->set_attribute( 'itemscope', true );
				$processor->set_attribute( 'itemprop', 'acceptedAnswer' );
				$processor->set_attribute( 'itemtype', 'https://schema.org/Answer' );

				if ( $processor->next_tag( 'p' ) ) {
					$processor->set_attribute( 'itemprop', 'text' );
				}
			}
		}

		return $processor->get_updated_html();
	}

	/**
	 * Render the block callback
	 *
	 * @param array    $attributes The block attributes.
	 * @param string   $content The block content.
	 * @param WP_Block $block The block instance.
	 * @return string The block content.
	 */
	public function render_block_callback( $attributes, $content, $block ) {
		if ( isset( $attributes['structuredData'] ) && $attributes['structuredData'] ) {
			$content = $this->add_structured_data_to_accordion( $content );
		}
		$tag_processor = new \WP_HTML_Tag_Processor( $content );
		$tag_processor->next_tag();
		$tag_processor->set_attribute( 'data-wp-interactive', 'prc-block/accordion-controller' );
		$tag_processor->set_attribute( 'data-wp-context', wp_json_encode( array( 'activeId' => null ) ) );
		$tag_processor->set_attribute( 'data-wp-init', 'callbacks.onInit' );
		return $tag_processor->get_updated_html();
	}

	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/deprecated/build/accordion-controller',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}
