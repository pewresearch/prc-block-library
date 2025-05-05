<?php
/**
 * Accordion Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Accordion
 * Version:           1.0.0
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Accordion {
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
	 * Render block callback
	 *
	 * @param mixed $attributes Attributes.
	 * @param mixed $content Content.
	 * @param mixed $block Block.
	 * @return string
	 */
	public function render_block_callback( $attributes, $content, $block ) {
		if ( is_admin() ) {
			return $content;
		}
		$icon = \PRC\Platform\Icons\render( 'solid', 'caret-right', 1 );

		$block_gap = \PRC\Platform\Block_Utils\get_block_gap_support_value( $attributes );

		$tag_processor = new \WP_HTML_Tag_Processor( $content );
		$tag_processor->next_tag( 'section' );

		// Check if an anchor id already exists.
		if ( ! $tag_processor->get_attribute( 'id' ) ) {
			$id = wp_unique_id( 'accordion-' );
			$tag_processor->set_attribute( 'id', $id );
		} else {
			$id = $tag_processor->get_attribute( 'id' );
		}

		$tag_processor->set_attribute( 'data-wp-interactive', 'prc-block/accordion-controller' );
		$tag_processor->set_attribute( 'data-wp-class--is-active', 'callbacks.isActiveAccordion' );

		while ( $tag_processor->next_tag( 'h3' ) ) {
			$tag_processor->set_attribute( 'data-wp-on--click', 'actions.onClick' );
			$tag_processor->set_attribute( 'data-wp-class--is-open', 'callbacks.isActiveAccordion' );
		}

		$content = $tag_processor->get_updated_html();

		$content = str_replace( '<span class="wp-block-prc-block-accordion__icon"></span>', wp_sprintf( '<span class="wp-block-prc-block-accordion__icon">%s</span>', $icon ), $content );

		return $content;
	}


	/**
	 * Register the block
	 *
	 * @return void
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/accordion',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}
