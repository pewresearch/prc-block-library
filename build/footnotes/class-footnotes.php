<?php
/**
 * Footnotes
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Footnotes
 * Description:       A unique take on footnotes. Supports numoffset.
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Pew Research Center
 */
class Footnotes {
	/**
	 * The constructor.
	 *
	 * @param mixed $loader The loader.
	 */
	public function __construct( $loader ) {
		require_once PRC_BLOCK_LIBRARY_DIR . '/src/footnotes/class-footnotes-api.php';
		$this->init( $loader );
	}

	/**
	 * Initialize the class.
	 *
	 * @param mixed $loader The loader.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
			$loader->add_filter( 'the_content', $this, 'filter_content', 100 );
		}
	}

	/**
	 * Filter the content.
	 *
	 * @hook the_content, 100
	 *
	 * @param string $content The content.
	 * @return string
	 */
	public function filter_content( $content ) {
		if ( ! is_singular() ) {
			return $content;
		}
		global $post;
		$post_id       = $post->ID;
		$footnotes_api = new Footnotes_API( $post_id, $content );
		return $footnotes_api->get_content();
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
		register_block_type_from_metadata( PRC_BLOCK_LIBRARY_DIR . '/build/footnotes' );
	}
}
