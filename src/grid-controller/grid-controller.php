<?php
namespace PRC\Platform\Blocks;

/**
 * Block Name:        Grid Controller
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Grid_Controller {
	public function __construct( $loader ) {
		$this->init( $loader );
	}

	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
		}
	}

	public function block_init() {
		register_block_type_from_metadata( PRC_BLOCK_LIBRARY_DIR . '/build/grid-controller' );
	}
}
