<?php
/**
 * Plugin Name: PRC Block Library
 * Plugin URI: https://pewresearch.org
 * Description: PRC Block Library: Story Item, Card, Pancake Promo, Posts (Fact Tank Widget)
 * Author: Seth Rubenstein
 * Author URI: https://sethrubenstein.info
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once __DIR__ . '/vendor/autoload.php';

class PRC_Block_Library {

	protected $js_deps = array( 'react', 'react-dom', 'wp-element', 'wp-components', 'wp-polyfill' );
	public $plugin_dir = false;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			$this->plugin_dir = __DIR__ . '/prc_blocks/';
			add_action( 'init', array( $this, 'register_block_assets' ) );
		}
	}

	/**
	 * Enqueue Gutenberg block assets for both frontend + backend.
	 *
	 * Assets enqueued:
	 * 1. blocks.style.build.css - Frontend + Backend.
	 * 2. blocks.build.js - Backend.
	 * 3. blocks.editor.build.css - Backend.
	 *
	 * @uses {wp-blocks} for block type registration & related functions.
	 * @uses {wp-element} for WP Element abstraction — structure of blocks.
	 * @uses {wp-i18n} to internationalize the block's text.
	 * @uses {wp-editor} for WP editor styles.
	 * @since 1.0.0
	 */
	public function register_block_assets() { // phpcs:ignore
		$enqueue = new \WPackio\Enqueue( 'prcBlocksLibrary', 'dist', '1.0.0', 'plugin', $this->plugin_dir );

		// Story Item
		$js_deps   = $this->js_deps;
		$js_deps[] = 'moment';
		$assets    = $enqueue->register(
			'story-item',
			'main',
			[
				'js'        => true,
				'css'       => true,
				'js_dep'    => $js_deps,
				'css_dep'   => [],
				'in_footer' => true,
				'media'     => 'all',
			]
		);
		register_block_type(
			'prc-block/story-item',
			array(
				// We're only enqueing these in the block editor, not the front end.
				'editor_script' => array_pop( $assets['js'] )['handle'],
				'editor_style'  => array_pop( $assets['css'] )['handle'],
			)
		);

		// Pancake Promo
		$assets = $enqueue->register(
			'pancake-promo',
			'main',
			[
				'js'        => true,
				'css'       => true,
				'js_dep'    => $this->js_deps,
				'css_dep'   => [],
				'in_footer' => true,
				'media'     => 'all',
			]
		);
		register_block_type(
			'prc-block/pancake-promo',
			array(
				// We're only enqueing these in the block editor, not the front end.
				'editor_script' => array_pop( $assets['js'] )['handle'],
				'style'         => array_pop( $assets['css'] )['handle'],
			)
		);

	}


}

new PRC_Block_Library( true );
