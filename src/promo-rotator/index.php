<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';

use \WPackio as WPackio;

class Promo_Rotator extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
			add_filter( 'render_block', array( $this, 'randomly_select_inner_block' ), 10, 2 );
			add_filter( 'query_vars', array( $this, 'register_query_vars' ), 20, 1 );
		}
	}

	public function register_query_vars( $qvars ) {
		$qvars[] = 'iteration';
		return $qvars;
	}

	// Randomly selects one inner block to display.
	public function randomly_select_inner_block( $block_content, $block ) {
		if ( 'prc-block/promo-rotator' === $block['blockName'] ) {
			$iteration = array_rand( $block['innerBlocks'] );
			return render_block( $block['innerBlocks'][ $iteration ] );
		}
		return $block_content;
	}

	/**
	 * Render callback for prc-block/promo-rotator
	 *
	 * @param mixed $attributes
	 * @param mixed $content
	 * @param mixed $block
	 * @return string|false
	 */
	public function render_promo_rotator( $attributes, $content, $block ) {
		ob_start();
		echo wp_kses( $content, 'post' );
		return ob_get_clean();
	}

	/**
	 * Register the prc-block/grid block.
	 *
	 * @uses render_block_core_navigation()
	 * @throws WP_Error An WP_Error exception parsing the block definition.
	 */
	public function register_block() {
		$block_js_deps = array( 'react', 'react-dom', 'wp-components', 'wp-element', 'wp-i18n', 'wp-polyfill' );
		$enqueue       = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'promo-rotator',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => $block_js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . '/promo-rotator',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'render_callback' => array( $this, 'render_promo_rotator' ),
			)
		);
	}
}

new Promo_Rotator( true );
