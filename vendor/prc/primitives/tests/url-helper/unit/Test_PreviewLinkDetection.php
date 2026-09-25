<?php
/**
 * @package PRC\Primitives\URL_Helper\Tests
 */

namespace PRC\Primitives\URL_Helper\Tests\Unit;

use WP_UnitTestCase;
use PRC\Primitives\URL_Helper\URL_Helper;

class Test_PreviewLinkDetection extends WP_UnitTestCase {

	public function test_preview_with_p_param() {
		$helper = new URL_Helper( 'https://example.com/?preview=true&p=42' );
		$this->assertSame( 42, $helper->post_id );
	}

	public function test_preview_with_preview_id_param_takes_precedence() {
		$helper = new URL_Helper( 'https://example.com/?preview=true&preview_id=99&p=42' );
		$this->assertSame( 99, $helper->post_id );
	}

	public function test_preview_without_id_returns_wp_error() {
		$helper = new URL_Helper( 'https://example.com/?preview=true' );
		$this->assertWPError( $helper->post_id );
		$this->assertSame( 404, $helper->post_id->get_error_code() );
	}

	public function test_any_preview_value_takes_the_preview_branch() {
		$helper = new URL_Helper( 'https://example.com/?preview=false&p=42' );
		$this->assertSame( 42, $helper->post_id );
	}
}
