<?php
/**
 * @package PRC\Primitives\BlockUtils\Tests
 */

namespace PRC\Primitives\BlockUtils\Tests;

use WP_UnitTestCase;

use function PRC\Primitives\BlockUtils\get_legacy_color_by_slug;

class Test_GetLegacyColorBySlug extends WP_UnitTestCase {

	public function test_known_slug() {
		$out = get_legacy_color_by_slug( 'beige' );
		$this->assertIsArray( $out );
		$this->assertSame( 'beige', $out['slug'] );
		$this->assertSame( '#f7f7f1', $out['hex'] );
	}

	public function test_unknown_returns_false() {
		$this->assertFalse( get_legacy_color_by_slug( 'not-a-legacy-color' ) );
	}
}
