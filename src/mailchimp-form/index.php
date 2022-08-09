<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';

use \WPackio as WPackio;

class Mailchimp_Form extends PRC_Block_Library {
	public static $version = '1.0.2';

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ) );
		}
	}

	public function render_mailchimp_form_callback( $attributes, $content, $block ) {
		$this->enqueue_frontend_assets();

		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'id'               => md5( wp_json_encode( $attributes ) ),
				'class'            => array_key_exists( 'className', $attributes ) ? $attributes['className'] : '',
				'data-segment-id'  => $attributes['interest'],
				'data-has-dark-bg' => array_key_exists('prc-block/hasDarkBackground', $block->context) ? $block->context['prc-block/hasDarkBackground'] : false,
				'data-button-color' => $attributes['buttonColor'],
			)
		);
		return wp_sprintf(
			'<div %1$s></div>',
			$wrapper_attributes,
		);
	}

	public function enqueue_frontend_assets() {
		if ( is_admin() ) {
			return;
		}
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', self::$version, 'plugin', parent::$plugin_file );
		$enqueue->enqueue(
			'frontend',
			'mailchimp-form',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => array( 'wp-dom-ready', 'wp-element', 'wp-api-fetch' ),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
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
				'js_dep'    => array( 'wp-components', 'wp-block-editor', 'wp-blocks', 'wp-i18n', 'wp-element' ),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . '/mailchimp-form',
			array(
				'editor_script'   => array_pop( $assets['js'] )['handle'],
				'editor_style'    => array_pop( $assets['css'] )['handle'],
				'render_callback' => array( $this, 'render_mailchimp_form_callback' ),
			)
		);
	}
}

new Mailchimp_Form( true );
