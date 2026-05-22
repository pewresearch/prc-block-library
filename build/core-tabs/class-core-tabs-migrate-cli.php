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
