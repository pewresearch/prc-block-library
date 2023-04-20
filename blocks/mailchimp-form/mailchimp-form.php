<?php
/**
 * Block Name:        MailChimp Form
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class MailchimpForm extends PRC_Block_Library {
	public static $version = '0.1.0';
	public static $dir = __DIR__;

	public function __construct( $init = false ) {
		if ( defined('PRC_PLATFORM') && true !== PRC_PLATFORM ) {
			return;
		}
		if ( true === $init ) {
			add_action('init', array($this, 'block_init'));
		}
	}

	/**
	* Registers the block using the metadata loaded from the `block.json` file.
	* Behind the scenes, it registers also all assets so they can be enqueued
	* through the block editor in the corresponding context.
	*
	* @see https://developer.wordpress.org/reference/functions/register_block_type/
	*/
	public function block_init() {
		if ( null === PRC_HCAPTCHA_KEY ) {
			return;
		}

		$block = register_block_type( self::$dir . '/build' );
		$view_script_handle = isset( $block->view_script_handles ) && ! empty( $block->view_script_handles ) ? $block->view_script_handles[0] : null;
		wp_localize_script( $view_script_handle, 'mailChimpFormConfig', array(
			'HCAPTCHA_KEY' => PRC_HCAPTCHA_KEY,
		) );
	}

}

new MailchimpForm(true);
