<?php
namespace PRC\Platform\Blocks;
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

class Bylines_Query {
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
				$staff = new \PRC\Platform\Staff(false, $byline_term_id);
				if ( is_wp_error( $staff ) ) {
					continue;
				}
				$bylines[] = array(
					'staffName'      => $staff->name,
					'staffJobTitle'  => $staff->job_title,
					'staffImage'     => $staff->photo['thumbnail'],
					'staffTwitter'   => null,
					'staffExpertise' => $staff->expertise,
					'staffBio'       => $staff->bio,
					'staffMiniBio'   => $staff->job_title_extended,
					'staffLink'      => $staff->link,
				);
			}
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

new Bylines_Query(true);
