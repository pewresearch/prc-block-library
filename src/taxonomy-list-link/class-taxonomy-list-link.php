<?php
/**
 * Taxonomy List Link Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Taxonomy Menu Link
 * Description:       Display a link to a taxonomy term with the option to display a sub menu of taxonomy navigation links.
 * Version:           0.1.0
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Taxonomy_List_Link {
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
			$loader->add_filter( 'prc_platform_rewrite_query_vars', $this, 'register_query_var' );
		}
	}

	/**
	 * Register the query var
	 *
	 * @param array $vars Query vars.
	 * @return array
	 */
	public function register_query_var( $vars ) {
		$vars[] = 'taxonomyLink';
		return $vars;
	}

	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		register_block_type_from_metadata( PRC_BLOCK_LIBRARY_DIR . '/build/taxonomy-list-link' );
	}
}
