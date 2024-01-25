<?php
namespace PRC\Platform\Blocks;
/**
 * Block Name:        Responsive Container
 * Version:           0.1.0
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Responsive_Container_Controller {
	public static $block_json = null;
	public static $version;
	public static $block_name;
	public static $dir = __DIR__;

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/responsive-container-controller/build/block.json';
		self::$block_json = \wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		self::$version = self::$block_json['version'];
		self::$block_name = self::$block_json['name'];
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
			$loader->add_filter( 'safe_style_css', $this, 'safe_styles' );
		}
	}

	public function safe_styles( $styles ) {
		$styles[] = 'top';
		$styles[] = 'left';
		$styles[] = 'right';
		$styles[] = 'bottom';
		return $styles;
	}

	public function get_block_id_hash( $block ) {
		return substr( strtolower( preg_replace( '/[0-9_\/]+/', '', base64_encode( sha1( wp_json_encode( $block ) ) ) ) ), 0, 10 );
	}

	public function construct_media_queries($innerblocks) {
		$media_queries = array();
		foreach ( $innerblocks as $viewport_block ) {
			$id = $id = $this->get_block_id_hash( $viewport_block );
			$min = array_key_exists(
				'min',
				$viewport_block['attrs']
			) && 0 !== $viewport_block['attrs']['min'] ? $viewport_block['attrs']['min'] : null;
			$max = array_key_exists(
				'max',
				$viewport_block['attrs']
			) && 0 !== $viewport_block['attrs']['max'] ? $viewport_block['attrs']['max'] : null;

			if ( null !== $min && null !== $max ) {
				$media_queries[ $id ] = sprintf( '@media screen and (max-width: %spx) and (min-width: %spx) {#%s.wp-block-prc-block-responsive-container-view { display: flex!important; }}', $max, $min, $id );
			} elseif ( null !== $max && null === $min ) {
				$media_queries[ $id ] = sprintf( '@media screen and (max-width: %spx) {#%s.wp-block-prc-block-responsive-container-view { display: flex!important; }}', $max, $id );
			} elseif ( null === $max && null !== $min ) {
				$media_queries[ $id ] = sprintf( '@media screen and (min-width: %spx) {#%s.wp-block-prc-block-responsive-container-view { display: flex!important; }}', $min, $id );
			}
		}

		// return $media_queries as a string
		return implode( '', $media_queries );
	}

	public function render_block_callback( $attributes, $content, $block ) {
		if ( is_admin() ) {
			return $content;
		}

		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'id' => $this->get_block_id_hash( $block ),
			)
		);

		// Reset content.
		$content = '';

		foreach ( $block->parsed_block['innerBlocks'] as $i => $viewport_block ) {
			$id = $this->get_block_id_hash( $viewport_block );
			$viewport_block['attrs']['id'] = $id;
			$content .= render_block( $viewport_block );
		}

		return wp_sprintf(
			'<div %1$s>%2$s</div><style>%3$s</style>',
			$wrapper_attributes,
			$content,
			$this->construct_media_queries($block->parsed_block['innerBlocks']),
		);
	}

	public function block_init() {
		register_block_type(
			self::$dir . '/build',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}
