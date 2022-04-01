<?php
use \WPackio as WPackio;

class Image extends PRC_Block_Library {
	public static $version = '1.0.0';

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'admin_enqueue_scripts', array( $this, 'register_assets' ) );
			add_action( 'wp_enqueue_scripts', array( $this, 'register_assets' ) );
		}
	}

	public function register_assets() {
		wp_deregister_style( 'wp-block-image' );

		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', self::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'image',
			array(
				'js'        => false,
				'css'       => true,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		$src = array_pop( $registered['css'] )['url'];

		wp_register_style( 'wp-block-image', $src,  array(), self::$version );
	}
}

new Image( true );
