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
	 * Object cache group for breadcrumb trail assembly.
	 */
	private const CACHE_GROUP = 'prc_breadcrumbs';

	/**
	 * Cache TTL for breadcrumb trail assembly.
	 */
	private const CACHE_TTL = HOUR_IN_SECONDS;

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
			$loader->add_action( 'prc_platform_on_update', $this, 'clear_cache_on_post_update', 10, 1 );
			$loader->add_action( 'edited_term', $this, 'clear_cache_on_term_update', 10, 3 );
		}
	}

	/**
	 * Whether breadcrumb trail assembly should use object cache.
	 *
	 * @return bool
	 */
	private static function should_use_cache(): bool {
		return ! is_user_logged_in() && ! is_preview();
	}

	/**
	 * Object cache key prefix for a breadcrumb context.
	 *
	 * @param string $object_key Stable object identifier.
	 * @return string
	 */
	private static function get_object_version_key( string $object_key ): string {
		return 'v_' . $object_key;
	}

	/**
	 * Get cache version for a breadcrumb object.
	 *
	 * @param string $object_key Stable object identifier.
	 * @return int
	 */
	private static function get_cache_version( string $object_key ): int {
		$version = wp_cache_get( self::get_object_version_key( $object_key ), self::CACHE_GROUP );
		return false === $version ? 0 : (int) $version;
	}

	/**
	 * Bump cache version so prior trail cache entries are ignored.
	 *
	 * @param string $object_key Stable object identifier.
	 * @return void
	 */
	private static function bump_cache_version( string $object_key ): void {
		wp_cache_set(
			self::get_object_version_key( $object_key ),
			self::get_cache_version( $object_key ) + 1,
			self::CACHE_GROUP,
			DAY_IN_SECONDS
		);
	}

	/**
	 * Build a stable object key for cache invalidation.
	 *
	 * @param string                          $type_of_object Object type label.
	 * @param \WP_Post|\WP_Term|\WP_Post_Type|\WP_User $current_object Queried object.
	 * @return string|null
	 */
	private static function get_object_cache_key( string $type_of_object, $current_object ): ?string {
		switch ( $type_of_object ) {
			case 'WP_Post':
				return 'post_' . (int) $current_object->ID;
			case 'WP_Term':
				return 'term_' . (int) $current_object->term_id;
			case 'WP_Post_Type':
				return 'post_type_' . sanitize_key( $current_object->name );
			case 'WP_User':
				return 'user_' . (int) $current_object->ID;
		}

		return null;
	}

	/**
	 * Cache key for an assembled breadcrumb trail.
	 *
	 * @param string $object_key Stable object identifier.
	 * @param bool   $show_current_page Whether the current page title is included.
	 * @param bool   $includes_category_crumbs Whether middle crumbs embed category term data.
	 * @return string
	 */
	private static function get_trail_cache_key( string $object_key, bool $show_current_page, bool $includes_category_crumbs = false ): string {
		$version = self::get_cache_version( $object_key );
		if ( $includes_category_crumbs ) {
			// Post trails embed live category names/links; include taxonomy version so term edits invalidate them.
			$version .= '_c' . self::get_cache_version( 'taxonomy_category' );
		}

		return 'trail_' . $object_key . '_v' . $version . '_sc' . ( $show_current_page ? '1' : '0' );
	}

	/**
	 * Invalidate breadcrumb cache when a post updates.
	 *
	 * @hook prc_platform_on_update
	 *
	 * @param \WP_Post $post Updated post.
	 * @return void
	 */
	public function clear_cache_on_post_update( $post ): void {
		if ( ! $post instanceof \WP_Post ) {
			return;
		}

		self::bump_cache_version( 'post_' . (int) $post->ID );
	}

	/**
	 * Invalidate breadcrumb cache when a term updates.
	 *
	 * @hook edited_term
	 *
	 * @param int    $term_id  Term ID.
	 * @param int    $tt_id    Term taxonomy ID.
	 * @param string $taxonomy Taxonomy slug.
	 * @return void
	 */
	public function clear_cache_on_term_update( $term_id, $tt_id, $taxonomy ): void {
		unset( $tt_id );
		self::bump_cache_version( 'term_' . (int) $term_id );
		if ( 'category' === $taxonomy ) {
			self::bump_cache_version( 'taxonomy_category' );
		}
	}

	/**
	 * Resolve breadcrumb context from the queried object.
	 *
	 * @param object|null $queried_object Queried object.
	 * @return array|null
	 */
	private function resolve_breadcrumb_context( $queried_object ): ?array {
		if ( null === $queried_object ) {
			return null;
		}

		$type_of_object              = '';
		$ancestor_ids                = array();
		$breadcrumbs_from_categories = false;

		if ( $queried_object instanceof \WP_Post ) {
			$type_of_object = 'WP_Post';
		} elseif ( $queried_object instanceof \WP_Term ) {
			$type_of_object = 'WP_Term';
		} elseif ( $queried_object instanceof \WP_Post_Type ) {
			$type_of_object = 'WP_Post_Type';
		} elseif ( $queried_object instanceof \WP_User ) {
			$type_of_object = 'WP_User';
		} else {
			return null;
		}

		$current_object = $queried_object;

		switch ( $type_of_object ) {
			case 'WP_Post':
				if ( 'attachment' === $current_object->post_type && $current_object->post_parent ) {
					$parent_post = get_post( $current_object->post_parent );
					if ( ! $parent_post instanceof \WP_Post ) {
						return null;
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
								$ancestor_ids[]              = $term->term_id;
								$ancestor_ids                = array_merge( $ancestor_ids, get_ancestors( $term->term_id, 'category' ) );
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
				return null;
		}

		$object_key = self::get_object_cache_key( $type_of_object, $current_object );
		if ( null === $object_key ) {
			return null;
		}

		return array(
			'type_of_object'              => $type_of_object,
			'current_object'              => $current_object,
			'ancestor_ids'                => $ancestor_ids,
			'breadcrumbs_from_categories' => $breadcrumbs_from_categories,
			'object_key'                  => $object_key,
		);
	}

	/**
	 * Build ancestor and current-page breadcrumb trail data.
	 *
	 * Home and index crumbs are attribute-driven and merged after cache lookup.
	 *
	 * @param array $context           Resolved breadcrumb context.
	 * @param bool  $show_current_page Whether to append the current page title.
	 * @return array<int, array{url: string, text: string}>
	 */
	private function build_trail_breadcrumbs( array $context, bool $show_current_page ): array {
		$breadcrumbs                 = array();
		$type_of_object              = $context['type_of_object'];
		$current_object              = $context['current_object'];
		$ancestor_ids                = $context['ancestor_ids'];
		$breadcrumbs_from_categories = $context['breadcrumbs_from_categories'];

		if ( ! empty( $ancestor_ids ) ) {
			if ( $breadcrumbs_from_categories ) {
				foreach ( array_reverse( $ancestor_ids ) as $ancestor_id ) {
					$breadcrumbs[] = array(
						'url'  => get_category_link( $ancestor_id ),
						'text' => get_cat_name( $ancestor_id ),
					);
				}
			} else {
				foreach ( array_reverse( $ancestor_ids ) as $ancestor_id ) {
					$breadcrumbs[] = array(
						'url'  => get_the_permalink( $ancestor_id ),
						'text' => get_the_title( $ancestor_id ),
					);
				}
			}
		}

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

		return $breadcrumbs;
	}

	/**
	 * Get cached or freshly built breadcrumb trail data.
	 *
	 * @param array $context           Resolved breadcrumb context.
	 * @param bool  $show_current_page Whether to append the current page title.
	 * @return array<int, array{url: string, text: string}>
	 */
	private function get_trail_breadcrumbs( array $context, bool $show_current_page ): array {
		$object_key                = $context['object_key'];
		$includes_category_crumbs  = ! empty( $context['breadcrumbs_from_categories'] );
		$use_cache                 = self::should_use_cache();

		if ( $use_cache ) {
			$cache_key    = self::get_trail_cache_key( $object_key, $show_current_page, $includes_category_crumbs );
			$cached_trail = wp_cache_get( $cache_key, self::CACHE_GROUP );
			if ( false !== $cached_trail && is_array( $cached_trail ) ) {
				return $cached_trail;
			}
		}

		$trail = $this->build_trail_breadcrumbs( $context, $show_current_page );

		if ( $use_cache ) {
			wp_cache_set(
				self::get_trail_cache_key( $object_key, $show_current_page, $includes_category_crumbs ),
				$trail,
				self::CACHE_GROUP,
				self::CACHE_TTL
			);
		}

		return $trail;
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
		$context           = $block->context;
		$show_current_page = ! empty( $attributes['showCurrentPageTitle'] );
		$breadcrumb_context = $this->resolve_breadcrumb_context( get_queried_object() );

		if ( null === $breadcrumb_context ) {
			return '';
		}

		$breadcrumbs = $this->get_trail_breadcrumbs( $breadcrumb_context, $show_current_page );
		$prefix      = array();

		// Set up the home crumb if set to show.
		if ( $attributes['showHome'] && ! empty( $attributes['homeCrumb']['text'] ) ) {
			$home_url   = $attributes['homeCrumb']['url'] ?? home_url();
			$home_label = $attributes['homeCrumb']['text'] ?? \PRC\Platform\Icons\render( 'solid', 'house' );
			$prefix[]   = array(
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
			$index_label = $attributes['indexCrumb']['text'];
			$prefix[]    = array(
				'url'  => $index_url,
				'text' => $index_label,
			);
		}

		if ( ! empty( $prefix ) ) {
			$breadcrumbs = array_merge( $prefix, $breadcrumbs );
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
