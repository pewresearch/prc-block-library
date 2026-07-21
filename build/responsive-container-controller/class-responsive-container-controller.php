<?php
/**
 * Responsive Container Controller Block
 *
 * @package PRC\Platform\Blocks
 */

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
	/**
	 * Directory
	 *
	 * @var string
	 */
	public static $dir = __DIR__;

	/**
	 * Constructor
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		$this->init( $loader );
	}

	/**
	 * Initialize the block
	 *
	 * @param mixed $loader Loader.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
			$loader->add_filter( 'safe_style_css', $this, 'safe_styles' );
		}
	}

	/**
	 * Safe styles
	 *
	 * @param array $styles Styles.
	 * @return array
	 */
	public function safe_styles( $styles ) {
		$styles[] = 'top';
		$styles[] = 'left';
		$styles[] = 'right';
		$styles[] = 'bottom';
		return $styles;
	}

	/**
	 * Cheap unique DOM id for a viewport.
	 *
	 * Ids only need to match media queries within the same request. The previous
	 * implementation hashed the full parsed block tree (including innerBlocks)
	 * via json_encode + sha1 — far more expensive than needed for an ephemeral
	 * DOM id. wp_unique_id() is O(1) and guarantees document uniqueness even when
	 * many controllers share identical breakpoint attributes.
	 *
	 * @param array $attrs Unused; retained for call-site compatibility.
	 * @param int   $index Unused; retained for call-site compatibility.
	 * @return string
	 */
	public function get_block_id_hash( $attrs = array(), $index = 0 ) { // phpcs:ignore Generic.CodeAnalysis.UnusedFunctionParameter
		return wp_unique_id( 'rcv-' );
	}

	/**
	 * Construct media queries from precomputed viewport specs.
	 *
	 * @param array $viewport_specs List of [ 'id' => string, 'min' => ?int, 'max' => ?int ].
	 * @return string
	 */
	public function construct_media_queries( $viewport_specs ) {
		$media_queries = array();
		foreach ( $viewport_specs as $spec ) {
			$id  = $spec['id'];
			$min = array_key_exists( 'min', $spec ) && null !== $spec['min'] && 0 !== $spec['min'] ? $spec['min'] : null;
			$max = array_key_exists( 'max', $spec ) && null !== $spec['max'] && 0 !== $spec['max'] ? $spec['max'] : null;

			if ( null !== $min && null !== $max ) {
				$media_queries[ $id ] = sprintf( '@media screen and (max-width: %spx) and (min-width: %spx) {#%s.wp-block-prc-block-responsive-container-view { display: flex!important; }}', $max, $min, $id );
			} elseif ( null !== $max && null === $min ) {
				$media_queries[ $id ] = sprintf( '@media screen and (max-width: %spx) {#%s.wp-block-prc-block-responsive-container-view { display: flex!important; }}', $max, $id );
			} elseif ( null === $max && null !== $min ) {
				$media_queries[ $id ] = sprintf( '@media screen and (min-width: %spx) {#%s.wp-block-prc-block-responsive-container-view { display: flex!important; }}', $min, $id );
			}
		}
		return implode( '', $media_queries );
	}

	/**
	 * Render the block callback
	 *
	 * @param mixed $attributes Block attributes.
	 * @param mixed $content Block content.
	 * @param mixed $block Block.
	 */
	public function render_block_callback( $attributes, $content, $block ) {
		if ( is_admin() ) {
			return $content;
		}

		// Wrapper id is not referenced by media queries; uniqueness in-document is enough.
		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'id' => wp_unique_id( 'rcc-' ),
			)
		);

		// Reset content.
		$content        = '';
		$viewport_specs = array();

		foreach ( $block->parsed_block['innerBlocks'] as $viewport_block ) {
			$attrs                         = isset( $viewport_block['attrs'] ) && is_array( $viewport_block['attrs'] ) ? $viewport_block['attrs'] : array();
			$id                            = $this->get_block_id_hash( $attrs );
			$viewport_block['attrs']['id'] = $id;
			$content                      .= render_block( $viewport_block );

			$viewport_specs[] = array(
				'id'  => $id,
				'min' => array_key_exists( 'min', $attrs ) ? $attrs['min'] : null,
				'max' => array_key_exists( 'max', $attrs ) ? $attrs['max'] : null,
			);
		}

		return wp_sprintf(
			'<div %1$s>%2$s</div><style>%3$s</style>',
			$wrapper_attributes,
			$content,
			$this->construct_media_queries( $viewport_specs ),
		);
	}

	/**
	 * Block init
	 *
	 * @hook init
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/responsive-container-controller',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}
