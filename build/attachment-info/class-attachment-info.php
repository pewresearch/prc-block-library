<?php
/**
 * Attachment Info Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use WP_Query;

/**
 * Block Name:        Attachment Info
 * Description:       Displays either a list of attachments or a pagination of attachments. This block is intended to be used on attachment pages only. It will display a list of attachments for the parent post of the current attachment.
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */
class Attachment_Info {
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
	 * @return array
	 */
	public function get_attachments( $parent_post_id, $post_id = null ) {
		$cached_data = wp_cache_get( $parent_post_id, 'attachment-info' );
		if ( false !== $cached_data && ! is_user_logged_in() ) {
			return $cached_data;
		}

		$post__not_in = array();

		if ( \PRC\Platform\is_module_active( 'art-direction' ) ) {
			// Filter out Art Direction
			// Get the art direction from the parent post and filter out any id's that are already in use.
			$art_direction_api = new \PRC\Platform\Art_Direction\API( $parent_post_id );
			$art_direction     = $art_direction_api->get();
			if ( $art_direction ) {
				$image_slots = array_keys( $art_direction );
				foreach ( $image_slots as $slot ) {
					if ( isset( $art_direction[ $slot ]['id'] ) && ! in_array( $art_direction[ $slot ]['id'], $post__not_in ) ) {
						array_push( $post__not_in, $art_direction[ $slot ]['id'] );
					}
				}
			}
		}

		$attachments = new WP_Query(
			array(
				'post_type'      => 'attachment',
				'post_parent'    => $parent_post_id,
				'post_status'    => 'inherit',
				'post__not_in'   => $post__not_in, // phpcs:ignore
				'posts_per_page' => 50,
				'orderby'        => 'date',
				'order'          => 'asc',
				'media_type'     => 'image',
			)
		);

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

		wp_cache_set( $parent_post_id, $to_return, 'attachment-info', 1 * HOUR_IN_SECONDS );

		return $to_return;
	}

	/**
	 * Render list
	 *
	 * @param mixed $attributes Attributes.
	 * @param mixed $attachments Attachments.
	 * @param mixed $parent_post_id Parent post ID.
	 * @return string
	 */
	public function render_list( $attributes, $attachments, $parent_post_id ) {
		$content = '';

		$block_gap = \PRC\Platform\Block_Utils\get_block_gap_support_value( $attributes );

		$heading_text = array_key_exists( 'heading', $attributes ) ? $attributes['heading'] : false;

		$heading = wp_sprintf(
			'<div class="%1$s"><h2>%2$s</h2></div>',
			\PRC\Platform\Block_Utils\classNames(
				'wp-block-prc-block-table-of-attachments-info__heading',
				array(
					'has-text-color' => $attributes['headingTextColor'],
					'has-' . $attributes['headingTextColor'] . '-color' => $attributes['headingTextColor'],
					'has-background' => $attributes['headingBackgroundColor'],
					'has-' . $attributes['headingBackgroundColor'] . '-background-color' => $attributes['headingBackgroundColor'],
					'is-hidden'      => true === $attributes['hideHeading'],
				),
			),
			$heading_text,
		);

		$parent_post_title = get_the_title( $parent_post_id );
		$parent_post_url   = get_the_permalink( $parent_post_id );

		$list_item_classnames = \PRC\Platform\Block_Utils\classNames(
			'flex-align-center',
			array(
				'has-hover-color'      => $attributes['hoverTextColor'],
				'has-hover-' . $attributes['hoverTextColor'] . '-color' => $attributes['hoverTextColor'],
				'has-hover-background' => $attributes['hoverBackgroundColor'],
				'has-hover-' . $attributes['hoverBackgroundColor'] . '-background-color' => $attributes['hoverBackgroundColor'],
				'has-focus-color'      => $attributes['activeTextColor'],
				'has-focus-' . $attributes['activeTextColor'] . '-color' => $attributes['activeTextColor'],
				'has-focus-background' => $attributes['activeBackgroundColor'],
				'has-focus-' . $attributes['activeBackgroundColor'] . '-background-color' => $attributes['activeBackgroundColor'],
			)
		);

		foreach ( $attachments as $i => $attachment ) {
			$is_active                      = get_the_ID() === $attachment['id'];
			$attachments[ $i ]['is_active'] = $is_active;
		}
		// Add the parent post to the list of attachments at the start.
		$attachments = array_merge(
			array(
				array(
					'link'      => $parent_post_url,
					'title'     => $parent_post_title,
					'is_active' => false,
					'id'        => null,
				),
			),
			$attachments
		);

		$baseball_card_list = new \PRC\Platform\Blocks\Baseball_Card_List( $attachments );
		$content           .= $baseball_card_list->get_markup(
			array(
				'item_classnames'  => $list_item_classnames,
				'ul_extra_attrs'   => 'style="--block-gap: ' . $block_gap . ';"',
				'classname_prefix' => 'wp-block-prc-block-attachment-info',
			)
		);

		$block_attrs = array(
			'class' => \PRC\Platform\Block_Utils\classNames(
				'common-block-style--baseball-card',
				array(
					'has-text-color' => $attributes['textColor'],
					'has-' . $attributes['textColor'] . '-color' => $attributes['textColor'],
					'has-background' => $attributes['backgroundColor'],
					'has-' . $attributes['backgroundColor'] . '-background-color' => $attributes['backgroundColor'],
				),
			),
		);

		$content = $heading . $content;

		return array(
			'content'     => $content,
			'block_attrs' => $block_attrs,
		);
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
		$pagination         = new \PRC\Platform\Block_Utils\Pagination( $attachments );
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

		$parent_post_id = array_key_exists( 'parentId', $attributes ) && is_numeric( $attributes['parentId'] ) && 0 != $attributes['parentId'] ? $attributes['parentId'] : wp_get_post_parent_id( $post_id );

		$variant = array_key_exists( 'variant', $attributes ) ? $attributes['variant'] : 'list';

		$attachments = $this->get_attachments( $parent_post_id, $post_id );

		if ( ! $attachments ) {
			return '';
		}

		if ( 'list' === $variant ) {
			$list        = $this->render_list(
				$attributes,
				$attachments,
				$parent_post_id,
			);
			$block_attrs = $list['block_attrs'];
			$content     = $list['content'];
		} elseif ( 'pagination' === $variant ) {
			$pagination  = $this->render_pagination(
				$attributes,
				$attachments,
			);
			$block_attrs = $pagination['block_attrs'];
			$content     = $pagination['content'];
		}

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
			PRC_BLOCK_LIBRARY_DIR . '/build/attachment-info',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}
