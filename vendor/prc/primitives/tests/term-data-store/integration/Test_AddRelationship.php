<?php
/**
 * @package PRC\Primitives\TDS\Tests
 */

namespace PRC\Primitives\TDS\Tests\Integration;

use WP_UnitTestCase;
use PRC\Primitives\TDS\Invalid_Input_Exception;

use function PRC\Primitives\TDS\add_relationship;
use function PRC\Primitives\TDS\get_relationship;

class Test_AddRelationship extends WP_UnitTestCase {

	public function test_invalid_post_type_throws() {
		register_taxonomy( 'tds_invalid_pt_tax', 'post' );

		$this->expectException( Invalid_Input_Exception::class );
		add_relationship( 'tds_no_such_pt_' . wp_rand(), 'tds_invalid_pt_tax' );
	}

	public function test_invalid_taxonomy_throws() {
		register_post_type( 'tds_invalid_tax_pt' );

		$this->expectException( Invalid_Input_Exception::class );
		add_relationship( 'tds_invalid_tax_pt', 'tds_no_such_tax_' . wp_rand() );
	}

	public function test_valid_relationship_is_registered() {
		$post_type = 'tds_valid_pt_' . wp_rand( 1, 99999 );
		$taxonomy  = 'tds_valid_tax_' . wp_rand();

		register_post_type(
			$post_type,
			array(
				'public' => true,
			)
		);
		register_taxonomy(
			$taxonomy,
			$post_type,
			array(
				'public' => true,
			)
		);

		$relationship = add_relationship( $post_type, $taxonomy, false );

		$this->assertSame( $taxonomy, $relationship );
		$this->assertSame( $taxonomy, get_relationship( $post_type ) );
		$this->assertSame( $post_type, get_relationship( $taxonomy ) );

		$this->assertNotFalse( has_action( 'save_post' ) );
		$this->assertNotFalse( has_action( 'create_' . $taxonomy ) );
		$this->assertNotFalse( has_action( 'edit_term' ) );
		$this->assertNotFalse( has_action( 'before_delete_post' ) );
		$this->assertNotFalse( has_action( 'pre_delete_term' ) );
	}

	public function test_permalink_rewrites_added_when_enabled() {
		$post_type = 'tds_perm_pt_' . wp_rand( 1, 99999 );
		$taxonomy  = 'tds_perm_tax_' . wp_rand();

		register_post_type( $post_type, array( 'public' => true ) );
		register_taxonomy( $taxonomy, $post_type, array( 'public' => true ) );

		add_relationship( $post_type, $taxonomy, true );

		$this->assertNotFalse( has_filter( 'post_link' ) );
		$this->assertNotFalse( has_filter( 'post_type_link' ) );
	}
}
