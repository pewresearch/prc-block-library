<?php
/**
 * Block Name:        Bylines Query
 * Description:       Query the current post for bylines.
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class BylinesQuery extends PRC_Block_Library {
	public static $version = '0.1.0';
	public static $dir = __DIR__;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action('init', array($this, 'block_init'));
			add_filter( 'prc_block_library_bylines_query' , array( $this, 'query_bylines' ), 10, 1 );
		}
	}

	public function query_bylines($post_id) {
		$byline_terms = get_post_meta( $post_id, 'bylines', true );
		$bylines = array();
		if ( $byline_terms ) {
			foreach ( $byline_terms as $byline_term ) {
				$byline_term_id = $byline_term['termId'];
				$byline_term = get_term( $byline_term_id, 'bylines' );
				if ( is_wp_error( $byline_term ) || ! is_object( $byline_term ) ) {
					continue;
				}
				if ( get_term_meta( $byline_term->term_id, 'staff_post_id', true ) ) {
					$staff_post_id = get_term_meta( $byline_term->term_id, 'staff_post_id', true );
				}
				if ( ! $staff_post_id ) {
					continue;
				}

				switch_to_blog(1);
				$bylines[] = array(
					'staffName'      => $byline_term->name,
					'staffJobTitle'  => get_post_meta( $staff_post_id, 'job_title', true ),
					'staffImage'     => false,
					'staffTwitter'   => get_post_meta( $staff_post_id, 'twitter', true ),
					'staffExpertise' => null,
					'staffBio'       => get_the_content(null, false, $staff_post_id),
					'staffMiniBio'   => get_post_meta( $staff_post_id, 'job_title_mini_bio', true ),
					'staffLink'      => home_url( '/staff/' . str_replace( 'bylines_', '', $byline_term->slug ) ),
				);
				restore_current_blog();
			}

			do_action('qm/debug', 'BYLINE TERM IDS FOR THIS POST:  ' .print_r($bylines, true));
		}
		return $bylines;
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

new BylinesQuery(true);
