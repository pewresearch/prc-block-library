<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';

use WPackio\EnqueueNew;

class Table_Block extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_filter( 'upload_mimes', array( $this, 'allow_csv_mime_type' ) );
			add_action( 'enqueue_block_editor_assets', array( $this, 'register_script' ) );
		}
	}

	public function allow_csv_mime_type( $mimes ) {
		$mimes['csv'] = 'text/csv';
		return $mimes;
	}

	/**
	 * Enqueue a filter plugin for the core/table block. Add's CSV drag and drop support.
	 *
	 * @uses Enqueue
	 */
	public function register_script() {
		$block_js_deps = array( 'react', 'react-dom', 'wp-block-editor', 'wp-components', 'wp-compose', 'wp-hooks', 'wp-element', 'wp-i18n', 'wp-polyfill' );
		$enqueue       = new EnqueueNew( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', plugin_dir_path( __DIR__ ) );

		$enqueue->enqueue(
			'blocks',
			'table',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => $block_js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
	}
}

new Table_Block( true );
