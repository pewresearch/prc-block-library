<?php
/**
 * Story Item Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use WP_Block_Parser_Block;
use WP_Error;
use WP_Block;

/**
 * Block Name:        Story Item
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Story_Item {
	/**
	 * Date format
	 *
	 * @var string
	 */
	public static $date_format = 'M j, Y';

	/**
	 * Cache invalidate
	 *
	 * @var string
	 */
	public static $cache_invalidate = '10-23-2023';

	/**
	 * Object cache group for rendered story items.
	 *
	 * @var string
	 */
	public static $cache_group = 'story-item-v1';

	/**
	 * Cache TTL
	 *
	 * @var int
	 */
	public static $cache_ttl = HOUR_IN_SECONDS;

	/**
	 * Constructor
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		require_once __DIR__ . '/class-story-item-api.php';

		$this->init( $loader );
	}

	/**
	 * Initialize the block
	 *
	 * @param mixed $loader Loader.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			// After WP AI plugins_loaded bootstrap (priority 10); Abstract_Feature is not autoloadable before that.
			$loader->add_action( 'plugins_loaded', $this, 'register_wp_ai_features', 11 );
			$loader->add_action( 'init', $this, 'block_init' );
			$loader->add_filter( 'render_block_context', $this, 'handle_story_item_query_context_awareness', 100, 3 );
			$loader->add_action( 'prc_platform_on_update', $this, 'clear_cache_on_update', 10, 1 );
		}
	}

	/**
	 * Load Story Item AI classes and register the feature with the WP AI plugin.
	 *
	 * @return void
	 */
	public function register_wp_ai_features() {
		if ( ! class_exists( '\WordPress\AI\Abstracts\Abstract_Feature' ) ) {
			return;
		}

		require_once __DIR__ . '/class-ai.php';

		add_action(
			'wpai_register_features',
			function ( $registry ) {
				$registry->register_feature( new Story_Item_AI() );
			}
		);
	}

	/**
	 * Get the cache version for a post-backed story item.
	 *
	 * @param int|false $post_id Post ID.
	 * @return int
	 */
	public static function get_cache_version( $post_id ) {
		if ( ! $post_id ) {
			return 0;
		}
		$version = wp_cache_get( 'v_' . (int) $post_id, self::$cache_group );
		return false === $version ? 0 : (int) $version;
	}

	/**
	 * Bump cache version so prior render cache entries are ignored.
	 *
	 * @param int $post_id Post ID.
	 * @return void
	 */
	public static function bump_cache_version( int $post_id ): void {
		wp_cache_set(
			'v_' . $post_id,
			self::get_cache_version( $post_id ) + 1,
			self::$cache_group,
			DAY_IN_SECONDS
		);
	}

	/**
	 * Invalidate story item render cache when a post updates.
	 *
	 * @hook prc_platform_on_update
	 * @param \WP_Post $post Post object.
	 * @return void
	 */
	public function clear_cache_on_update( $post ) {
		if ( ! $post instanceof \WP_Post ) {
			return;
		}
		self::bump_cache_version( (int) $post->ID );
	}

	/**
	 * Renders the `prc-block/story-item` block.
	 *
	 * Classname: .wp-block-prc-block-story-item
	 *
	 * @param array    $attributes The block attributes.
	 * @param string   $content Content.
	 * @param WP_Block $block Block.
	 * @return string Returns story item markup.
	 */
	public function render_story_item( $attributes, $content, $block ) {
		$story_item = new Story_Item_API( $attributes, $content, $block->context );

		$use_cache = ! is_user_logged_in() && ! is_preview() && false !== $story_item->post_id;
		$cache_key = $use_cache ? $story_item->get_cache_key() : false;

		if ( $use_cache && false !== $cache_key ) {
			$cached_markup = wp_cache_get( $cache_key, self::$cache_group );
			if ( false !== $cached_markup && is_string( $cached_markup ) ) {
				return $cached_markup;
			}
		}

		$block_wrapper_attrs = $story_item->get_block_wrapper_attributes();

		$meta_markup    = $story_item->get_meta_markup();
		$title_markup   = $story_item->get_title_markup();
		$content_markup = $story_item->get_content_markup();
		$image_markup   = $story_item->get_image_markup();

		$markup = wp_sprintf(
			'<article %1$s>%2$s %3$s %4$s %5$s</article>',
			$block_wrapper_attrs,
			$meta_markup,
			$image_markup,
			$title_markup,
			$content_markup,
		);

		if ( $use_cache && false !== $cache_key ) {
			wp_cache_set( $cache_key, $markup, self::$cache_group, self::$cache_ttl );
		}

		return $markup;
	}

	/**
	 * Hijacks core/post-template block context so that the queryId and the query are passed down to story-item blocks. This makes story item blocks "query" context aware and as such they will change their attributes if placed in a query block. We also remove postId and postType for good measure.
	 *
	 * @hook render_block_context
	 * @param array         $context Context.
	 * @param array         $parsed_block Parsed block.
	 * @param WP_Block|null $parent_block Parent block.
	 * @return array
	 */
	public function handle_story_item_query_context_awareness( array $context, array $parsed_block, WP_Block|null $parent_block ) {
		if ( 'core/post-template' === $parsed_block['blockName'] ) {
			$hoisted_context = $context;
			// We need this to only run for the blocks inside the post-template block...
			add_filter(
				'render_block_context',
				function ( $context, $parsed_block, $parent_block ) use ( $hoisted_context ) {
					if ( 'prc-block/story-item' !== $parsed_block['blockName'] ) {
						return $context;
					}
					// If the parent block is not a post-template block, then we don't need to do anything.
					if ( null === $parent_block ) {
						return $context;
					}
					if ( ! in_array(
						$parent_block->name,
						array(
							'core/null',
							'core/post-template',
						)
					) ) {
						return $context;
					}

					// If hoisted context has postId or postType remove it from the context.
					if ( array_key_exists( 'postId', $hoisted_context ) ) {
						unset( $hoisted_context['postId'] );
					}
					if ( array_key_exists( 'postType', $hoisted_context ) ) {
						unset( $hoisted_context['postType'] );
					}

					// Merge the hoisted context with the current context.
					$context = array_merge( $context, $hoisted_context );
					return $context;
				},
				10,
				3
			);
		}

		return $context;
	}

	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @hook init
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/story-item',
			array(
				'render_callback' => array( $this, 'render_story_item' ),
			)
		);
	}
}
