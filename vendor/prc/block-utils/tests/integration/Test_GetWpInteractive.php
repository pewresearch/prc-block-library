<?php
/**
 * @package PRC\BlockUtils\Tests
 */

namespace PRC\BlockUtils\Tests;

use WP_UnitTestCase;

use function PRC\BlockUtils\get_wp_interactive_classname;
use function PRC\BlockUtils\get_wp_interactive_context;
use function PRC\BlockUtils\get_wp_interactive_input_value;
use function PRC\BlockUtils\get_wp_interactive_on_click_action;

class Test_GetWpInteractive extends WP_UnitTestCase {

	public function test_input_value() {
		$html = '<input type="text" value="hello" />';
		$this->assertSame( 'hello', get_wp_interactive_input_value( $html ) );
	}

	public function test_on_click() {
		$html = '<input type="button" data-wp-on--click="actions.foo" />';
		$this->assertSame( 'actions.foo', get_wp_interactive_on_click_action( $html ) );
	}

	public function test_classname() {
		$html = '<input data-wp-class--active="state.isActive" />';
		$this->assertSame( 'state.isActive', get_wp_interactive_classname( $html, 'active' ) );
	}

	public function test_context() {
		$html = '<input data-wp-context=\'{"x":1}\' />';
		$this->assertSame( '{"x":1}', get_wp_interactive_context( $html ) );
	}
}
