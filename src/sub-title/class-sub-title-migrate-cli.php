<?php
/**
 * WP-CLI command: migrate sub_headline → sub_title post meta.
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
 * Migrates the legacy `sub_headline` post meta key to `sub_title` across all post types.
 *
 * Extends WPCOM_VIP_CLI_Command for safe, at-scale bulk operations on VIP infrastructure.
 */
class Sub_Title_Migrate_CLI extends \WPCOM_VIP_CLI_Command {

	/**
	 * Migrates posts that have `sub_headline` set but `sub_title` not yet set.
	 *
	 * Runs in dry-run mode by default. Pass --dry-run=false to write changes.
	 * Safe to re-run: only touches posts where sub_title is absent or empty.
	 *
	 * ## OPTIONS
	 *
	 * [--dry-run=<bool>]
	 * : Preview changes without writing. Default: true.
	 *
	 * [--batch-size=<number>]
	 * : Number of posts to process per batch. Default: 100. Max: 100.
	 *
	 * ## EXAMPLES
	 *
	 *     # Preview how many posts would be migrated
	 *     wp prc block-library migrate-sub-headline
	 *
	 *     # Run the migration
	 *     wp prc block-library migrate-sub-headline --dry-run=false
	 *
	 *     # On VIP
	 *     vip @my-app -- wp prc block-library migrate-sub-headline --dry-run=false
	 *
	 * @subcommand migrate-sub-headline
	 * @synopsis [--dry-run=<bool>] [--batch-size=<number>]
	 *
	 * @param array $args       Positional arguments (unused).
	 * @param array $assoc_args Named arguments.
	 */
	public function migrate_sub_headline( array $args, array $assoc_args ): void {
		$dry_run    = $this->parse_dry_run( $assoc_args );
		$batch_size = min( (int) ( $assoc_args['batch-size'] ?? 100 ), 100 );
		$migrated   = 0;
		$skipped    = 0;
		$paged      = 1;

		\WP_CLI::line( $dry_run ? 'DRY RUN — no changes will be written. Pass --dry-run=false to execute.' : 'LIVE RUN — writing sub_title meta.' );

		$this->start_bulk_operation();

		do {
			// In live mode, posts drop out of the result set as sub_title is written,
			// so paged stays at 1 (pattern 3). In dry-run nothing is written and posts
			// remain in the set, so paged must advance to avoid an infinite loop (pattern 2).
			$posts = get_posts(
				array(
					'post_type'      => 'any',
					'post_status'    => array( 'publish', 'draft', 'pending', 'future', 'private' ),
					'posts_per_page' => $batch_size,
					'paged'          => $dry_run ? $paged : 1,
					'orderby'        => 'ID',
					'order'          => 'ASC',
					'no_found_rows'  => true,
					'meta_query'     => array( // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
						'relation' => 'AND',
						array(
							'key'     => 'sub_headline',
							'value'   => '',
							'compare' => '!=',
						),
						array(
							'relation' => 'OR',
							array(
								'key'     => 'sub_title',
								'compare' => 'NOT EXISTS',
							),
							array(
								'key'     => 'sub_title',
								'value'   => '',
								'compare' => '=',
							),
						),
					),
				)
			);

			foreach ( $posts as $post ) {
				$sub_headline = get_post_meta( $post->ID, 'sub_headline', true );

				if ( empty( $sub_headline ) ) {
					\WP_CLI::warning( sprintf( 'Post %d has empty sub_headline — skipping.', $post->ID ) );
					++$skipped;
					continue;
				}

				if ( $dry_run ) {
					\WP_CLI::line( sprintf( '[DRY RUN] Post %d: "%s"', $post->ID, mb_substr( $sub_headline, 0, 80 ) ) );
					++$migrated;
				} else {
					$result = update_post_meta( $post->ID, 'sub_title', $sub_headline );
					if ( false !== $result ) {
						\WP_CLI::line( sprintf( 'Migrated post %d.', $post->ID ) );
						++$migrated;
					} else {
						\WP_CLI::warning( sprintf( 'Failed to update post %d.', $post->ID ) );
						++$skipped;
					}
				}
			}

			\WP_CLI::line( sprintf( 'Batch done. Migrated so far: %d | Skipped: %d', $migrated, $skipped ) );

			// Throttle to protect DB and cache.
			sleep( 2 );

			// Release per-request in-memory cache (does NOT flush Memcached).
			$this->vip_inmemory_cleanup();

			++$paged;
			$batch_count = count( $posts );
		} while ( $batch_count === $batch_size );

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

\WP_CLI::add_command( 'prc block-library', Sub_Title_Migrate_CLI::class );
