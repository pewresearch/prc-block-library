<?php
/**
 * Taxonomy Search Block
 *
 * @package PRC\Platform\Blocks
 */

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
			$loader->add_action( 'rest_api_init', $this, 'register_endpoint' );
		}
	}

	/**
	 * @hook rest_api_init
	 */
	public function register_endpoint() {
		register_rest_route(
			'prc-api/v3',
			'blocks/taxonomy-search',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'restfully_search_taxonomy' ),
				'args'                => array(
					'search'         => array(
						'validate_callback' => function ( $param, $request, $key ) {
							return is_string( $param );
						},
					),
					'taxonomy'       => array(
						'validate_callback' => function ( $param, $request, $key ) {
							return is_string( $param );
						},
					),
					'parent_term_id' => array(
						'validate_callback' => function ( $param, $request, $key ) {
							return is_string( $param );
						},
					),
					'per_page'       => array(
						'validate_callback' => function ( $param, $request, $key ) {
							return intval( $param ) > 0;
						},
						'default'           => 25,
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
	 *
	 * @param WP_REST_Request $request Request.
	 * @return Semantic UI React Search[]|WP_Error
	 */
	public function restfully_search_taxonomy( WP_REST_Request $request ) {
		$search_value   = $request->get_param( 'search' );
		$taxonomy       = $request->get_param( 'taxonomy' );
		$parent_term_id = (int) $request->get_param( 'parent_term_id' );
		$per_page       = $request->get_param( 'per_page' );

		$args = array(
			'taxonomy'     => $taxonomy,
			'per_page'     => $per_page,
			'hierarchical' => true,
			'hide_empty'   => true,
		);

		if ( $search_value ) {
			$args['search'] = $search_value;
		}

		$cache_key    = 'taxonomy_search_' . md5( json_encode( $args ) );
		$cached_terms = wp_cache_get( $cache_key );
		if ( false !== $cached_terms ) {
			return $cached_terms;
		}

		$parent_term_children = false;
		// Store children of the parent termporarily so we can filter everything except them, later.
		if ( $parent_term_id && false === $parent_term_children ) {
			$parent_term_children = get_term_children( $parent_term_id, $taxonomy );
		}

		$terms = get_terms( $args );

		$terms = array_map(
			function ( $term ) use ( $taxonomy ) {
				$term->link        = get_term_link( $term, $taxonomy );
				$term->description = wp_strip_all_tags( term_description( $term ) );
				return $term;
			},
			$terms
		);

		// If a parent is set then only return the children of that parent.
		if ( false !== $parent_term_children ) {
			$terms = array_filter(
				$terms,
				function ( $v ) use ( $parent_term_children ) {
					return false !== $parent_term_children && in_array( $v->term_id, $parent_term_children );
				}
			);
			// Reset value.
			$parent_term_children = false;
		}

		$to_return = array_values( $terms );

		wp_cache_set( $cache_key, $to_return, 'prc_block_library', 1 * DAY_IN_SECONDS );

		return $to_return;
	}

	/**
	 * Render callback for the block
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content    Block content.
	 * @param object $block      Block object.
	 * @return string
	 */
	public function render_callback( $attributes, $content, $block ) {
		wp_enqueue_script( 'wp-api-fetch' );
		wp_enqueue_script( 'wp-html-entities' );

		$restrict_to_term_id   = $attributes['restrictToTerm']['id'] ?? null;
		$restrict_to_term_name = $attributes['restrictToTerm']['name'] ?? null;

		$block_wrapper_attrs = get_block_wrapper_attributes(
			array(
				'data-wp-interactive'                   => wp_json_encode(
					array(
						'namespace' => 'prc-block/taxonomy-search',
					)
				),
				'data-wp-context'                       => wp_json_encode(
					array(
						'taxonomy'           => $attributes['taxonomy'] ?? 'category',
						'restrictToTermId'   => $restrict_to_term_id,
						'restrictToTermName' => $restrict_to_term_name,
						'searchValue'        => '',
						'isActive'           => false,
						'results'            => array(),
					)
				),
				'data-wp-class--is-active'              => 'callbacks.showResults',
				'data-wp-watch--on-search-value-change' => 'callbacks.onSearchValueChange',
			)
		);

		ob_start();
		?>
		<ul class="wp-block-prc-block-taxonomy-search__results-list">
		<template
			data-wp-each--result="context.results"
			data-wp-each-key="context.result.id"
		>
			<li class="wp-block-prc-block-taxonomy-search__result">
				<a data-wp-bind--href="context.result.url">
					<span data-wp-text="context.result.label"></span>
				</a>
			</li>
		</template>
		</ul>
		<?php
		$template = ob_get_clean();

		return wp_sprintf(
			'<div %1$s>%2$s%3$s</div>',
			$block_wrapper_attrs,
			$content,
			$template,
		);
	}

	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @hook init
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/taxonomy-search',
			array(
				'render_callback' => array( $this, 'render_callback' ),
			)
		);
	}
}
