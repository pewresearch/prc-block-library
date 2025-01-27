<?php
namespace PRC\Platform\Blocks;

/**
 * Block Name:        Collection Kicker
 * Description:
 * Version:           0.1.0
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Collection_Kicker {
	public function __construct( $loader ) {
		$this->init( $loader );
	}

	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
		}
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$ref_id  = array_key_exists( 'postId', $block->context ) ? $block->context['postId'] : false;
		$term_id = array_key_exists( 'termId', $attributes ) ? $attributes['termId'] : false;
		// if $term_id is false, we need to get the current collection taxonomy terms for this post and get the first term and use it as the fallback. If that fails, return.
		if ( false === $term_id ) {
			$terms = get_the_terms( $ref_id, 'collection' );
			if ( false === $terms || empty( $terms ) ) {
				return;
			}
			$collection_term = array_shift( $terms );
			if ( false === $collection_term || empty( $collection_term ) ) {
				return;
			}
		} elseif ( false !== $term_id ) {
			// Double check the term actually exists and is a collection term. If it doesn't, return.
			$collection_term = get_term( $term_id, 'collection' );
			if ( false === $collection_term || empty( $collection_term ) ) {
				return;
			}
		}
		// Get the associated Collection post.
		$collection_post = \TDS\get_related_post( $collection_term->term_id, $collection_term->taxonomy );
		// Now from here we need to get the collection post's assigned kicker synced pattern id and use that for the content...

		// If there is not an associated Collection post then we should return.
		if ( false === $collection_post ) {
			return;
		}
		$kicker_slug = get_post_meta( $collection_post->ID, 'kicker_pattern_slug', true );
		if ( false === $kicker_slug ) {
			return;
		}

		$found_part = get_page_by_path( $kicker_slug, OBJECT, 'wp_template_part' );

		if ( null === $found_part ) {
			return;
		}

		return do_blocks( $found_part->post_content );
	}

	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/collection-kicker',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}
