<?php
namespace PRC\Platform\Blocks;

/**
 * Block Name:        Timeline
 * Description:       Display a series of blocks in a timeline
 * Requires at least: 6.7
 * Requires PHP:      8.2
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */

class Timeline {

	public function __construct( $loader ) {
		$this->init( $loader );
	}

	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
		}
	}

	/**
	 * Registers the block using the block manifest (if registered). Fails over to the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @hook init
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		register_block_type_from_metadata( PRC_BLOCK_LIBRARY_DIR . '/build/timeline' );
	}
}
