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
	 * Request-local version map (post_id => int).
	 *
	 * @var array<int, int>
	 */
	private static $versions = array();

	/**
	 * Request-local markup bag (cache_key => string).
	 *
	 * @var array<string, string>
	 */
	private static $markup = array();

	/**
	 * Request-local device string from get_current_device().
	 *
	 * @var string|null
	 */
	private static $device = null;

	/**
	 * Request-local block.json attribute defaults.
	 *
	 * @var array<string, mixed>|null
	 */
	private static $attribute_defaults = null;

	/**
	 * Whether this request already primed story-item keys from page content.
	 *
	 * @var bool
	 */
	private static $primed_page = false;

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
			$loader->add_filter( 'the_content', $this, 'prime_from_content', 8, 1 );
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
	 * Load story-item attribute defaults once per request.
	 *
	 * Prefer the registered block type. Support plugins add attributes via
	 * block_type_metadata after src/block.json is compiled. Prime and render
	 * must hash that same set or markup get_multiple misses every card.
	 *
	 * @return array<string, mixed>
	 */
	public static function attribute_defaults(): array {
		if ( null !== self::$attribute_defaults ) {
			return self::$attribute_defaults;
		}

		$defaults = array();
		if ( class_exists( '\WP_Block_Type_Registry' ) ) {
			$block = \WP_Block_Type_Registry::get_instance()->get_registered( 'prc-block/story-item' );
			if ( $block && isset( $block->attributes ) && is_array( $block->attributes ) ) {
				foreach ( $block->attributes as $key => $opts ) {
					$defaults[ $key ] = ( is_array( $opts ) && array_key_exists( 'default', $opts ) ) ? $opts['default'] : null;
				}
			}
		}

		if ( empty( $defaults ) ) {
			$file       = __DIR__ . '/block.json';
			$json       = function_exists( 'wp_json_file_decode' )
				? wp_json_file_decode( $file, array( 'associative' => true ) )
				: json_decode( (string) file_get_contents( $file ), true ); // phpcs:ignore WordPressVIPMinimum.Performance.FetchingRemoteData.FileGetContentsUnknown
			$attributes = ( is_array( $json ) && isset( $json['attributes'] ) && is_array( $json['attributes'] ) )
				? $json['attributes']
				: array();

			foreach ( $attributes as $key => $opts ) {
				$defaults[ $key ] = ( is_array( $opts ) && array_key_exists( 'default', $opts ) ) ? $opts['default'] : null;
			}
		}

		self::$attribute_defaults = $defaults;
		return $defaults;
	}

	/**
	 * Normalize attributes so prime and render hash the same payload.
	 *
	 * WordPress merges registered defaults plus support-injected keys before
	 * render. parse_blocks only has saved attrs. Fill defaults, drop unknown
	 * keys, keep style, and sort so key order cannot split the cache.
	 *
	 * @param array $attributes Block attributes.
	 * @return array<string, mixed>
	 */
	public static function normalize_attributes( array $attributes ): array {
		$defaults = self::attribute_defaults();
		$merged   = wp_parse_args( $attributes, $defaults );
		$normalized = array_intersect_key( $merged, $defaults );
		$normalized['style'] = $attributes['style'] ?? ( $merged['style'] ?? null );
		ksort( $normalized );
		return $normalized;
	}

	/**
	 * Resolve a story-item post ID from attributes, then context.
	 *
	 * @param array $attributes Block attributes.
	 * @param array $context    Block context.
	 * @return int|false
	 */
	public static function resolve_post_id( array $attributes, array $context ) {
		if ( array_key_exists( 'postId', $attributes ) && ! empty( $attributes['postId'] ) ) {
			return $attributes['postId'];
		}
		if ( array_key_exists( 'postId', $context ) && ! empty( $context['postId'] ) ) {
			return $context['postId'];
		}
		return false;
	}

	/**
	 * Whether the current request is a mobile device.
	 *
	 * Caches the device string once per request.
	 *
	 * @return bool
	 */
	public static function get_is_mobile(): bool {
		if ( null === self::$device ) {
			self::$device = \PRC\BlockUtils\get_current_device();
		}
		return 'mobile' === self::$device;
	}

	/**
	 * Build the story-item markup cache key.
	 *
	 * @param array      $attributes Block attributes.
	 * @param mixed      $content    Render content.
	 * @param array      $context    Block context.
	 * @param int|false  $post_id    Resolved post ID.
	 * @param int|null   $version    Cache version. Null reads the request-local map.
	 * @return string
	 */
	public static function build_cache_key( array $attributes, $content, array $context, $post_id, $version = null ): string {
		$attributes = self::normalize_attributes( $attributes );
		$content    = normalize_whitespace( (string) $content );
		if ( null === $version ) {
			$version = self::get_cache_version( $post_id );
		}
		$query_id = ( array_key_exists( 'queryId', $context ) && ! empty( $context['queryId'] ) )
			? $context['queryId']
			: false;
		$args     = array(
			'query_id'   => $query_id,
			'post_id'    => $post_id,
			'is_mobile'  => self::get_is_mobile(),
			'version'    => (int) $version,
			'attributes' => $attributes,
			'content'    => md5( (string) $content ),
			'invalidate' => self::$cache_invalidate,
		);
		return md5( wp_json_encode( $args ) );
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
		$post_id = (int) $post_id;
		if ( array_key_exists( $post_id, self::$versions ) ) {
			return self::$versions[ $post_id ];
		}
		$version                     = wp_cache_get( 'v_' . $post_id, self::$cache_group );
		$version                     = false === $version ? 0 : (int) $version;
		self::$versions[ $post_id ] = $version;
		return $version;
	}

	/**
	 * Prime version keys for a set of post IDs via get_multiple.
	 *
	 * @param array $post_ids Post IDs.
	 * @return void
	 */
	public static function prime_versions( array $post_ids ): void {
		$ids = array();
		foreach ( $post_ids as $post_id ) {
			$post_id = (int) $post_id;
			if ( $post_id > 0 && ! array_key_exists( $post_id, self::$versions ) ) {
				$ids[ $post_id ] = $post_id;
			}
		}
		if ( empty( $ids ) ) {
			return;
		}

		$keys  = array();
		foreach ( $ids as $post_id ) {
			$keys[] = 'v_' . $post_id;
		}
		$found = function_exists( 'wp_cache_get_multiple' )
			? wp_cache_get_multiple( $keys, self::$cache_group )
			: array();
		if ( ! is_array( $found ) ) {
			$found = array();
		}

		foreach ( $ids as $post_id ) {
			$key                        = 'v_' . $post_id;
			$value                      = array_key_exists( $key, $found ) ? $found[ $key ] : false;
			self::$versions[ $post_id ] = false === $value ? 0 : (int) $value;
		}
	}

	/**
	 * Prime markup keys via get_multiple.
	 *
	 * @param array $keys Markup cache keys.
	 * @return void
	 */
	public static function prime_markup( array $keys ): void {
		$keys = array_values( array_unique( array_filter( $keys, 'is_string' ) ) );
		if ( empty( $keys ) ) {
			return;
		}

		$found = function_exists( 'wp_cache_get_multiple' )
			? wp_cache_get_multiple( $keys, self::$cache_group )
			: array();
		if ( ! is_array( $found ) ) {
			return;
		}

		foreach ( $found as $key => $value ) {
			if ( is_string( $value ) ) {
				self::$markup[ (string) $key ] = $value;
			}
		}
	}

	/**
	 * Bump cache version so prior render cache entries are ignored.
	 *
	 * @param int $post_id Post ID.
	 * @return void
	 */
	public static function bump_cache_version( int $post_id ): void {
		$next = self::get_cache_version( $post_id ) + 1;
		wp_cache_set(
			'v_' . $post_id,
			$next,
			self::$cache_group,
			DAY_IN_SECONDS
		);
		self::$versions[ $post_id ] = $next;
	}

	/**
	 * Invalidate story item render cache when a post updates.
	 *
	 * @hook prc_platform_on_update
	 * @param object $post Post-like object from the publish pipeline.
	 * @return void
	 */
	public function clear_cache_on_update( $post ) {
		if ( ! is_object( $post ) || empty( $post->ID ) ) {
			return;
		}
		self::bump_cache_version( (int) $post->ID );
	}

	/**
	 * Prime story-item versions and markup from post content once per request.
	 *
	 * Empty content and content with no story-item blocks leave the page unprimed
	 * so a later the_content pass can still batch. The front page template never
	 * enters the main loop. prc-platform/latest-homepage applies the_content to
	 * the homepage CPT, and that is the pass that must prime.
	 *
	 * @param string|null $content Raw post content from the_content.
	 * @return void
	 */
	public static function maybe_prime_page_story_items( $content = null ): void {
		if ( self::$primed_page ) {
			return;
		}

		if ( is_user_logged_in() || is_preview() ) {
			self::$primed_page = true;
			return;
		}

		if ( ! is_string( $content ) || '' === $content || ! function_exists( 'parse_blocks' ) ) {
			return;
		}

		$collected = self::collect_story_item_blocks( parse_blocks( $content ) );
		if ( empty( $collected ) ) {
			return;
		}

		self::$primed_page = true;

		$ids = array();
		foreach ( $collected as $item ) {
			$ids[] = $item['post_id'];
		}
		self::prime_versions( $ids );

		$keys = array();
		foreach ( $collected as $item ) {
			$keys[] = self::build_cache_key( $item['attrs'], $item['content'], array(), $item['post_id'] );
		}
		self::prime_markup( $keys );
	}

	/**
	 * Hook callback: prime from the_content before do_blocks.
	 *
	 * Runs outside the main loop on purpose. The live homepage is a block
	 * template that renders prc-platform/latest-homepage, which applies
	 * the_content to the homepage CPT without entering the page query loop.
	 *
	 * @hook the_content
	 * @param string $content Post content.
	 * @return string
	 */
	public function prime_from_content( string $content ): string {
		self::maybe_prime_page_story_items( $content );
		return $content;
	}

	/**
	 * Collect story-item blocks with a resolvable postId.
	 *
	 * @param array $blocks Parsed blocks.
	 * @return array<int, array{attrs: array, content: string, post_id: mixed}>
	 */
	private static function collect_story_item_blocks( array $blocks ): array {
		$found = array();
		foreach ( $blocks as $block ) {
			if ( ! is_array( $block ) ) {
				continue;
			}
			if ( 'prc-block/story-item' === ( $block['blockName'] ?? '' ) ) {
				$attrs   = isset( $block['attrs'] ) && is_array( $block['attrs'] ) ? $block['attrs'] : array();
				$post_id = self::resolve_post_id( $attrs, array() );
				if ( false !== $post_id ) {
					$content = '';
					if ( ! empty( $block['innerHTML'] ) && is_string( $block['innerHTML'] ) ) {
						$content = $block['innerHTML'];
					} elseif ( ! empty( $block['innerContent'] ) && is_array( $block['innerContent'] ) ) {
						$pieces = array();
						foreach ( $block['innerContent'] as $piece ) {
							if ( is_string( $piece ) ) {
								$pieces[] = $piece;
							}
						}
						$content = implode( '', $pieces );
					}
					$found[] = array(
						'attrs'   => $attrs,
						'content' => $content,
						'post_id' => $post_id,
					);
				}
			}
			if ( ! empty( $block['innerBlocks'] ) && is_array( $block['innerBlocks'] ) ) {
				$found = array_merge( $found, self::collect_story_item_blocks( $block['innerBlocks'] ) );
			}
		}
		return $found;
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
		$context   = ( isset( $block->context ) && is_array( $block->context ) ) ? $block->context : array();
		$post_id   = self::resolve_post_id( is_array( $attributes ) ? $attributes : array(), $context );
		$use_cache = ! is_user_logged_in() && ! is_preview() && false !== $post_id;
		$cache_key = false;

		if ( $use_cache ) {
			$cache_key = self::build_cache_key(
				is_array( $attributes ) ? $attributes : array(),
				$content,
				$context,
				$post_id
			);
			if ( isset( self::$markup[ $cache_key ] ) ) {
				return self::$markup[ $cache_key ];
			}
			$cached_markup = wp_cache_get( $cache_key, self::$cache_group );
			if ( is_string( $cached_markup ) ) {
				self::$markup[ $cache_key ] = $cached_markup;
				return $cached_markup;
			}
		}

		$story_item = new Story_Item_API( $attributes, $content, $block->context );

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
			self::$markup[ $cache_key ] = $markup;
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
			$query   = $context['query'] ?? null;
			$include = is_array( $query ) ? ( $query['include'] ?? null ) : null;
			if ( is_array( $include ) && ! empty( $include ) ) {
				self::prime_versions( $include );
			} elseif ( is_string( $include ) && '' !== $include ) {
				self::prime_versions( array_map( 'intval', preg_split( '/[,\s]+/', $include ) ) );
			}

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
