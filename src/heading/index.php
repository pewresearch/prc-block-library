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
			add_filter( 'block_type_metadata', array( $this, 'add_chapter_attributes' ), 100, 1 );
			add_filter( 'prc_chapters', array($this, 'construct_toc'), 10, 2 );
		}
	}

	public function add_section_header_class_to_row( $classes, $parsed_row_block ) {
		$inner_blocks = array_pop( $parsed_row_block['innerBlocks'] );
		if ( 'prc-block/column' !== $inner_blocks['blockName'] || 16 === $inner_blocks['attrs']['width'] ) {
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

	public function recursively_search_for_chapters( $array ) {
		$key = 'blockName';
		$value = 'core/heading';
		$results = array();

		// true === $block['attributes']['isChapter']

		if ( is_array( $array ) ) {

			if ( isset( $array[ $key ] ) && $array[ $key ] == $value ) {
				$results[] = $array;
			}

			foreach ( $array as $subarray ) {
				$results = array_merge( $results, $this->recursively_search_for_chapters( $subarray, $key, $value ) );
			}
		}

		return $results;
	}

	public function construct_toc( $post_id, $content = null ) {
		// If this post doesn't have blocks OR if it specifically does not have heading blocks then we can't do anything so just return false.
		if ( !has_blocks( $post_id ) || !has_block( 'core/heading', $post_id ) ) {
			return false;
		}

		error_log("construct toc...");

		$chapters = array();

		if ( null !== $content ) {
			$blocks = parse_blocks($content);
		} else {
			$content = get_post_field( 'post_content', $post_id );
			$blocks = parse_blocks($content);
		}

		$chapter_blocks = $this->recursively_search_for_chapters( $blocks );

		foreach ( $chapter_blocks as $chapter ) {
			error_log(print_r($chapter, true));
			if ( array_key_exists('isChapter', $chapter['attrs']) && true === $chapter['attrs']['isChapter'] ) {
				$chapters[] = $chapter;
			}
		}

		error_log(print_r($chapters, true));

		return $chapters;
	}

	/**
	 * Register additional attributes for heading block.
	 * @param mixed $metadata
	 * @return mixed
	 */
	public function add_chapter_attributes( $metadata ) {
		if ( 'core/heading' !== $metadata['name'] ) {
			return $metadata;
		}

		if ( ! array_key_exists( 'isChapter', $metadata['attributes'] ) ) {
			$metadata['attributes']['isChapter'] = array(
				'type'    => 'boolean',
				'default' => false,
			);
		}
		if ( ! array_key_exists( 'altTocText', $metadata['attributes'] ) ) {
			$metadata['attributes']['altTocText'] = array(
				'type'    => 'string',
				'default' => '',
			);
		}
		if ( ! array_key_exists( 'icon', $metadata['attributes'] ) ) {
			$metadata['attributes']['icon'] = array(
				'type'    => 'string',
				'default' => '',
			);
		}
		return $metadata;
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
