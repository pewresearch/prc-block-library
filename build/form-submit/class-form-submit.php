<?php
/**
 * Form Submit Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Form Submit
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Form_Submit {
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
	 * Add directives to submit button, and other needed elements in inner blocks
	 *
	 * @param array  $attributes Attributes.
	 * @param string $content Content.
	 * @return string
	 */
	public function render_block_callback( $attributes, $content ) {
		$tag         = new \WP_HTML_Tag_Processor( $content );
		$button_text = null;
		while ( $tag->next_tag(
			array(
				'tag_name' => 'button',
			)
		) ) {
			if ( 'submit' === $tag->get_attribute( 'type' ) ) {
				$button_text = Core_Button::get_button_text( $content );
				$tag->set_attribute( 'data-wp-bind--disabled', 'prc-block/form::state.submissionDisabled' );
				if ( null !== $button_text ) {
					$tag->set_attribute( 'data-wp-text', 'prc-block/form::state.submitButtonText' );
				}
			}
		}
		// Add the button text to the form's context.
		$context = array();
		if ( null !== $button_text ) {
			$context = array(
				'submitButtonText' => $button_text,
			);
		}

		$content = $tag->get_updated_html();

		$block_wrapper_attrs = get_block_wrapper_attributes(
			array(
				'data-wp-class--captcha-hidden' => 'prc-block/form::context.captchaHidden',
				'data-wp-context'               => wp_json_encode( $context ),
			)
		);

		return wp_sprintf( '<div %s>%s</div>', $block_wrapper_attrs, $content );
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
			PRC_BLOCK_LIBRARY_DIR . '/build/form-submit',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}
