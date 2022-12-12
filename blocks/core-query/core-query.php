<?php
/**
 * Block Name:        Core Query
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class CoreQuery extends PRC_Block_Library {

	public static $block_name = "core/query";
	public static $block_json = null;
	public static $editor_script_handle = null;

	public function __construct($init = false) {
		if ( true === $init ) {
			$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/core-query/build/block.json';
			self::$block_json = wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
			self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );

			add_action( 'init', array($this, 'init_assets') );
			add_action( 'enqueue_block_editor_assets', array($this, 'register_editor_assets') );
			add_filter( 'query_loop_block_query_vars', array($this, 'default_query_args'), 10, 3 );
			add_filter( 'block_type_metadata', array( $this, 'default_tax_query_to_OR' ), 100, 1 );
		}
	}

	public function init_assets() {
		self::$editor_script_handle = register_block_script_handle( self::$block_json, 'editorScript' );
	}

	public function register_editor_assets() {
		wp_enqueue_script( self::$editor_script_handle );
	}

	public function default_query_args($query, $block, $page) {
		$query['post_status'] = array('publish', 'hidden_from_search');
		return $query;
	}

	/**
	 * Defaults the tax query arguments to OR instead of AND for relational match.
	 * @param mixed $metadata
	 * @return mixed
	 */
	public function default_tax_query_to_OR( $metadata ) {
		if ( self::$block_name !== $metadata['name'] ) {
			return $metadata;
		}

		if ( ! array_key_exists( 'taxQuery', $metadata['attributes'] ) ) {
			$metadata['attributes']['taxQuery'] = array(
				'type'    => 'object',
				'default' => array(
					'relation' => 'OR',
					'data'     => array(),
				),
			);
		}

		return $metadata;
	}

}

new CoreQuery(true);
