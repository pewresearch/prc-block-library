<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';

use \WPackio as WPackio;

class Cover_Block extends PRC_Block_Library {
	public static $version = '1.0.1acc';

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'enqueue_block_editor_assets', array( $this, 'register_script' ) );
			add_filter( 'render_block', array( $this, 'cover_block_render' ), 10, 2 );
		}
	}

	public function enqueue_assets() {
		$enqueue       = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );
		$enqueue->enqueue(
			'blocks',
			'cover',
			array(
				'js'        => false,
				'css'       => true,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
	}

	public function cover_block_render( $block_content, $block ) {
		if ( 'core/cover' !== $block['blockName'] || is_admin() ) {
			return $block_content;
		}

		$this->enqueue_assets();

		return $block_content;
	}

	/**
	 * Enqueue a modification plugin for the core/group block and override the render_callback
	 *
	 * @uses Enqueue
	 */
	public function register_script() {
		$this->enqueue_assets();
	}
}

new Cover_Block( true );
