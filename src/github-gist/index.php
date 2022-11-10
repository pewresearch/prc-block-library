<?php
use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/github-gist` block.
 *
 * @package gutenberg
 */

class Github_Gist extends PRC_Block_Library {
	public static $version = '1.0.1';

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$block_wrapper_attributes = get_block_wrapper_attributes(
			array(
				'id' => md5( wp_json_encode( $attributes ) ),
			)
		);
		$src = $attributes['file'] ? "{$attributes['url']}.js?file={$attributes['file']}" : "{$attributes['url']}.js";
		return wp_sprintf(
			'<div %1$s><script src="%2$s"></script>%3$s</div>',
			$block_wrapper_attributes,
			$src,
			$content
		);
	}

	public function register_block() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', self::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'github-gist',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . '/github-gist',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Github_Gist( true );
