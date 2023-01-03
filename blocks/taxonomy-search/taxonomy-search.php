<?php
/**
 * Block Name:        Taxonomy Search
 * Description:       Search for terms of a specified taxonomy.
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class TaxonomySearch extends PRC_Block_Library {
	public $parent_term_children = false;
	public static $version = '0.1.0';
	public static $dir = __DIR__;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array($this, 'block_init') );
			add_action( 'rest_api_init', array( $this, 'register_rest_endpoint' ) );
		}
	}

	public function register_rest_endpoint() {
		register_rest_route(
			'prc-api/v2',
			'/blocks/taxonomy-search',
			array(
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
				),
				'permission_callback' => function () {
					return true;
				},
			)
		);
	}

	/**
	 * Search a taxonomy for a term value.
	 *
	 * Returns data specifically formatted for the Semantic UI React Search component.
	 * @param WP_REST_Request $request
	 * @return Semantic UI React Search[]|WP_Error
	 */
	public function restfully_search_taxonomy( \WP_REST_Request $request ) {
		$search_value   = $request->get_param( 'searchValue' );
		$taxonomy       = $request->get_param( 'taxonomy' );
		$parent_term_id = (int) $request->get_param( 'parentTermId' );

		$args = array(
			'taxonomy'     => $taxonomy,
			'per_page'     => 25,
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
	*
	* @see https://developer.wordpress.org/reference/functions/register_block_type/
	*/
	public function block_init() {
		register_block_type( self::$dir . '/build' );
	}

}

new TaxonomySearch(true);
