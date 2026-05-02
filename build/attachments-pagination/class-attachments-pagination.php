<?php
/**
 * Attachments Pagination Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use WP_Query;

/**
 * Block Name:        Attachments Pagination
 * Description:       Displays paginated list for the attachments of the parent post of the current attachment. This is only intended for use on Attachment pages.
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */
class Attachments_Pagination {
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
	 * Get attachments
	 *
	 * @param mixed $parent_post_id Parent post ID.
	 * @param mixed $post_id Post ID.
	 * @return array|false
	 */
	public function get_attachments( $parent_post_id, $post_id = null ) {
		$cached_data = wp_cache_get( $parent_post_id, 'attachments-pagination-v2' );
		if ( false !== $cached_data && ! is_user_logged_in() ) {
			return $cached_data;
		}

		$post__not_in = array();

		if ( is_plugin_active( 'prc-art-direction/prc-art-direction.php' ) ) {
			// Filter out Art Direction
			// Get the art direction from the parent post and filter out any id's that are already in use.
			$art_direction_api = new \PRC\Platform\Art_Direction\API( $parent_post_id );
			$art_direction     = $art_direction_api->get();
			if ( $art_direction ) {
				$image_slots = array_keys( $art_direction );
				foreach ( $image_slots as $slot ) {
					if ( isset( $art_direction[ $slot ]['id'] ) && ! in_array( $art_direction[ $slot ]['id'], $post__not_in, true ) ) {
						array_push( $post__not_in, $art_direction[ $slot ]['id'] );
					}
				}
			}
		}

		$query_args = array(
			'post_type'      => 'attachment',
			'post_parent'    => $parent_post_id,
			'post_status'    => 'inherit',
			'post__not_in'   => $post__not_in, // phpcs:ignore
			'posts_per_page' => 50,
			'orderby'        => 'date',
			'order'          => 'asc',
			'media_type'     => 'image',
		);

		if ( taxonomy_exists( '_media_visibility' ) ) {
			$query_args['tax_query'] = array(
				array(
					'taxonomy'         => '_media_visibility',
					'field'            => 'slug',
					'terms'            => array( 'hidden' ),
					'operator'         => 'NOT IN',
					'include_children' => false,
				),
			);
		}

		$attachments = new WP_Query( $query_args );

		if ( ! $attachments->have_posts() ) {
			return false;
		}

		$attachments = $attachments->posts;

		$to_return = array();

		foreach ( $attachments as $attachment ) {
			if ( $attachment->menu_order > 0 ) {
				continue;
			}
			if ( false === strpos( $attachment->post_title, ' ' ) ) {
				continue;
			}
			if ( 'application/pdf' === get_post_mime_type( $attachment->ID ) ) {
				continue;
			}
			// Filter out Getty copyrighted images.
			if ( false !== strpos( $attachment->post_content, 'Getty' ) ) {
				continue;
			}

			$to_return[] = array(
				'link'  => get_attachment_link( $attachment->ID ),
				'title' => $attachment->post_title,
				'id'    => $attachment->ID,
			);
		}

		wp_cache_set( $parent_post_id, $to_return, 'attachments-pagination-v2', 1 * HOUR_IN_SECONDS );

		return $to_return;
	}

	/**
	 * Render pagination
	 *
	 * @param mixed $attributes Attributes.
	 * @param mixed $attachments Attachments.
	 * @return array
	 */
	public function render_pagination( $attributes, $attachments ) {
		// Determine which item is active.
		foreach ( $attachments as $i => $attachment ) {
			$is_active                      = get_the_ID() === $attachment['id'];
			$attachments[ $i ]['is_active'] = $is_active;
		}
		$pagination         = new \PRC\BlockUtils\Pagination( $attachments );
		$pagination_content = $pagination->get_markup();

		$block_attrs = array();

		return array(
			'content'     => $pagination_content,
			'block_attrs' => $block_attrs,
		);
	}

	/**
	 * Render block callback
	 *
	 * @param mixed $attributes Attributes.
	 * @param mixed $content Content.
	 * @param mixed $block Block.
	 * @return string
	 */
	public function render_block_callback( $attributes, $content, $block ) {
		if ( is_admin() ) {
			return $content;
		}
		$post_id = $block->context['postId'];

		$parent_post_id = array_key_exists( 'parentId', $attributes ) && is_numeric( $attributes['parentId'] ) && 0 !== $attributes['parentId'] ? $attributes['parentId'] : wp_get_post_parent_id( $post_id );

		$attachments = $this->get_attachments( $parent_post_id, $post_id );

		if ( ! $attachments ) {
			return '';
		}

		$pagination  = $this->render_pagination(
			$attributes,
			$attachments,
		);
		$block_attrs = $pagination['block_attrs'];
		$content     = $pagination['content'];

		$block_attrs = get_block_wrapper_attributes( $block_attrs );

		return wp_sprintf(
			'<div %1$s>%2$s</div>',
			$block_attrs,
			$content,
		);
	}

	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @hook init
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/attachments-pagination',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}
