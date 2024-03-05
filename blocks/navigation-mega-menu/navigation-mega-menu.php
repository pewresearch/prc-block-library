<?php
namespace PRC\Platform\Blocks;
/**
 * Block Name:        Navigation Mega Menu
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Navigation_Mega_Menu {
	public static $block_json = null;
	public static $version;
	public static $block_name;
	public static $view_script_handle = null;
	public static $editor_script_handle = null;
	public static $style_handle = null;
	public static $dir = __DIR__;

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/navigation-mega-menu/build/block.json';
		self::$block_json = \wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		self::$version = self::$block_json['version'];
		self::$block_name = self::$block_json['name'];
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action('init', $this, 'block_init');
			$loader->add_filter('default_wp_template_part_areas', $this, 'mega_menu_template_part_areas' );
		}
	}


	/**
	 * Adds a custom template part area for mega menus to the list of template part areas.
	 *
	 * This function introduces a new area specifically for menu templates, allowing
	 * the creation of sections within a mega menu. The new area is appended to the
	 * existing list of template part areas.
	 *
	 * @see https://developer.wordpress.org/reference/hooks/default_wp_template_part_areas/
	 *
	 * @param array $areas Existing array of template part areas.
	 * @return array Modified array of template part areas including the new mega menu area.
	 */
	public function mega_menu_template_part_areas( array $areas ) {
		$areas[] = array(
			'area'        => 'menu',
			'area_tag'    => 'div',
			'description' => __( 'Menu templates are used to create sections of a mega menu.', 'navigation-mega-menu' ),
			'icon' 		  => 'layout',
			'label'       => __( 'Menu', 'navigation-mega-menu' ),
		);

		return $areas;
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

