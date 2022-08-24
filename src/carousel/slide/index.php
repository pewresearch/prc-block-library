<?php
use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/scrolling-display-block` block.
 *
 * @package gutenberg
 */

class Carousel_Slide extends PRC_Block_Library {
	public static $version = '1.0.9';

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$block_attrs = get_block_wrapper_attributes();

		return wp_sprintf(
			'<div %1$s>%2$s</div>',
			$block_attrs,
			$content
		);
	}

	public function register_block() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', self::$version, 'plugin', parent::$plugin_file );

		$block = $enqueue->register(
			'blocks',
			'carousel-slide',
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
			plugin_dir_path( __DIR__ ) . 'slide',
			array(
				'editor_script'   => array_pop( $block['js'] )['handle'],
				'style'           => array_pop( $block['css'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Carousel_Slide( true );
