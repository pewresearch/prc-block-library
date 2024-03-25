<?php
namespace PRC\Platform\Blocks;

/**
 * Block Name:        Post Taxonomy Terms
 * Description:       Display the current post&#39;s selected taxonomy terms.
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */

class Post_Taxonomy_Terms {
	public static $block_library_version;
	public static $active_theme;
	public static $block_json;
	public static $version;

	public static $dir = __DIR__;

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/post-taxonomy-terms/build/block.json';
		self::$block_json = wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		self::$version = self::$block_json['version'];
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action('init', $this, 'block_init');
			$loader->add_filter('block_type_metadata_settings', $this, 'short_circuit_core_post_terms_variations', 10, 2);
		}
	}

	/**
	* Render the block
	* @param array $attributes Block attributes
	* @param string $content Block content
	* @param array $block WP_Block object
	* @return string
	*/
	public function render_block_callback( $attributes, $content, $block ) {
		$color_supports = new Additional_Color_Supports(null);

		$taxonomy = $attributes['taxonomy'];
		$taxonomy = 'categories' === $taxonomy ? 'category' : $taxonomy;
		$per_page = $attributes['perPage'];
		$is_list = array_key_exists('layout', $attributes) && array_key_exists('orientation', $attributes['layout']) ? 'vertical' === $attributes['layout']['orientation'] : false;

		$wrapper_attributes = get_block_wrapper_attributes(array(
			'class' => \PRC\Platform\Block_Utils\classNames(array(
				'has-separator' => array_key_exists('separator', $attributes) && $attributes['separator'] && !$is_list,
			)),
			'style' => array_key_exists('separator', $attributes) ? '--separator: "' . $attributes['separator'] . '"' : null,
		));
		$post_id = get_the_ID();
		$parent_id = wp_get_post_parent_id($post_id);
		$post_terms = wp_get_post_terms( $post_id, $taxonomy, array( 'number' => $per_page ) );
		// If this is a category taxonomy block we need to check if the only term being returned is "uncategorized" and if so, we need to return an empty array so that the block will look for the parent post's terms, if available.
		if ( 'category' === $taxonomy && 1 === count($post_terms) && 'uncategorized' === $post_terms[0]->slug ) {
			$post_terms = array();
		}
		if ( 0 !== $parent_id && empty($post_terms) ) {
			$post_terms = wp_get_post_terms( $parent_id, $taxonomy, array( 'number' => $per_page ) );
		}
		$markup = '';
		if ( !empty($post_terms) && !is_wp_error($post_terms) ) {
			$markup .= '<ul class="wp-block-prc-block-post-taxonomy-terms__list">';
			foreach ( $post_terms as $post_term ) {
				$term_link = '';
				// term link needs to be equal to the blog page url and appended with ?_{taxonomy}={term-slug}
				$publications_page_link = get_permalink( get_option( 'page_for_posts' ) );
				$term_link = add_query_arg(
					array(
						'_' . $taxonomy => $post_term->slug,
					),
					$publications_page_link
				);
				$classnames = $is_list ? $color_supports->get_list_classnames(
					'wp-block-prc-block-post-taxonomy-terms',
					false,
					$attributes,
				) : 'wp-block-prc-block-post-taxonomy-terms__list-item';
				$markup .= wp_sprintf(
					'<li class="%1$s"><a href="%3$s">%2$s</a></li>',
					$classnames,
					$post_term->name,
					$term_link,
				);
			}
			$markup .= '</ul>';
		}

		return wp_sprintf(
			'<div %1$s>%2$s</div>',
			$wrapper_attributes,
			$markup,
		);
	}

	/**
	* We provide our own post-terms block called post-taxonomy-terms, so we have no need
	* for the core post-terms block. This filter removes the core post-terms block from
	* the block inserter by disabling all its variations.
	*
	* @hook block_type_metadata_settings
	* @param mixed $settings
	* @param mixed $metadata
	* @return mixed
	*/
	public function short_circuit_core_post_terms_variations(array $settings, array $metadata) {
		if ( 'core/post-terms' === $metadata['name'] ) {
			$settings['variations'] = array();
		}
		return $settings;
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
		$taxonomies = get_taxonomies(
			array(
				'publicly_queryable' => true,
				'show_in_rest'       => true,
			),
			'objects'
		);

		// Split the available taxonomies to `built_in` and custom ones,
		// in order to prioritize the `built_in` taxonomies so they appear first.
		$built_ins         = array();
		$custom_variations = array();

		// Create and register eligible taxonomy variations.
		foreach ( $taxonomies as $taxonomy ) {
			$taxonomy_name = !empty( $taxonomy->rest_base ) ? $taxonomy->rest_base : $taxonomy->name;
			$variation = array(
				'name'        => $taxonomy->name,
				'title'       => $taxonomy->label,
				'description' => sprintf(
					/* translators: %s: taxonomy's label */
					__( 'Display a list of assigned %s terms for the selected post.' ),
					$taxonomy->label
				),
				'attributes'  => array(
					'taxonomy' => $taxonomy_name,
				),
				'isActive'    => array( 'taxonomy' ),
				'scope'       => array( 'inserter', 'transform' ),
			);
			// Set the category variation as the default one.
			if ( 'category' === $taxonomy->name ) {
				$variation['isDefault'] = true;
			}
			if ( $taxonomy->_builtin ) {
				$built_ins[] = $variation;
			} else {
				$custom_variations[] = $variation;
			}
		}
		register_block_type(
			self::$dir . '/build',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
				'variations'      => array_merge( $built_ins, $custom_variations ),
			)
		);

		// unregister_block_type( 'core/post-terms' );
	}

}
