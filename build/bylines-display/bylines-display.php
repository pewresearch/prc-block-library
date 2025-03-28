<?php
/**
 * Bylines Display Block
 *
 * @package PRC\Platform\Blocks
 */
namespace PRC\Platform\Blocks;

/**
 * Bylines Display Block
 *
 * @package PRC\Platform\Blocks
 */
class Bylines_Display {
	/**
	 * Constructor
	 *
	 * @param object $loader
	 */
	public function __construct( $loader ) {
		$this->init( $loader );
	}

	/**
	 * Initialize the block
	 *
	 * @param object $loader
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
		}
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
		register_block_type_from_metadata( PRC_BLOCK_LIBRARY_DIR . '/build/bylines-display' );
	}
}
