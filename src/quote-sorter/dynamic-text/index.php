<?php
use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/menu-link` block.
 *
 * @package gutenberg
 */

class Quote_Sorter_Dynamic_Text extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$text = json_decode( $attributes['dynamicText'] );
		$default_text = $text->all ? $text->all : 'Selected quotes from all groups';
		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'id'              		=> 'quote-sorter-dynamic-' . $attributes['id'] . '',
				'data-dynamic-text'		=> $attributes['dynamicText'],
				)
		);
		return wp_kses( "<div {$wrapper_attributes}>{$default_text}</div>", 'post' );

	}

	public function register_block() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'quote-sorter-dynamic-text',
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
			plugin_dir_path( __DIR__ ) . '/dynamic-text',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Quote_Sorter_Dynamic_Text( true );
