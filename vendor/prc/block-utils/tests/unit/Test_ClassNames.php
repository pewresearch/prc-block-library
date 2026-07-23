<?php
/**
 * @package PRC\BlockUtils\Tests
 */

namespace PRC\BlockUtils\Tests;

use WP_UnitTestCase;

use function PRC\BlockUtils\classNames;

class Test_ClassNames extends WP_UnitTestCase {

	public function test_string_argument() {
		$this->assertSame( 'foo', classNames( 'foo' ) );
	}

	public function test_conditional_array() {
		$this->assertSame( 'foo baz', classNames( 'foo', array( 'bar' => false, 'baz' => true ) ) );
	}

	public function test_mixed() {
		$this->assertSame( 'a c', classNames( 'a', array( 'b' => false, 'c' => true ) ) );
	}

	public function test_filters_null_entries() {
		$this->assertSame( 'x', classNames( 'x', array( 'y' => false ) ) );
	}
}
