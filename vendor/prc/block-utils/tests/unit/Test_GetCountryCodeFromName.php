<?php
/**
 * @package PRC\BlockUtils\Tests
 */

namespace PRC\BlockUtils\Tests;

use WP_UnitTestCase;

use function PRC\BlockUtils\get_country_code_from_name;

class Test_GetCountryCodeFromName extends WP_UnitTestCase {

	public function test_united_states_by_name() {
		$this->assertSame( 'us', get_country_code_from_name( 'United States' ) );
	}

	public function test_usa_abbreviation() {
		$this->assertSame( 'us', get_country_code_from_name( 'USA' ) );
	}

	public function test_u_s_abbreviation() {
		$this->assertSame( 'us', get_country_code_from_name( 'U.S.' ) );
	}

	public function test_united_kingdom_by_name() {
		$this->assertSame( 'gb', get_country_code_from_name( 'United Kingdom' ) );
	}

	public function test_uk_abbreviation() {
		$this->assertSame( 'gb', get_country_code_from_name( 'UK' ) );
	}

	public function test_direct_alpha2_code() {
		$this->assertSame( 'de', get_country_code_from_name( 'DE' ) );
	}

	public function test_case_insensitive_name() {
		$this->assertSame( 'fr', get_country_code_from_name( 'france' ) );
	}

	public function test_unknown_country_returns_null() {
		$this->assertNull( get_country_code_from_name( 'Narnia' ) );
	}

	public function test_trims_whitespace() {
		$this->assertSame( 'us', get_country_code_from_name( '  United States  ' ) );
	}

	public function test_argentina() {
		$this->assertSame( 'ar', get_country_code_from_name( 'Argentina' ) );
	}
}
