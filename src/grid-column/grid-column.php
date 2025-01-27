<?php
namespace PRC\Platform\Blocks;
/**
 * Block Name:        Grid Column
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Grid_Column {
	public function __construct($loader) {
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action('init', $this, 'block_init');
		}
	}

	public function block_init() {
		register_block_type( PRC_BLOCK_LIBRARY_DIR . '/build/grid-column' );
	}
}
