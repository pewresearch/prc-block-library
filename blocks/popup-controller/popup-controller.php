<?php
namespace PRC\Platform\Blocks;
use WP_HTML_Processor;

/**
 * Block Name:        Popup Controller
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Popup_Controller {
	public static $block_json = null;
	public static $version;
	public static $block_name;
	public static $view_script_handle = null;
	public static $editor_script_handle = null;
	public static $style_handle = null;
	public static $dir = __DIR__;

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/popup-controller/build/block.json';
		self::$block_json = \wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		self::$version = self::$block_json['version'];
		self::$block_name = self::$block_json['name'];
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action('init', $this, 'block_init');
			// $loader->add_filter('render_block_context', $this, 'extend_block_id_to_modal_through_context', 10, 3);
		}
	}

	public function extend_block_id_to_modal_through_context($context, $parsed_block, $parent_block) {
		if ( $parsed_block['blockName'] !== 'prc-block/popup-modal' ) {
			$block_id = md5($parent_block->inner_html);
			$context['prc-block/popup-controller/id'] = $block_id;
		}
		return $context;
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
