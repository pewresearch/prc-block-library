<?php
namespace PRC\Platform\Blocks;
use WP_Query;
/**
 * Block Name:        Attachment Info
 * Description:       Displays the titles of other images attached to a post.
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */

class Attachment_Info {
	public static $block_json = null;
	public static $version;
	public static $block_name;
	public static $dir = __DIR__;

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/attachment-info/build/block.json';
		self::$block_json = \wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		self::$version = self::$block_json['version'];
		self::$block_name = self::$block_json['name'];
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action('init', $this, 'block_init');
		}
	}

	public function get_attachments($parent_post_id, $post_id = null) {
		$cached_data = false;
		// $cached_data = wp_cache_get( $parent_post_id, 'attachment-info' );
		if (false !== $cached_data) {
			return $cached_data;
		}

		// check if this is an attachment page and if so get it's id...
		$post__not_in = [];
		if ( is_attachment($post_id) ) {
			$post__not_in = [$post_id];
		}

		// Filter out Art Direction
		// Get the art direction from the parent post and filter out any id's that are already in use
		$art_direction = new \PRC\Platform\Art_Direction(null, null);
		$art_direction = $art_direction->get_art( $parent_post_id, 'all' );
		if ($art_direction) {
			$image_slots = array_keys($art_direction);
			foreach ($image_slots as $slot) {
				if (isset($art_direction[$slot]['id']) && !in_array($art_direction[$slot]['id'], $post__not_in)) {
					array_push($post__not_in, $art_direction[$slot]['id']);
				}
			}
		}

		$attachments = new WP_Query( array(
			'post_type' => 'attachment',
			'post_parent' => $parent_post_id,
			'post_status' => 'inherit',
			'post__not_in' => $post__not_in,
			'posts_per_page' => 50,
			'orderby' => 'date',
			'order' => 'asc',
			'media_type' => 'image',
		) );

		if (! $attachments->have_posts() ) {
			return false;
		}

		$attachments = $attachments->posts;

		$to_return = array();

		foreach ($attachments as $attachment) {
			if ( $attachment->menu_order > 0 ) {
				continue;
      }
			if ( false === strpos( $attachment->post_title, ' ' ) ) {
				continue;
			}
			if ( 'application/pdf' === get_post_mime_type( $attachment->ID ) ) {
				continue;
			}
			// Filter out Getty copyrighted images
			if ( false !== strpos( $attachment->post_content, 'Getty' ) ) {
				continue;
			}

			$to_return[] = array(
				'link' => get_attachment_link($attachment->ID),
				'title' => $attachment->post_title,
			);
		}

		wp_cache_set( $parent_post_id, $to_return, 'attachment-info', 1 * HOUR_IN_SECONDS );

		return $to_return;
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$post_id = $block->context['postId'];

		$parent_post_id = wp_get_post_parent_id($post_id);

		$heading_text = array_key_exists('heading', $attributes) ? $attributes['heading'] : false;

		$attachments = $this->get_attachments($parent_post_id, $post_id);

		$parent_post_title = get_the_title($parent_post_id);
		$parent_post_url = get_the_permalink($parent_post_id);

		if (! $attachments ) {
			return '';
		}

		$list_item_classnames = \PRC\Platform\Block_Utils\classNames(
			'wp-block-prc-block-attachment-info__list-item',
			'flex-align-center',
			array(
				'has-hover-color' => $attributes['hoverTextColor'],
				'has-hover-' . $attributes['hoverTextColor'] . '-color' => $attributes['hoverTextColor'],
				'has-hover-background' => $attributes['hoverBackgroundColor'],
				'has-hover-' . $attributes['hoverBackgroundColor'] . '-background-color' => $attributes['hoverBackgroundColor'],
				'has-focus-color' => $attributes['activeTextColor'],
				'has-focus-' . $attributes['activeTextColor'] . '-color' => $attributes['activeTextColor'],
				'has-focus-background' => $attributes['activeBackgroundColor'],
				'has-focus-' . $attributes['activeBackgroundColor'] . '-background-color' => $attributes['activeBackgroundColor'],
			)
		);

		$content .= wp_sprintf(
			'<li class="%1$s"><a href="%2$s">%3$s</a></li>',
			$list_item_classnames,
			$parent_post_url,
			$parent_post_title,
		);

		foreach ($attachments as $attachment) {
			$content .= wp_sprintf(
				'<li class="%1$s"><a href="%2$s">%3$s</a></li>',
				$list_item_classnames,
				$attachment['link'],
				$attachment['title'],
			);
		}

		$block_attrs = array(
			'class' => \PRC\Platform\Block_Utils\classNames(
				'common-block-style--baseball-card',
				array(
					'has-text-color' => $attributes['textColor'],
					'has-' . $attributes['textColor'] .'-color' => $attributes['textColor'],
					'has-background' => $attributes['backgroundColor'],
					'has-' . $attributes['backgroundColor'] . '-background-color' => $attributes['backgroundColor'],
				),
			),
		);
		$block_attrs = get_block_wrapper_attributes($block_attrs);

		$block_gap = \PRC\Platform\Block_Utils\get_block_gap_support_value($attributes);

		$heading = wp_sprintf(
			'<div class="%1$s"><h2>%2$s</h2></div>',
			\PRC\Platform\Block_Utils\classNames(
				'wp-block-prc-block-table-of-contents__heading',
				array(
					'has-text-color' => $attributes['headingTextColor'],
					'has-'.$attributes['headingTextColor'].'-color' => $attributes['headingTextColor'],
					'has-background' => $attributes['headingBackgroundColor'],
					'has-'.$attributes['headingBackgroundColor'].'-background-color' => $attributes['headingBackgroundColor'],
					'is-hidden' => true === $attributes['hideHeading'],
				),
			),
			$heading_text,
		);

		$list = wp_sprintf(
			'<ul class="wp-block-prc-block-attachment-info__list" role="list" %1$s>%2$s</ul>',
			'style="--block-gap: ' . $block_gap . ';"',
			$content,
		);

		return wp_sprintf(
			'<div %1$s>%2$s %3$s</div>',
			$block_attrs,
			$heading,
			$list
		);
	}

	/**
	* Registers the block using the metadata loaded from the `block.json` file.
	* Behind the scenes, it registers also all assets so they can be enqueued
	* through the block editor in the corresponding context.
	* @hook init
	*
	* @see https://developer.wordpress.org/reference/functions/register_block_type/
	*/
	public function block_init() {
		register_block_type( self::$dir . '/build',
		array(
			'render_callback' => array( $this, 'render_block_callback' ),
		) );
	}

}
