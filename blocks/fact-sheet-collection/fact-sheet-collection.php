<?php
namespace PRC\Platform\Blocks;
use WP_Term;
use WP_Post;
use WP_Error;
/**
 * Block Name:        Fact Sheet Collection
 * Description:       Display the hierarchy of the fact sheet&#39;s collection term as well and a link to download an associated PDF.
 * Version:           0.1.0
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Fact_Sheet_Collection {
	public static $block_json = null;
	public static $version;
	public static $block_name;
	public static $view_script_handle = null;
	public static $editor_script_handle = null;
	public static $style_handle = null;
	public static $dir = __DIR__;
	public static $taxonomy = 'collection';
	public static $post_type = 'fact-sheet';

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/fact-sheet-collection/build/block.json';
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

	public function get_english_language_link($term_id) {
		$post_status = array('publish');
		if ( is_user_logged_in() ) {
			$post_status[] = 'draft';
			$post_status[] = 'private';
		}
		// If this child term has english posts then use the english post link, otherwise fallback to the child term link.
		$english_post = get_posts(array(
			'posts_per_page' => 1,
			'post_type' => self::$post_type,
			'post_status' => $post_status,
			'languages' => 'en',
			'tax_query' => array(
				'relation' => 'AND',
				array(
					'taxonomy' => self::$taxonomy,
					'field' => 'term_id',
					'terms' => $term_id,
				),
				array(
					'taxonomy' => 'languages',
					'field' => 'slug',
					'terms' => array('en'),
				),
			),
		));
		if (!empty($english_post)) {
			$english_post = array_pop($english_post);
			return get_permalink($english_post->ID);
		}
		return false;
	}

	public function get_alt_language_posts($term_id, $exclude_posts = array()) {
		$post_status = array('publish');
		if ( is_user_logged_in() ) {
			$post_status[] = 'draft';
			$post_status[] = 'private';
		}
		$args = array(
			'posts_per_page' => 50,
			'post_type' => self::$post_type,
			'post__not_in' => $exclude_posts,
			'post_status' => $post_status,
			'tax_query' => array(
				array(
					'taxonomy' => self::$taxonomy,
					'field' => 'term_id',
					'terms' => $term_id,
				),
				array(
					'taxonomy' => 'languages',
					'field' => 'slug',
					'terms' => array('en'),
					'operator' => 'NOT IN',
				),
			),
		);
		// get all the other NON en language posts that have the child_term->term_id in the collection taxonomy.
		return get_posts($args);
	}

	public function get_collection($post_id) {
		$collection_terms = wp_get_post_terms($post_id, self::$taxonomy);
		if (empty($collection_terms)) {
			return array(
				'parent_term' => null,
				'child_terms' => array(),
			);
		}
		// Get the first term out of the collection_terms array.
		$collection_term = array_shift($collection_terms);
		if ( ! $collection_term instanceof WP_Term ) {
			return array(
				'parent_term' => null,
				'child_terms' => array(),
			);
		}

		$parent_term = get_term($collection_term->parent, self::$taxonomy);
		$parent_term_id = isset($parent_term->term_id) ? $parent_term->term_id : null;
		$parent_term_link = get_term_link($parent_term_id, self::$taxonomy);
		$parent_term = array(
			'term_id' => isset($parent_term->term_id) ? $parent_term->term_id : null,
			'name' => isset($parent_term->name) ? $parent_term->name : '',
			'link' => isset($parent_term_link) ? $parent_term_link : '',
		);

		// Get the parent term's children, returns a list of term names, ids, links, prioritizes a link back to an english post if it exists.
		$child_terms = get_term_children($parent_term_id, self::$taxonomy);
		$child_terms = array_map(function ($term_id) use ($collection_term) {
			$child_term = get_term($term_id, self::$taxonomy);
			if ( ! $child_term instanceof WP_Term ) {
				return;
			}
			$english_link = $this->get_english_language_link($child_term->term_id);
			$link = $english_link ? $english_link : get_term_link($child_term->term_id, self::$taxonomy);
			$child_term = array(
				'term_id' => $child_term->term_id,
				'name' => $child_term->name,
				'link' => $link,
			);
			return $child_term;
		}, $child_terms);

		// Filter out any null values.
		$child_terms = array_filter($child_terms);
		// Sort the child terms by name.
		usort($child_terms, function ($a, $b) {
			return strcmp($a['name'], $b['name']);
		});

		return array(
			'collection_term' => $collection_term,
			'parent_term' => $parent_term,
			'child_terms' => $child_terms,
		);
	}

	public function render_callback($attributes, $content, $block) {
		if ( is_admin() ) {
			return;
		}
		$post_id = get_the_ID();
		$collection = $this->get_collection($post_id);
		$collection_term = $collection['collection_term'];
		$parent_term = $collection['parent_term'];
		$child_terms = $collection['child_terms'];
		$alt_language_posts = $this->get_alt_language_posts($collection_term->term_id, array($post_id));
		$collection = array(
			'terms' => array_map(function ($child_term) use ($collection_term) {
				return wp_sprintf(
					'<a href="%1$s" class="%2$s">%3$s</a>',
					$child_term['link'],
					\PRC\Platform\Block_Utils\classNames('wp-block-prc-block-fact-sheet-collection--term-link', array(
						'is-active' => $child_term['term_id'] === $collection_term->term_id,
					)),
					$child_term['name'],
				);
			}, $child_terms),
			'alt_languages' => array_map(function ($other_language_post) {
				if ( ! $other_language_post instanceof WP_Post ) {
					return;
				}
				$other_language_post_permalink = get_permalink($other_language_post->ID);
				$other_language_post_language = wp_get_post_terms($other_language_post->ID, 'languages');
				$other_language_post_language = array_shift($other_language_post_language);
				if ( ! $other_language_post_language instanceof WP_Term ) {
					return;
				}
				$other_language_post_language = $other_language_post_language->name;
				return wp_sprintf(
					'<a href="%1$s" class="wp-block-prc-block-fact-sheet-collection__term-link__alt-language-link">%2$s</a>',
					$other_language_post_permalink,
					$other_language_post_language,
				);
			}, $alt_language_posts),
			'collection_name' => $parent_term['name'],
			'collection_link' => $parent_term['link'],
		);

		$pdf = array_key_exists('pdf', $attributes) ? $attributes['pdf'] : null;
		if ($pdf) {
			$pdf_id = $pdf['id'];
			$pdf = wp_get_attachment_url($pdf_id);
			$pdf = wp_sprintf(
				'<a href="%1$s" class="wp-block-prc-block-fact-sheet-collection--pdf-link" download><i class="file pdf icon"></i> %2$s</a>',
				$pdf,
				__('Download PDF', 'prc-block-library'),
			);
		}

		$block_wrapper_attrs = get_block_wrapper_attributes();

		return wp_sprintf(
			'<div %1$s><div class="wp-block-prc-block-fact-sheet-collection--parent-term"><a href="%6$s">%2$s</a></div>%5$s<div class="wp-block-prc-block-fact-sheet-collection--term-list">%3$s</div>%4$s</div>',
			$block_wrapper_attrs,
			!is_wp_error($collection['collection_name']) ? $collection['collection_name'] : '',
			implode('', $collection['terms']),
			$pdf,
			!empty($collection['alt_languages']) ? wp_sprintf(
				'<div class="wp-block-prc-block-fact-sheet-collection--alt-languages">%1$s</div>',
				implode('', $collection['alt_languages']),
			) : '',
			!is_wp_error($collection['collection_link']) ? $collection['collection_link'] : '',
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
		register_block_type( self::$dir . '/build', array(
			'render_callback' => array($this, 'render_callback')
		) );
	}

}

