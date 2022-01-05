<?php
use \WPackio as WPackio;

class Image extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action('wp_enqueue_scripts', array( $this, 'deregister_core_style' ) );
			add_action( 'wp_head', array($this, 'deregister_core_styles'), 1 );
			add_action( 'wp_footer', array($this, 'deregister_core_styles'), 1 );
		}
	}

	public function deregister_core_style() {
		wp_deregister_style( 'wp-block-image' );
	}

	// Basing logic on how to hook in here https://github.com/WordPress/gutenberg/blob/trunk/lib/blocks.php#L284-L313.
	public function deregister_core_styles() {
		global $wp_styles;

		// Build an array of styles that have a path defined.
		foreach ( $wp_styles->queue as $handle ) {
			if ( wp_styles()->get_data( $handle, 'path' ) && file_exists( $wp_styles->registered[ $handle ]->extra['path'] ) ) {
				do_action('qm/debug', print_r($wp_styles->registered[ $handle ], true) );
				// We'll need to do a wp_register_style() for this one.
				// Then we'll need to add a new style with the same handle pointing to our own file.
			}
		}
	}

	public function register_new_styles() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );

		// $registered = $enqueue->register(
		// 	'blocks',
		// 	'image',
		// 	array(
		// 		'js'        => false,
		// 		'css'       => true,
		// 		'js_dep'    => array(),
		// 		'css_dep'   => array(),
		// 		'in_footer' => true,
		// 		'media'     => 'all',
		// 	)
		// );
	}
}

new Image( true );
