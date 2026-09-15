<?php
/**
 * WP-CLI command: rewrite `prc-block/icon` comments to `core/icon`.
 *
 * @package PRC\Platform\Blocks
 */

declare(strict_types=1);

namespace PRC\Platform\Blocks;

if ( ! class_exists( 'WPCOM_VIP_CLI_Command' ) ) {
	return;
}

/**
 * Migrates serialized `prc-block/icon` blocks to `core/icon`.
 *
 * Discovers posts via the block-catalog taxonomy term `prc-block-icon`.
 * Requires the block-catalog plugin to be active and indexed.
 *
 * Extends WPCOM_VIP_CLI_Command for safe, at-scale bulk operations on VIP.
 */
class Icon_Migrate_CLI extends \WPCOM_VIP_CLI_Command {

	private const TAXONOMY  = 'block-catalog';
	private const TERM_SLUG = 'prc-block-icon';

	/**
	 * Rewrites posts that still contain `prc-block/icon` to `core/icon`.
	 *
	 * Runs in dry-run mode by default. Pass --dry-run=false to write changes.
	 * Safe to re-run: already-migrated content is a no-op.
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
	 *     wp prc block-library migrate-prc-icon
	 *     wp prc block-library migrate-prc-icon --dry-run=false
	 *     wp prc block-library migrate-prc-icon --dry-run=false --page=3
	 *
	 * @subcommand migrate-prc-icon
	 * @synopsis [--dry-run=<bool>] [--batch-size=<number>] [--page=<number>]
	 *
	 * @param array $args       Positional arguments (unused).
	 * @param array $assoc_args Named arguments.
	 */
	public function migrate_prc_icon( array $args, array $assoc_args ): void {
		unset( $args );

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

		$ids      = array();
		$id_count = 0;

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
				$updated_content  = Icon_Migrate::rewrite_content( $original_content );

				if ( $updated_content === $original_content ) {
					\WP_CLI::line( sprintf( '[SKIP] Post %d: content unchanged after rewrite.', $post_id ) );
					++$skipped;
					continue;
				}

				if ( $dry_run ) {
					\WP_CLI::line( sprintf( '[DRY RUN] Post %d (%s): would rewrite prc-block/icon.', $post_id, get_the_title( $post ) ) );
					++$migrated;
				} else {
					// wp_update_post() runs wp_unslash() on post_content, which
					// strips backslashes from Gutenberg \uXXXX JSON escapes
					// (\u003c → u003c) across the whole post. wp_slash()
					// pre-compensates so the stored bytes match $updated_content.
					// See PRC-633 / PRC-528.
					$result = wp_update_post(
						wp_slash(
							array(
								'ID'           => $post_id,
								'post_content' => $updated_content,
							)
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
			$id_count = count( $ids );
			sleep( 2 );
			$this->vip_inmemory_cleanup();

		} while ( $id_count === $batch_size );

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

\WP_CLI::add_command( 'prc block-library migrate-prc-icon', array( new Icon_Migrate_CLI(), 'migrate_prc_icon' ) );
