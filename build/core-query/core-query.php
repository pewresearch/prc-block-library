<?php
namespace PRC\Platform\Blocks;

use WP_Query;
use WP_Error;
use WP_Post;
use WP_Block;

/**
 * Block Name:        Core Query
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Core_Query {
	public $block_json;
	public $block_name = 'core/query';
	public $editor_script_handle;
	public static $post_type_query_arg = array(
		'post',
		'short-read',
		'feature',
		'fact-sheet',
		'quiz',
		'collections',
	);

	public function __construct( $loader ) {
		$this->block_json = prc_block_library_manifest( 'core-query' );
		$this->init( $loader );
	}

	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'register_assets' );
			$loader->add_action( 'enqueue_block_editor_assets', $this, 'register_editor_script' );
			$loader->add_filter( 'block_type_metadata', $this, 'default_tax_query_to_OR', 100, 1 );

			// Filter WP_Query Queries:
			$loader->add_filter( 'rest_post_query', $this, 'filter_core_query_rest_queries', 10, 2 );
			$loader->add_filter( 'pre_render_block', $this, 'filter_query_args', 10, 3 );
			$loader->add_action( 'pre_get_posts', $this, 'flag_query_as_modified_query_variation', 1, 1 );
			// "Pub Listing" Query
			$loader->add_action( 'pre_get_posts', $this, 'filter_pub_listing_pre_get_posts_fallback', 10, 1 );
			// Filter non WP_Query Queries::
			$loader->add_filter( 'prc_platform_pub_listing_default_args', $this, 'set_pub_listing_starting_defaults', 1, 1 );

			// Handles Story Item Contextual Awareness
			$loader->add_filter( 'render_block_context', $this, 'handle_story_item_query_context_awareness', 100, 3 );
			// Add's support for block area, postId, postType context.
			$loader->add_filter( 'block_type_metadata_settings', $this, 'update_context', 100, 2 );
		}
	}

	/**
	 * @hook init
	 * @return void
	 */
	public function register_assets() {
		$this->editor_script_handle = register_block_script_handle( $this->block_json, 'editorScript' );
	}

	/**
	 * @hook enqueue_block_editor_assets
	 * @return void
	 */
	public function register_editor_script() {
		wp_enqueue_script( $this->editor_script_handle );
	}

	/**
	 * Sets the standard defaults for a pub listing query.
	 * This is called early to set the post types. Other platform features will be able to modify this query later.
	 *
	 * @hook prc_platform_pub_listing_default_args
	 * @param array $query
	 * @return array
	 */
	public function set_pub_listing_starting_defaults( $query = array() ) {
		if ( is_array( $query ) && array_key_exists( 'post_type', $query ) && is_array( $query['post_type'] ) && count( $query['post_type'] ) === 1 && in_array( 'dataset', $query['post_type'] ) ) {
			$query['post_type'] = array( 'dataset' );
		} else {
			$query['post_type'] = self::$post_type_query_arg;
		}
		return $query;
	}

	/**
	 * Defaults the tax query arguments to OR instead of AND for relational match.
	 * We do this because we want most query blocks to be inclusive, not exclusive. Only using facets do we want to be exclusive.
	 *
	 * @hook block_type_metadata
	 * @param mixed $metadata
	 * @return mixed
	 */
	public function default_tax_query_to_OR( $metadata ) {
		if ( $this->block_name !== $metadata['name'] ) {
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

	/**
	 * Sets starting default appropriate post_status arguments to restful queries.
	 *
	 * @hook rest_{post_type}_query
	 * @param mixed $args
	 * @param mixed $request
	 * @return void
	 */
	public function filter_core_query_rest_queries( $args, $request ) {
		if ( $request->get_param( 'isPubListingQuery' ) ) {
			$args = $this->set_pub_listing_starting_defaults( $args );
		}
		return $args;
	}

	/**
	 * This happens early in the block rendering process, hooking onto the short-circuit filter so that we can add new filters scoped to just this namespace.
	 *
	 * @hook pre_render_block
	 * @return void
	 */
	public function filter_query_args( $pre_render, $parsed_block, $parent_block ) {
		if ( 'core/query' !== $parsed_block['blockName'] ) {
			return $pre_render;
		}
		$attributes = $parsed_block['attrs'] ?? array();

		if ( array_key_exists( 'namespace', $attributes ) && 'prc-block/pub-listing-query' === $attributes['namespace'] ) {
			// For core/query blocks that have inherit set to true
			if ( isset( $parsed_block['attrs']['query']['inherit'] ) && true === $parsed_block['attrs']['query']['inherit'] ) {
				// Do nothing because pre_get_posts will take over inherit query...
			} else {
				add_filter(
					'query_loop_block_query_vars',
					function ( $default_query, $block ) {
						$block_query = $block->context['query'];
						$query_args  = apply_filters( 'prc_platform_pub_listing_default_args', $block_query, $default_query );
						return array_merge(
							$default_query,
							$query_args
						);
					},
					999,
					2
				);
			}
		}
		return $pre_render;
	}

	/**
	 * This filter will determine if we are in a "publication listing" context and if so, will set a flag, early, on $query. This flag, `isPubListingQuery`, will be used later in other pre_get_posts filters to determine if we should be modifying the query.
	 *
	 * @hook pre_get_posts
	 */
	public function flag_query_as_modified_query_variation( $query ) {
		if ( 1 === get_current_blog_id() ) {
			return;
		}
		if ( is_admin() ) {
			return;
		}
		if ( empty( $query->query ) ) {
			return;
		}
		if ( ! $query->is_main_query() ) {
			return;
		}

		if ( $query->is_post_type_archive( 'rls' ) || $query->is_post_type_archive( 'newsletter_glue' ) || $query->is_tax( 'ngl_newsletter_cat' ) ) {
			return;
		}

		// If we are on "home" i.e. the "blog" page or in our case "Publications" page, then we are in a publication listing context. This is the primary way to access a "Pub Listing"
		if ( $query->is_home() ) {
			$query->set( 'isPubListingQuery', true );
		}

		if ( $query->is_archive() && ! $query->is_post_type_archive(
			array(
				'short-read',
				'dataset',
				'staff',
				'decoded',
			)
		) ) {
			$query->set( 'isPubListingQuery', true );
		}

		// If we're on a search page, we should also be in a publication listing context.
		if ( $query->is_search() ) {
			$query->set( 'isPubListingQuery', true );
		}

		// Sometimes it's easier to explicitly opt a page out:
		if ( $query->is_tax( 'areas-of-expertise' ) ) {
			$query->set( 'isPubListingQuery', false );
		}
		if ( $query->is_tax( 'decoded-category' ) ) {
			$query->set( 'isPubListingQuery', false );
		}
	}

	/**
	 * This will catch everything else not being delievered by either the REST API or the Query Block
	 *
	 * @hook pre_get_posts
	 * @param mixed $query
	 * @return void
	 */
	public function filter_pub_listing_pre_get_posts_fallback( $query ) {
		if ( true === $query->get( 'isPubListingQuery' ) ) {
			$query->set( 'post_type', self::$post_type_query_arg );
		}
	}

	/**
	 * Hijacks core/post-template block context so that the queryId and the query are passed down to story-item blocks. This makes story item blocks "query" context aware and as such they will change their attributes if placed in a query block. We also remove postId and postType for good measure.
	 *
	 * @hook render_block_context
	 */
	public function handle_story_item_query_context_awareness( array $context, array $parsed_block, WP_Block|null $parent_block ) {
		if ( 'core/post-template' !== $parsed_block['blockName'] ) {
			return $context;
		}
		$hoisted_context = $context;
		// We need this to only run for the blocks inside the post-template block...
		add_filter(
			'render_block_context',
			function ( $context, $parsed_block, $parent_block ) use ( $hoisted_context ) {
				if ( null === $parent_block ) {
					return $context;
				}
				if ( ! in_array( $parent_block->name, array( 'core/null', 'core/post-template' ) ) ) {
					return $context;
				}
				if ( 'prc-block/story-item' !== $parsed_block['blockName'] ) {
					return $context;
				}
				// if hoisted context has postId or postType remove it from the context.
				if ( array_key_exists( 'postId', $hoisted_context ) ) {
					unset( $hoisted_context['postId'] );
				}
				if ( array_key_exists( 'postType', $hoisted_context ) ) {
					unset( $hoisted_context['postType'] );
				}
				// merge $context and the hoisted
				$context = array_merge( $context, $hoisted_context );
				return $context;
			},
			10,
			3
		);

		return $context;
	}

	/**
	 * Register additional context for core/query blocks like prc-platform/block-area-context.
	 * This also addds postType and postId for querying child elements.
	 *
	 * @hook block_type_metadata_settings 100, 2
	 * @param mixed $settings
	 * @param mixed $metadata
	 * @return mixed
	 */
	public function update_context( array $settings, array $metadata ) {
		if ( $this->block_name === $metadata['name'] ) {
			$settings['uses_context'] = array_merge(
				array_key_exists( 'uses_context', $settings ) ? $settings['uses_context'] : array(),
				array(
					'prc-platform/block-area-context',
					'postId',
					'postType',
				)
			);
		}
		return $settings;
	}
}
