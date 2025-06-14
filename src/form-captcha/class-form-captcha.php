<?php
/**
 * Form Captcha Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Form Captcha
 * Description:       Display a captcha form element
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Form_Captcha {
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
			$loader->add_action( 'wp_enqueue_scripts', $this, 'register_turnstile_script', 10 );
		}
	}

	/**
	 * Render the block callback
	 *
	 * @param array  $attributes The attributes of the block.
	 * @param string $content The content of the block.
	 * @param object $block The block object.
	 * @return string The rendered block.
	 */
	public function render_block_callback( $attributes, $content, $block ) {
		wp_enqueue_script( 'cloudflare-turnstile' );

		$target_namespace    = array_key_exists( 'interactiveNamespace', $attributes ) ? $attributes['interactiveNamespace'] : 'prc-block/form';
		$target_store        = $target_namespace . '::';
		$block_wrapper_attrs = get_block_wrapper_attributes(
			array(
				'data-wp-interactive'             => 'prc-block/form-captcha',
				'data-wp-context'                 => wp_json_encode(
					array(
						'targetNamespace' => $target_namespace,
					)
				),
				'data-wp-watch--onDisplayCaptcha' => 'callbacks.onDisplayCaptcha',
				'data-wp-bind--hidden'            => $target_store . 'context.captchaHidden',
			)
		);

		return wp_sprintf(
			'<div %1$s>%2$s</div>',
			$block_wrapper_attrs,
			'<div class="wp-block-prc-block-form-captcha__captcha"></div>',
		);
	}

	/**
	 * Register the cloudflare turnstile script
	 *
	 * @hook wp_enqueue_scripts
	 * @return void
	 */
	public function register_turnstile_script() {
		// If no site key is defined, don't register the script.
		if ( ! defined( 'PRC_PLATFORM_TURNSTILE_SITE_KEY' ) ) {
			return;
		}
		wp_register_script(
			'cloudflare-turnstile',
			'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback',
			array(),
			'1.0.0',
			array(
				'defer' => true,
			)
		);
		wp_localize_script(
			'cloudflare-turnstile',
			'prcFormInputCaptcha',
			array(
				'turnstile_key' => PRC_PLATFORM_TURNSTILE_SITE_KEY,
			)
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
			PRC_BLOCK_LIBRARY_DIR . '/build/form-captcha',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}
