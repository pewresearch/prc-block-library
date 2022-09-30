<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';

use \WPackio as WPackio;

class Mailchimp_Form extends PRC_Block_Library {
	public static $version = '1.0.2';
	public static $view_script_handle = null;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ) );
		}
	}

	public function render_mailchimp_form_callback( $attributes, $content, $block ) {
		wp_enqueue_script( self::$view_script_handle );

		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'id'               => md5( wp_json_encode( $attributes ) ),
				'class'            => array_key_exists( 'className', $attributes ) ? $attributes['className'] : '',
				'data-segment-id'  => $attributes['interest'],
			)
		);
		
		return wp_sprintf(
			'<div %1$s>%2$s</div>',
			$wrapper_attributes,
			$content
		);
	}

	public function register_block() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', self::$version, 'plugin', parent::$plugin_file );

		$assets = $enqueue->register(
			'blocks',
			'mailchimp-form',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		$view = $enqueue->register(
			'view',
			'mailchimp-form',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
		self::$view_script_handle = array_pop( $view['js'] )['handle'];

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . '/mailchimp-form',
			array(
				'editor_script'   => array_pop( $assets['js'] )['handle'],
				'style'           => array_pop( $assets['css'] )['handle'],
				// 'view_script'     => array_pop( $view['js'] )['handle'], @TODO: This is not working.
				'render_callback' => array( $this, 'render_mailchimp_form_callback' ),
			)
		);
	}
}

new Mailchimp_Form( true );
