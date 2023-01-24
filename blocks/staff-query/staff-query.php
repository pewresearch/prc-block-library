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
			add_action('init', array($this, 'block_init'));
			add_filter( 'prc_block_library_staff_query' , array( $this, 'query_staff_posts' ), 10, 1 );
		}
	}

	public function query_staff_posts( $attributes = array() ) {
		$staff_type = array_key_exists( 'staffType', $attributes ) ? $attributes['staffType'] : false;
		$research_area = array_key_exists( 'researchArea', $attributes ) ? $attributes['researchArea'] : false;
		$tax_query = array();
		if ( $staff_type ) {
			$tax_query[] = array(
				'taxonomy' => 'staff_type',
				'field' => 'slug',
				'terms' => $staff_type,
			);
		}
		if ( $research_area ) {
			$tax_query[] = array(
				'taxonomy' => 'research_area',
				'field' => 'slug',
				'terms' => $research_area,
			);
		}
		if ( count( $tax_query ) > 1 ) {
			$tax_query['relation'] = 'AND';
		}

		$query_args = array(
			'post_type' => 'staff',
			'posts_per_page' => 100,
			'orderby' => 'title',
			'order' => 'ASC',
		);
		if ( count( $tax_query ) > 0 ) {
			// $query_args['tax_query'] = $tax_query;
		}

		switch_to_blog(1);

		$staff_posts = new WP_Query($query_args);

		wp_reset_postdata();

		restore_current_blog();

		return $staff_posts;
	}

	/**
	* Registers the block using the metadata loaded from the `block.json` file.
	* Behind the scenes, it registers also all assets so they can be enqueued
	* through the block editor in the corresponding context.
	*
	* @see https://developer.wordpress.org/reference/functions/register_block_type/
	*/
	public function block_init() {
		register_block_type( self::$dir . '/build' );
	}

}

new StaffQuery(true);
