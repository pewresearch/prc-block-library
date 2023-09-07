<?php
namespace PRC\Platform\Blocks;
/**
 * Block Name:	      Yoast SEO Breadcrumbs
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Yoast_SEO_Breadcrumbs {

	/**
	 * Register a core block variant.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public static $block_name = "yoast-seo/breadcrumbs";
	public static $block_json = null;
	public static $view_style_handle = null;

	public function __construct($init = false) {
		if ( true === $init ) {
			$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/yoast-seo-breadcrumbs/build/block.json';
			self::$block_json = wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
			self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );

			add_action( 'init', array($this, 'init_assets') );
			add_action( 'admin_enqueue_scripts', array( $this, 'register_assets' ) );
			add_action( 'wp_enqueue_scripts', array( $this, 'register_assets' ) );

			// Filter Yoast breadcrumb functionality
			add_filter( 'wpseo_breadcrumb_links', array( $this, 'modify_yoast_breadcrumbs' ) );
			add_filter( 'wpseo_breadcrumb_single_link', array( $this, 'modify_yoast_breadcrumb' ), 10, 2 );
			add_filter(
				'wpseo_breadcrumb_output_class',
				function() {
					return 'ui breadcrumb';
				}
			);
			add_filter(
				'wpseo_breadcrumb_output_wrapper',
				function() {
					return 'div';
				}
			);
			// Change Yoast's breadcrumb divider to our chevron icon
			add_filter(
				'wpseo_breadcrumb_separator',
				function() {
					return '<i class="chevron right icon divider"></i>';
				}
			);
		}
	}

	public function init_assets() {
		self::$view_style_handle = register_block_style_handle( self::$block_json, 'style' );
	}

	public function register_assets() {
		wp_enqueue_style( self::$view_style_handle );
	}

	public function get_origin_term_link( $taxonomy = 'topic', $term_id = null ) {
		if ( null === $term_id ) {
			// $term_id = get_queried_object_id();
			return false;
		}
		$link = false;
		if ( get_current_blog_id() !== 1 ) {
			$origin_term_id = get_term_meta( $term_id, '_origin_term_id', true );
			switch_to_blog( 1 );
			$link = get_term_link( (int) $origin_term_id, $taxonomy );
			if ( is_wp_error( $link ) ) {
				$link = false;
			}
			restore_current_blog();
		} else {
			$link = get_term_link( (int) $term_id, $taxonomy );
		}

		return $link;
	}

	public function modify_yoast_breadcrumbs( $crumbs ) {
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
					'url'  => network_home_url(),
					'text' => 'Home',
					'id'   => null,
				),
			)
		);

		if ( ! is_singular( 'page' ) ) {
			array_splice(
				$crumbs,
				1,
				0,
				array(
					array(
						'url'  => network_home_url( '/topics-categorized' ),
						'text' => 'Research Topics',
						'id'   => null,
					),
				)
			);
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

	public function modify_yoast_breadcrumb( $link, $breadcrumb ) {
		$url  = false;
		$text = $breadcrumb['text'];
		if ( array_key_exists( 'term_id', $breadcrumb ) ) {
			$taxonomy = get_queried_object()->taxonomy;
			$url = $this->get_origin_term_link( $taxonomy, $breadcrumb['term_id'] );
		} elseif ( array_key_exists('url', $breadcrumb) ) {
			$url = $breadcrumb['url'];
		}
		if ( false === $url || is_wp_error($url) ) {
			return "<span class='section'>{$text}</span>";
		}
		return "<a href='{$url}' data-label='{$text}' class='section'>{$text}</a>";
	}

}

new Yoast_SEO_Breadcrumbs(true);
