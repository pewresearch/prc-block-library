<?php
use \WPackio as WPackio;

/**
 *
 * @package gutenberg
 */


class Quote_Sorter_Search_Bar extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'id'               => md5( wp_json_encode( $attributes ) ),
				'class'            => array_key_exists( 'className', $attributes ) ? $attributes['className'] : '',
				'data-typologies'  =>  $block->context['prc-block/quote-sorter-typologies'],
				'data-placeholder' =>  $attributes['placeholder'],
				)
		);
		return wp_kses( "<div {$wrapper_attributes}></div>", 'post' );

	}

	public function register_block() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'quote-sorter-search-bar',
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
			plugin_dir_path( __DIR__ ) . '/search-bar',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Quote_Sorter_Search_Bar( true );
