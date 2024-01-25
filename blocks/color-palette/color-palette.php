<?php
namespace PRC\Platform\Blocks;
/**
 * Block Name:        Color Palette
 * Description:       Outputs a color square
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */

class Color_Palette {
	public static $block_json = null;
	public static $version;
	public static $block_name;
	public static $dir = __DIR__;

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/color-palette/build/block.json';
		self::$block_json = \wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		self::$version = self::$block_json['version'];
		self::$block_name = self::$block_json['name'];
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action('init', $this, 'block_init');
			$loader->add_filter('prc_api_endpoints', $this, 'register_endpoint');
		}
	}

	/**
	 * Register endpoint for getting theme colors
	 * @hook prc_api_endpoints
	 * @param mixed $endpoints
	 * @return void
	 */
	public function register_endpoint($endpoints) {
		array_push($endpoints, array(
			'route' => 'utils/get-theme-color',
			'methods'             => 'GET',
			'callback'            => array( $this, 'restfully_get_color' ),
			'args'                => array(
				'color' => array(
					'validate_callback' => function( $param, $request, $key ) {
						return is_string( $param );
					},
				),
			),
			'permission_callback' => function () {
				return true;
			},
		));
		return $endpoints;
	}

	public function restfully_get_color( \WP_REST_Request $request ) {
		$color_slug = $request->get_param( 'color' );
		$colors = wp_get_global_settings(array('color', 'palette', 'theme'));
		if ( ! is_array( $colors ) ) {
			return new WP_Error( 'prc-platform-color-palette', 'Failed to get colors' );
		}
		$picked_color = array_filter($colors, function($color) use ($color_slug) {
			return $color['slug'] === $color_slug;
		});
		if ( empty( $picked_color ) ) {
			return $colors;
		}
		return array_pop( $picked_color );
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
