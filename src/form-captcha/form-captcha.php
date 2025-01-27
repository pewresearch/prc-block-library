<?php
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
	public function __construct( $loader ) {
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
			$loader->add_action( 'wp_enqueue_scripts', $this, 'register_turnstile_script', 10 );
		}
	}

	/**
	 * Register the cloudflare turnstile script
	 * @hook wp_enqueue_scripts
	 * @return void
	 */
	public function register_turnstile_script() {
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
			[
				'turnstile_key' => PRC_PLATFORM_TURNSTILE_SITE_KEY,
			]
		);
	}

	/**
	* Registers the block using the metadata loaded from the `block.json` file.
	* Behind the scenes, it registers also all assets so they can be enqueued
	* through the block editor in the corresponding context.
	* @hook init
	*
	* @see https://developer.wordpress.org/reference/functions/register_block_type/
	*/
	public function block_init() {
		register_block_type_from_metadata( PRC_BLOCK_LIBRARY_DIR . '/build/form-captcha');
	}

}
