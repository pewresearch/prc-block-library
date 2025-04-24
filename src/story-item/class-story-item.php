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
	 * Cache TTL
	 *
	 * @var int
	 */
	public static $cache_ttl = 10 * MINUTE_IN_SECONDS;

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
			$loader->add_action( 'init', $this, 'block_init' );
			$loader->add_filter( 'newsletterglue_allowed_block_list', $this, 'allow_in_newsletter_glue', 10, 1 );
			$loader->add_filter( 'render_block_context', $this, 'handle_story_item_query_context_awareness', 100, 3 );
		}
	}

	/**
	 * Allows for the block to be used in the Newsletter Glue plugin.
	 *
	 * @hook newsletterglue_allowed_block_list
	 * @param mixed $blocks Blocks.
	 * @return mixed
	 */
	public function allow_in_newsletter_glue( $blocks ) {
		$blocks[] = 'prc-block/story-item';
		return $blocks;
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

		$block_wrapper_attrs = $story_item->get_block_wrapper_attributes();

		$meta_markup    = $story_item->get_meta_markup();
		$title_markup   = $story_item->get_title_markup();
		$content_markup = $story_item->get_content_markup();
		$image_markup   = $story_item->get_image_markup();

		return wp_sprintf(
			'<article %1$s>%2$s %3$s %4$s %5$s</article>',
			$block_wrapper_attrs,
			$meta_markup,
			$image_markup,
			$title_markup,
			$content_markup,
		);
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
