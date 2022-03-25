<?php
require_once PRC_VENDOR_DIR . '/autoload.php';

use \WPackio as WPackio;

class Post_Date_Block extends PRC_Block_Library {

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'admin_enqueue_scripts', array( $this, 'register_assets' ), 0 );
		}
	}

	/**
	 * Override the wp-block-post-date style
	 * @return void
	 * @throws LogicException
	 */
	public function register_assets() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'post-date',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		wp_enqueue_script( array_pop($registered['js'])['handle'] );
	}
}

new Post_Date_Block( true );
