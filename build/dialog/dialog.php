<?php
namespace PRC\Platform\Blocks;

/**
 * Block Name:        Dialog
 * Version:           1.0.0
 * Requires at least: 6.7
 * Requires PHP:      8.2
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Dialog {
	public function __construct( $loader ) {
		require_once PRC_BLOCK_LIBRARY_DIR . '/src/dialog/util.php';
		$this->init( $loader );
	}

	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
			$loader->add_filter( 'query_vars', $this, 'add_dialog_id_query_var' );
		}
	}

	/**
	 * @hook query_vars
	 */
	public function add_dialog_id_query_var( $qvars ) {
		$qvars[] = 'dialogId';
		return $qvars;
	}

	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/dialog',
		);
	}
}
