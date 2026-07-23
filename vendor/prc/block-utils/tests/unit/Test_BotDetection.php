<?php
/**
 * @package PRC\BlockUtils\Tests
 */

namespace PRC\BlockUtils\Tests;

use WP_UnitTestCase;

use function PRC\BlockUtils\is_google_bot;
use function PRC\BlockUtils\is_gpt_bot;
use function PRC\BlockUtils\is_bot;
use function PRC\BlockUtils\is_facebook_request;
use function PRC\BlockUtils\is_twitter_request;

class Test_BotDetection extends WP_UnitTestCase {

	private string $original_ua;

	public function set_up(): void {
		parent::set_up();
		$this->original_ua = $_SERVER['HTTP_USER_AGENT'] ?? '';
	}

	public function tear_down(): void {
		$_SERVER['HTTP_USER_AGENT'] = $this->original_ua;
		parent::tear_down();
	}

	public function test_is_google_bot_positive() {
		$_SERVER['HTTP_USER_AGENT'] = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
		$this->assertTrue( is_google_bot() );
	}

	public function test_is_google_bot_negative() {
		$_SERVER['HTTP_USER_AGENT'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';
		$this->assertFalse( is_google_bot() );
	}

	public function test_is_gpt_bot_positive() {
		$_SERVER['HTTP_USER_AGENT'] = 'GPTBot/1.0 (+https://openai.com/gptbot)';
		$this->assertTrue( is_gpt_bot() );
	}

	public function test_is_gpt_bot_negative() {
		$_SERVER['HTTP_USER_AGENT'] = 'Mozilla/5.0 Chrome/100';
		$this->assertFalse( is_gpt_bot() );
	}

	public function test_is_bot_returns_true_for_googlebot() {
		$_SERVER['HTTP_USER_AGENT'] = 'Googlebot/2.1';
		$this->assertTrue( is_bot() );
	}

	public function test_is_bot_returns_true_for_gptbot() {
		$_SERVER['HTTP_USER_AGENT'] = 'GPTBot/1.0';
		$this->assertTrue( is_bot() );
	}

	public function test_is_bot_returns_false_for_normal_ua() {
		$_SERVER['HTTP_USER_AGENT'] = 'Mozilla/5.0 Safari/537.36';
		$this->assertFalse( is_bot() );
	}

	public function test_is_facebook_request_externalhit() {
		$_SERVER['HTTP_USER_AGENT'] = 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)';
		$this->assertTrue( is_facebook_request() );
	}

	public function test_is_facebook_request_catalog() {
		$_SERVER['HTTP_USER_AGENT'] = 'facebookcatalog/1.0';
		$this->assertTrue( is_facebook_request() );
	}

	public function test_is_facebook_request_negative() {
		$_SERVER['HTTP_USER_AGENT'] = 'Mozilla/5.0';
		$this->assertFalse( is_facebook_request() );
	}

	public function test_is_twitter_request_positive() {
		$_SERVER['HTTP_USER_AGENT'] = 'Twitterbot/1.0';
		$this->assertTrue( is_twitter_request() );
	}

	public function test_is_twitter_request_negative() {
		$_SERVER['HTTP_USER_AGENT'] = 'Mozilla/5.0';
		$this->assertFalse( is_twitter_request() );
	}
}
