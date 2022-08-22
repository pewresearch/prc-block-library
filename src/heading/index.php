<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';

use \WPackio as WPackio;

class Heading_Block extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'enqueue_block_editor_assets', array( $this, 'register_script' ) );
			add_filter( 'prc_grid_row_classes', array( $this, 'add_section_header_class_to_row' ), 10, 2 );
			add_filter( 'render_block', array( $this, 'heading_block_render' ), 10, 2 );
		}
	}

	public function add_section_header_class_to_row( $classes, $parsed_row_block ) {
		$inner_blocks = array_pop( $parsed_row_block['innerBlocks'] );
		if ( 'prc-block/column' !== $inner_blocks['blockName'] ) {
			return $classes;
		}
		if ( array_key_exists('width', $inner_blocks['attrs']) && 16 === $inner_blocks['attrs']['width'] ) {
			return $classes;
		}
		if ( empty($inner_blocks['innerBlocks'] ) ) {
			return $classes;
		}

		$first_block = $inner_blocks['innerBlocks'][0];

		if ( 'core/group' === $first_block['blockName'] ) {
			$first_block = $first_block['innerBlocks'][0];
		}

		if ( ! is_array( $first_block ) ) {
			return $classes;
		}

		if ( array_key_exists( 'className', $first_block['attrs'] ) && 'core/heading' === $first_block['blockName'] && 'is-style-section-header' === $first_block['attrs']['className'] ) {
			$classes['has section heading'] = true;
		}

		return $classes;
	}

	public function enqueue_assets( $js = true, $css = true ) {
		$block_js_deps = array( 'wp-blocks', 'wp-dom-ready', 'wp-i18n', 'wp-polyfill' );
		$enqueue       = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', plugin_dir_path( __DIR__ ) );
		$enqueue->enqueue(
			'blocks',
			'heading',
			array(
				'js'        => $js,
				'css'       => $css,
				'js_dep'    => true === $js ? $block_js_deps : array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
	}

	public function heading_block_render( $block_content, $block ) {
		if ( 'core/heading' !== $block['blockName'] ) {
			return $block_content;
		}

		$this->enqueue_assets( false );

		return $block_content;
	}

	/**
	 * Enqueue a modification plugin for the core/group block and override the render_callback
	 *
	 * @uses Enqueue
	 */
	public function register_script() {
		$this->enqueue_assets( true, true );
	}
}

new Heading_Block( true );
