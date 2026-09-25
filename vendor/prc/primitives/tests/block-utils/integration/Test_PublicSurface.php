<?php
/**
 * @package PRC\Primitives\BlockUtils\Tests
 */

namespace PRC\Primitives\BlockUtils\Tests;

use PRC\Primitives\BlockUtils\Lists;
use PRC\Primitives\BlockUtils\Pagination;
use WP_UnitTestCase;

class Test_PublicSurface extends WP_UnitTestCase {

	public function test_functions_exist() {
		$names = array(
			'PRC\\Primitives\\BlockUtils\\classNames',
			'PRC\\Primitives\\BlockUtils\\load_blocks',
			'PRC\\Primitives\\BlockUtils\\find_block',
			'PRC\\Primitives\\BlockUtils\\find_blocks',
			'PRC\\Primitives\\BlockUtils\\get_block_gap_support_value',
			'PRC\\Primitives\\BlockUtils\\get_block_attributes',
			'PRC\\Primitives\\BlockUtils\\get_spacing_preset_css_var',
			'PRC\\Primitives\\BlockUtils\\get_block_html_attributes',
			'PRC\\Primitives\\BlockUtils\\get_color_by_slug',
			'PRC\\Primitives\\BlockUtils\\get_legacy_color_by_slug',
			'PRC\\Primitives\\BlockUtils\\get_wp_interactive_input_value',
			'PRC\\Primitives\\BlockUtils\\get_wp_interactive_on_click_action',
			'PRC\\Primitives\\BlockUtils\\get_wp_interactive_on_mouseenter_action',
			'PRC\\Primitives\\BlockUtils\\get_wp_interactive_classname',
			'PRC\\Primitives\\BlockUtils\\get_wp_interactive_context',
		);
		foreach ( $names as $fn ) {
			$this->assertTrue( function_exists( $fn ), "Missing function {$fn}" );
		}
		$this->assertTrue( class_exists( Pagination::class ) );
		$this->assertTrue( class_exists( Lists::class ) );
	}
}
