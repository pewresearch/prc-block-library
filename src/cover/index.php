<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';

use WPackio\Enqueue;

class Cover_Block extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'enqueue_block_editor_assets', array( $this, 'register_script' ) );
			add_filter( 'render_block', array( $this, 'cover_block_render' ), 10, 2 );
		}
	}

	public function enqueue_assets( $js = true, $css = true ) {
		$block_js_deps = array( 'wp-dom-ready', 'wp-i18n', 'wp-polyfill' );
		$enqueue       = new Enqueue( 'prcBlocksLibrary', 'dist', '1.0.0', 'plugin', plugin_dir_path( __DIR__ ) );
		$enqueue->enqueue(
			'frontend',
			'cover',
			array(
				'js'        => $js,
				'css'       => $css,
				'js_dep'    => true === $js ? $block_js_deps : array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
	}

	public function cover_block_render( $block_content, $block ) {
		if ( 'core/heading' !== $block['blockName'] ) {
			return $block_content;
		}
		
		$this->enqueue_assets( true, true );

		return $block_content;
	}

	/**
	 * Enqueue a modification plugin for the core/group block and override the render_callback
	 *
	 * @uses Enqueue
	 */
	public function register_script() {
		$block_js_deps = array( 'wp-blocks', 'wp-dom-ready', 'wp-i18n', 'wp-polyfill' );
		$enqueue       = new Enqueue( 'prcBlocksLibrary', 'dist', '1.0.0', 'plugin', plugin_dir_path( __DIR__ ) );
		$enqueue->enqueue(
			'blocks',
			'cover',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => $block_js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
	}
}

new Cover_Block( true );
