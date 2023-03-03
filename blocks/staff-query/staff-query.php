<?php
/**
 * Block Name:        Staff Query
 * Description:       Query the Staff post type.
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class StaffQuery extends PRC_Block_Library {
	public static $version = '0.1.0';
	public static $dir = __DIR__;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'block_init' ) );
			add_filter( 'prc_block_library_staff_query' , array( $this, 'query_staff_posts' ), 10, 1 );
		}
	}

	public function get_expertise( $post_id ) {
		$terms     = get_the_terms( $post_id, 'areas-of-expertise' );
		$expertise = array();
		if ( $terms ) {
			foreach ( $terms as $term ) {
				// if $term is wp error and or is not a term object then skip it.
				if ( is_wp_error( $term ) || ! is_object( $term ) ) {
					continue;
				}
				$link        = get_term_link( $term, 'areas-of-expertise' );
				$expertise[] = array(
					'url'   => $link,
					'label' => $term->name,
					'slug'  => $term->slug,
				);
			}
		}
		return $expertise;
	}

	public function query_staff_posts( $attributes = array() ) {
		$staff_type = array_key_exists( 'staffType', $attributes ) ? $attributes['staffType'] : false;
		$research_area = array_key_exists( 'researchArea', $attributes ) ? $attributes['researchArea'] : false;
		$tax_query = array();
		if ( $staff_type ) {
			$staff_type = $staff_type['slug'];
			$tax_query[] = array(
				'taxonomy' => 'staff-type',
				'field' => 'slug',
				'terms' => $staff_type,
			);
		}
		if ( $research_area ) {
			$research_area = $research_area['slug'];
			$tax_query[] = array(
			'taxonomy' => 'research-teams',
				'field' => 'slug',
				'terms' => $research_area,
			);
		}
		if ( count( $tax_query ) > 1 ) {
			$tax_query['relation'] = 'AND';
		}

		$query_args = array(
			'post_type' => 'staff',
			'posts_per_page' => 200,
			'orderby' => 'last_name',
			'order' => 'ASC',
		);
		if ( count( $tax_query ) > 0 ) {
			$query_args['tax_query'] = $tax_query;
		}

		$staff_posts = array();

		switch_to_blog(1);

		$staff_query = new WP_Query($query_args);

		if ( $staff_query->have_posts() ) {
			while ( $staff_query->have_posts() ) {
				$staff_query->the_post();
				$staff_post_id = get_the_ID();
				$name = get_the_title();
				$expertise_term_links = $this->get_expertise( $staff_post_id );
				$enable_link = get_post_meta( $staff_post_id, 'linked_byline_term', true );
				$enable_link = $enable_link ? home_url( '/staff/' . get_post_field( 'post_name' ) ) : false;
				
				$staff_posts[] = array(
					'staffName'      => $name,
					'staffJobTitle'  => get_post_meta( $staff_post_id, 'job_title', true ),
					'staffImage'     => false,
					'staffTwitter'   => get_post_meta( $staff_post_id, 'twitter', true ),
					'staffExpertise' => $expertise_term_links,
					'staffBio'       => get_the_content(null, false, $staff_post_id),
					'staffMiniBio'   => get_post_meta( $staff_post_id, 'job_title_mini_bio', true ),
					'staffLink'      => $enable_link,
				);
			}
		}

		wp_reset_postdata();

		restore_current_blog();

		return $staff_posts;
	}

	public function render_callback( $attributes, $content, $block ) {
		$staff_posts = $this->query_staff_posts( $attributes );

		$block_content = '';

		if ( empty( $staff_posts ) ) {
			$block_content = '<p>No staff found.</p>';
		}

		$block_attrs = get_block_wrapper_attributes();

		$block_instance = $block->parsed_block;

		// Set the block name to one that does not correspond to an existing registered block.
		// This ensures that for the inner instances of the Staff Query block, we do not render any block supports.
		$block_instance['blockName'] = 'core/null';

		foreach( $staff_posts as $staff_post_context ) {
			// Render the inner blocks of the Staff Query block with `dynamic` set to `false` to prevent calling
			// `render_callback` and ensure that no wrapper markup is included.
			$block_content .= (
				new WP_Block(
					$block_instance,
					$staff_post_context
				)
			)->render( array( 'dynamic' => false ) );
		}

		return wp_sprintf(
			'<div %1$s>%2$s</div>',
			$block_attrs,
			$block_content
		);
	}

	/**
	* Registers the block using the metadata loaded from the `block.json` file.
	* Behind the scenes, it registers also all assets so they can be enqueued
	* through the block editor in the corresponding context.
	*
	* @see https://developer.wordpress.org/reference/functions/register_block_type/
	*/
	public function block_init() {
		register_block_type(
			self::$dir . '/build',
			array(
				'render_callback' => array( $this, 'render_callback' ),
			)
		);
	}

}

$StaffQuery = new StaffQuery(true);
