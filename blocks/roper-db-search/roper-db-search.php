<?php
namespace PRC\Platform\Blocks;
/**
 * Block Name:        Roper Database
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein, Ben Wormald
 *
 * @package           prc-block
 */

class Roper_DB_Search {
	public static $block_json = null;
	public static $version;
	public static $vendor_version = '1.0.11';
	public static $block_name;
	public static $dir = __DIR__;

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/roper-db-search/build/block.json';
		self::$block_json = \wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		self::$version = self::$block_json['version'];
		self::$block_name = self::$block_json['name'];
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action('init', $this, 'block_init');
			$loader->add_action('wp_enqueue_scripts', $this, 'register_vendor_assets');
			$loader->add_filter('prc_platform_rewrite_query_vars',  $this, 'register_global_db_vendor_query_vars');
		}
	}

	public function register_vendor_assets() {
		wp_register_script('roper-db-search', 'https://s3.amazonaws.com/files.roper.center/partnersearch/'.self::$vendor_version.'/roper-ps.js', array(), self::$vendor_version, true);
		wp_register_style('roper-db-search', 'https://s3.amazonaws.com/files.roper.center/partnersearch/'.self::$vendor_version.'/roper-ps.css', array(), self::$vendor_version);
	}

	/**
	 * Add Roper's query vars to the global query vars array
	 * @hook prc_platform_rewrite_query_vars
	 * @param mixed $query_vars
	 * @return array $query_vars
	 */
	public function register_global_db_vendor_query_vars($query_vars) {
		array_push($query_vars, 'qid', 'cntIDs', 'stdIDs', 'keyword', 'keywordtext', 'startdate', 'enddate');
		return $query_vars;
	}

	public function block_init() {
		register_block_type( self::$dir . '/build');
	}

}
