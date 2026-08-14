<?php
/**
 * WP-CLI command: migrate pre-23.1 core/tabs-menu block names to current names.
 *
 * Renames serialized block names and HTML classes in post_content:
 *   core/tabs-menu-item  →  core/tab
 *   core/tabs-menu       →  core/tab-list
 *   wp-block-tabs-menu-item  →  wp-block-tab
 *   wp-block-tabs-menu       →  wp-block-tab-list
 *
 * Requires the block-catalog plugin to be active and indexed. Posts are
 * discovered via the `block-catalog` taxonomy term `core-tabs-menu`.
 *
 * @package PRC\Platform\Blocks
 */

declare(strict_types=1);

namespace PRC\Platform\Blocks;

// Bail when running outside VIP infrastructure (wp-env, Playground): the parent class is unavailable.
if ( ! class_exists( 'WPCOM_VIP_CLI_Command' ) ) {
	return;
}

/**
 * Migrates pre-Gutenberg-23.1 core/tabs-menu / core/tabs-menu-item block names
 * to the current core/tab-list / core/tab names across all post_content.
 *
 * Extends WPCOM_VIP_CLI_Command for safe, at-scale bulk operations on VIP infrastructure.
 */
class Core_Tabs_Migrate_CLI extends \WPCOM_VIP_CLI_Command {

	/**
	 * block-catalog taxonomy slug (registered by the block-catalog plugin).
	 */
	private const TAXONOMY = 'block-catalog';

	/**
	 * block-catalog term slug for the old core/tabs-menu block.
	 * sanitize_title( 'core/tabs-menu' ) → 'core-tabs-menu'.
	 */
	private const TERM_SLUG = 'core-tabs-menu';

	/**
	 * block-catalog term slugs for posts that may contain legacy core/tab inner blocks.
	 */
	private const TAB_ATTR_TERM_SLUGS = array(
		'core-tab',
		'core-tab-list',
		'core-tabs-menu',
		'core-tabs-menu-item',
	);

	/**
	 * tabs-menu-item attrs hoisted onto core/tab-list during legacy conversion.
	 */
	private const TABS_MENU_ITEM_HOIST_ATTRS = array(
		'className',
		'activeBackgroundColor',
		'customActiveBackgroundColor',
		'hoverBackgroundColor',
		'customHoverBackgroundColor',
		'activeTextColor',
		'customActiveTextColor',
		'hoverTextColor',
		'customHoverTextColor',
	);

	/**
	 * Ordered search → replace pairs for post_content.
	 *
	 * More-specific strings (tabs-menu-item) are listed before the shorter
	 * prefix (tabs-menu) to avoid partial matches.
	 */
	private const REPLACEMENTS = array(
		// Block comment names.
		'<!-- wp:core/tabs-menu-item'  => '<!-- wp:core/tab',
		'<!-- /wp:core/tabs-menu-item' => '<!-- /wp:core/tab',
		'<!-- wp:core/tabs-menu'       => '<!-- wp:core/tab-list',
		'<!-- /wp:core/tabs-menu'      => '<!-- /wp:core/tab-list',
		// Serialized HTML classes inside saved block markup.
		'wp-block-tabs-menu-item'      => 'wp-block-tab',
		'wp-block-tabs-menu'           => 'wp-block-tab-list',
	);

