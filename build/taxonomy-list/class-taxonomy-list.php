<?php
/**
 * Taxonomy List Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Taxonomy List
 * Description:       This is not a navigation block, but it does have much of its functionality and styles. The difference is its data is saved in block format not WPNav.
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Taxonomy_List {
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
			// @TODO: Eventually we'll want to come in and clean this out in say April 2026.
			$loader->add_filter( 'render_block_prc-block/taxonomy-list', $this, 'fallback_render_wrapper', 10, 2 );
		}
	}

	/**
	 * Fallback render wrapper for the taxonomy list block.
	 *
	 * @hook render_block_prc-block/taxonomy-list
	 *
	 * @return string Rendered HTML.
	 */
	public function fallback_render_wrapper( $content, $block ) {
		// Check if the block has nav wrapper already.
		if ( str_contains( $content, '<nav' ) ) {
			return $content;
		}

		$block_wrapper_attrs = get_block_wrapper_attributes();

		// You can use this method...
		return wp_sprintf(
			'<nav %1$s>%2$s</nav>',
			$block_wrapper_attrs,
			$content,
		);
	}

	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @hook init
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		register_block_type_from_metadata( PRC_BLOCK_LIBRARY_DIR . '/build/taxonomy-list' );
	}
}
