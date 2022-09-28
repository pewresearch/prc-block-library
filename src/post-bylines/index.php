<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';

use PRC_Core\Hybrid_People\prc_get_bylines;
use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/post-bylines` block.
 *
 * @package gutenberg
 */

class Post_Bylines_Block extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function render_post_bylines( $attributes ) {
		$post_id = get_the_ID();
		if ( false === $post_id ) {
			return null;
		}
		$text_align = isset( $attributes['textAlign'] ) ? $attributes['textAlign'] : 'left';
		$block_attrs = get_block_wrapper_attributes(array(
			'class' => 'has-text-align' . '-' . $text_align,
		));
		return wp_sprintf( '<div %1$s>By %2$s</div>',$block_attrs, prc_get_bylines( (int) $post_id ) );
	}

	/**
	 * Register the menu link block.
	 *
	 * @uses render_post_bylines()
	 * @throws WP_Error An WP_Error exception parsing the block definition.
	 */
	public function register_block() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', plugin_dir_path( __DIR__ ) );

		$registered = $enqueue->register(
			'blocks',
			'post-bylines',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . '/post-bylines',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'style'   => array_pop( $registered['css'] )['handle'],
				'render_callback' => array( $this, 'render_post_bylines' ),
			)
		);
	}
}

new Post_Bylines_Block( true );
