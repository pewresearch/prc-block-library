<?php
/**
 * @package PRC\BlockUtils\Tests
 */

namespace PRC\BlockUtils\Tests;

use WP_UnitTestCase;

use function PRC\BlockUtils\get_block_html_attributes;

class Test_GetBlockHtmlAttributes extends WP_UnitTestCase {

	public function test_empty() {
		$this->assertSame( '', get_block_html_attributes( array() ) );
	}

	public function test_escapes_values() {
		$out = get_block_html_attributes(
			array(
				'class' => 'a"b',
			)
		);
		$this->assertStringContainsString( 'class=', $out );
		$this->assertStringNotContainsString( '"b"', $out );
	}
}
