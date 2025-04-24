<?php
/**
 * Carousel Controller Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use WP_HTML_Tag_Processor;

/**
 * Block Name:        Carousel Controller
 * Version:           1.5.0
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Carousel_Controller {
	/**
	 * Constructor.
	 *
	 * @param array $loader The loader.
	 */
	public function __construct( $loader ) {
		$this->init( $loader );
	}

	/**
	 * Initialize the block.
	 *
	 * @param array $loader The loader.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
			$loader->add_filter( 'render_block', $this, 'render_callback', 10, 3 );
		}
	}

	/**
	 * Adds iAPI directives to the Carousel Controller block.
	 *
	 * @param string $content The content.
	 * @param array  $block The block.
	 * @param array  $wp_block The WordPress block.
	 */
	public function render_callback( $content, $block, $wp_block ) {
		if ( 'prc-block/carousel-controller' !== $block['blockName'] ) {
			return $content;
		}
		$attributes     = \PRC\Platform\Block_Utils\get_block_attributes(
			'prc-block/carousel-controller',
			$block['attrs']
		);
		$is_vertical    = 'vertical' === $attributes['orientation'];
		$arrows_eanbled = $attributes['enableArrows'];
		$dots_enabled   = $attributes['enableDots'];
		$count          = count( $wp_block->parsed_block['innerBlocks'] );

		// Create an array of the number of slides.
		$slides      = array();
		$i           = 0;
		$innerblocks = array_fill( 0, $count, null );
		foreach ( $innerblocks as $innerblock ) {
			$slides[] = array(
				'label' => 'Go to slide ' . ( $i + 1 ),
				'index' => $i,
			);
			++$i;
		}

		$block_id = wp_unique_id( 'prc-block-carousel-controller-' );

		$tag_processor = new WP_HTML_Tag_Processor( $content );

		while ( $tag_processor->next_tag(
			array(
				'tag_name'   => 'div',
				'class_name' => 'wp-block-prc-block-carousel-controller',
			)
		) ) {
			$tag_processor->set_attribute( 'id', $block_id );
			// Set up and add iAPI directives to the Carousel Controller block.
			$tag_processor->set_attribute( 'data-wp-interactive', 'prc-block/carousel-controller' );
			$tag_processor->set_attribute(
				'data-wp-context',
				wp_json_encode(
					array(
						'id'                 => $block_id,
						'enabled'            => false,
						'containerMaxHeight' => 0,
						'slideIndex'         => 0,
						'count'              => $count,
						'orientation'        => $attributes['orientation'],
						'slides'             => $slides,
					)
				)
			);
			$tag_processor->set_attribute( 'data-wp-init', 'callbacks.onInit' );
			$tag_processor->set_attribute( 'data-wp-class--is-enabled', 'context.enabled' );
			$tag_processor->set_attribute( 'data-wp-on-document--scroll', 'callbacks.onCoverScroll' );
			$tag_processor->set_attribute( 'data-wp-watch--cover-final-side-disable', 'callbacks.onCoverFinalSideDisable' );

			$style  = '';
			$style .= '--prc-carousel-controller-dot-color: var(--wp--preset--color--' . $attributes['dotColor'] . ');';
			$style .= '--prc-carousel-controller-arrow-color: var(--wp--preset--color--' . $attributes['arrowColor'] . ');';
			$tag_processor->set_attribute( 'style', $style );

			$content = $tag_processor->get_updated_html();

			// Inject the arrows to the markup if enabled.
			if ( $arrows_eanbled ) {
				$arrows  = wp_sprintf(
					'<div class="prc-block-carousel-controller__arrows"><button class="prc-block-carousel-controller__arrow prc-block-carousel-controller__arrow--prev" data-wp-on--click="actions.goToPreviousSlide" aria-label="Previous slide">%s</button><button class="prc-block-carousel-controller__arrow prc-block-carousel-controller__arrow--next" data-wp-on--click="actions.goToNextSlide" aria-label="Next slide">%s</button></div>',
					\PRC\Platform\Icons\render( 'solid', $is_vertical ? 'chevron-up' : 'chevron-left' ),
					\PRC\Platform\Icons\render( 'solid', $is_vertical ? 'chevron-down' : 'chevron-right' )
				);
				$content = str_replace( '<div class="prc-block-carousel-controller__arrows"></div>', $arrows, $content );
			}

			// Inject the dots to the markup if enabled.
			if ( $dots_enabled ) {
				$dots    = wp_sprintf(
					'<div class="prc-block-carousel-controller__dots"><template data-wp-each--dot="context.slides"><button class="prc-block-carousel-controller__dot" data-wp-on--click="actions.goToDot" data-wp-bind--data-slide-index="context.dot.index" data-wp-bind--aria-label="context.dot.label" data-wp-bind--data-active="callbacks.isDotActive">%s</button></template></div>',
					\PRC\Platform\Icons\render( 'solid', 'circle' )
				);
				$content = str_replace( '<div class="prc-block-carousel-controller__dots"></div>', $dots, $content );
			}
		}

		return $content;
	}

	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @hook init
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/carousel-controller',
		);
	}
}
