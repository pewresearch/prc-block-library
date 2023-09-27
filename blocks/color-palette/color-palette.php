<?php
namespace PRC\Platform\Blocks;
/**
 * Block Name:        Color Palette
 * Description:       Outputs a color square
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */

class Color_Palette {
	public static $version = '0.1.0';
	public static $dir = __DIR__;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action('init', array($this, 'block_init'));
			add_action('rest_api_init', array($this, 'register_rest_endpoint'));
		}
	}

	public function register_rest_endpoint() {
		register_rest_route(
			'prc-api/v2',
			'/utils/get-theme-color',
			array(
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
			)
		);

	}

	public function restfully_get_color( \WP_REST_Request $request ) {
		$color_slug = $request->get_param( 'color' );
		$colors = wp_get_global_settings();
		$colors = $colors['color']['palette']['theme'];
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

new Color_Palette(true);
