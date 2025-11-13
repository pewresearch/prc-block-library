<?php
/**
 * Popular Story Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Popular Story
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Popular_Story {
	/**
	 * Constructor
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		$this->init( $loader );
	}

	/**
	 * Initialize the block
	 *
	 * @param mixed $loader Loader.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
		}
	}

	/**
	 * Render callback for the block
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content    Block content.
	 * @param object $block      Block object.
	 * @return string
	 */
	public function render_callback( $attributes, $content, $block ) {
		$block_wrapper_attrs = get_block_wrapper_attributes();

		$block_index         = array_key_exists( 'blockIndexAttr', $attributes ) ? $attributes['blockIndexAttr'] : 0;
		$block_index         = true === $attributes['enableNumber'] ? $block_index + 1 : $block_index;
		$popular_story_title = array_key_exists( 'title', $attributes ) ? $attributes['title'] : '';
		$popular_story_url   = array_key_exists( 'url', $attributes ) ? $attributes['url'] : '';
		if ( empty( $popular_story_title ) || empty( $popular_story_url ) ) {
			return '';
		}

		return wp_sprintf(
			'<aside %1$s>%2$s<a href="%3$s" class="title">%4$s</a></aside>',
			$block_wrapper_attrs,
			0 !== $block_index ? wp_sprintf( '<div class="big-number">%s</div>', $block_index ) : '',
			esc_url( $popular_story_url ),
			$popular_story_title
		);
	}

	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @hook init
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/popular-story',
			array(
				'render_callback' => array( $this, 'render_callback' ),
			)
		);
	}
}
