<?php
/**
 * Grid Column Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use WP_HTML_Tag_Processor;

/**
 * Block Name:        Grid Column
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Grid_Column {
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
			$loader->add_filter( 'block_type_metadata', $this, 'add_attributes' );
			$loader->add_filter( 'render_block_data', $this, 'apply_legacy_divider_fallback', 10, 3 );
			$loader->add_filter( 'render_block_prc-block/grid-column', $this, 'enforce_divider_classes', 10, 2 );
			$loader->add_filter( 'render_block', $this, 'handle_align_to_gutter', 10, 2 );
		}
	}

	/**
	 * Register additional attributes for the core-group block
	 *
	 * @hook block_type_metadata 100, 1
	 * @param mixed $metadata Metadata.
	 * @return mixed
	 */
	public function add_attributes( $metadata ) {
		if ( is_array( $metadata ) && array_key_exists( 'attributes', $metadata ) && ! array_key_exists( 'alignToGutter', $metadata['attributes'] ) ) {
			$metadata['attributes']['alignToGutter'] = array(
				'type'    => 'boolean',
				'default' => false,
			);
		}
		return $metadata;
	}

	/**
	 * Apply legacy divider fallback for grid-columns missing explicit divider attributes.
	 *
	 * This method provides server-side fallback for legacy grid-column blocks that were created
	 * before the explicit divider attributes (desktopDivider, tabletDivider, mobileDivider) were added.
	 * It matches the JavaScript deprecation logic in deprecated.jsx to ensure consistent rendering
	 * for content that hasn't been opened in the editor and migrated.
	 *
	 * Legacy blocks are detected by the absence of the 'desktopDivider' key in gridLayout.
	 * When detected, dividers are calculated as:
	 * - true: if index > 0 (not the first column)
	 * - false: if index is 0, missing, or null (treat as first column)
	 *
	 * This is temporary legacy support and can be removed after a content migration via WP-CLI
	 * or editor-driven updates.
	 *
	 * @hook render_block_data 10, 3
	 * @param array    $parsed_block The parsed block data.
	 * @param array    $source_block The source block data.
	 * @param WP_Block $parent_block The parent block instance.
	 * @return array Modified parsed block with injected divider attributes if needed.
	 */
	public function apply_legacy_divider_fallback( $parsed_block, $source_block, $parent_block ) {
		// Only process grid-column blocks.
		if ( 'prc-block/grid-column' !== $parsed_block['blockName'] ) {
			return $parsed_block;
		}

		// Check if gridLayout exists.
		if ( ! isset( $parsed_block['attrs']['gridLayout'] ) || ! is_array( $parsed_block['attrs']['gridLayout'] ) ) {
			return $parsed_block;
		}

		$grid_layout = $parsed_block['attrs']['gridLayout'];

		// Detect legacy blocks by checking if desktopDivider attribute exists.
		// If it exists, this block has already been migrated or is a new block.
		if ( array_key_exists( 'desktopDivider', $grid_layout ) && null !== $grid_layout['desktopDivider'] ) {
			return $parsed_block;
		}

		// This is a legacy block - apply divider fallback logic.
		// Get the column index, treating missing/null/0 as first column (no divider).
		$index = isset( $grid_layout['index'] ) ? (int) $grid_layout['index'] : 0;

		// Calculate dividers: true if index > 0 (not first column), false otherwise.
		// This matches the JavaScript migration logic: gridLayout.index !== 1,
		// but guards against index === 0 edge cases.
		$should_have_divider = $index > 1;

		// Inject the divider attributes into the parsed block.
		$parsed_block['attrs']['gridLayout']['desktopDivider'] = $should_have_divider;
		$parsed_block['attrs']['gridLayout']['tabletDivider']  = $should_have_divider;
		$parsed_block['attrs']['gridLayout']['mobileDivider']  = $should_have_divider;

		// Also ensure position attributes exist (set to null for sequential order).
		if ( ! array_key_exists( 'tabletPosition', $grid_layout ) ) {
			$parsed_block['attrs']['gridLayout']['tabletPosition'] = null;
		}
		if ( ! array_key_exists( 'mobilePosition', $grid_layout ) ) {
			$parsed_block['attrs']['gridLayout']['mobilePosition'] = null;
		}

		return $parsed_block;
	}

	/**
	 * Enforce divider classes on grid-column blocks based on gridLayout divider attributes.
	 *
	 * This method ensures that divider classes (has-desktop-divider, has-tablet-divider,
	 * has-mobile-divider) are properly applied to the rendered block HTML based on the
	 * gridLayout divider attributes. This provides an additional layer of enforcement
	 * beyond the render_callback, ensuring divider classes are present even if the
	 * render_callback is bypassed or modified.
	 *
	 * @hook render_block_prc-block/grid-column 10, 2
	 *
	 * @param string $block_content The rendered block content.
	 * @param array  $block The block data including attributes.
	 * @return string Modified block content with divider classes enforced.
	 */
	public function enforce_divider_classes( $block_content, $block ) {
		// Check if gridLayout exists.
		if ( ! isset( $block['attrs']['gridLayout'] ) || ! is_array( $block['attrs']['gridLayout'] ) ) {
			return $block_content;
		}

		$grid_layout = $block['attrs']['gridLayout'];

		// Initialize the HTML tag processor.
		$tag = new WP_HTML_Tag_Processor( $block_content );

		// Find the first tag (should be the wrapper div).
		if ( ! $tag->next_tag() ) {
			return $block_content;
		}

		// Enforce desktop divider class.
		if ( isset( $grid_layout['desktopDivider'] ) && true === $grid_layout['desktopDivider'] ) {
			$tag->add_class( 'has-desktop-divider' );
		} else {
			$tag->remove_class( 'has-desktop-divider' );
		}

		// Enforce tablet divider class.
		if ( isset( $grid_layout['tabletDivider'] ) && true === $grid_layout['tabletDivider'] ) {
			$tag->add_class( 'has-tablet-divider' );
		} else {
			$tag->remove_class( 'has-tablet-divider' );
		}

		// Enforce mobile divider class.
		if ( isset( $grid_layout['mobileDivider'] ) && true === $grid_layout['mobileDivider'] ) {
			$tag->add_class( 'has-mobile-divider' );
		} else {
			$tag->remove_class( 'has-mobile-divider' );
		}

		return $tag->get_updated_html();
	}

	/**
	 * Wraps inner results blocks with display logic dependent on score.
	 *
	 * @hook render_block
	 * @param string $block_content The block content.
	 * @param array  $block The block data.
	 * @return string
	 */
	public function handle_align_to_gutter( $block_content, $block ) {
		if ( ! isset( $block['attrs']['alignToGutter'] ) ) {
			return $block_content;
		}
		// Check if the block should align to gutter.
		$align_to_gutter = $block['attrs']['alignToGutter'];
		if ( ! $align_to_gutter ) {
			return $block_content;
		}

		$tag = new WP_HTML_Tag_Processor( $block_content );
		$tag->next_tag();
		$tag->add_class( 'prc-block-grid-column--align-to-gutter' );
		return $tag->get_updated_html();
	}

	/**
	 * Render the block callback.
	 *
	 * @param array    $attributes Block attributes.
	 * @param string   $content Block content.
	 * @param WP_Block $block Block instance.
	 * @return string Rendered block HTML.
	 */
	public function render_block_callback( $attributes, $content, $block ) {
		/**
		 * Build an array with CSS classes defining the column's layout
		 * which will be applied to the column markup in the front-end.
		 *
		 * @param array $attributes Grid Column block attributes.
		 *
		 * @return array Grid CSS classes.
		 */
		$grid_defaults = array(
			'index'          => 0,
			'desktopSpan'    => 4,
			'tabletSpan'     => 4,
			'mobileSpan'     => 4,
			'tabletPosition' => null,
			'mobilePosition' => null,
			'desktopDivider' => false,
			'tabletDivider'  => false,
			'mobileDivider'  => false,
		);
		$attrs         = wp_parse_args( $attributes['gridLayout'], $grid_defaults );
		$index         = $attrs['index'];

		$vertical_alignment = array_key_exists( 'verticalAlignment', $attributes ) ? $attributes['verticalAlignment'] : 'top';

		// Build the layout CSS classes (span is now via CSS custom properties + data attributes).
		$column_classes = array(
			'is-vertically-aligned-' . $vertical_alignment,
		);

		// Add desktop divider class.
		if ( $attrs['desktopDivider'] ) {
			$column_classes[] = 'has-desktop-divider';
		}

		// Add divider classes.
		if ( $attrs['tabletDivider'] ) {
			$column_classes[] = 'has-tablet-divider';
		}
		if ( $attrs['mobileDivider'] ) {
			$column_classes[] = 'has-mobile-divider';
		}

		$inline_style = sprintf(
			'--desktop-span:%d;--tablet-span:%d;--mobile-span:%d;',
			(int) $attrs['desktopSpan'],
			(int) $attrs['tabletSpan'],
			(int) $attrs['mobileSpan']
		);

		// Append ordering CSS custom properties when set.
		if ( ! empty( $attrs['tabletPosition'] ) ) {
			$inline_style .= sprintf( '--tablet-order:%d;', (int) $attrs['tabletPosition'] );
		}
		if ( ! empty( $attrs['mobilePosition'] ) ) {
			$inline_style .= sprintf( '--mobile-order:%d;', (int) $attrs['mobilePosition'] );
		}

		$block_attrs = get_block_wrapper_attributes(
			array(
				'class'            => \PRC\Platform\Block_Utils\classNames( $column_classes ),
				'style'           => $inline_style,
				'data-desktop-span' => (string) $attrs['desktopSpan'],
				'data-tablet-span'  => (string) $attrs['tabletSpan'],
				'data-mobile-span'  => (string) $attrs['mobileSpan'],
			)
		);

		return wp_sprintf(
			'<div %1$s>%2$s</div>',
			$block_attrs,
			$content
		);
	}

	/**
	 * Register the block
	 *
	 * @hook init
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		register_block_type(
			PRC_BLOCK_LIBRARY_DIR . '/build/grid-column',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}
