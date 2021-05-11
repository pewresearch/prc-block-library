<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';
use WPackio\Enqueue;

/**
 * Server-side rendering of the `prc-block/wp-object` block.
 *
 * @package gutenberg
 */

class WP_Object_Block extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function render_wp_object_callback( $attributes, $content, $block ) {
		if ( is_admin() ) {
			return;
		}
		
		$id        = (int) $attributes['objectInfo']['id'];
		$post_type = $attributes['objectInfo']['type'];

		$output = null;
		
		if ( function_exists( 'prc_get_block_area_by_id' ) && 'template-block' === $post_type ) {
			$template_block = \prc_get_block_area_by_id( $id );
			if ( false !== $template_block ) {
				$output = $template_block;
			}
		} else {
			$object = get_post( $id );
			if ( ! is_wp_error( $object ) && $id === $object->ID ) {
				$output = wp_kses( $object->post_content, 'post' );
			}
		}

		return $output;
	}

	public function register_block() {
		$block_editor_js_deps = array( 'react', 'react-dom', 'wp-api-fetch', 'wp-components', 'wp-element', 'wp-i18n', 'wp-polyfill' );
		$enqueue              = new Enqueue( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', plugin_dir_path( __DIR__ ) );

		$registered = $enqueue->register(
			'blocks',
			'wp-object',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => $block_editor_js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . '/wp-object',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'render_callback' => array( $this, 'render_wp_object_callback' ),
			)
		);
	}
}

new WP_Object_Block( true );
