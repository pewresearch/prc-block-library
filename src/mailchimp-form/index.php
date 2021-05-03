<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';

use WPackio\Enqueue;

class Mailchimp_Form extends PRC_Block_Library {

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ) );
		}
	}

	public function render_mailchimp_form_callback( $attributes, $content, $block ) {
		$this->enqueue_frontend_assets();
		return $content;
	}

	public function enqueue_frontend_assets() {
		if ( is_admin() ) {
			return;
		}
		$enqueue = new Enqueue( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', plugin_dir_path( __DIR__ ) );
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
		$enqueue = new Enqueue( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', plugin_dir_path( __DIR__ ) );

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
