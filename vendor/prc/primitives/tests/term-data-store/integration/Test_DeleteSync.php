<?php
/**
 * @package PRC\Primitives\TDS\Tests
 */

namespace PRC\Primitives\TDS\Tests\Integration;

use WP_UnitTestCase;

use function PRC\Primitives\TDS\add_relationship;
use function PRC\Primitives\TDS\get_related_post;
use function PRC\Primitives\TDS\get_related_term;

class Test_DeleteSync extends WP_UnitTestCase {

	public function test_deleting_post_deletes_related_term() {
		$post_type = 'tds_del_pt_' . wp_rand( 1, 99999 );
		$taxonomy  = 'tds_del_tax_' . wp_rand();

		register_post_type( $post_type, array( 'public' => true ) );
		register_taxonomy( $taxonomy, $post_type, array( 'public' => true ) );
		add_relationship( $post_type, $taxonomy, false );

		$post_id = self::factory()->post->create(
			array(
				'post_type'   => $post_type,
				'post_title'  => 'Delete Test ' . wp_rand(),
				'post_status' => 'publish',
			)
		);

		$term = get_related_term( get_post( $post_id ) );
		$this->assertNotNull( $term );
		$term_id = $term->term_id;

		wp_delete_post( $post_id, true );

		$this->assertNull( get_term( $term_id, $taxonomy ) );
	}

	public function test_deleting_term_deletes_related_post() {
		$post_type = 'tds_del2_pt_' . wp_rand( 1, 99999 );
		$taxonomy  = 'tds_del2_tax_' . wp_rand();

		register_post_type( $post_type, array( 'public' => true ) );
		register_taxonomy( $taxonomy, $post_type, array( 'public' => true ) );
		add_relationship( $post_type, $taxonomy, false );

		$term = self::factory()->term->create_and_get(
			array(
				'taxonomy' => $taxonomy,
				'name'     => 'Term Delete ' . wp_rand(),
			)
		);

		$post = get_related_post( $term );
		$this->assertNotNull( $post );
		$post_id = $post->ID;

		wp_delete_term( $term->term_id, $taxonomy );

		$this->assertNull( get_post( $post_id ) );
	}
}