	/**
	 * Migrates posts with pre-23.1 core/tabs-menu block names to core/tab-list.
	 *
	 * Discovers posts via the block-catalog taxonomy (term: core-tabs-menu).
	 * Requires the block-catalog plugin to be active and its index to be current.
	 *
	 * Runs in dry-run mode by default. Pass --dry-run=false to write changes.
	 * Safe to re-run: strtr() is a no-op for already-migrated content;
	 * wp_update_post() is skipped when content is unchanged.
	 *
	 * Posts are not automatically removed from the block-catalog term after
	 * migration — the catalog term stays until the index is rebuilt. Because
	 * of this, pagination advances with --page rather than resetting to 1.
	 * Resume an interrupted run with --page=<last-logged-page>.
	 *
	 * ## OPTIONS
	 *
	 * [--dry-run=<bool>]
	 * : Preview changes without writing. Default: true.
	 *
	 * [--batch-size=<number>]
	 * : Number of posts to process per batch. Default: 100. Max: 100.
	 *
	 * [--page=<number>]
	 * : Resume from this page number. Default: 1.
	 *
	 * ## EXAMPLES
	 *
	 *     # Preview how many posts would be migrated
	 *     wp prc block-library migrate-core-tabs-names
	 *
	 *     # Run the migration
	 *     wp prc block-library migrate-core-tabs-names --dry-run=false
	 *
	 *     # Resume after interruption (use last page number logged to console)
	 *     wp prc block-library migrate-core-tabs-names --dry-run=false --page=3
	 *
	 *     # On VIP
	 *     vip @pewresearch-org -- wp prc block-library migrate-core-tabs-names --dry-run=false
	 *
	 * @subcommand migrate-core-tabs-names
	 * @synopsis [--dry-run=<bool>] [--batch-size=<number>] [--page=<number>]
	 *
	 * @param array $args       Positional arguments (unused).
	 * @param array $assoc_args Named arguments.
	 */
	public function migrate_core_tabs_names( array $args, array $assoc_args ): void {
		$dry_run    = $this->parse_dry_run( $assoc_args );
		$batch_size = min( (int) ( $assoc_args['batch-size'] ?? 100 ), 100 );
		$paged      = max( 1, (int) ( $assoc_args['page'] ?? 1 ) );
		$migrated   = 0;
		$skipped    = 0;

		if ( ! taxonomy_exists( self::TAXONOMY ) ) {
			\WP_CLI::error( 'The block-catalog taxonomy does not exist. Is the block-catalog plugin active?' );
		}

		if ( ! term_exists( self::TERM_SLUG, self::TAXONOMY ) ) {
			\WP_CLI::success( 'No posts found: block-catalog term "' . self::TERM_SLUG . '" does not exist. Index may already be clean.' );
			return;
		}

		\WP_CLI::line(
			$dry_run
				? 'DRY RUN — no changes will be written. Pass --dry-run=false to execute.'
				: 'LIVE RUN — writing updated post_content.'
		);

		$this->start_bulk_operation();

		do {
			// Pattern 2 pagination: posts do NOT drop out of the taxonomy query
			// after their content is updated (the block-catalog term stays until
			// the index is rebuilt), so $paged must advance each iteration.
			$query = new \WP_Query( // phpcs:ignore WordPress.DB.SlowDBQuery
				array(
					'post_type'      => 'any',
					'post_status'    => array( 'publish', 'draft', 'pending', 'future', 'private' ),
					'posts_per_page' => $batch_size,
					'paged'          => $paged,
					'fields'         => 'ids',
					'no_found_rows'  => true,
					'orderby'        => 'ID',
					'order'          => 'ASC',
					'tax_query'      => array( // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
						array(
							'taxonomy' => self::TAXONOMY,
							'field'    => 'slug',
							'terms'    => self::TERM_SLUG,
						),
					),
				)
			);

			$ids = $query->posts;

			foreach ( $ids as $post_id ) {
				$post_id = (int) $post_id;
				$post    = get_post( $post_id );

				if ( ! $post ) {
					\WP_CLI::warning( sprintf( 'Post %d not found — skipping.', $post_id ) );
					++$skipped;
					continue;
				}

				$original_content = $post->post_content;
				$updated_content  = strtr( $original_content, self::REPLACEMENTS );

				if ( $updated_content === $original_content ) {
					// Catalog term is present but content is already migrated — no-op.
					\WP_CLI::line( sprintf( '[SKIP] Post %d: content unchanged after replacement.', $post_id ) );
					++$skipped;
					continue;
				}

				if ( $dry_run ) {
					\WP_CLI::line( sprintf( '[DRY RUN] Post %d (%s): would update block names.', $post_id, get_the_title( $post ) ) );
					++$migrated;
				} else {
					$result = wp_update_post(
						array(
							'ID'           => $post_id,
							'post_content' => $updated_content,
						),
						true
					);

					if ( is_wp_error( $result ) ) {
						\WP_CLI::warning( sprintf( 'Post %d: update failed — %s', $post_id, $result->get_error_message() ) );
						++$skipped;
						continue;
					}

					\WP_CLI::line( sprintf( 'Migrated post %d (%s).', $post_id, get_the_title( $post ) ) );
					++$migrated;
				}
			}

			\WP_CLI::line(
				sprintf(
					'Page %d done. Migrated so far: %d | Skipped: %d',
					$paged,
					$migrated,
					$skipped
				)
			);

			++$paged;
			sleep( 2 );
			$this->vip_inmemory_cleanup();

		} while ( count( $ids ) === $batch_size );

		$this->end_bulk_operation();

		\WP_CLI::success(
			sprintf(
				'%s complete. %s: %d. Skipped: %d.',
				$dry_run ? 'Dry run' : 'Migration',
				$dry_run ? 'Would migrate' : 'Migrated',
				$migrated,
				$skipped
			)
		);
	}

