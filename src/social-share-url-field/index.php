<?php
use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/social-share-url-field` block.
 *
 * @package gutenberg
 */

class Social_Share_URL_Field extends PRC_Block_Library {
	public static $version = 1.0;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function render_block_callback( $attributes, $content, $block ) {
		// If this block is going to be used in the theme or be called directly by PHP it is sometimes easier to use our internal function for of this function.
		// See https://github.com/pewresearch/pewresearch-org/blob/main/plugins/prc-block-library/prc-block-library.php#L131 for how to use `$this->_get_block_wrapper_attributes()`
		$block_attrs = get_block_wrapper_attributes(array());

		$url     = isset( $block->context['core/social-links/url'] ) ? $block->context['core/social-links/url'] : false;
		$url     = ( false === $url && isset( $attributes['url'] ) ) ? $attributes['url'] : $url;

		return wp_sprintf(
			'<div %1$s><div class="label">Share This Link:</div><div class="ui input"><input type="text" readonly="" onclick="this.focus();this.select();" value="%2$s"></div></div>',
			$block_attrs,
			$url
		);
	}

	public function register_block() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', self::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'social-share-url-field',
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
			plugin_dir_path( __DIR__ ) . '/social-share-url-field',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'style'           => array_pop( $registered['css'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Social_Share_URL_Field( true );