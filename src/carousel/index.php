<?php
use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/scrolling-display-block` block.
 *
 * @package gutenberg
 */

class Carousel_Block extends PRC_Block_Library {
	public static $version = '1.0.9';

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$inner_blocks = $block->parsed_block['innerBlocks'];

		// If this block is going to be used in the theme or be called directly by PHP it is sometimes easier to use our internal function for of this function.
		// See https://github.com/pewresearch/pewresearch-org/blob/main/plugins/prc-block-library/prc-block-library.php#L89 for how to use `$this->_get_block_wrapper_attributes()`
		$attrs = array(
			'class' => 'splide',
			'aria-label' => 'A carousel alt...',
		);
		if ( function_exists('jetpack_is_mobile') && jetpack_is_mobile() ) {
			$attrs['data-is-mobile'] = true;
		}

		$content = '';
		foreach ( $inner_blocks as $group_block ) {
			$group_block['attrs']['className'] = $group_block['attrs']['className'] . ' splide__slide';
			$content .= render_block( $group_block );
		}

		$block_attrs = get_block_wrapper_attributes($attrs);

		return wp_sprintf(
			'<section %1$s><div class="splide__track"><ul class="splide__list">%2$s</ul></div></section>',
			$block_attrs,
			$content
		);
	}

	public function register_block() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', self::$version, 'plugin', parent::$plugin_file );

		$block = $enqueue->register(
			'blocks',
			'carousel',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		$frontend = $enqueue->register(
			'frontend',
			'carousel',
			array(
				'js'        => true,
				'css'       => false, // This is already being included in the block registration above ^
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . '/carousel',
			array(
				'editor_script'   => array_pop( $block['js'] )['handle'],
				'style'           => array_pop( $block['css'] )['handle'],
				'script' 		  => array_pop( $frontend['js'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Carousel_Block( true );