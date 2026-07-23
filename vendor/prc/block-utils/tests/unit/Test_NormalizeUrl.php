<?php
/**
 * @package PRC\BlockUtils\Tests
 */

namespace PRC\BlockUtils\Tests;

use WP_UnitTestCase;

use function PRC\BlockUtils\normalize_url_to_production;

class Test_NormalizeUrl extends WP_UnitTestCase {

	public function test_production_url_is_unchanged() {
		// Production environment returns the URL as-is.
		// wp_get_environment_type() returns 'local' in the test environment,
		// so we test the non-production path directly.
		$url    = 'https://prc-platform.vipdev.lndo.site/pewresearch-org/path/to/article/';
		$result = normalize_url_to_production( $url );
		$this->assertSame( 'https://www.pewresearch.org/path/to/article/', $result );
	}

	public function test_removes_pewresearch_org_prefix() {
		$url    = 'https://prc-platform.vipdev.lndo.site/pewresearch-org/politics/2024/01/survey/';
		$result = normalize_url_to_production( $url );
		$this->assertSame( 'https://www.pewresearch.org/politics/2024/01/survey/', $result );
	}

	public function test_replaces_known_non_production_host() {
		$url    = 'https://alpha.pewresearch.org/some-page/';
		$result = normalize_url_to_production( $url );
		$this->assertSame( 'https://www.pewresearch.org/some-page/', $result );
	}

	public function test_invalid_url_is_returned_as_is() {
		$result = normalize_url_to_production( 'not-a-url' );
		$this->assertSame( 'not-a-url', $result );
	}

	public function test_pewresearch_org_root_path_normalizes() {
		$url    = 'https://prc-platform.vipdev.lndo.site/pewresearch-org';
		$result = normalize_url_to_production( $url );
		$this->assertSame( 'https://www.pewresearch.org/', $result );
	}

	public function test_unknown_host_path_not_mangled() {
		$url    = 'https://example.com/pewresearch-org/test/';
		$result = normalize_url_to_production( $url );
		// Host is not in replace list, path prefix still stripped.
		$this->assertSame( 'https://example.com/test/', $result );
	}
}
