<?php
use \WPackio as WPackio;

/**
 *
 * @package gutenberg
 */


class Quote_Sorter_Dropdown extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$block_attrs = get_block_wrapper_attributes(array());
		$typologies = $block->context['prc-block/quote-sorter-typologies'] ?? '';
		$placeholder = $attributes['placeholder'];
		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'id'               => md5( wp_json_encode( $attributes ) ),
				'class'            => array_key_exists( 'className', $attributes ) ? $attributes['className'] : '',
				'data-typologies'  =>  $typologies,
				'data-placeholder' =>  $attributes['placeholder'],
				'data-sortedTypologies' =>  wp_json_encode($attributes['sortedTypologies']),
				'data-include-reset-filter' =>$attributes['includeResetFilter'],
				'data-reset-language' => $attributes['resetLanguage'],
				'data-dynamic-text-block-id' =>  'quote-sorter-dynamic-' . $attributes['dynamicTextBlockId'],
				'data-button-text-color' => $attributes['buttonTextColor'],
				'data-button-background-color' => $attributes['buttonBackgroundColor'],
				'data-active-button-text-color' => $attributes['activeButtonTextColor'],
				'data-active-button-background-color' => $attributes['activeButtonBackgroundColor'],
				)
		);
		return wp_kses( "<div {$wrapper_attributes}></div>", 'post' );

	}


	public function register_block() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'quote-sorter-dropdown',
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
			plugin_dir_path( __DIR__ ) . '/dropdown',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'style'           => array_pop( $registered['css'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Quote_Sorter_Dropdown( true );
