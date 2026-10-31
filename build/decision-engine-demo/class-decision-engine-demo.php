<?php
/**
 * Decision Engine Demo Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Decision Engine Demo
 * Description:       Staff walkthrough of the AI decision engine, backed by the prc-ai/decision-engine-demo ability.
 * Requires at least: 6.7
 * Requires PHP:      8.2
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Decision_Engine_Demo {
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
	 * Registers the block using the metadata loaded from the `block.json` file.
	 *
	 * @hook init
	 */
	public function block_init() {
		register_block_type_from_metadata( PRC_BLOCK_LIBRARY_DIR . '/build/decision-engine-demo' );
	}
}
