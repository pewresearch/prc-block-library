<?php
/**
 * Block Name:        Responsive Container
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class ResponsiveContainerController extends PRC_Block_Library {
	public static $version = '0.1.0';
	public static $dir = __DIR__;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_filter( 'safe_style_css', array( $this, 'safe_styles' ) );
			add_action( 'wp_footer', array( $this, 'construct_media_queries' ) );
			add_action('init', array($this, 'block_init'));
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

	public function construct_media_queries() {
		global $post;

		if ( ! is_singular() && ! has_blocks( $post ) && ! has_block( 'prc-block/responsive-container-controller', $post ) ) {
			return;
		}

		$media_queries = array();
		$blocks        = parse_blocks( $post->post_content );
		$matched       = array_filter(
			array_column( $blocks, 'blockName' ),
			function( $e ) {
				return 'prc-block/responsive-container-controller' === $e;
			}
		);

		// No data, return early,
		if ( empty( $matched ) ) {
			return;
		}

		foreach ( array_keys( $matched ) as $i ) {
			foreach ( $blocks[ $i ]['innerBlocks'] as $viewport_block ) {
				$id  = $this->get_block_id_hash( $viewport_block );
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
		}

		// No data, return early,
		if ( empty( $media_queries ) ) {
			return;
		}

		// @TODO: change this to use wp_add_inline_style OR something from the new style engine...
		echo '<style>';
		foreach ( $media_queries as $media_query ) {
			echo $media_query;
		}
		echo '</style>';
	}

	public function render_block_callback( $attributes, $content, $block ) {
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
			'<div %1$s>%2$s</div>',
			$wrapper_attributes,
			$content
		);
	}

	/**
	* Registers the block using the metadata loaded from the `block.json` file.
	* Behind the scenes, it registers also all assets so they can be enqueued
	* through the block editor in the corresponding context.
	*
	* @see https://developer.wordpress.org/reference/functions/register_block_type/
	*/
	public function block_init() {
		register_block_type(
			self::$dir . '/build',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}

}

new ResponsiveContainerController(true);
