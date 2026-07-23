<?php
/**
 * @package PRC\BlockUtils\Tests
 */

namespace PRC\BlockUtils\Tests;

use PRC\BlockUtils\Lists;
use PRC\BlockUtils\Pagination;
use WP_UnitTestCase;

class Test_PublicSurface extends WP_UnitTestCase {

	public function test_functions_exist() {
		$names = array(
			'PRC\\BlockUtils\\classNames',
			'PRC\\BlockUtils\\load_blocks',
			'PRC\\BlockUtils\\find_block',
			'PRC\\BlockUtils\\find_blocks',
			'PRC\\BlockUtils\\get_block_gap_support_value',
			'PRC\\BlockUtils\\get_block_attributes',
			'PRC\\BlockUtils\\get_spacing_preset_css_var',
			'PRC\\BlockUtils\\get_block_html_attributes',
			'PRC\\BlockUtils\\get_color_by_slug',
			'PRC\\BlockUtils\\get_legacy_color_by_slug',
			'PRC\\BlockUtils\\get_wp_interactive_input_value',
			'PRC\\BlockUtils\\get_wp_interactive_on_click_action',
			'PRC\\BlockUtils\\get_wp_interactive_on_mouseenter_action',
			'PRC\\BlockUtils\\get_wp_interactive_classname',
			'PRC\\BlockUtils\\get_wp_interactive_context',
		);
		foreach ( $names as $fn ) {
			$this->assertTrue( function_exists( $fn ), "Missing function {$fn}" );
		}
		$this->assertTrue( class_exists( Pagination::class ) );
		$this->assertTrue( class_exists( Lists::class ) );
	}
}
