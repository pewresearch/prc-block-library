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
	public static $block_json;
	public static $block_name;
	public static $version;
	public static $dir = __DIR__;

	public function __construct( $loader ) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/form-captcha/build/block.json';
		self::$block_json = wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		self::$block_name = self::$block_json['name'];
		self::$version = self::$block_json['version'];
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
			'PRC_PLATFORM_TURNSTILE_SITE_KEY',
			PRC_PLATFORM_TURNSTILE_SITE_KEY
		);
		do_action('qm/debug', 'PRC_PLATFORM_TURNSTILE_SITE_KEY: ' . PRC_PLATFORM_TURNSTILE_SITE_KEY);
		do_action('qm/debug', 'PRC_PLATFORM_MAILCHIMP_KEY: ' .PRC_PLATFORM_MAILCHIMP_KEY);
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
		register_block_type( self::$dir . '/build' );
	}

}
