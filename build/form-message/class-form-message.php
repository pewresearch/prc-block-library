<?php
/**
 * Form Message Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Form Message
 * Description:       Display messages or alerts in interactive applications.
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Form_Message {
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
	 * @return string
	 */
	public function render_block_callback( $attributes, $content, $block ) {
		$block_wrapper_attrs = get_block_wrapper_attributes(
			array(
				'data-wp-interactive' => 'prc-block/form',
				'data-wp-class--is-displaying-form-message' => 'state.formMessage',
			)
		);

		$content = str_replace(
			array(
				'{{message}}',
				'{{form message}}',
				'{{form-message}}',
				'{{form_message}}',
			),
			'<span data-wp-text="state.formMessage"></span>',
			$content
		);

		return wp_sprintf(
			'<div %1$s>%2$s</div>',
			$block_wrapper_attrs,
			$content,
		);
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
			PRC_BLOCK_LIBRARY_DIR . '/build/form-message',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}