	/**
	 * Collapse legacy core/tab inner blocks into the core/tab-list tabs attribute (Gutenberg 23.5+).
	 *
	 * Also converts the pre-23.1 schema (core/tabs-menu + singular core/tab-panel container
	 * holding core/tab content panels) into core/tab-list + core/tab-panels + core/tab-panel.
	 *
	 * Discovers posts via block-catalog terms core-tab, core-tab-list, core-tabs-menu,
	 * and core-tabs-menu-item. Requires the block-catalog plugin to be active and indexed.
	 *
	 * Runs in dry-run mode by default. Pass --dry-run=false to write changes.
	 * Safe to re-run: already-migrated tab-lists are skipped.
	 *
	 * ## OPTIONS
	 *
	 * [--dry-run=<bool>]
	 * : Preview changes without writing. Default: true.
	 *
	 * [--batch-size=<number>]
	 * : Number of posts to process per batch. Default: 100. Max: 100.
	 *
	 * [--page=<number>]
	 * : Resume from this page number. Default: 1.
	 *
	 * ## EXAMPLES
	 *
	 *     wp prc block-library migrate-core-tab-to-tabs-attr
	 *     wp prc block-library migrate-core-tab-to-tabs-attr --dry-run=false
	 *     vip @pewresearch-org -- wp prc block-library migrate-core-tab-to-tabs-attr --dry-run=false
	 *
	 * @subcommand migrate-core-tab-to-tabs-attr
	 * @synopsis [--dry-run=<bool>] [--batch-size=<number>] [--page=<number>]
	 *
	 * @param array $args       Positional arguments (unused).
	 * @param array $assoc_args Named arguments.
	 */
	public function migrate_core_tab_to_tabs_attr( array $args, array $assoc_args ): void {
		$dry_run    = $this->parse_dry_run( $assoc_args );
		$batch_size = min( (int) ( $assoc_args['batch-size'] ?? 100 ), 100 );
		$paged      = max( 1, (int) ( $assoc_args['page'] ?? 1 ) );
		$migrated   = 0;
		$skipped    = 0;

		if ( ! taxonomy_exists( self::TAXONOMY ) ) {
			\WP_CLI::error( 'The block-catalog taxonomy does not exist. Is the block-catalog plugin active?' );
		}

		$term_slugs = array();
		foreach ( self::TAB_ATTR_TERM_SLUGS as $slug ) {
			if ( term_exists( $slug, self::TAXONOMY ) ) {
				$term_slugs[] = $slug;
			}
		}

		if ( empty( $term_slugs ) ) {
			\WP_CLI::success( 'No posts found: block-catalog terms for core tabs migration do not exist.' );
			return;
		}

		\WP_CLI::line(
			$dry_run
				? 'DRY RUN — no changes will be written. Pass --dry-run=false to execute.'
				: 'LIVE RUN — collapsing core/tab inner blocks into core/tab-list tabs attribute.'
		);

		$this->start_bulk_operation();

		do {
			$query = new \WP_Query( // phpcs:ignore WordPress.DB.SlowDBQuery
				array(
					'post_type'      => 'any',
					'post_status'    => array( 'publish', 'draft', 'pending', 'future', 'private' ),
					'posts_per_page' => $batch_size,
					'paged'          => $paged,
					'fields'         => 'ids',
					'no_found_rows'  => true,
					'orderby'        => 'ID',
					'order'          => 'ASC',
					'tax_query'      => array( // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
						array(
							'taxonomy' => self::TAXONOMY,
							'field'    => 'slug',
							'terms'    => $term_slugs,
						),
					),
				)
			);

			$ids = $query->posts;

			foreach ( $ids as $post_id ) {
				$post_id = (int) $post_id;
				$post    = get_post( $post_id );

				if ( ! $post ) {
					\WP_CLI::warning( sprintf( 'Post %d not found — skipping.', $post_id ) );
					++$skipped;
					continue;
				}

				$original_content = $post->post_content;
				$changed          = false;
				$blocks           = parse_blocks( $original_content ); // phpcs:ignore Universal.Functions.ForbiddenFunctions.parse_blocksFound
				$blocks           = $this->transform_blocks_for_tabs_attr( $blocks, $changed );
				$updated_content  = $changed ? serialize_blocks( $blocks ) : $original_content; // phpcs:ignore Universal.Functions.ForbiddenFunctions.serialize_blocksFound

				if ( ! $changed || $updated_content === $original_content ) {
					\WP_CLI::line( sprintf( '[SKIP] Post %d: no legacy or collapsible core/tab blocks found.', $post_id ) );
					++$skipped;
					continue;
				}

				if ( $dry_run ) {
					\WP_CLI::line( sprintf( '[DRY RUN] Post %d (%s): would migrate core tabs blocks.', $post_id, get_the_title( $post ) ) );
					++$migrated;
				} else {
					$result = wp_update_post(
						array(
							'ID'           => $post_id,
							'post_content' => $updated_content,
						),
						true
					);

					if ( is_wp_error( $result ) ) {
						\WP_CLI::warning( sprintf( 'Post %d: update failed — %s', $post_id, $result->get_error_message() ) );
						++$skipped;
						continue;
					}

					\WP_CLI::line( sprintf( 'Migrated post %d (%s).', $post_id, get_the_title( $post ) ) );
					++$migrated;
				}
			}

			\WP_CLI::line(
				sprintf(
					'Page %d done. Migrated so far: %d | Skipped: %d',
					$paged,
					$migrated,
					$skipped
				)
			);

			++$paged;
			sleep( 2 );
			$this->vip_inmemory_cleanup();

		} while ( count( $ids ) === $batch_size );

		$this->end_bulk_operation();

		\WP_CLI::success(
			sprintf(
				'%s complete. %s: %d. Skipped: %d.',
				$dry_run ? 'Dry run' : 'Migration',
				$dry_run ? 'Would migrate' : 'Migrated',
				$migrated,
				$skipped
			)
		);
	}

