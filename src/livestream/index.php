<?php
require_once PRC_VENDOR_DIR . '/autoload.php';

use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/livestream` block.
 *
 * @package gutenberg
 */

class Livestream extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function render_block_callback($attributes) {
		$wrapper_attributes = get_block_wrapper_attributes();
		return wp_sprintf(
			'<div %1$s><div class="wp-block-prc-block-livestream--stream"><iframe title="Video" src="%2$s" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe></div><div class="wp-block-prc-block-livestream--chat"><iframe title="Slido" src="%3$s" frameBorder="0"></iframe></div></div>',
			$wrapper_attributes,
			$attributes['streamUrl'],
			$attributes['chatUrl'],
		);
	}

	public function register_block() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', plugin_dir_path( __DIR__ ) );

		$registered = $enqueue->register(
			'blocks',
			'livestream',
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
			plugin_dir_path( __DIR__ ) . '/livestream',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'style'           => array_pop( $registered['css'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Livestream( true );
