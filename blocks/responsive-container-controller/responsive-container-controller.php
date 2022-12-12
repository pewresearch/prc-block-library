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
			add_action( 'init', array($this, 'block_init') );
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
