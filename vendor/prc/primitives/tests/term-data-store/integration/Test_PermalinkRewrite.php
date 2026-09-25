<?php
/**
 * @package PRC\Primitives\TDS\Tests
 */

namespace PRC\Primitives\TDS\Tests\Integration;

use WP_UnitTestCase;

use function PRC\Primitives\TDS\add_relationship;
use function PRC\Primitives\TDS\get_related_term;

class Test_PermalinkRewrite extends WP_UnitTestCase {

	public function test_post_permalink_redirects_to_term_archive_when_enabled() {
		$post_type = 'tds_perm_pt_' . wp_rand( 1, 99999 );
		$taxonomy  = 'tds_perm_tax_' . wp_rand();

		register_post_type(
			$post_type,
			array(
				'public'      => true,
				'has_archive' => false,
				'rewrite'     => array( 'slug' => $post_type ),
			)
		);
		register_taxonomy(
			$taxonomy,
			$post_type,
			array(
				'public'  => true,
				'rewrite' => array( 'slug' => $taxonomy ),
			)
		);

		add_relationship( $post_type, $taxonomy, true );

		$post_id = self::factory()->post->create(
			array(
				'post_type'   => $post_type,
				'post_title'  => 'Permalink Sync ' . wp_rand(),
				'post_status' => 'publish',
			)
		);

		$post      = get_post( $post_id );
		$term      = get_related_term( $post );
		$term_link = get_term_link( $term, $taxonomy );

		$this->assertStringContainsString( $taxonomy, get_permalink( $post_id ) );
		$this->assertSame( $term_link, get_permalink( $post_id ) );
	}

	public function test_post_permalink_unchanged_when_rewrites_disabled() {
		$post_type = 'tds_no_perm_pt_' . wp_rand( 1, 99999 );
		$taxonomy  = 'tds_no_perm_tax_' . wp_rand();

		register_post_type(
			$post_type,
			array(
				'public'  => true,
				'rewrite' => array( 'slug' => $post_type ),
			)
		);
		register_taxonomy(
			$taxonomy,
			$post_type,
			array(
				'public'  => true,
				'rewrite' => array( 'slug' => $taxonomy ),
			)
		);

		add_relationship( $post_type, $taxonomy, false );

		$post_id = self::factory()->post->create(
			array(
				'post_type'   => $post_type,
				'post_title'  => 'No Rewrite ' . wp_rand(),
				'post_status' => 'publish',
			)
		);

		$this->assertStringContainsString( $post_type, get_permalink( $post_id ) );
	}
}
