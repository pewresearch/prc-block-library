<?php
/**
 * PRC Block Library
 *
 * @package           PRC_Block_Library
 * @author            Seth Rubenstein
 * @copyright         2022 Pew Research Center
 * @license           GPL-2.0-or-later
 *
 * @wordpress-plugin
 * Plugin Name:       PRC Block Library
 * Plugin URI:        https://pewresearch.org
 * Description:       The core block library for Pew Research Center (pewresearch.org).
 * Version:           2.2.0
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            Pew Research Center
 * Author URI:        https://www.pewresearch.org/devdocs/
 * Text Domain:       prc-block-library
 * License:           GPL v2 or later
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'PRC_BLOCK_LIBRARY_FILE', __FILE__ );
define( 'PRC_BLOCK_LIBRARY_DIR', __DIR__ );

class PRC_Block_Library {
	/**
	 * Easily accessible variable that points to the plugin filepath.
	 *
	 * @var string
	 */
	public static $plugin_file = __FILE__;

	/**
	 * Version, change whenever you push a change to production otherwise script concatenation will break Gutenberg.
	 *
	 * @var string
	 */
	public static $version = '2.2.0';
	public static $blocks = array();

	public function __construct( $init = false ) {
		if ( true === $init ) {
			require_once plugin_dir_path( __FILE__ ) . '/inc/helpers.php';

			// Remove the "Block Directory" from the block inserter.
			remove_action( 'enqueue_block_editor_assets', 'wp_enqueue_editor_block_directory_assets' );

			// Disable loading remote block patterns, we only want local or database block patterns.
			add_filter( 'should_load_remote_block_patterns', '__return_false' );

			// Only load assets when a block is used. This allows us to unregister core block styles and use our own.
			add_filter( 'should_load_separate_core_block_assets', '__return_true' );

			add_filter( 'block_categories_all', array( $this, 'register_block_categories' ), 10, 2 );

			add_filter( 'safe_style_css', array($this, 'allowed_inline_styles') );

			add_filter( 'wp_kses_allowed_html', array( $this, 'allowed_html_tags' ), 10, 2 );

			require_once plugin_dir_path( __FILE__ ) . '/inc/class-unit-tests.php';

			// get all folders in the blocks directory as an array
			$block_files = glob( PRC_BLOCK_LIBRARY_DIR . '/blocks/*', GLOB_ONLYDIR );
			foreach ($block_files as $block) {
				$block = basename($block);
				self::$blocks[] = $block;
				require_once plugin_dir_path( __FILE__ ) . '/blocks/' . $block . '/' . $block . '.php';
			}
		}
	}

	/**
	 * This mimics core get_block_wrapper_attributes($extra_attributes = array()) for when we're intercepting a block render and global $block data is lost.
	 * @param array $extra_attributes
	 * @return mixed
	 */
	public function _get_block_wrapper_attributes( $extra_attributes = array() ) {
		$new_attributes = array();

		if ( empty( $new_attributes ) && empty( $extra_attributes ) ) {
			return '';
		}

		// This is hardcoded on purpose.
		// We only support a fixed list of attributes.
		$attributes_to_merge = array( 'style', 'class' );
		$attributes          = array();
		foreach ( $attributes_to_merge as $attribute_name ) {
			if ( empty( $new_attributes[ $attribute_name ] ) && empty( $extra_attributes[ $attribute_name ] ) ) {
				continue;
			}

			if ( empty( $new_attributes[ $attribute_name ] ) ) {
				$attributes[ $attribute_name ] = $extra_attributes[ $attribute_name ];
				continue;
			}

			if ( empty( $extra_attributes[ $attribute_name ] ) ) {
				$attributes[ $attribute_name ] = $new_attributes[ $attribute_name ];
				continue;
			}

			$attributes[ $attribute_name ] = $extra_attributes[ $attribute_name ] . ' ' . $new_attributes[ $attribute_name ];
		}

		foreach ( $extra_attributes as $attribute_name => $value ) {
			if ( ! in_array( $attribute_name, $attributes_to_merge, true ) ) {
				$attributes[ $attribute_name ] = $value;
			}
		}

		if ( empty( $attributes ) ) {
			return '';
		}

		$normalized_attributes = array();
		foreach ( $attributes as $key => $value ) {
			$normalized_attributes[] = $key . '="' . esc_attr( $value ) . '"';
		}

		return implode( ' ', $normalized_attributes );
	}

	/**
	 * Establishes new block categories for the block library.
	 * @param mixed $block_categories
	 * @param mixed $block_editor_context
	 * @return mixed
	 */
	public function register_block_categories( $block_categories, $block_editor_context ) {
		return array_merge(
			$block_categories,
			array(
				array(
					'slug'  => 'content-curation',
					'title' => __( 'Content Curation', 'prc-block-library-categories' ),
				),
				array(
					'slug'  => 'essay',
					'title' => __( 'Essays', 'prc-block-library-categories' ),
				),
				array(
					'slug'  => 'marketing',
					'title' => __( 'Marketing', 'prc-block-library-categories' ),
				),
				array(
					'slug' => 'editorial-product',
					'title' => __( 'Editorial Product', 'prc-block-library-categories' ),
					'icon' => 'lightbulb'
				)
			)
		);
	}

	/**
	 * Filter the allowed style attributes for sanitization.
	 * @param mixed $styles
	 * @return mixed
	 */
	public function allowed_inline_styles( $styles ) {
		$styles[] = 'aspect-ratio'; // Adding this to support Vimeo block.
		return $styles;
	}

	/**
	 * Filter the allowed html tags and attributes for sanitization.
	 *
	 * @param array $allowed_tags Allowed tags.
	 * @return array Allowed tags.
	 */
	public static function allowed_html_tags( $allowed_tags, $context ) {
		$allowed_tags['iframe'] = array(
			'class' => true,
			'loading' => true,
			'src' => true,
			'width' => true,
			'height' => true,
			'frameborder' => true,
			'allowfullscreen' => true,
			'title' => true,
			'style' => true,
		);
		$allowed_tags['input'] = array(
			'class' => true,
			'id' => true,
			'name' => true,
			'type' => true,
			'value' => true,
			'placeholder' => true,
			'required' => true,
			'disabled' => true,
			'style' => true,
		);
		$allowed_tags['div']['style']  = true;
		$allowed_tags['img']['srcset'] = true;
		$allowed_tags['img']['sizes']  = true;
		$allowed_tags['picture']       = true;
		$allowed_tags['source']        = array(
			'srcset' => true,
			'media'  => true,
			'type'   => true,
			'height' => true,
			'width'  => true,
		);

		// Add SVG Support
		// @TODO: Is this still necessary with 10up's SVG plugin? - @sethrubenstein
		$allowed_tags['svg']  = array(
			'xmlns'       => array(),
			'fill'        => array(),
			'viewbox'     => array(),
			'role'        => array(),
			'aria-hidden' => array(),
			'focusable'   => array(),
		);
		$allowed_tags['path'] = array(
			'd'    => array(),
			'fill' => array(),
		);
		$allowed_tags['rect'] = array(
			'x'      => array(),
			'y'      => array(),
			'width'  => array(),
			'height' => array(),
			'fill'   => array(),
		);
		// End SVG Support

		$allowed_tags['a'] = array_merge(
			array(
				'aria-controls' => true,
				'aria-selected' => true,
				'aria-role' => true,
			),
			$allowed_tags['a']
		);
		return $allowed_tags;
	}

}

new PRC_Block_Library( true );
