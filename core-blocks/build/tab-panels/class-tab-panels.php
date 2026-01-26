<?php
/**
 * Tab Panels Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Tab Panels Block
 *
 * @package PRC\Platform\Blocks
 */
class Core_Block_Tab_Panels {

	/**
	 * Constructor
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		$this->init( $loader );
	}

	/**
	 * Initialize the block.
	 *
	 * @param mixed $loader Loader.
	 * @return void
	 */
	public function init( $loader = null ): void {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'register_block_core_tab_panels' );
		}
	}

	/**
	 * Registers the `core/tab-panels` block on the server.
	 *
	 * @since 6.9.0
	 */
	public function register_block_core_tab_panels() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/core-blocks/build/tab-panels'
		);
	}
}
