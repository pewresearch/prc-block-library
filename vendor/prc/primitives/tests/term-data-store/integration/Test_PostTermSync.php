<?php
/**
 * @package PRC\Primitives\TDS\Tests
 */

namespace PRC\Primitives\TDS\Tests\Integration;

use WP_Post;
use WP_Term;
use WP_UnitTestCase;

use function PRC\Primitives\TDS\add_relationship;
use function PRC\Primitives\TDS\get_related_post;
use function PRC\Primitives\TDS\get_related_term;

class Test_PostTermSync extends WP_UnitTestCase {

	private string $post_type = '';
	private string $taxonomy  = '';

	public function set_up(): void {
		parent::set_up();

		$this->post_type = 'tds_sync_pt_' . wp_rand( 1, 99999 );
		$this->taxonomy  = 'tds_sync_tax_' . wp_rand();

		register_post_type(
			$this->post_type,
			array(
				'public'       => true,
				'hierarchical' => true,
				'supports'     => array( 'title', 'editor', 'page-attributes' ),
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
	}

	public function test_creating_term_creates_post() {
		$term = self::factory()->term->create_and_get(
			array(
				'taxonomy' => $this->taxonomy,
				'name'     => 'TDS Sync Term ' . wp_rand(),
			)
		);

		$this->assertInstanceOf( WP_Term::class, $term );

		$post = get_related_post( $term );

		$this->assertInstanceOf( WP_Post::class, $post );
		$this->assertSame( $this->post_type, $post->post_type );
		$this->assertSame( $term->name, $post->post_title );
		$this->assertEquals( $term->term_id, (int) get_post_meta( $post->ID, 'tds_term_id', true ) );
		$this->assertEquals( $post->ID, (int) get_term_meta( $term->term_id, 'tds_post_id', true ) );
	}

	public function test_creating_post_creates_term() {
		$post_id = self::factory()->post->create(
			array(
				'post_type'   => $this->post_type,
				'post_title'  => 'TDS Sync Post ' . wp_rand(),
				'post_status' => 'publish',
			)
		);

		$post = get_post( $post_id );
		$term = get_related_term( $post );

		$this->assertInstanceOf( WP_Term::class, $term );
		$this->assertSame( $this->taxonomy, $term->taxonomy );
		$this->assertSame( $post->post_title, $term->name );
		$this->assertEquals( $term->term_id, (int) get_post_meta( $post->ID, 'tds_term_id', true ) );
		$this->assertEquals( $post->ID, (int) get_term_meta( $term->term_id, 'tds_post_id', true ) );
	}

	public function test_get_related_post_returns_null_for_non_relationship_taxonomy() {
		$term = self::factory()->term->create_and_get( array( 'taxonomy' => 'category' ) );
		$this->assertNull( get_related_post( $term ) );
	}

	public function test_get_related_term_returns_null_for_non_relationship_post() {
		$post_id = self::factory()->post->create( array( 'post_type' => 'post' ) );
		$this->assertNull( get_related_term( $post_id ) );
	}
}
