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

	public static $default_query_args = array(
		'post_status' => array('publish', 'hidden_from_search'),
		'post_parent' => 0,
	);

	public function __construct($init = false) {
		if ( true === $init ) {
			$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/core-query/build/block.json';
			self::$block_json = wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
			self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );

			add_action( 'init', array($this, 'init_assets') );
			add_action( 'enqueue_block_editor_assets', array($this, 'register_editor_assets') );
			add_filter( 'query_loop_block_query_vars', array($this, 'default_query_args'), 10, 3 );
			add_filter( 'block_type_metadata', array( $this, 'default_tax_query_to_OR' ), 100, 1 );
			add_filter( 'rest_post_query', array( $this, 'default_rest_query_args' ), 10, 2 );
			// @TODO: Deprecate this...
			add_filter( 'rest_stub_query', array( $this, 'default_stub_rest_query_args' ), 10, 2 );

		}
	}

	public function init_assets() {
		self::$editor_script_handle = register_block_script_handle( self::$block_json, 'editorScript' );
	}

	public function register_editor_assets() {
		wp_enqueue_script( self::$editor_script_handle );
	}

	/**
	 * DEPRECATED: Use default_query_args instead.
	 * @param mixed $args
	 * @param mixed $request
	 * @return mixed
	 */
	public function default_stub_rest_query_args( $args, $request ) {
		$isStoryItemLoop = $request->get_param( 'isStoryItemLoop' );
		if ( $isStoryItemLoop ) {
			$args = array_merge( $args, self::$default_query_args );
		}
		return $args;
	}

	public function default_rest_query_args( $args, $request ) {
		$isPubListingQuery = $request->get_param( 'isPubListingQuery' );
		if ( $isPubListingQuery ) {
			// $new_args = array_merge( array('post_type' => array(
			// 	'post',
			// 	'fact-sheet',
			// 	'interactive',
			// 	'quiz'
			// )), self::$default_query_args );
			$args = array_merge( $args, self::$default_query_args );
		}
		return $args;
	}

	/**
	 * Filters the query arguments for the Query Loop block to ensure we only return parent posts not hidden from the index.
	 *
	 * @param array    $query Array containing parameters for `WP_Query` as parsed by the block context.
	 * @param WP_Block $block Block instance.
	 * @param int      $page  Current query's page.
	 * @return mixed
	 */
	public function default_query_args( $query, $block, $page ) {
		if ( empty( array_filter($block->context['query'], function($v) { return in_array($v, array(
			'isStoryItemLoop',
			'isPubListingQuery'
		)); }) ) ) {
			return $query;
		}

		// if ( !$block->context['query'] || !array_key_exists( 'isStoryItemLoop', $block->context['query'] ) ) {
		// 	return $query;
		// }

		if ( array_key_exists('isStoryItemLoop', $block->context['query']) && true !== $block->context['query']['isStoryItemLoop'] ) {
			return $query;
		}

		if ( array_key_exists('isPubListingQuery', $block->context['query']) && true !== $block->context['query']['isPubListingQuery'] ) {
			return $query;
		}

		return array_merge( $query, self::$default_query_args );
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
