<?php
/**
 * @package PRC\BlockUtils\Tests
 */

namespace PRC\BlockUtils\Tests;

use WP_UnitTestCase;

use function PRC\BlockUtils\get_list_of;

class Test_GetListOf extends WP_UnitTestCase {

	public function test_us_states_returns_array() {
		$result = get_list_of( 'us-states' );
		$this->assertIsArray( $result );
		$this->assertNotEmpty( $result );
	}

	public function test_us_states_items_have_label_and_value() {
		$result = get_list_of( 'us-states' );
		$first  = reset( $result );
		$this->assertArrayHasKey( 'label', $first );
		$this->assertArrayHasKey( 'value', $first );
	}

	public function test_us_states_value_is_two_letter_code() {
		$result = get_list_of( 'us-states' );
		foreach ( $result as $item ) {
			$this->assertMatchesRegularExpression( '/^[A-Z]{2}$/', $item['value'] );
		}
	}

	public function test_countries_returns_array() {
		$result = get_list_of( 'countries' );
		$this->assertIsArray( $result );
		$this->assertGreaterThan( 100, count( $result ) );
	}

	public function test_countries_and_regions_includes_global_total() {
		$result = get_list_of( 'countries-and-regions' );
		$values = array_column( $result, 'value' );
		$this->assertContains( 'Global total', $values );
	}

	public function test_countries_and_regions_excludes_ax() {
		$result = get_list_of( 'countries-and-regions' );
		$values = array_column( $result, 'value' );
		// AX (Åland Islands) should be excluded
		$this->assertNotContains( 'AX', $values );
	}

	public function test_industries_returns_known_items() {
		$result = get_list_of( 'industries' );
		$values = array_column( $result, 'value' );
		$this->assertContains( 'technology', $values );
		$this->assertContains( 'healthcare', $values );
	}

	public function test_unknown_type_returns_empty_array() {
		$result = get_list_of( 'nonsense' );
		$this->assertIsArray( $result );
		$this->assertEmpty( $result );
	}

	public function test_null_type_returns_empty_array() {
		$result = get_list_of( null );
		$this->assertIsArray( $result );
		$this->assertEmpty( $result );
	}
}
