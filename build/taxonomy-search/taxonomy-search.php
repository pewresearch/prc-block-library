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
	public $parent_term_children = false;

	public function __construct($loader) {
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
				'search' => array(
					'validate_callback' => function( $param, $request, $key ) {
						return is_string( $param );
					},
				),
				'taxonomy' => array(
					'validate_callback' => function( $param, $request, $key ) {
						return is_string( $param );
					},
				),
				'parent_term_id' => array(
					'validate_callback' => function( $param, $request, $key ) {
						return is_string( $param );
					},
				),
				'per_page' => array(
					'validate_callback' => function( $param, $request, $key ) {
						return intval( $param ) > 0;
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
		register_block_type_from_metadata( PRC_BLOCK_LIBRARY_DIR . '/build/taxonomy-search' );
	}

}
