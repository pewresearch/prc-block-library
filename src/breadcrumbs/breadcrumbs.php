<?php
namespace PRC\Platform\Blocks;

/**
 * Block Name:        Breadcrumbs
 * Requires at least: 6.7
 * Requires PHP:      8.2
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */
class Breadcrumbs {

	public function __construct( $loader ) {
		$this->init( $loader );
	}

	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
		}
	}

	public function generate_json_schema() {
	}

	/**
	 * Render the block
	 *
	 * @param array  $attributes Block attributes
	 * @param string $content Block content
	 * @param array  $block WP_Block object
	 * @return string
	 */
	public function render_block_callback( $attributes, $content, $block ) {
		$context = $block->context;
		if ( ! isset( $context['postId'] ) ) {
			return '';
		}
		$post_id            = $context['postId'];
		$post_type          = get_post_type( $post_id );
		$ancestor_ids       = array();
		$has_post_hierarchy = is_post_type_hierarchical( $post_type );
		$show_current_page  = ! empty( $attributes['showCurrentPageTitle'] );

		if ( $has_post_hierarchy ) {
			$ancestor_ids = get_post_ancestors( $post_id );
		} else {
			$terms = get_the_terms( $post_id, 'category' );

			if ( ! empty( $terms ) && ! is_wp_error( $terms ) ) {
				$term = get_term( $terms[0], 'category' );

				$ancestor_ids[] = $term->term_id;
				$ancestor_ids   = array_merge( $ancestor_ids, get_ancestors( $term->term_id, 'category' ) );
			}
		}

		$breadcrumbs = array();

		// Set up the home crumb if set to show.
		if ( ! empty( $attributes['showHome'] ) ) {
			$home_url      = $attributes['homeCrumb']['url'] ?? home_url();
			$home_label    = $attributes['homeCrumb']['text'] ?? \PRC\Platform\Icons\render( 'solid', 'house' );
			$breadcrumbs[] = array(
				'url'  => $home_url,
				'text' => $home_label,
			);
		}

		if ( ! empty( $ancestor_ids ) ) {
			if ( $has_post_hierarchy ) {
				// Construct remaining breadcrumbs from ancestor ids.
				foreach ( array_reverse( $ancestor_ids ) as $ancestor_id ) {
					$breadcrumbs[] = array(
						'url'  => get_the_permalink( $ancestor_id ),
						'text' => get_the_title( $ancestor_id ),
					);
				}
			} else {
				foreach ( array_reverse( $ancestor_ids ) as $ancestor_id ) {
					$breadcrumbs[] = array(
						'url'  => get_category_link( $ancestor_id ),
						'text' => get_cat_name( $ancestor_id ),
					);
				}
			}
		}

		// Append current page title if set to show.
		if ( $show_current_page ) {
			$breadcrumbs[] = array(
				'url'  => get_the_permalink( $post_id ),
				'text' => get_the_title( $post_id ),
			);
		}

		$inner_markup = '';

		/**
		 * Filters the list of breadcrumb links within the Breadcrumbs block render callback.
		 *
		 * @since 6.3.0
		 *
		 * @param array[] An array of Breadcrumb arrays with `url` and `title` keys.
		 */
		$breadcrumbs = apply_filters( 'prc_platform_breadcrumbs', $breadcrumbs );

		// If no breadcrumbs are available, return an empty string.
		if ( empty( $breadcrumbs ) ) {
			return '';
		}

		foreach ( $breadcrumbs as $index => $breadcrumb ) {
			$show_separator  = $index < count( $breadcrumbs ) - 1;
			$child_crumbs    = $breadcrumb['crumbs'] ?? array();
			$is_current_page = $breadcrumb['is_current_page'] ?? ( $show_current_page && count( $breadcrumbs ) - 1 === $index );
			$crumb_visible   = $breadcrumb['visible'] ?? true;
			if ( ! $crumb_visible ) {
				continue;
			}
			$inner_markup .= $this->build_crumb_markup(
				$breadcrumb['url'],
				$breadcrumb['text'],
				$attributes,
				$index,
				$show_separator,
				$is_current_page,
				$child_crumbs
			);
		}

		$classnames = '';

		if ( ! empty( $attributes['contentJustification'] ) ) {
			if ( 'left' === $attributes['contentJustification'] ) {
				$classnames = 'is-content-justification-left';
			}

			if ( 'center' === $attributes['contentJustification'] ) {
				$classnames = 'is-content-justification-center';
			}

			if ( 'right' === $attributes['contentJustification'] ) {
				$classnames = 'is-content-justification-right';
			}
		}

		$block_gap = \PRC\Platform\Block_Utils\get_block_gap_support_value( $attributes, 'horizontal' );

		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'class'      => $classnames,
				'aria-label' => __( 'Breadcrumbs' ),
				'style'      => '--breadcrumbs-gap: ' . $block_gap . ';',
			)
		);

		return wp_sprintf(
			'<nav %1$s><ol>%2$s</ol></nav>',
			$wrapper_attributes,
			$inner_markup
		);
	}

	/**
	 * Builds the markup for a single Breadcrumb item or "crumb".
	 *
	 * Used when iterating over a list of breadcrumb urls and titles.
	 *
	 * @param string $url             The url for the link in the breadcrumb.
	 * @param string $title           The label/title for the breadcrumb item.
	 * @param array  $attributes      Block attributes.
	 * @param int    $index           The position in a list of ids.
	 * @param bool   $show_separator  Whether to show the separator character where available.
	 * @param bool   $is_current_page Whether to mark the breadcrumb item as the current page.
	 *
	 * @return string The markup for a single breadcrumb item wrapped in an `li` element.
	 */
	public function build_crumb_markup( $url, $title, $attributes, $index, $show_separator = true, $is_current_page = false, $child_crumbs = array() ) {
		$li_class        = 'prc-block-breadcrumbs__item';
		$separator_class = 'prc-block-breadcrumbs__separator';

		$markup = '';

		// Render leading separator if specified.
		if (
			! empty( $attributes['showLeadingSeparator'] ) &&
			! empty( $attributes['separator'] ) &&
			0 === $index
		) {
			$markup .= wp_sprintf(
				'<span class="%1$s">%2$s</span>',
				$separator_class,
				$attributes['separator'],
			);
		}

		$markup .= wp_sprintf(
			'<a href="%s"%s>%s</a>',
			esc_url( $url ),
			$is_current_page ? ' aria-current="page"' : '',
			$title,
		);

		if (
			$show_separator &&
			! empty( $attributes['separator'] )
		) {
			$markup .= wp_sprintf(
				'<span class="%1$s" aria-hidden="true">%2$s</span>',
				$separator_class,
				$attributes['separator'],
			);
		}

		$child_crumbs_template = '';
		if ( ! empty( $child_crumbs ) ) {
			$child_crumbs_template = '<ol>';
			foreach ( $child_crumbs as $child_crumb_index => $child_crumb ) {
				$child_crumbs_template .= $this->build_crumb_markup(
					$child_crumb['url'],
					$child_crumb['text'],
					array(),
					$child_crumb_index,
					false,
					$child_crumb['is_current_page']
				);
			}
			$child_crumbs_template .= '</ol>';
		}

		return wp_sprintf(
			'<li class="%1$s">%2$s</li>',
			$li_class,
			$markup . $child_crumbs_template
		);
	}

	/**
	 * Registers the block using the block manifest (if registered). Fails over to the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @hook init
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/breadcrumbs',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}
