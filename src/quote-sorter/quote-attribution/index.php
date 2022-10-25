<?php
use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/menu-link` block.
 *
 * @package gutenberg
 */

//  TODO: finish setting up Quotes block

class Quote_Sorter_Quote_Attribution_Block extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function render_block_callback( $attributes, $content, $block ) {

		$quoteArt = array_key_exists('prc-block/quote-sorter-art', $block->context) ? $block->context['prc-block/quote-sorter-art'] : false;
		$block_attrs = get_block_wrapper_attributes();
		$quote_attribution = array_key_exists('prc-block/quote-sorter/attribution', $block->context) ? $block->context['prc-block/quote-sorter/attribution'] : '';
		do_action('qm/debug', $quote_text);
		return wp_sprintf(
			'<div %1$s>%2$s</div>',
			$block_attrs,
			$quote_attribution
		);
	}

	public function register_block() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'quote-sorter-quote-attribution',
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
			plugin_dir_path( __DIR__ ) . '/quote-attribution',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'style'			  => array_pop( $registered['css'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Quote_Sorter_Quote_Attribution_Block( true );
