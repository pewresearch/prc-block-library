<?php
/**
 * @package PRC\Primitives\URL_Helper\Tests
 */

namespace PRC\Primitives\URL_Helper\Tests\Integration;

use WP_UnitTestCase;
use PRC\Primitives\URL_Helper\URL_Helper;

class Test_PublishedLinkResolution extends WP_UnitTestCase {

	public function test_published_post_permalink_resolves_to_post_id() {
		$post_id = self::factory()->post->create(
			array(
				'post_title'  => 'URL Helper Integration Test ' . wp_rand(),
				'post_status' => 'publish',
			)
		);

		$permalink = get_permalink( $post_id );
		$this->assertIsString( $permalink );

		$helper = new URL_Helper( $permalink );

		$this->assertSame( $post_id, $helper->post_id );
	}

	public function test_published_post_via_p_query_string() {
		$post_id = self::factory()->post->create(
			array(
				'post_title'  => 'URL Helper Query Test ' . wp_rand(),
				'post_status' => 'publish',
			)
		);

		$url = home_url( '/?p=' . $post_id );

		$helper = new URL_Helper( $url );

		$this->assertSame( $post_id, $helper->post_id );
	}

	public function test_falls_back_to_url_to_postid_outside_vip() {
		// Sanity check: this suite does not run against a VIP environment, so
		// the package's fallback path (\url_to_postid) must be used. If
		// wpcom_vip_url_to_postid() ever appears in scope, the assertion here
		// signals that the test environment changed.
		$this->assertFalse( function_exists( 'wpcom_vip_url_to_postid' ) );
	}
}
