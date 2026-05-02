<?php
/**
 * Taxonomy Index List Controller Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Taxonomy Index List Controller
 * Description:       Display a grid of taxonomy list blocks that converts to an accordion on mobile devices.
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Taxonomy_Index_List_Controller {
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
		}
	}

	/**
	 * Renders the taxonomy-index-list-controller block on the server.
	 *
	 * Cribbed from https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/block/index.php
	 *
	 * @param array $attributes The block attributes.
	 *
	 * @return string Rendered HTML of the referenced block.
	 */
	public function render_reusable_block( $attributes ) {
		static $seen_refs = array();

		if ( empty( $attributes['ref'] ) ) {
			return '';
		}

		$reusable_block = get_post( $attributes['ref'] );
		if ( ! $reusable_block || 'wp_block' !== $reusable_block->post_type ) {
			return '';
		}

		if ( isset( $seen_refs[ $attributes['ref'] ] ) ) {
			// WP_DEBUG_DISPLAY must only be honored when WP_DEBUG. This precedent
			// is set in `wp_debug_mode()`.
			$is_debug = WP_DEBUG && WP_DEBUG_DISPLAY;

			return $is_debug ?
				// translators: Visible only in the front end, this warning takes the place of a faulty block.
				__( '[block rendering halted]' ) :
				'';
		}

		if ( 'publish' !== $reusable_block->post_status || ! empty( $reusable_block->post_password ) ) {
			return '';
		}

		$seen_refs[ $attributes['ref'] ] = true;

		$blocks = parse_blocks( $reusable_block->post_content );

		// If the reusable block has a single block, and that block is a taxonomy list, then render it as an accordion.
		if ( count( $blocks ) === 1 && $blocks[0]['blockName'] === 'prc-block/taxonomy-list' ) {
			$item_markup = $this->parse_taxonomy_list_as_accordion( $blocks[0] );
			$content     = $item_markup ? $this->wrap_core_accordion( $item_markup ) : '';
		} else {
			$content = render_block( $blocks[0] );
		}

		unset( $seen_refs[ $attributes['ref'] ] );
		return $content;
	}

	/**
	 * Wrap serialized core/accordion-item markup in core/accordion (matches core serialized HTML shape).
	 *
	 * Applies the theme sans-serif font preset (see theme.json `fontFamily` slug `sans-serif`).
	 *
	 * @param string $items_markup One or more serialized `core/accordion-item` blocks.
	 * @return string
	 */
	private function wrap_core_accordion( $items_markup ) {
		$accordion_attrs = array(
			'fontFamily' => 'sans-serif',
		);

		return sprintf(
			'<!-- wp:accordion %s --><div role="group" class="wp-block-accordion">%s</div><!-- /wp:accordion -->',
			serialize_block_attributes( $accordion_attrs ),
			$items_markup
		);
	}

	/**
	 * Build serialized core/accordion-item markup: heading + panel with inner blocks.
	 *
	 * @param string $label Plain-text accordion title.
	 * @param string $inner_blocks_markup Result of serialize_blocks() for panel inner blocks.
	 * @return string
	 */
	private function build_core_accordion_item_markup( $label, $inner_blocks_markup ) {
		$heading_inner = sprintf(
			'<h3 class="wp-block-accordion-heading has-sans-serif-font-family"><button type="button" class="wp-block-accordion-heading__toggle"><span class="wp-block-accordion-heading__toggle-title">%s</span><span class="wp-block-accordion-heading__toggle-icon" aria-hidden="true">+</span></button></h3>',
			esc_html( $label )
		);

		return sprintf(
			'<!-- wp:accordion-item --><div class="wp-block-accordion-item has-sans-serif-font-family"><!-- wp:accordion-heading -->%s<!-- /wp:accordion-heading -->

<!-- wp:accordion-panel --><div role="region" class="wp-block-accordion-panel">%s</div><!-- /wp:accordion-panel --></div><!-- /wp:accordion-item -->',
			"\n" . $heading_inner . "\n",
			$inner_blocks_markup
		);
	}

	/**
	 * Parse the taxonomy list as an accordion.
	 *
	 * @param array $taxonomy_list_block Taxonomy list block.
	 * @return string Serialized `core/accordion-item` markup, or empty string.
	 */
	public function parse_taxonomy_list_as_accordion( $taxonomy_list_block ) {
		$inner_blocks = $taxonomy_list_block['innerBlocks'];
		// Get the first inner_block with an attribute classname of is-style-sub-heading.
		$heading_block = array_filter(
			$inner_blocks,
			function ( $block ) {
				return array_key_exists( 'attrs', $block ) && array_key_exists( 'className', $block['attrs'] ) && strpos( $block['attrs']['className'], 'is-style-sub-heading' ) !== false;
			}
		);
		if ( empty( $heading_block ) ) {
			return '';
		}
		$heading_block_item = reset( $heading_block );
		// Extract the label from heading block.
		$label = $heading_block_item['attrs']['label'] ?? '';
		$url   = $heading_block_item['attrs']['url'] ?? '';

		// Extract the array index of the heading block in the inner_blocks array.
		$heading_block_index = array_search( $heading_block_item, $inner_blocks, true );
		// Remove the heading block from the inner_blocks array.
		unset( $inner_blocks[ $heading_block_index ] );
		// Reindex the array to cleanup data.
		$inner_blocks = array_values( $inner_blocks );

		if ( $url ) {
			$psuedo_accordion_title_term_link = array(
				'blockName'    => 'prc-block/taxonomy-list-link',
				'attrs'        => array(
					'label'      => "Main $label page »",
					'url'        => $url,
					'fontFamily' => 'sans-serif',
				),
				'innerBlocks'  => array(),
				'innerHTML'    => '',
				'innerContent' => array(),
			);
			// Add psuedo accordion title term link to the beginning of the inner_blocks array.
			array_unshift( $inner_blocks, $psuedo_accordion_title_term_link );
		}

		if ( ! $label || ! $inner_blocks ) {
			return '';
		}

		return $this->build_core_accordion_item_markup( $label, serialize_blocks( $inner_blocks ) );
	}

	/**
	 * Render the taxonomy-index-list-controller block as an accordion.
	 *
	 * @param \WP_Block $block Block.
	 * @return string
	 */
	public function render_as_accordion_block( $block ) {
		$accordion_blocks = '';

		foreach ( $block->parsed_block['innerBlocks'] as $grid ) {
			foreach ( $grid['innerBlocks'] as $column ) {
				foreach ( $column['innerBlocks'] as $innerblock ) {
					$accordion_blocks .= $this->parse_taxonomy_list_as_accordion( $innerblock );
				}
			}
		}

		if ( '' === $accordion_blocks ) {
			return '';
		}

		$markup = $this->wrap_core_accordion( $accordion_blocks );
		$blocks = parse_blocks( $markup );
		if ( empty( $blocks ) ) {
			return '';
		}

		return render_block( $blocks[0] );
	}

	/**
	 * Render the block callback.
	 *
	 * @param array     $attributes Attributes.
	 * @param string    $content Content.
	 * @param \WP_Block $block Block instance.
	 * @return string
	 */
	public function render_block_callback( $attributes, $content, $block ) {
		if ( 'mobile' === \PRC\BlockUtils\get_current_device() ) {
			return $this->render_as_accordion_block( $block );
		}

		$wrapper_attributes = get_block_wrapper_attributes();

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
	 * @hook init
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/taxonomy-index-list-controller',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}
