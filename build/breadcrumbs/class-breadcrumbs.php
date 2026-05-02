<?php
/**
 * Breadcrumbs Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use WP_Block_Type_Registry;

/**
 * Block Name:        Breadcrumbs
 * Requires at least: 6.7
 * Requires PHP:      8.2
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */
class Breadcrumbs {
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
			$loader->add_filter( 'allowed_block_types_all', $this, 'disable_other_breadcrumb_blocks', 10, 2 );
			$loader->add_action( 'init', $this, 'block_init' );
		}
	}

	/**
	 * Filter the allowed blocks in the editor.
	 *
	 * @hook allowed_block_types_all
	 *
	 * @internal
	 * @param array|bool $allowed_block_types Array of allowed block types or a boolean.
	 * @param object     $editor_context The editor context.
	 * @return array Array of allowed block types.
	 */
	public function disable_other_breadcrumb_blocks( $allowed_block_types, $editor_context ) {
		$registry         = WP_Block_Type_Registry::get_instance();
		$registerd_blocks = $registry->get_all_registered();
		$registerd_blocks = array_keys( $registerd_blocks );

		$blocks_to_remove = array(
			'yoast-seo/breadcrumbs',
			'core/breadcrumbs',
		);

		$allowed_block_types = array_diff( $registerd_blocks, $blocks_to_remove );
		$allowed_block_types = array_values( $allowed_block_types );

		return $allowed_block_types;
	}

	/**
	 * Generate JSON schema
	 *
	 * @return void
	 */
	public function generate_json_schema() {
	}

	/**
	 * Render the block
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content Block content.
	 * @param object $block WP_Block object.
	 * @return string
	 */
	public function render_block_callback( $attributes, $content, $block ) {
		$context            = $block->context;
		$show_current_page  = ! empty( $attributes['showCurrentPageTitle'] );
		$current_object     = get_queried_object();
		$type_of_object     = '';
		$ancestor_ids                = array();
		$has_post_hierarchy          = false;
		$breadcrumbs_from_categories = false;

		if ( null === $current_object ) {
			return '';
		}

		if ( $current_object instanceof \WP_Post ) {
			$type_of_object = 'WP_Post';
		} elseif ( $current_object instanceof \WP_Term ) {
			$type_of_object = 'WP_Term';
		} elseif ( $current_object instanceof \WP_Post_Type ) {
			$type_of_object = 'WP_Post_Type';
		} elseif ( $current_object instanceof \WP_User ) {
			$type_of_object = 'WP_User';
		}

		switch ( $type_of_object ) {
			case 'WP_Post':
				if ( 'attachment' === $current_object->post_type && $current_object->post_parent ) {
					$parent_post = get_post( $current_object->post_parent );
					if ( ! $parent_post instanceof \WP_Post ) {
						return '';
					}
					$current_object = $parent_post;
				}
				$has_post_hierarchy = is_post_type_hierarchical( $current_object->post_type );
				// When true, middle crumbs use category links; when false, post parent permalinks.
				$breadcrumbs_from_categories = ! $has_post_hierarchy;
				// Hierarchical post types (pages, custom) use post ancestors.
				// Non-hierarchical (posts, reports) use primary term in 'category' taxonomy.
				if ( $has_post_hierarchy ) {
					$ancestor_ids = get_ancestors( $current_object->ID, $current_object->post_type, 'post_type' );
					// Some hierarchical CPTs (e.g. `feature`) use hierarchy for URLs but have no parent;
					// fall back to primary category like non-hierarchical posts.
					if ( empty( $ancestor_ids ) ) {
						$primary_term_id = \PRC\BlockUtils\get_primary_term_id( $current_object->ID, 'category' );
						if ( null !== $primary_term_id && is_numeric( $primary_term_id ) ) {
							$term = get_term( $primary_term_id, 'category' );
							if ( $term instanceof \WP_Term ) {
								$ancestor_ids[] = $term->term_id;
								$ancestor_ids   = array_merge( $ancestor_ids, get_ancestors( $term->term_id, 'category' ) );
								$breadcrumbs_from_categories = true;
							}
						}
					}
				} else {
					$primary_term_id = \PRC\BlockUtils\get_primary_term_id( $current_object->ID, 'category' );
					if ( null !== $primary_term_id && is_numeric( $primary_term_id ) ) {
						$term = get_term( $primary_term_id, 'category' );
						if ( $term instanceof \WP_Term ) {
							$ancestor_ids[] = $term->term_id;
							$ancestor_ids   = array_merge( $ancestor_ids, get_ancestors( $term->term_id, 'category' ) );
						}
					}
				}
				break;
			case 'WP_Term':
				$ancestor_ids                = get_ancestors( $current_object->term_id, $current_object->taxonomy, 'taxonomy' );
				$breadcrumbs_from_categories = true;
				break;
			case 'WP_Post_Type':
				// No ancestors.
				break;
			case 'WP_User':
				// No ancestors.
				break;
			default:
				return '';
		}

		$breadcrumbs = array();

		// Set up the home crumb if set to show.
		if ( $attributes['showHome'] && ! empty( $attributes['homeCrumb']['text'] ) ) {
			$home_url      = $attributes['homeCrumb']['url'] ?? home_url();
			$home_label    = $attributes['homeCrumb']['text'] ?? \PRC\Platform\Icons\render( 'solid', 'house' );
			$breadcrumbs[] = array(
				'url'  => $home_url,
				'text' => $home_label,
			);
		}

		// Set up the index crumb if it exists.
		if ( $attributes['showIndex'] && ! empty( $attributes['indexCrumb']['text'] ) ) {
			$index_url = $attributes['indexCrumb']['url'] ?? '';
			// Check if $index_url is a fully qualified URL.
			if ( $index_url && ! preg_match( '/^https?:\/\//', $index_url ) ) {
				$index_url = home_url( $index_url );
			}
			$index_label   = $attributes['indexCrumb']['text'];
			$breadcrumbs[] = array(
				'url'  => $index_url,
				'text' => $index_label,
			);
		}

		if ( ! empty( $ancestor_ids ) ) {
			if ( $breadcrumbs_from_categories ) {
				foreach ( array_reverse( $ancestor_ids ) as $ancestor_id ) {
					$breadcrumbs[] = array(
						'url'  => get_category_link( $ancestor_id ),
						'text' => get_cat_name( $ancestor_id ),
					);
				}
			} else {
				// Construct remaining breadcrumbs from post-type ancestor ids.
				foreach ( array_reverse( $ancestor_ids ) as $ancestor_id ) {
					$breadcrumbs[] = array(
						'url'  => get_the_permalink( $ancestor_id ),
						'text' => get_the_title( $ancestor_id ),
					);
				}
			}
		}

		// Append current page title if set to show.
		if ( $show_current_page ) {
			$current_page_url   = null;
			$current_page_title = null;
			if ( 'WP_Post' === $type_of_object ) {
				$current_page_url   = get_the_permalink( $current_object->ID );
				$current_page_title = $current_object->post_title;
			} elseif ( 'WP_Term' === $type_of_object ) {
				$current_page_url   = get_term_link( $current_object, $current_object->taxonomy );
				$current_page_title = $current_object->name;
			}
			if ( $current_page_url && $current_page_title ) {
				$breadcrumbs[] = array(
					'url'  => $current_page_url,
					'text' => $current_page_title,
				);
			}
		}

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

		$inner_markup = '';
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

		$block_gap = \PRC\BlockUtils\get_block_gap_support_value( $attributes, 'horizontal' );

		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'id'         => wp_unique_id( 'breadcrumbs-' ),
				'class'      => $classnames,
				'aria-label' => __( 'Breadcrumbs' ),
				'style'      => '--breadcrumbs-gap: ' . $block_gap . ';',
			)
		);

		return wp_sprintf(
			'<nav %1$s><div class="prc-block-breadcrumbs__list">%2$s</div></nav>',
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
	 * @param array  $child_crumbs    Optional nested breadcrumbs.
	 *
	 * @return string The markup for a single breadcrumb item wrapped in an `li` element.
	 */
	public function build_crumb_markup( $url, $title, $attributes, $index, $show_separator = true, $is_current_page = false, $child_crumbs = array() ) {
		$separator_class = 'prc-block-breadcrumbs__separator';

		$markup = '';

		// Render leading separator, if enabled.
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

		// Wrap the entire crumb (link + child crumbs) in a container.
		$markup .= '<div class="prc-block-breadcrumbs__item">';

		// Build the link.
		$markup .= wp_sprintf(
			'<a href="%s"%s><span>%s</span></a>',
			esc_url( $url ),
			$is_current_page ? ' aria-current="page"' : '',
			$title,
		);

		if ( ! empty( $child_crumbs ) ) {
			$markup .= '<div class="prc-block-breadcrumbs__sub_list">';
			foreach ( $child_crumbs as $child_crumb_index => $child_crumb ) {
				$markup .= $this->build_crumb_markup(
					$child_crumb['url'],
					$child_crumb['text'],
					array(),
					$child_crumb_index,
					false,
					$child_crumb['is_current_page'] ?? false
				);
			}
			$markup .= '</div>';
		}

		$markup .= '</div>'; // Close the crumb container.

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

		return $markup;
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
