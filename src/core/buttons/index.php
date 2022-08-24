<?php
require_once PRC_VENDOR_DIR . '/autoload.php';
use \WPackio as WPackio;

class Core_Buttons extends PRC_Block_Library {
	public static $block_name = 'core/buttons';
	public static $version = '1.0.1';

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'admin_enqueue_scripts', array( $this, 'register_assets' ) );
			add_action( 'wp_enqueue_scripts', array( $this, 'register_assets' ) );
		}
	}

	public function register_assets() {
		wp_deregister_style( 'wp-block-buttons' );

		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', self::$version, 'plugin', parent::$plugin_file );

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

new Core_Buttons( true );
