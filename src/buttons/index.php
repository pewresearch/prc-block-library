<?php
use \WPackio as WPackio;

// @TODO WORK IN PROGRESS: Core buttons takeover
class Buttons extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'admin_enqueue_scripts', array( $this, 'register_assets' ) );
			add_action( 'wp_enqueue_scripts', array( $this, 'register_assets' ) );
		}
	}

	public function register_assets() {
		wp_deregister_style( 'wp-block-buttons' );

		$ver = parent::$version;
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', $ver, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'buttons',
			array(
				'js'        => false,
				'css'       => false,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
		//@TODO: Enable these when we move button styles over

		// $src = array_pop( $registered['css'] )['url'];

		// wp_register_style( 'wp-block-buttons', $src,  array(), $ver );
	}
}

new Buttons( true );
