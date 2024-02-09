<?php
namespace PRC\Platform\Blocks;

/**
 * Block Name:        Controls the active status of an interactive island
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */

class interactive_islands_controller {
	public static $block_library_version;
	public static $active_theme;
	public static $block_json;
	public static $version;
	
	public static $dir = __DIR__;

	public function __construct( $block_library_version, $active_theme ) {
		self::$block_library_version = $block_library_version ? $block_library_version : null;
		self::$active_theme = $active_theme ? $active_theme : null;
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/interactive-islands-controller/build/block.json';
		self::$block_json = wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		self::$version = self::$block_json['version'];
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
		register_block_type( self::$dir . '/build' );
	}

}
