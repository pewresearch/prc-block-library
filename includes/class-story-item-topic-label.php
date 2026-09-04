<?php
/**
 * Rewrite story-item labels on topic-style archives (PRC-870).
 *
 * Topic-lede modules often persist metaTaxonomy category (homepage slots) and
 * a false or topic-name label. On a topic archive that lookup prints the
 * primary topic instead of the format. This filter rewrites attributes before
 * Story_Item_API runs so existing content does not need a resave.
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Normalize story-item attributes on topic archives.
 */
class Story_Item_Topic_Label {

	/**
	 * Register hooks.
	 *
	 * @param Loader $loader The plugin loader.
	 */
	public function __construct( $loader ) {
		$loader->add_filter( 'render_block_data', $this, 'normalize_parsed_block', 10, 1 );
	}

	/**
	 * Whether the current request is a topic-style archive.
	 *
	 * @return bool
	 */
	public static function is_topic_archive() {
		if ( function_exists( 'is_category' ) && is_category() ) {
			return true;
		}
		if ( function_exists( 'is_tax' ) && is_tax( array( 'collection', 'regions-countries', 'prc_newsletter_list' ) ) ) {
			return true;
		}
		return false;
	}

	/**
	 * Rewrite story-item attributes so topic archives show the format.
	 *
	 * @param array $attributes Story-item attributes.
	 * @return array
	 */
	public static function normalize_attributes( array $attributes ) {
		$taxonomy = array_key_exists( 'metaTaxonomy', $attributes ) ? $attributes['metaTaxonomy'] : 'formats';
		if ( 'disabled' === $taxonomy ) {
			return $attributes;
		}

		if ( 'category' === $taxonomy ) {
			$attributes['metaTaxonomy'] = 'formats';
		}

		$label   = array_key_exists( 'label', $attributes ) ? $attributes['label'] : '';
		$post_id = array_key_exists( 'postId', $attributes ) ? $attributes['postId'] : 0;
		if ( self::label_matches_post_category( $label, $post_id ) ) {
			$attributes['label'] = '';
		}

		return $attributes;
	}

	/**
	 * Apply attribute rewrites on topic archives before story-item render.
	 *
	 * @param array $parsed_block Parsed block.
	 * @return array
	 */
	public function normalize_parsed_block( $parsed_block ) {
		if ( ! is_array( $parsed_block ) ) {
			return $parsed_block;
		}
		if ( ( $parsed_block['blockName'] ?? '' ) !== 'prc-block/story-item' ) {
			return $parsed_block;
		}
		if ( ! self::is_topic_archive() ) {
			return $parsed_block;
		}
		$attributes            = is_array( $parsed_block['attrs'] ?? null ) ? $parsed_block['attrs'] : array();
		$parsed_block['attrs'] = self::normalize_attributes( $attributes );
		return $parsed_block;
	}

	/**
	 * Whether a baked label matches a category assigned to the post.
	 *
	 * @param mixed $label   Baked label attribute.
	 * @param mixed $post_id Post ID.
	 * @return bool
	 */
	private static function label_matches_post_category( $label, $post_id ) {
		if ( ! is_string( $label ) || '' === $label || empty( $post_id ) ) {
			return false;
		}
		$normalized = strtolower( str_replace( '-', ' ', $label ) );
		$terms      = wp_get_object_terms( $post_id, 'category', array() );
		if ( is_wp_error( $terms ) || empty( $terms ) ) {
			return false;
		}
		foreach ( $terms as $term ) {
			if ( ! is_object( $term ) ) {
				continue;
			}
			$name = strtolower( str_replace( '-', ' ', (string) $term->name ) );
			$slug = strtolower( str_replace( '-', ' ', (string) $term->slug ) );
			if ( $normalized === $name || $normalized === $slug ) {
				return true;
			}
		}
		return false;
	}
}
