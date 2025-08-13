<?php
/**
 * Dialog Trigger Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Dialog Trigger
 * Version:           1.0.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Dialog_Trigger {
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
	 * Render the block callback
	 *
	 * @param array    $attributes Attributes.
	 * @param string   $content Content.
	 * @param WP_Block $block Block.
	 * @return string HTML.
	 */
	public function render_block_callback( $attributes, $content, $block ) {
		$context_id = isset( $block->context['dialog/id'] ) ? $block->context['dialog/id'] : null;

		$disengage_click_handler = array_key_exists( 'disengageClickHandler', $attributes ) && true === $attributes['disengageClickHandler'];

		$tag_processor = new \WP_HTML_Tag_Processor( $content );
		$tag_processor->next_tag(
			array(
				'class_name' => 'wp-block-prc-block-dialog-trigger',
			)
		);
		$tag_processor->set_attribute( 'data-wp-interactive', 'prc-block/dialog' );
		if ( true !== $disengage_click_handler ) {
			while ( $tag_processor->next_tag() ) {
				$tag_processor->set_attribute( 'aria-labelledby', $context_id );
				$tag_processor->set_attribute( 'data-wp-on--click', 'actions.onClickOpen' );
			}
		}
		return $tag_processor->get_updated_html();
	}

	/**
	 * Block init
	 *
	 * @hook init
	 * @return void
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/dialog-trigger',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}
