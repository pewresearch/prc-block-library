<?php
namespace PRC\Platform\Blocks;
use WP_REST_Request;
/**
 * Block Name:        Taxonomy Search
 * Description:       Search for terms of a specified taxonomy.
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Taxonomy_Search {
	public static $block_json = null;
	public static $version;
	public static $block_name;
	public static $view_script_handle = null;
	public static $editor_script_handle = null;
	public static $style_handle = null;
	public static $dir = __DIR__;
	public $parent_term_children = false;

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/taxonomy-search/build/block.json';
		self::$block_json = \wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		self::$version = self::$block_json['version'];
		self::$block_name = self::$block_json['name'];
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action('init', $this, 'block_init');
			$loader->add_filter( 'prc_api_endpoints', $this, 'register_endpoint') ;
		}
	}

	/**
	 * Register endpoint for getting the AZ list of terms.
	 * @hook prc_api_endpoints
	 * @param array $endpoints
	 * @return array $endpoints with new endpoint
	 */
	public function register_endpoint($endpoints) {
		array_push($endpoints, array(
			'route' => 'blocks/taxonomy-search',
			'methods'             => 'GET',
			'callback'            => array( $this, 'restfully_search_taxonomy' ),
			'args'                => array(
				'searchValue' => array(
					'validate_callback' => function( $param, $request, $key ) {
						return is_string( $param );
					},
				),
				'taxonomy' => array(
					'validate_callback' => function( $param, $request, $key ) {
						return is_string( $param );
					},
				),
				'parentTermId' => array(
					'validate_callback' => function( $param, $request, $key ) {
						return is_string( $param );
					},
				),
				'perPage' => array(
					'validate_callback' => function( $param, $request, $key ) {
						return is_int( $param );
					},
					'default' => 25
				),
			),
			'permission_callback' => function () {
				return true;
			},
		));
		return $endpoints;
	}

	/**
	 * Search a taxonomy for a term value.
	 *
	 * Returns data specifically formatted for the Semantic UI React Search component.
	 * @param WP_REST_Request $request
	 * @return Semantic UI React Search[]|WP_Error
	 */
	public function restfully_search_taxonomy( WP_REST_Request $request ) {
		$search_value   = $request->get_param( 'searchValue' );
		$taxonomy       = $request->get_param( 'taxonomy' );
		$parent_term_id = (int) $request->get_param( 'parentTermId' );
		$per_page       = $request->get_param( 'perPage' );

		$args = array(
			'taxonomy'     => $taxonomy,
			'per_page'     => $per_page,
			'hierarchical' => true,
			'hide_empty'   => false,
		);

		if ( $search_value ) {
			$args['search'] = $search_value;
		}

		// Store children of the parent termporarily so we can filter everything except them, later.
		if ( $parent_term_id && false === $this->parent_term_children ) {
			$this->parent_term_children = get_term_children( $parent_term_id, $taxonomy );
		}

		$terms = get_terms( $args );

		$terms = array_map(
			function( $term ) use ( $taxonomy ) {
				$term->link        = get_term_link( $term, $taxonomy );
				$term->description = wp_strip_all_tags( term_description( $term ) );
				return $term;
			},
			$terms
		);

		// If a parent is set then only return the children of that parent.
		if ( false !== $this->parent_term_children ) {
			$terms = array_filter(
				$terms,
				function( $v ) {
					return false !== $this->parent_term_children && in_array( $v->term_id, $this->parent_term_children );
				}
			);
			// Reset value.
			$this->parent_term_children = false;
		}

		return array_values( $terms );
	}

	/**
	* Registers the block using the metadata loaded from the `block.json` file.
	* Behind the scenes, it registers also all assets so they can be enqueued
	* through the block editor in the corresponding context.
	* @hook init
	* @see https://developer.wordpress.org/reference/functions/register_block_type/
	*/
	public function block_init() {
		register_block_type( self::$dir . '/build' );
	}

}