	/**
	 * Recursively transform a block tree, collapsing core/tab children into tabs attributes.
	 *
	 * @param array $blocks  Parsed blocks.
	 * @param bool  $changed Set to true when any block is modified.
	 * @return array Transformed blocks.
	 */
	private function transform_blocks_for_tabs_attr( array $blocks, bool &$changed ): array {
		$result = array();

		foreach ( $blocks as $block ) {
			if ( ( $block['blockName'] ?? '' ) === 'core/tabs' ) {
				$block = $this->migrate_core_tabs_block( $block, $changed );
			} elseif ( ! empty( $block['innerBlocks'] ) ) {
				$block['innerBlocks'] = $this->transform_blocks_for_tabs_attr( $block['innerBlocks'], $changed );
			}

			$result[] = $block;
		}

		return $result;
	}

	/**
	 * Migrate a core/tabs block's tab-list from core/tab children to tabs attribute.
	 *
	 * @param array $tabs_block Parsed core/tabs block.
	 * @param bool  $changed    Reference flag set when modified.
	 * @return array Updated core/tabs block.
	 */
	private function migrate_core_tabs_block( array $tabs_block, bool &$changed ): array {
		$legacy = $this->find_legacy_tabs_structure( $tabs_block );
		if ( null !== $legacy ) {
			$converted = $this->convert_legacy_tabs_block( $tabs_block, $legacy );
			if ( null !== $converted ) {
				$changed = true;
				return $converted;
			}
		}

		$tab_list_block   = null;
		$tab_panels_block = null;
		$tab_list_index   = null;

		foreach ( $tabs_block['innerBlocks'] ?? array() as $index => $child ) {
			$name = $child['blockName'] ?? '';
			if ( 'core/tab-list' === $name ) {
				$tab_list_block = $child;
				$tab_list_index = $index;
			} elseif ( 'core/tab-panels' === $name ) {
				$tab_panels_block = $child;
			}
		}

		if ( null === $tab_list_block || null === $tab_panels_block || null === $tab_list_index ) {
			if ( ! empty( $tabs_block['innerBlocks'] ) ) {
				$tabs_block['innerBlocks'] = $this->transform_blocks_for_tabs_attr( $tabs_block['innerBlocks'], $changed );
			}
			return $tabs_block;
		}

		$migrated_tab_list = $this->collapse_tab_list_inner_tabs( $tab_list_block, $tab_panels_block );
		if ( null !== $migrated_tab_list ) {
			$tabs_block['innerBlocks'][ $tab_list_index ] = $migrated_tab_list;
			$changed                                      = true;

			// Parent owns orientation; hoist from tab-list layout so render stamps is-vertical.
			$list_attrs  = $tab_list_block['attrs'] ?? array();
			$is_vertical = isset( $list_attrs['layout']['orientation'] ) && 'vertical' === $list_attrs['layout']['orientation'];
			if ( $is_vertical ) {
				$tabs_attrs                              = $tabs_block['attrs'] ?? array();
				$tabs_block['attrs']                     = $tabs_attrs;
				$tabs_block['attrs']['orientation']      = 'vertical';
				$tabs_block['attrs']['tabListPlacement'] = $tabs_attrs['tabListPlacement'] ?? 'start';
			}
		}

		if ( ! empty( $tabs_block['innerBlocks'] ) ) {
			$tabs_block['innerBlocks'] = $this->transform_blocks_for_tabs_attr( $tabs_block['innerBlocks'], $changed );
		}

		return $tabs_block;
	}

