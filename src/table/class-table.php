<?php
/**
 * Block Name:        Table
 * Description:       A fork of Aki Hamano's Flexible Table Block.
 * Version:           1.0.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein and Aki Hamano
 *
 * @package           prc-block
 */

namespace PRC\Platform\Blocks;

define( 'FTB_BLOCK_CLASS', 'wp-block-prc-block-table' );
define( 'FTB_NAMESPACE', 'flexible-table-block' );
define( 'FTB_OPTION_PREFIX', 'flexible_table_block' );
define( 'FTB_PATH', untrailingslashit( plugin_dir_path( __FILE__ ) ) );
define( 'FTB_URL', untrailingslashit( plugin_dir_url( __FILE__ ) ) );

/**
 * Table Block
 *
 * @package           prc-block
 */
class Table {
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
		require_once PRC_BLOCK_LIBRARY_DIR . '/build/table/class-helper.php';
		require_once PRC_BLOCK_LIBRARY_DIR . '/build/table/class-settings.php';
		require_once PRC_BLOCK_LIBRARY_DIR . '/build/table/class-api.php';

		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
			$loader->add_action( 'enqueue_block_editor_assets', $this, 'enqueue_additional_styles' );
			new Table\API( $loader );
		}
	}

	/**
	 * Enqueue additional "global table styles"
	 *
	 * @hook enqueue_block_editor_assets
	 */
	public function enqueue_additional_styles() {
		$block_css = Table\Helper::get_block_css( '.editor-styles-wrapper ' );
		$css       = Table\Helper::minify_css( $block_css );
		wp_add_inline_style( 'prc-block-table-editor-style', $css );
	}

	/**
	 * Block init
	 *
	 * @hook init
	 */
	public function block_init() {
		register_block_type_from_metadata( PRC_BLOCK_LIBRARY_DIR . '/build/table' );
	}
}
