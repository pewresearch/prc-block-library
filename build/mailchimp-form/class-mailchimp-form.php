<?php
/**
 * MailChimp Form Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use WP_HTML_Tag_Processor;
/**
 * Block Name:        MailChimp Form
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Mailchimp_Form {
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
			$loader->add_filter( 'block_bindings_supported_attributes_prc-block/mailchimp-form', $this, 'enable_pattern_overrides' );
		}
	}

	/**
	 * Enable pattern overrides for the mailchimp form block
	 *
	 * @hook block_bindings_supported_attributes_prc-block/mailchimp-form
	 * @param array $supported_attributes Supported attributes.
	 * @return array
	 */
	public function enable_pattern_overrides( $supported_attributes ) {
		$supported_attributes[] = 'interest';
		$supported_attributes[] = 'mailchimpFormId';
		return $supported_attributes;
	}

	/**
	 * Render the block callback
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content Block content.
	 * @return string Block HTML.
	 */
	public function render_block_callback( $attributes, $content, $block = null ) {
		wp_enqueue_script( 'wp-api-fetch' );
		wp_enqueue_script( 'wp-url' );

		$mailchimp_form_id = isset( $attributes['mailchimpFormId'] )
			? trim( (string) $attributes['mailchimpFormId'] )
			: '';
		$form_id_for_api   = '' !== $mailchimp_form_id ? $mailchimp_form_id : false;

		$wrapper_attributes = array(
			'data-wp-interactive' => 'prc-block/mailchimp-form',
			'data-wp-context'     => 			wp_json_encode(
				array(
					'interest' => array_key_exists( 'interest', $attributes ) ? $attributes['interest'] : false,
					'formId'   => $form_id_for_api,
				)
			),
		);

		if ( empty( $attributes['anchor'] ) ) {
			$wrapper_attributes['id'] = wp_unique_id( 'mailchimp-form-' );
		}

		$block_wrapper_attributes = get_block_wrapper_attributes( $wrapper_attributes );

		return wp_sprintf(
			'<div %1$s>%2$s</div>',
			$block_wrapper_attributes,
			$content,
		);
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
			PRC_BLOCK_LIBRARY_DIR . '/build/mailchimp-form',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}