	/**
	 * Find pre-23.1 tabs structure: core/tabs-menu + core/tab-panel container of core/tab panels.
	 *
	 * @param array $tabs_block Parsed core/tabs block.
	 * @return array|null Legacy components or null when not matched.
	 */
	private function find_legacy_tabs_structure( array $tabs_block ): ?array {
		$tabs_menu        = null;
		$panels_container = null;

		foreach ( $tabs_block['innerBlocks'] ?? array() as $child ) {
			$name = $child['blockName'] ?? '';
			if ( 'core/tabs-menu' === $name ) {
				$tabs_menu = $child;
			} elseif ( 'core/tab-panel' === $name && $this->is_legacy_tab_panels_container( $child ) ) {
				$panels_container = $child;
			}
		}

		if ( null === $tabs_menu || null === $panels_container ) {
			return null;
		}

		return array(
			'tabs_menu'        => $tabs_menu,
			'panels_container' => $panels_container,
		);
	}

	/**
	 * Whether a core/tab-panel block is the legacy panels container (holds core/tab content).
	 *
	 * @param array $block Parsed block.
	 * @return bool
	 */
	private function is_legacy_tab_panels_container( array $block ): bool {
		foreach ( $block['innerBlocks'] ?? array() as $child ) {
			if ( 'core/tab' === ( $child['blockName'] ?? '' ) ) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Convert legacy core/tabs-menu + core/tab-panel(container) schema to Gutenberg 23.5+.
	 *
	 * @param array $tabs_block Parsed core/tabs block.
	 * @param array $legacy     Output from find_legacy_tabs_structure().
	 * @return array|null Updated core/tabs block, or null when no panels to convert.
	 */
	private function convert_legacy_tabs_block( array $tabs_block, array $legacy ): ?array {
		$tabs_menu        = $legacy['tabs_menu'];
		$panels_container = $legacy['panels_container'];
		$panel_blocks     = array();
		$labels           = array();

		foreach ( $panels_container['innerBlocks'] ?? array() as $legacy_tab ) {
			if ( 'core/tab' !== ( $legacy_tab['blockName'] ?? '' ) ) {
				continue;
			}

			$attrs   = $legacy_tab['attrs'] ?? array();
			$label   = isset( $attrs['label'] ) ? wp_strip_all_tags( (string) $attrs['label'] ) : '';
			$anchor  = isset( $attrs['anchor'] ) ? (string) $attrs['anchor'] : '';
			$content = $legacy_tab['innerBlocks'] ?? array();

			if ( ! function_exists( __NAMESPACE__ . '\\generate_core_tab' ) ) {
				return null;
			}

			$panel_block = generate_core_tab( $label, $content, $anchor );

			$extra_attrs = array_diff_key( $attrs, array_flip( array( 'label', 'anchor' ) ) );
			if ( ! empty( $extra_attrs ) ) {
				$panel_block['attrs'] = array_merge( $panel_block['attrs'] ?? array(), $extra_attrs );
			}

			$panel_blocks[] = $panel_block;
			$labels[]       = $label;
		}

		if ( empty( $panel_blocks ) ) {
			return null;
		}

		$menu_attrs  = $this->hoist_tabs_menu_item_attrs( $tabs_menu, $tabs_menu['attrs'] ?? array() );
		$tabs_attrs  = $tabs_block['attrs'] ?? array();
		$is_vertical = isset( $tabs_attrs['layout']['orientation'] ) && 'vertical' === $tabs_attrs['layout']['orientation'];

		if ( ! $is_vertical && isset( $menu_attrs['layout']['orientation'] ) ) {
			$is_vertical = 'vertical' === $menu_attrs['layout']['orientation'];
		}

		$container_attrs = $panels_container['attrs'] ?? array();

		if ( function_exists( __NAMESPACE__ . '\\build_core_tab_list' ) && function_exists( __NAMESPACE__ . '\\build_core_tab_panels' ) ) {
			$tab_list   = build_core_tab_list( $menu_attrs, $is_vertical, $labels, $tabs_menu['innerHTML'] ?? '' );
			$tab_panels = build_core_tab_panels( $panel_blocks, $container_attrs, $panels_container['innerHTML'] ?? '' );
		} else {
			return null;
		}

		if ( $is_vertical ) {
			$tabs_block['attrs']                     = $tabs_attrs;
			$tabs_block['attrs']['orientation']      = 'vertical';
			$tabs_block['attrs']['tabListPlacement'] = $tabs_attrs['tabListPlacement'] ?? 'start';
		}

		$tabs_block['innerBlocks'] = array( $tab_list, $tab_panels );

		return $tabs_block;
	}

	/**
	 * Hoist styling attrs from the first core/tabs-menu-item template onto tab-list attrs.
	 *
	 * @param array $tabs_menu  Parsed core/tabs-menu block.
	 * @param array $menu_attrs Existing menu attrs.
	 * @return array Merged attrs for core/tab-list.
	 */
	private function hoist_tabs_menu_item_attrs( array $tabs_menu, array $menu_attrs ): array {
		foreach ( $tabs_menu['innerBlocks'] ?? array() as $child ) {
			if ( 'core/tabs-menu-item' !== ( $child['blockName'] ?? '' ) ) {
				continue;
			}

			$item_attrs = $child['attrs'] ?? array();

			foreach ( self::TABS_MENU_ITEM_HOIST_ATTRS as $key ) {
				if ( ! isset( $item_attrs[ $key ] ) ) {
					continue;
				}

				if ( 'className' === $key ) {
					$existing = $menu_attrs['className'] ?? '';
					$incoming = (string) $item_attrs['className'];
					$merged   = trim( $existing . ' ' . $incoming );
					if ( '' !== $merged ) {
						$menu_attrs['className'] = $merged;
					}
					continue;
				}

				if ( ! isset( $menu_attrs[ $key ] ) ) {
					$menu_attrs[ $key ] = $item_attrs[ $key ];
				}
			}

			break;
		}

		return $menu_attrs;
	}

	/**
	 * Collapse core/tab inner blocks on a tab-list into the tabs attribute + button HTML.
	 *
	 * @param array $tab_list_block   Parsed core/tab-list block.
	 * @param array $tab_panels_block Parsed sibling core/tab-panels block.
	 * @return array|null Migrated tab-list block, or null when no core/tab children exist.
	 */
	private function collapse_tab_list_inner_tabs( array $tab_list_block, array $tab_panels_block ): ?array {
		$inner_blocks = $tab_list_block['innerBlocks'] ?? array();
		$has_core_tab = false;

		foreach ( $inner_blocks as $child ) {
			if ( 'core/tab' === ( $child['blockName'] ?? '' ) ) {
				$has_core_tab = true;
				break;
			}
		}

		if ( ! $has_core_tab ) {
			return null;
		}

		$labels = array();
		foreach ( $tab_panels_block['innerBlocks'] ?? array() as $panel_block ) {
			if ( 'core/tab-panel' !== ( $panel_block['blockName'] ?? '' ) ) {
				continue;
			}
			$attrs    = $panel_block['attrs'] ?? array();
			$labels[] = isset( $attrs['label'] ) ? wp_strip_all_tags( (string) $attrs['label'] ) : '';
		}

		// Fall back to inner tab count when panels lack labels (preserve button count).
		if ( empty( $labels ) ) {
			foreach ( $inner_blocks as $child ) {
				if ( 'core/tab' === ( $child['blockName'] ?? '' ) ) {
					$labels[] = '';
				}
			}
		}

		$attrs       = $tab_list_block['attrs'] ?? array();
		$is_vertical = isset( $attrs['layout']['orientation'] ) && 'vertical' === $attrs['layout']['orientation'];

		if ( function_exists( __NAMESPACE__ . '\\build_core_tab_list' ) ) {
			return build_core_tab_list( $attrs, $is_vertical, $labels, $tab_list_block['innerHTML'] ?? '' );
		}

		$attrs['tabs'] = array_map(
			static function ( $label ) {
				return array( 'label' => (string) $label );
			},
			$labels
		);

		$buttons_html = '';
		foreach ( $labels as $label ) {
			$buttons_html .= '<button type="button" role="tab">' . esc_html( (string) $label ) . '</button>';
		}

		$opening = '<div class="wp-block-tab-list" role="tablist">';
		$closing = '</div>';

		return array(
			'blockName'    => 'core/tab-list',
			'attrs'        => $attrs,
			'innerBlocks'  => array(),
			'innerHTML'    => $opening . $buttons_html . $closing,
			'innerContent' => array( $opening . $buttons_html . $closing ),
		);
	}

	/**
	 * Parse --dry-run from assoc args safely.
	 *
	 * WP-CLI passes flag values as strings; (bool) 'false' === true, so compare explicitly.
	 *
	 * @param array $assoc_args Named WP-CLI arguments.
	 * @return bool True if dry-run, false if live.
	 */
	private function parse_dry_run( array $assoc_args ): bool {
		if ( ! isset( $assoc_args['dry-run'] ) ) {
			return true;
		}
		if ( 'false' === $assoc_args['dry-run'] ) {
			return false;
		}
		return (bool) $assoc_args['dry-run'];
	}
}

\WP_CLI::add_command( 'prc block-library migrate-core-tabs-names', [ new Core_Tabs_Migrate_CLI(), 'migrate_core_tabs_names' ] );
\WP_CLI::add_command( 'prc block-library migrate-core-tab-to-tabs-attr', [ new Core_Tabs_Migrate_CLI(), 'migrate_core_tab_to_tabs_attr' ] );
