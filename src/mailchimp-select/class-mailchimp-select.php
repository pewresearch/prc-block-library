<?php
/**
 * MailChimp Select Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        MailChimp Select
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Mailchimp_Select {
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
	 * @param array  $attributes Block attributes.
	 * @param string $content Block content.
	 * @return string Block HTML.
	 */
	public function render_block_callback( $attributes, $content, $block ) {
		wp_enqueue_script( 'wp-api-fetch' );
		wp_enqueue_script( 'wp-url' );

		$mailchimp = new \PRC\Platform\Mailchimp( null, null );
		$nonce     = $mailchimp->get_nonce();

		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'id'                  => wp_unique_id( 'mailchimp-select-' ),
				'data-wp-interactive' => 'prc-block/mailchimp-select',
				'data-wp-context'     => wp_json_encode(
					array(
						'NONCE' => $nonce,
					)
				),
			)
		);

		return wp_sprintf(
			'<div %1$s>%2$s</div>',
			$wrapper_attributes,
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
			PRC_BLOCK_LIBRARY_DIR . '/build/mailchimp-select',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}
