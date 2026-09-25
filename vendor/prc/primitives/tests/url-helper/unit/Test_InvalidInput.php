<?php
/**
 * @package PRC\Primitives\URL_Helper\Tests
 */

namespace PRC\Primitives\URL_Helper\Tests\Unit;

use WP_UnitTestCase;
use PRC\Primitives\URL_Helper\URL_Helper;

class Test_InvalidInput extends WP_UnitTestCase {

	public function test_empty_string_returns_wp_error() {
		$helper = new URL_Helper( '' );
		$this->assertNull( $helper->url );
		$this->assertNull( $helper->post_id );
	}

	public function test_non_url_string_returns_wp_error() {
		$helper = new URL_Helper( 'not-a-url' );
		$this->assertNull( $helper->url );
		$this->assertNull( $helper->post_id );
	}

	public function test_unmatched_url_returns_wp_error_404() {
		$helper = new URL_Helper( 'https://no-such-host.invalid/some/path/' );
		$this->assertWPError( $helper->post_id );
		$this->assertSame( 404, $helper->post_id->get_error_code() );
	}
}
