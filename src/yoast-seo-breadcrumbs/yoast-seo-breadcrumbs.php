<?php
namespace PRC\Platform\Blocks;
/**
 * Block Name:	      Yoast SEO Breadcrumbs
 * Version:           0.1.0
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Yoast_SEO_Breadcrumbs {
	public $block_json;
	public $block_name;
	public $style_handle;

	public function __construct($loader) {
		$this->block_json = prc_block_library_manifest('yoast-seo-breadcrumbs');
		$this->block_name = $this->block_json['name'];
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action('init', $this, 'init_assets');
			$loader->add_action('enqueue_block_assets', $this, 'enqueue_assets');
			$loader->add_filter('wpseo_breadcrumb_separator', $this, 'modify_separator', 10, 1);
			$loader->add_filter('wpseo_breadcrumb_output_wrapper', $this, 'modify_container_tag', 10, 1);
			$loader->add_filter('wpseo_breadcrumb_output_class', $this,
			'modify_container_classname', 10, 1);
			$loader->add_filter('wpseo_breadcrumb_links', $this, 'modify_breadcrumbs', 10, 1);
			$loader->add_filter('wpseo_breadcrumb_single_link', $this, 'modify_breadcrumb', 10, 2);
		}
	}

	/**
	 * @hook init
	 * @return void
	 */
	public function init_assets() {
		$this->style_handle = register_block_style_handle( $this->block_json, 'style' );
	}

	/**
	 * @init enqueue_block_assets
	 * @return void
	 */
	public function enqueue_assets() {
		wp_enqueue_style( $this->style_handle );
	}

	/**
	 * @hook wpseo_breadcrumb_separator
	 */
	public function modify_separator($separator) {
		return \PRC\Platform\Icons\render('solid', 'chevron-right');
	}

	/**
	 * @hook wpseo_breadcrumb_output_wrapper
	 */
	public function modify_container_tag($tag) {
		return 'div';
	}

	/**
	 * @hook wpseo_breadcrumb_output_class
	 */
	public function modify_container_classname($classname) {
		return 'yoast-breadcrumbs__list';
	}

	/**
	 * @hook wpseo_breadcrumb_links
	 * @param mixed $crumbs
	 * @return array
	 */
	public function modify_breadcrumbs( $crumbs ) {
		// If a post type archive is present in the crumbs, remove it.
		foreach ( $crumbs as $crumb_key => $crumb_value ) {
			if ( array_key_exists( 'ptarchive', $crumb_value ) ) {
				unset( $crumbs[ $crumb_key ] );
			}
		}


		// If this is a post then remove any elements that look like a post.
		if ( is_singular() && !is_singular('page') ) {
			// Remove any elements from array that have a property of ID available.
			$crumbs = array_filter(
				$crumbs,
				function( $element ) {
					return ! array_key_exists( 'id', $element );
				}
			);
		}

		array_splice(
			$crumbs,
			0,
			0,
			array(
				array(
					'url'  => get_bloginfo( 'url' ),
					'text' => 'Home',
					'id'   => null,
				),
			)
		);

		if ( ! is_singular( 'page' ) ) {
			$queried_object = get_queried_object();
			// check if queried object is a wp_term and if its taxonomy is datasets
			if ( is_a( $queried_object, 'WP_Term' ) && 'datasets' === $queried_object->taxonomy ) {
				array_splice(
					$crumbs,
					1,
					0,
					array(
						array(
							'url'  => get_bloginfo( 'url' ) . '/datasets/',
							'text' => 'Datasets',
							'id'   => null,
						),
					)
				);
			} else {
				array_splice(
					$crumbs,
					1,
					0,
					array(
						array(
							'url'  => get_bloginfo( 'url' ) . '/topics-categorized/',
							'text' => 'Research Topics',
							'id'   => null,
						),
					)
				);
			}
		}

		if ( is_tax() ) {
			$last_crumb = end( $crumbs );
			$term_id    = get_queried_object()->term_id;
			if ( array_key_exists('term_id', $last_crumb) && $term_id === $last_crumb['term_id'] ) {
				array_pop( $crumbs );
			}
		}

		// Pop off the "Page #" crumb at the end.
		if ( is_paged() ) {
			array_pop( $crumbs );
		}

		// If there is only one element (like a lone home link) then return empty
		if ( is_array( $crumbs ) && is_tax() && count( $crumbs ) <= 1 ) {
			return array();
		}
		return $crumbs;
	}

	/**
	 * @hook wpseo_breadcrumb_single_link
	 * @param mixed $link
	 * @param mixed $breadcrumb
	 * @return string
	 */
	public function modify_breadcrumb( $link, $breadcrumb ) {
		$url  = false;
		$text = $breadcrumb['text'];
		if ( array_key_exists( 'term_id', $breadcrumb ) ) {
			$url = get_term_link( (int) $breadcrumb['term_id'], $breadcrumb['taxonomy'] );
		} elseif ( array_key_exists('url', $breadcrumb) ) {
			$url = $breadcrumb['url'];
		}
		if ( false === $url || is_wp_error($url) ) {
			return "<span class='section'>{$text}</span>";
		}
		return "<a href='{$url}' data-label='{$text}' class='section'>{$text}</a>";
	}
}
