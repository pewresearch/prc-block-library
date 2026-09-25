<?php
/**
 * @package PRC\Primitives\TDS\Tests
 */

namespace PRC\Primitives\TDS\Tests\Unit;

use WP_UnitTestCase;

use function PRC\Primitives\TDS\balancing_relationship;

class Test_BalancingRelationship extends WP_UnitTestCase {

	public function tear_down(): void {
		balancing_relationship( false );
		parent::tear_down();
	}

	public function test_default_is_false() {
		balancing_relationship( false );
		$this->assertFalse( balancing_relationship() );
	}

	public function test_can_be_toggled_true() {
		balancing_relationship( true );
		$this->assertTrue( balancing_relationship() );
	}

	public function test_can_be_toggled_false() {
		balancing_relationship( true );
		balancing_relationship( false );
		$this->assertFalse( balancing_relationship() );
	}

	public function test_passes_through_filter() {
		balancing_relationship( false );
		add_filter( '__return_true_filter', '__return_true' );
		add_filter( 'tds_balancing_from_post', '__return_true' );

		$this->assertTrue( apply_filters( 'tds_balancing_from_post', balancing_relationship(), 'post', 'tax', null ) );

		remove_filter( 'tds_balancing_from_post', '__return_true' );
	}
}
