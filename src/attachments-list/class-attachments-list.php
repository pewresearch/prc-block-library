<?php
/**
 * Attachments List Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use WP_Query;

/**
 * Block Name:        Attachments List
 * Description:       Displays a list of attachments for the parent post of the current attachment. This block is intended to be used on attachment pages only.
 * Version:           0.2.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */
class Attachments_List {
	/**
	 * Cache group for attachments list
	 *
	 * @var string
	 */
	public static $cache_group = 'attachments-list-v1.5';

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

	public function get_all_chart_refs_for_post( $post_id ) {
		$blocks              = parse_blocks( get_post_field( 'post_content', $post_id, 'raw' ) );
		$depth_to_search     = 5;
		$synced_chart_blocks = \PRC\Platform\Block_Utils\find_blocks( $blocks, 'prc-chart-builder/synced-chart', $depth_to_search );
		$chart_ids_found     = array();
		if ( is_array( $synced_chart_blocks ) && ! empty( $synced_chart_blocks ) ) {
			// For each chart there is an attrs array with a ref property inside, lets collect those.
			foreach ( $synced_chart_blocks as $block ) {
				if ( isset( $block['attrs']['ref'] ) && is_numeric( $block['attrs']['ref'] ) ) {
					$chart_id = (int) $block['attrs']['ref'];
					if ( ! in_array( $chart_id, $chart_ids_found, true ) ) {
						$chart_ids_found[] = $chart_id;
					}
				}
			}
		}
		return $chart_ids_found;
	}

	/**
	 * Get attachments
	 *
	 * @param mixed $parent_post_id Parent post ID.
	 * @param mixed $post_id Post ID.
	 * @return array
	 */
	public function get_attachments( $parent_post_id, $post_id = null ) {
		$cached_data = wp_cache_get( $parent_post_id, self::$cache_group );
		if ( false !== $cached_data && ! is_user_logged_in() && ! is_preview() ) {
			return $cached_data;
		}

		$to_return = array();

		$post__not_in = array();

		if ( is_plugin_active( 'prc-art-direction/prc-art-direction.php' ) ) {
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

		// We start off with Chart Builder charts that are referenced in the parent post first.
		$charts = $this->get_all_chart_refs_for_post( $parent_post_id );

		foreach ( $charts as $chart_id ) {
			$chart = get_post( $chart_id );
			if ( $chart ) {
				$to_return[] = array(
					'link'  => get_permalink( $chart->ID ),
					'title' => $chart->post_title,
					'id'    => $chart->ID,
				);
			}
		}

		// Then we find attachments for the parent.
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

		if ( $attachments->have_posts() ) {
			foreach ( $attachments->posts as $attachment ) {
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
		}

		wp_cache_set( $parent_post_id, $to_return, self::$cache_group, 1 * HOUR_IN_SECONDS );

		return $to_return;
	}

	/**
	 * Generate CSS custom properties for color styles
	 *
	 * @param array $attributes Block attributes
	 * @return string CSS string with color custom properties
	 */
	private function generate_styles( array $attributes ): string {
		$hover_bg    = $attributes['customHoverBackgroundColor'] ?? '';
		$hover_text  = $attributes['customHoverTextColor'] ?? '';
		$active_bg   = $attributes['customActiveBackgroundColor'] ?? '';
		$active_text = $attributes['customActiveTextColor'] ?? '';
		$block_gap   = \PRC\Platform\Block_Utils\get_block_gap_support_value( $attributes );

		$styles = array(
			'--hover-background-color'  => $hover_bg,
			'--hover-text-color'        => $hover_text,
			'--active-background-color' => $active_bg,
			'--active-text-color'       => $active_text,
			'--block-gap'               => $block_gap,
		);

		$style_string = array_map(
			static function ( string $key, string $value ): string {
				return ! empty( $value ) ? $key . ': ' . $value . ';' : '';
			},
			array_keys( $styles ),
			$styles
		);

		return implode( ' ', array_filter( $style_string ) );
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

		$parent_post_title = get_the_title( $parent_post_id );
		$parent_post_url   = get_the_permalink( $parent_post_id );

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
		foreach ( $attachments as $attachment ) {
			$is_active  = $attachment['is_active'] ?? false;
			$classnames = \PRC\Platform\Block_Utils\classNames(
				'wp-block-prc-block-attachments-list__list-item',
				'flex-align-center',
				array(
					'is-active' => $is_active,
				)
			);
			$content   .= wp_sprintf(
				'<li class="%1$s"><a href="%2$s">%3$s</a></li>',
				$classnames,
				$attachment['link'],
				$attachment['title']
			);
		}
		return $content;
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

		$attachments = $this->get_attachments( $parent_post_id, $post_id );

		if ( ! $attachments ) {
			return '';
		}

		$list = $this->render_list(
			$attributes,
			$attachments,
			$parent_post_id,
		);

		$block_attrs = get_block_wrapper_attributes(
			array(
				'class' => 'wp-block-prc-block-attachments-list__list',
			)
		);

		$output = wp_sprintf(
			'<ul %1$s>%2$s</ul>',
			$block_attrs,
			$list,
		);

		// Use WP_HTML_Tag_Processor to append color styles to existing style attribute
		$tag_processor = new \WP_HTML_Tag_Processor( $output );
		if ( $tag_processor->next_tag( array( 'class_name' => 'wp-block-prc-block-attachments-list' ) ) ) {
			$style  = (string) $tag_processor->get_attribute( 'style' );
			$style .= ' ' . $this->generate_styles( $attributes );
			$tag_processor->set_attribute( 'style', $style );
		}

		return $tag_processor->get_updated_html();
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
			PRC_BLOCK_LIBRARY_DIR . '/build/attachments-list',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}
