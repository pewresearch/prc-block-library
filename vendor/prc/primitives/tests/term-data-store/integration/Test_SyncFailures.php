<?php
/**
 * @package PRC\Primitives\TDS\Tests
 */

namespace PRC\Primitives\TDS\Tests\Integration;

use WP_Post;
use WP_Term;
use WP_UnitTestCase;

use function PRC\Primitives\TDS\add_relationship;
use function PRC\Primitives\TDS\balancing_relationship;
use function PRC\Primitives\TDS\get_related_post;
use function PRC\Primitives\TDS\get_related_term;
use function PRC\Primitives\TDS\get_save_term_hook;

class Test_SyncFailures extends WP_UnitTestCase {

	private string $post_type = '';
	private string $taxonomy  = '';
	private string $log_file  = '';
	private string $log_was   = '';

	public function set_up(): void {
		parent::set_up();

		$this->post_type = 'tds_fail_pt_' . wp_rand( 1, 99999 );
		$this->taxonomy  = 'tds_fail_tax_' . wp_rand();
		register_post_type(
			$this->post_type,
			array(
				'public'       => true,
				'hierarchical' => true,
			)
		);
		register_taxonomy(
			$this->taxonomy,
			$this->post_type,
			array(
				'public'       => true,
				'hierarchical' => true,
			)
		);
		add_relationship( $this->post_type, $this->taxonomy, false );

		$this->log_file = wp_tempnam( 'tds-sync-log' );
		$this->log_was  = (string) ini_get( 'error_log' );
		ini_set( 'error_log', $this->log_file ); // phpcs:ignore WordPress.PHP.IniSet.Risky
	}

	public function tear_down(): void {
		ini_set( 'error_log', $this->log_was ); // phpcs:ignore WordPress.PHP.IniSet.Risky
		wp_delete_file( $this->log_file );
		remove_all_filters( 'wp_insert_post_empty_content' );
		remove_all_filters( 'get_the_terms' );
		parent::tear_down();
	}

	private function logged(): string {
		return (string) file_get_contents( $this->log_file ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
	}

	public function test_failed_term_insert_is_logged_and_sync_keeps_working() {
		$untitled = self::factory()->post->create(
			array(
				'post_type'   => $this->post_type,
				'post_status' => 'publish',
				'post_title'  => '',
			)
		);

		$this->assertNull( get_related_term( $untitled ) );
		$this->assertStringContainsString( 'term-data-store: Error creating a term: A name is required for this term.', $this->logged() );
		$this->assertFalse( balancing_relationship() );

		$titled = self::factory()->post->create(
			array(
				'post_type'   => $this->post_type,
				'post_status' => 'publish',
				'post_title'  => 'After The Failure',
			)
		);
		$this->assertSame( 'After The Failure', get_related_term( $titled )->name );
	}

	public function test_failed_term_update_keeps_the_existing_term() {
		$post_id = self::factory()->post->create(
			array(
				'post_type'   => $this->post_type,
				'post_status' => 'publish',
				'post_title'  => 'Original Title',
			)
		);
		$term_id = get_related_term( $post_id )->term_id;

		wp_update_post(
			array(
				'ID'         => $post_id,
				'post_title' => '',
			)
		);

		$this->assertSame( 'Original Title', get_term( $term_id, $this->taxonomy )->name );
		$this->assertStringContainsString( 'term-data-store: Error updating a post -> term: A name is required for this term.', $this->logged() );
		$this->assertFalse( balancing_relationship() );
	}

	public function test_failed_post_update_from_a_term_is_logged() {
		$term = self::factory()->term->create_and_get(
			array(
				'taxonomy' => $this->taxonomy,
				'name'     => 'Before Rename',
			)
		);
		$post = get_related_post( $term );
		$this->assertInstanceOf( WP_Post::class, $post );

		wp_update_term( $term->term_id, $this->taxonomy, array( 'name' => 'After Rename' ) );
		clean_term_cache( $term->term_id, $this->taxonomy );
		add_filter( 'wp_insert_post_empty_content', '__return_true' );
		get_save_term_hook( $this->post_type, $this->taxonomy )( $term->term_id );

		$this->assertSame( 'Before Rename', get_post( $post->ID )->post_title );
		$this->assertStringContainsString( 'term-data-store: Error updating a term -> post:', $this->logged() );
		$this->assertFalse( balancing_relationship() );
	}

	public function test_saving_a_child_post_takes_its_parent_from_the_term_and_keeps_the_term() {
		$parent     = self::factory()->term->create_and_get(
			array(
				'taxonomy' => $this->taxonomy,
				'name'     => 'Parent Term',
			)
		);
		$child      = self::factory()->term->create_and_get(
			array(
				'taxonomy' => $this->taxonomy,
				'name'     => 'Child Term',
				'parent'   => $parent->term_id,
			)
		);
		$child_post = get_related_post( $child );
		$this->assertSame( 0, $child_post->post_parent );

		wp_update_post(
			array(
				'ID'           => $child_post->ID,
				'post_content' => 'Edited',
			)
		);

		$this->assertSame( get_related_post( $parent )->ID, get_post( $child_post->ID )->post_parent );
		$this->assertSame( $child->term_id, get_related_term( $child_post->ID )->term_id );
	}

	public function test_renaming_a_child_term_renames_its_post_and_sets_the_parent() {
		$parent = self::factory()->term->create_and_get(
			array(
				'taxonomy' => $this->taxonomy,
				'name'     => 'Parent Term',
			)
		);
		$child  = self::factory()->term->create_and_get(
			array(
				'taxonomy' => $this->taxonomy,
				'name'     => 'Child Term',
			)
		);
		$post   = get_related_post( $child );

		wp_update_term(
			$child->term_id,
			$this->taxonomy,
			array(
				'name'   => 'Renamed Child',
				'parent' => $parent->term_id,
			)
		);
		clean_term_cache( $child->term_id, $this->taxonomy );
		get_save_term_hook( $this->post_type, $this->taxonomy )( $child->term_id );

		$synced = get_post( $post->ID );
		$this->assertSame( 'Renamed Child', $synced->post_title );
		$this->assertSame( get_related_post( $parent )->ID, $synced->post_parent );
		$this->assertInstanceOf( WP_Term::class, get_related_term( $synced ) );
	}

	public function test_failed_parent_sync_still_links_the_post_to_its_term() {
		$parent_post = self::factory()->post->create(
			array(
				'post_type'   => $this->post_type,
				'post_status' => 'publish',
				'post_title'  => 'Parent',
			)
		);
		$missing     = new WP_Term(
			(object) array(
				'term_id'  => PHP_INT_MAX,
				'taxonomy' => $this->taxonomy,
			)
		);
		add_filter(
			'get_the_terms',
			static function ( $terms, $post_id ) use ( $parent_post, $missing ) {
				return $parent_post === $post_id ? array( $missing ) : $terms;
			},
			10,
			2
		);

		$child_post = self::factory()->post->create(
			array(
				'post_type'   => $this->post_type,
				'post_status' => 'publish',
				'post_title'  => 'Child',
				'post_parent' => $parent_post,
			)
		);

		$this->assertStringContainsString( 'term-data-store: Error setting a term parent: Parent term does not exist.', $this->logged() );
		$this->assertSame( 'Child', get_related_term( $child_post )->name );
		$this->assertFalse( balancing_relationship() );
	}
}
