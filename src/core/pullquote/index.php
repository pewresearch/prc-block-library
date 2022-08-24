<?php
require_once PRC_VENDOR_DIR . '/autoload.php';
use \WPackio as WPackio;

class Core_Pullquote extends PRC_Block_Library {
	public static $block_name = 'core/pullquote';
	public static $version = '1.0.1';

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'admin_enqueue_scripts', array( $this, 'register_assets' ), 0 );
			add_action( 'wp_enqueue_scripts', array( $this, 'register_assets' ) );
		}
	}

	/**
	 * Override the wp-block-pullquote style
	 * @return void
	 * @throws LogicException
	 */
	public function register_assets() {
		wp_deregister_style( 'wp-block-pullquote' );

		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', self::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'pullquote',
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

		wp_register_style( 'wp-block-pullquote', $src,  array(), self::$version );
	}
}

new Core_Pullquote( true );
