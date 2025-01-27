<?php
namespace PRC\Platform\Blocks;

/**
 * Block Name:        Audio Player
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Nick Zanetti
 *
 * @package           prc-block
 */

class Audio_Player {
	public function __construct($loader) {
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action('init', $this, 'block_init');
		}
	}

	/**
	* Registers the block using the metadata loaded from the `block.json` file.
	* Behind the scenes, it registers also all assets so they can be enqueued
	* through the block editor in the corresponding context.
	*
	* @see https://developer.wordpress.org/reference/functions/register_block_type/
	*/
	public function block_init() {
		register_block_type_from_metadata( PRC_BLOCK_LIBRARY_DIR . '/build/audio-player');
	}

}
