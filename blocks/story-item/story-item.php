<?php
namespace PRC\Platform\Blocks;
use WP_Block_Parser_Block;
use WP_Error;

/**
 * Block Name:        Story Item
 * Requires at least: 6.4
 * Requires PHP:      8.1
* Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Story_Item {
	public static $block_json = null;
	public static $version;
	public static $block_name;
	public static $view_script_handle = null;
	public static $editor_script_handle = null;
	public static $style_handle = null;
	public static $dir = __DIR__;
	public static $date_format = 'M j, Y';
	public static $cache_invalidate = '10-23-2023';
	public static $cache_ttl = 10 * MINUTE_IN_SECONDS;

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/story-item/build/block.json';
		self::$block_json = \wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		self::$version = self::$block_json['version'];
		self::$block_name = self::$block_json['name'];

		require_once self::$dir . '/class-story-item-api.php';

		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action('init', $this, 'block_init');
			$loader->add_filter( 'newsletterglue_allowed_block_list', $this, 'allow_in_newsletter_glue', 10, 1 );
		}
	}

	/**
	 * Allows for the block to be used in the Newsletter Glue plugin.
	 * @hook newsletterglue_allowed_block_list
	 * @param mixed $blocks
	 * @return mixed
	 */
	public function allow_in_newsletter_glue($blocks) {
		$blocks[] = self::$block_name;
		return $blocks;
	}

	/**
	 * Renders the `prc-block/story-item` block.
	 *
	 * Classname: .wp-block-prc-block-story-item
	 *
	 * @param array $attributes The block attributes.
	 *
	 * @return string Returns story item markup.
	 */
	public function render_story_item( $attributes, $content, $block ) {
		$story_item = new Story_Item_API($attributes, $content, $block->context);

		if ( array_key_exists('isNewsletterGlue', $story_item->attributes) && true === $story_item->attributes['isNewsletterGlue'] ) {
			return $this->render_newsletter_glue_variant($attributes, $content, $block);
		}

		$block_wrapper_attrs = $story_item->get_block_wrapper_attributes();

		$meta_markup = $story_item->get_meta_markup();
		$title_markup = $story_item->get_title_markup();
		$content_markup = $story_item->get_content_markup();
		$image_markup = $story_item->get_image_markup();

		return wp_sprintf(
			'<article %1$s>%2$s %3$s %4$s %5$s</article>',
			$block_wrapper_attrs,
			$meta_markup,
			$image_markup,
			$title_markup,
			$content_markup,
		);
	}

	public function render_newsletter_glue_variant( $attributes, $block_content, $block ) {
		return wp_sprintf(
			'<div>Mailchimp Version of Story Item Goes Here</div>'
		);
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
		register_block_type(
			self::$dir . '/build',
			array(
				'render_callback' => array( $this, 'render_story_item' ),
			)
		);
	}
}

