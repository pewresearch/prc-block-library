<?php
/**
 * Core Blocks
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Gutenberg Core Block library ports. These are blocks that we're developing to port into the Gutenberg Core Block library.
 *
 * @package PRC\Platform\Blocks
 */
class Core_Blocks {
	/**
	 * Loader
	 *
	 * @var mixed
	 */
	protected $loader;

	/**
	 * Constructor
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		$this->loader = $loader;

		$this->load_files();
		$this->load_blocks();

		/**
		 * Register the block library manifest file.
		 */
		\wp_register_block_metadata_collection(
			PRC_BLOCK_LIBRARY_DIR . '/core-blocks/build',
			PRC_BLOCK_LIBRARY_DIR . '/core-blocks/build/blocks-manifest.php'
		);
	}

	/**
	 * Load files
	 *
	 * @return void
	 */
	public function load_files() {
		$files = glob( PRC_BLOCK_LIBRARY_DIR . '/core-blocks/build/*/class-*.php' );
		foreach ( $files as $file ) {
			require_once $file;
		}
	}

	public function load_blocks() {
		new Core_Block_Tabs( $this->loader );
		new Core_Block_Tab( $this->loader );
		new Core_Block_Tab_Panels( $this->loader );
		new Core_Block_Tabs_Menu( $this->loader );
		new Core_Block_Tabs_Menu_Item( $this->loader );
	}
}
