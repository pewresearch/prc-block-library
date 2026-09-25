<?php
/**
 * @package PRC\Primitives\URL_Helper\Tests
 */

namespace PRC\Primitives\URL_Helper\Tests\Unit;

use WP_UnitTestCase;
use PRC\Primitives\URL_Helper\URL_Helper;

class Test_EditLinkDetection extends WP_UnitTestCase {

	public function test_edit_link_resolves_post_param() {
		$helper = new URL_Helper( 'https://example.com/wp-admin/post.php?action=edit&post=123' );
		$this->assertSame( 123, $helper->post_id );
	}

	public function test_edit_link_without_post_param_returns_wp_error() {
		$helper = new URL_Helper( 'https://example.com/wp-admin/post.php?action=edit' );
		$this->assertWPError( $helper->post_id );
	}

	public function test_action_other_than_edit_does_not_match() {
		$helper = new URL_Helper( 'https://example.com/wp-admin/post.php?action=trash&post=123' );
		$this->assertWPError( $helper->post_id );
	}
}
