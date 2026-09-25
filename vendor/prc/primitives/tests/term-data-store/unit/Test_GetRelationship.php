<?php
/**
 * @package PRC\Primitives\TDS\Tests
 */

namespace PRC\Primitives\TDS\Tests\Unit;

use WP_UnitTestCase;

use function PRC\Primitives\TDS\get_relationship;

class Test_GetRelationship extends WP_UnitTestCase {

	public function test_returns_null_for_unknown_key() {
		$this->assertNull( get_relationship( 'tds-test-unknown-' . wp_rand() ) );
	}

	public function test_set_and_lookup_by_post_type() {
		$post_type = 'tds-test-pt-' . wp_rand();
		$taxonomy  = 'tds-test-tax-' . wp_rand();
		get_relationship( $post_type, $taxonomy );

		$this->assertSame( $taxonomy, get_relationship( $post_type ) );
	}

	public function test_set_and_lookup_by_taxonomy() {
		$post_type = 'tds-test-pt-' . wp_rand();
		$taxonomy  = 'tds-test-tax-' . wp_rand();
		get_relationship( $post_type, $taxonomy );

		$this->assertSame( $post_type, get_relationship( $taxonomy ) );
	}
}
