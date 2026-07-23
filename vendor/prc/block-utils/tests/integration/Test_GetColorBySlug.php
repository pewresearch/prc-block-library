<?php
/**
 * @package PRC\BlockUtils\Tests
 */

namespace PRC\BlockUtils\Tests;

use WP_UnitTestCase;

use function PRC\BlockUtils\get_color_by_slug;

class Test_GetColorBySlug extends WP_UnitTestCase {

	public function setUp(): void {
		parent::setUp();
		switch_theme( 'prc-design-system' );
	}

	public function test_design_system_slug() {
		$out = get_color_by_slug( 'ui-white' );
		$this->assertIsArray( $out );
		$this->assertSame( 'ui-white', $out['slug'] );
		$this->assertSame( 'light-dark(#ffffff, #1a1a1a)', $out['hex'] );
		$this->assertSame( 'UI White', $out['name'] );
	}

	public function test_legacy_slug() {
		$out = get_color_by_slug( 'beige' );
		$this->assertIsArray( $out );
		$this->assertSame( 'beige', $out['slug'] );
		$this->assertSame( '#f7f7f1', $out['hex'] );
	}

	public function test_unknown_slug_fallback() {
		$out = get_color_by_slug( 'totally-unknown-color-slug-xyz' );
		$this->assertIsArray( $out );
		$this->assertSame( '#000', $out['hex'] );
		$this->assertSame( 'black', $out['slug'] );
		$this->assertSame( 'Black', $out['name'] );
	}
}
