<?php
/**
 * @package PRC\Primitives\BlockUtils\Tests
 */

namespace PRC\Primitives\BlockUtils\Tests;

use WP_UnitTestCase;

use function PRC\Primitives\BlockUtils\get_spacing_preset_css_var;

class Test_GetSpacingPresetCssVar extends WP_UnitTestCase {

	public function test_empty_returns_null() {
		$this->assertNull( get_spacing_preset_css_var( '' ) );
		$this->assertNull( get_spacing_preset_css_var( null ) );
	}

	public function test_preset_converts() {
		$this->assertSame(
			'var(--wp--preset--spacing--60)',
			get_spacing_preset_css_var( 'var:preset|spacing|60' )
		);
	}

	public function test_plain_pass_through() {
		$this->assertSame( '1rem', get_spacing_preset_css_var( '1rem' ) );
	}
}
