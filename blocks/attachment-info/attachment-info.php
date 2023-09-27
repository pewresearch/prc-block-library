<?php
namespace PRC\Platform\Blocks;

/**
 * Block Name:        Attachment Info
 * Description:       Displays the titles of other images attached to a post.
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */

class Attachment_Info {
	public $block_library_version;
	public $active_theme;

	public static $version = '0.1.0';
	public static $dir = __DIR__;

	public function __construct( $block_library_version, $active_theme ) {
		$this->block_library_version = $block_library_version ? $block_library_version : false;
		$this->active_theme = $active_theme ? $active_theme : false;
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
