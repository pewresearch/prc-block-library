<?php
/**
 * WP-CLI command: migrate sub_headline → sub_title post meta and legacy subtitle blocks.
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
 * Migrates legacy subtitle data and block markup to the core/heading binding approach.
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
		$offset     = 0;

		\WP_CLI::line( $dry_run ? 'DRY RUN — no changes will be written. Pass --dry-run=false to execute.' : 'LIVE RUN — writing sub_title meta.' );

		$this->start_bulk_operation();

		do {
			// Page with an offset that steps past posts still matching the query.
			// In live mode migrated posts drop out but skipped posts remain, so the
			// offset advances by the skipped count; in dry-run nothing is written and
			// every post remains, so the offset advances by the full batch count.
			// Either way this prevents re-processing stuck posts forever.
			$posts = get_posts(
				array(
					'post_type'      => 'any',
					'post_status'    => array( 'publish', 'draft', 'pending', 'future', 'private' ),
					'posts_per_page' => $batch_size,
					'offset'         => $offset,
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

			$batch_skipped = 0;

			foreach ( $posts as $post ) {
				$sub_headline = get_post_meta( $post->ID, 'sub_headline', true );

				if ( empty( $sub_headline ) ) {
					\WP_CLI::warning( sprintf( 'Post %d has empty sub_headline — skipping.', $post->ID ) );
					++$skipped;
					++$batch_skipped;
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
						++$batch_skipped;
					}
				}
			}

			\WP_CLI::line( sprintf( 'Batch done. Migrated so far: %d | Skipped: %d', $migrated, $skipped ) );

			// Throttle to protect DB and cache.
			sleep( 2 );

			// Release per-request in-memory cache (does NOT flush Memcached).
			$this->vip_inmemory_cleanup();

			// Advance past posts that remain in the result set: every post in dry-run,
			// only skipped posts in live mode (migrated posts drop out of the query).
			$offset     += $dry_run ? count( $posts ) : $batch_skipped;
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
	 * Converts legacy prc-block/subtitle blocks in post content to bound core/heading blocks.
	 *
	 * Runs in dry-run mode by default. Pass --dry-run=false to write changes.
	 * Safe to re-run: only touches posts that still contain prc-block/subtitle.
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
	 *     # Preview block conversions
	 *     wp prc block-library migrate-subtitle-block
	 *
	 *     # Run the migration
	 *     wp prc block-library migrate-subtitle-block --dry-run=false
	 *
	 *     # On VIP
	 *     vip @my-app -- wp prc block-library migrate-subtitle-block --dry-run=false
	 *
	 * @subcommand migrate-subtitle-block
	 * @synopsis [--dry-run=<bool>] [--batch-size=<number>]
	 *
	 * @param array $args       Positional arguments (unused).
	 * @param array $assoc_args Named arguments.
	 */
	public function migrate_subtitle_block( array $args, array $assoc_args ): void {
		$dry_run    = $this->parse_dry_run( $assoc_args );
		$batch_size = min( (int) ( $assoc_args['batch-size'] ?? 100 ), 100 );
		$migrated   = 0;
		$skipped    = 0;
		$offset     = 0;

		\WP_CLI::line(
			$dry_run
				? 'DRY RUN — no changes will be written. Pass --dry-run=false to execute.'
				: 'LIVE RUN — converting prc-block/subtitle blocks to bound core/heading blocks.'
		);

		$this->start_bulk_operation();

		do {
			// Page with an offset that steps past posts still matching the query.
			// In live mode converted posts drop out but skipped posts remain, so the
			// offset advances by the skipped count; in dry-run nothing is written and
			// every post remains, so the offset advances by the full batch count.
			// Either way this prevents re-processing stuck posts forever.
			$posts = get_posts(
				array(
					'post_type'      => 'any',
					'post_status'    => array( 'publish', 'draft', 'pending', 'future', 'private' ),
					'posts_per_page' => $batch_size,
					'offset'         => $offset,
					'orderby'        => 'ID',
					'order'          => 'ASC',
					'no_found_rows'  => true,
					's'              => 'wp:prc-block/subtitle',
				)
			);

			$batch_skipped = 0;

			foreach ( $posts as $post ) {
				if ( ! has_block( 'prc-block/subtitle', $post ) ) {
					++$skipped;
					++$batch_skipped;
					continue;
				}

				$sub_title = trim( (string) get_post_meta( $post->ID, 'sub_title', true ) );
				if ( '' === $sub_title ) {
					$sub_title = trim( (string) get_post_meta( $post->ID, 'sub_headline', true ) );
				}

				$blocks      = parse_blocks( $post->post_content );
				$new_blocks  = $this->convert_subtitle_blocks( $blocks, $sub_title );
				$new_content = serialize_blocks( $new_blocks );

				if ( $new_content === $post->post_content ) {
					\WP_CLI::warning( sprintf( 'Post %d content unchanged after conversion — skipping.', $post->ID ) );
					++$skipped;
					++$batch_skipped;
					continue;
				}

				if ( $dry_run ) {
					\WP_CLI::line(
						sprintf(
							'[DRY RUN] Post %d: would convert subtitle block(s). Preview: "%s"',
							$post->ID,
							mb_substr( $sub_title, 0, 80 )
						)
					);
					++$migrated;
				} else {
					$result = wp_update_post(
						array(
							'ID'           => $post->ID,
							'post_content' => $new_content,
						),
						true
					);

					if ( is_wp_error( $result ) ) {
						\WP_CLI::warning(
							sprintf(
								'Failed to update post %d: %s',
								$post->ID,
								$result->get_error_message()
							)
						);
						++$skipped;
						++$batch_skipped;
						continue;
					}

					\WP_CLI::line( sprintf( 'Converted subtitle block(s) in post %d.', $post->ID ) );
					++$migrated;
				}
			}

			\WP_CLI::line( sprintf( 'Batch done. Migrated so far: %d | Skipped: %d', $migrated, $skipped ) );

			sleep( 2 );
			$this->vip_inmemory_cleanup();

			// Advance past posts that remain in the result set: every post in dry-run,
			// only skipped posts in live mode (converted posts drop out of the query).
			$offset     += $dry_run ? count( $posts ) : $batch_skipped;
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
	 * Recursively convert legacy subtitle blocks to bound core/heading blocks.
	 *
	 * @param array  $blocks    Parsed blocks.
	 * @param string $sub_title Sub-title text to seed into converted headings.
	 * @return array
	 */
	private function convert_subtitle_blocks( array $blocks, string $sub_title ): array {
		foreach ( $blocks as $index => $block ) {
			if ( 'prc-block/subtitle' === ( $block['blockName'] ?? '' ) ) {
				$blocks[ $index ] = $this->build_bound_subtitle_heading( $block, $sub_title );
				continue;
			}

			if ( ! empty( $block['innerBlocks'] ) ) {
				$blocks[ $index ]['innerBlocks'] = $this->convert_subtitle_blocks( $block['innerBlocks'], $sub_title );
			}
		}

		return $blocks;
	}

	/**
	 * Build a core/heading block bound to sub_title post meta.
	 *
	 * @param array  $legacy_block Legacy prc-block/subtitle block.
	 * @param string $sub_title    Sub-title text to seed into the heading.
	 * @return array
	 */
	private function build_bound_subtitle_heading( array $legacy_block, string $sub_title ): array {
		$legacy_attrs = $legacy_block['attrs'] ?? array();
		$new_attrs    = array(
			'level'     => 2,
			'className' => 'is-style-sub-title',
			'metadata'  => array(
				'bindings' => array(
					'content' => array(
						'source' => 'core/post-meta',
						'args'   => array(
							'key' => 'sub_title',
						),
					),
				),
			),
		);

		foreach ( array( 'textAlign', 'textColor', 'backgroundColor' ) as $attr_key ) {
			if ( isset( $legacy_attrs[ $attr_key ] ) ) {
				$new_attrs[ $attr_key ] = $legacy_attrs[ $attr_key ];
			}
		}

		$inner_html = sprintf(
			'<h2 class="wp-block-heading is-style-sub-title">%s</h2>',
			esc_html( $sub_title )
		);

		return array(
			'blockName'    => 'core/heading',
			'attrs'        => $new_attrs,
			'innerBlocks'  => array(),
			'innerHTML'    => $inner_html,
			'innerContent' => array( $inner_html ),
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
