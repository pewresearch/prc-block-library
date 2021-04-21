<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';

use WPackio\Enqueue;

class Group_Block extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'enqueue_block_editor_assets', array( $this, 'register_script' ) );
			add_filter( 'render_block', array( $this, 'group_block_render_callback' ), 10, 2 );
		}
	}

	public function enqueue_assets( $js = true, $css = true ) {
		$block_js_deps = array( 'react', 'react-dom', 'wp-blocks', 'wp-hooks', 'wp-element', 'wp-i18n', 'wp-polyfill' );
		$enqueue       = new Enqueue( 'prcBlocksLibrary', 'dist', '1.0.0', 'plugin', plugin_dir_path( __DIR__ ) );
		$enqueue->enqueue(
			'blocks',
			'group',
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

	public function group_block_render_callback( $block_content, $block ) {
		if ( 'core/group' !== $block['blockName'] ) {
			return $block_content;
		}
		
		$this->enqueue_assets( false );

		return $block_content;
	}

	/**
	 * Enqueue a modification plugin for the core/group block and override the render_callback
	 *
	 * @uses Enqueue
	 */
	public function register_script() {
		$this->enqueue_assets( true, true );
	}
}

new Group_Block( true );
