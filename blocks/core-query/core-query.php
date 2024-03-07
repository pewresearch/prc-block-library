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
	public static $block_json = null;
	public static $version;
	public static $block_name = 'core/query';
	public static $view_script_handle = null;
	public static $editor_script_handle = null;
	public static $style_handle = null;
	public static $post_type_query_arg = array(
		'post',
		'short-read',
		'interactive',
		'fact-sheet',
		'quiz',
	);

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/core-query/build/block.json';
		self::$block_json = \wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		self::$version = self::$block_json['version'];
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'register_assets' );
			$loader->add_action( 'init', $this, 'hard_enable_enhanced_pagination', 100 );
			$loader->add_action( 'enqueue_block_editor_assets', $this, 'register_editor_script');
			$loader->add_filter( 'prc_platform_pub_listing_default_args', $this, 'set_starting_defaults_for_pub_listing_query_args', 1, 1 );
			$loader->add_filter( 'pre_render_block', $this, 'filter_pub_listing_query_args', 10, 3 );

			$loader->add_filter( 'render_block_data', $this, 'default_enhanced_pagination_on', 1001, 1 );
			$loader->add_filter( 'render_block_context', $this, 'hijack_query_block_context', 100, 3 );

			$loader->add_filter( 'rest_post_query', $this, 'filter_pub_listing_rest_query', 10, 2 );
			$loader->add_action( 'pre_get_posts', $this, 'set_starting_defaults_for_post_type_for_pre_get_posts', 10, 1 );
			$loader->add_filter( 'block_type_metadata', $this, 'default_tax_query_to_OR', 100, 1 );
			$loader->add_filter( 'block_type_metadata_settings', $this, 'update_context', 100, 2 );
		}
	}

	/**
	 * @hook init
	 * @return void
	 */
	public function register_assets() {
		self::$editor_script_handle = register_block_script_handle( self::$block_json, 'editorScript' );
	}

	/**
	 * 😒 Dont tell me what to do, WordPress.
	 * @hook init
	 * @return void
	 */
	public function hard_enable_enhanced_pagination() {
		remove_filter( 'render_block_data', 'block_core_query_disable_enhanced_pagination', 10, 1 );
		remove_filter( 'render_block_data', 'gutenberg_block_core_query_disable_enhanced_pagination', 10, 1 );
	}

	/**
	 * @hook enqueue_block_editor_assets
	 * @return void
	 */
	public function register_editor_script() {
		wp_enqueue_script( self::$editor_script_handle );
	}

	/**
	 * Add appropriate post_status arguments to restful queries.
	 * @hook rest_{post_type}_query
	 * @param mixed $args
	 * @param mixed $request
	 * @return void
	 */
	public function filter_pub_listing_rest_query( $args, $request ) {
		if ( $request->get_param('isPubListingQuery') ) {
			$args = $this->set_starting_defaults_for_pub_listing_query_args($args);
		}
		return $args;
	}

	/**
	 * Sets the standard defaults for a pub listing query.
	 * This is called early to set the post types. Other platform features will be able to modify this query later.
	 * @hook prc_platform_pub_listing_default_args
	 * @param array $query
	 * @return array
	 */
	public function set_starting_defaults_for_pub_listing_query_args($query = array()) {
		$query['post_type'] = self::$post_type_query_arg;
		return $query;
	}

	/**
	 * @hook pre_get_posts
	 * @param mixed $query
	 * @return void
	 */
	public function set_starting_defaults_for_post_type_for_pre_get_posts($query) {
		if ( is_admin() ) {
			return;
		}
		if ( ! $query->is_main_query() ) {
			return;
		}
		if ( ! $query->is_home() ) {
			return;
		}
		$query->set('post_type', self::$post_type_query_arg);
	}

	/**
	 * This happens early in the block rendering process, hooking onto the short-circuit filter so that we can add new filters scoped to just this.
	 * @TODO: This doesnt seem to work and may not be necessary.
	 * @hook pre_render_block
	 * @return void
	 */
	public function filter_pub_listing_query_args($pre_render, $parsed_block, $parent_block) {
		if ( 'core/query' !== $parsed_block['blockName'] ) {
			return $pre_render;
		}
		$attributes = $parsed_block[ 'attrs' ] ?? array();
		if( array_key_exists('namespace', $attributes) && 'prc-block/pub-listing-query' === $attributes['namespace'] ) {
			add_filter(
				'query_loop_block_query_vars',
				function( $query, $block, $page ) {
					$query = apply_filters('prc_platform_pub_listing_default_args', $query);
					return $query;
				},
				1,
				3
			);
		}
		return $pre_render;
	}

	/**
	 * Defaults the tax query arguments to OR instead of AND for relational match.
	 * We do this because we want most query blocks to be inclusive, not exclusive. Only using facets do we want to be exclusive.
	 * @hook block_type_metadata
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

		// Enforce ehanced pagination to be ON by default.
		// @TODO: We should make this opt-in by some attribute using a different hook, but this will work for now.
		// We removed this because on the editor side this was re-setting back to false via javascsript. Here we'll allow the editor to believe its false but set a hard true value before render.
		$metadata['attributes']['enhancedPagination']['default'] = true;

		return $metadata;
	}

	/**
	 * @hook render_block_data
	 * @var
	 */
	public function default_enhanced_pagination_on($parsed_block) {
		if ( self::$block_name !== $parsed_block['blockName'] ) {
			return $parsed_block;
		}

		// if ( 'prc-block/pub-listing-query' === $parsed_block['attrs']['namespace'] ) {

		// }
		// do_action('qm/debug', 'default_enhanced_pagination_on' . print_r($parsed_block, true) );
		$parsed_block['attrs']['enhancedPagination'] = true;
		// do_action('qm/debug', 'default_enhanced_pagination_on' . print_r($parsed_block, true) );

		return $parsed_block;
	}

	/**
	 * Hijacks core/post-template block context to pass along query and query id to its innerblocks context.
	 * @hook render_block_context
	 */
	public function hijack_query_block_context(array $context, array $parsed_block, WP_Block|null $parent_block) {
		if ( 'core/post-template' !== $parsed_block['blockName'] ) {
			return $context;
		}
		$hoisted_context = $context;
		add_filter('render_block_context', function($context, $parsed_block, $parent_block) use ($hoisted_context) {
			if ( 'prc-block/story-item' !== $parsed_block['blockName'] ) {
				return $context;
			}
			// if hoisted context has postId or postType remove it from the context.
			if ( array_key_exists('postId', $hoisted_context) ) {
				unset($hoisted_context['postId']);
			}
			if ( array_key_exists('postType', $hoisted_context) ) {
				unset($hoisted_context['postType']);
			}
			// merge $context and the hoisted
			$context = array_merge($context, $hoisted_context);
			return $context;
		}, 10, 3);

		return $context;
	}

	/**
	* Register additional context for core/query blocks like prc-platform/block-area-context.
	* @hook block_type_metadata_settings 100, 2
	* @param mixed $settings
	* @param mixed $metadata
	* @return mixed
	*/
	public function update_context(array $settings, array $metadata) {
		if ( self::$block_name === $metadata['name'] ) {
			$settings['uses_context'] = array_merge(
				array_key_exists('uses_context', $settings) ? $settings['uses_context'] : array(),
				array(
					"prc-platform/block-area-context",
				)
			);
		}
		return $settings;
	}

}
