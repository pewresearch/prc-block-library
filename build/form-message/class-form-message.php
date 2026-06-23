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
			$loader->add_action( 'init', $this, 'register_block_bindings' );
			$loader->add_filter( 'render_block', $this, 'inject_message_binding', 20, 2 );
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

		/*
		 * save.jsx already serialises the outer <div> with the block wrapper
		 * classes (via useBlockProps.save). Use WP_HTML_Tag_Processor to stamp
		 * the Interactivity API attributes onto that existing tag rather than
		 * wrapping in a second <div> via get_block_wrapper_attributes().
		 */
		$tag = new \WP_HTML_Tag_Processor( $content );
		if ( $tag->next_tag() ) {
			$tag->add_class( 'wp-block-prc-block-form-message');


			$tag->set_attribute( 'data-wp-interactive', 'prc-block/form' );
			$tag->set_attribute( 'data-wp-class--is-displaying-form-message', 'state.formMessage' );
		}

		return $tag->get_updated_html();
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

	/**
	 * Register the form result message block bindings source.
	 *
	 * @hook init
	 *
	 * @return void
	 */
	public function register_block_bindings() {
		register_block_bindings_source(
			'prc-block/form-message',
			array(
				'label'              => __( 'Form Result Message', 'prc-block-library' ),
				'get_value_callback' => function () {
					return '';
				},
			)
		);
	}

	/**
	 * Stamp the Interactivity API directive onto paragraphs bound to
	 * prc-block/form-message.
	 *
	 * The form result message is a runtime value in the prc-block/form
	 * interactivity store, so the binding source returns an empty string at
	 * render time and this filter wires the <p> to state.formMessage.
	 *
	 * @hook render_block
	 *
	 * @param string $html  Rendered block HTML.
	 * @param array  $block Parsed block array.
	 * @return string Modified HTML.
	 */
	public function inject_message_binding( $html, $block ) {
		if ( 'core/paragraph' !== ( $block['blockName'] ?? '' ) ) {
			return $html;
		}

		$metadata   = $block['attrs']['metadata'] ?? array();
		$bindings   = $metadata['bindings'] ?? array();
		$content_source = $bindings['content']['source'] ?? '';
		if ( 'prc-block/form-message' !== $content_source ) {
			return $html;
		}

		$tag = new \WP_HTML_Tag_Processor( $html );
		if ( $tag->next_tag( 'p' ) ) {
			$tag->set_attribute( 'data-wp-text', 'state.formMessage' );
		}

		return $tag->get_updated_html();
	}
}
