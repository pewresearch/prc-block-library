<?php
namespace PRC\Platform\Blocks;
/**
 * Block Name:        Roper Database
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein, Ben Wormald
 *
 * @package           prc-block
 */

class Roper_DB_Search {
	public static $vendor_version = '1.0.11';
	public static $dir = __DIR__;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array($this, 'block_init') );
			add_action( 'wp_enqueue_scripts', array($this, 'register_vendor_assets') );
			add_filter( 'query_vars', array( $this, 'register_global_db_vendor_query_vars' ) );
		}
	}

	public function register_vendor_assets() {
		wp_register_script('roper-db-search', 'https://s3.amazonaws.com/files.roper.center/partnersearch/'.self::$vendor_version.'/roper-ps.js', array(), self::$vendor_version, true);
		wp_register_style('roper-db-search', 'https://s3.amazonaws.com/files.roper.center/partnersearch/'.self::$vendor_version.'/roper-ps.css', array(), self::$vendor_version);
	}

	public function register_global_db_vendor_query_vars($query_vars) {
		array_push($query_vars, 'qid', 'cntIDs', 'stdIDs', 'keyword', 'keywordtext', 'startdate', 'enddate');
		return $query_vars;
	}

	/**
	* Registers the block using the metadata loaded from the `block.json` file.
	* Behind the scenes, it registers also all assets so they can be enqueued
	* through the block editor in the corresponding context.
	*
	* @see https://developer.wordpress.org/reference/functions/register_block_type/
	*/
	public function block_init() {
		register_block_type( self::$dir . '/build');
	}

}

new Roper_DB_Search(true);
