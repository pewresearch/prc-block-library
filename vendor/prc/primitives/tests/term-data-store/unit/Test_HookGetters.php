<?php
/**
 * @package PRC\Primitives\TDS\Tests
 */

namespace PRC\Primitives\TDS\Tests\Unit;

use Closure;
use WP_UnitTestCase;

use function PRC\Primitives\TDS\get_save_post_hook;
use function PRC\Primitives\TDS\get_save_term_hook;
use function PRC\Primitives\TDS\get_delete_post_hook;
use function PRC\Primitives\TDS\get_delete_term_hook;
use function PRC\Primitives\TDS\get_post_link_hook;
use function PRC\Primitives\TDS\get_post_type_link_hook;

class Test_HookGetters extends WP_UnitTestCase {

	/**
	 * @dataProvider hook_getter_provider
	 */
	public function test_returns_closure( string $function ) {
		$callable = ( '\\PRC\\Primitives\\TDS\\' . $function )( 'tds-pt', 'tds-tax' );
		$this->assertInstanceOf( Closure::class, $callable );
	}

	/**
	 * @dataProvider hook_getter_provider
	 */
	public function test_caches_per_post_type_taxonomy_pair( string $function ) {
		$fqn = '\\PRC\\Primitives\\TDS\\' . $function;

		$first  = $fqn( 'tds-cache-pt', 'tds-cache-tax' );
		$second = $fqn( 'tds-cache-pt', 'tds-cache-tax' );

		$this->assertSame( $first, $second, 'Closures should be memoized for the same (post_type, taxonomy) pair.' );
	}

	public function test_distinct_pairs_get_distinct_closures() {
		$one = get_save_post_hook( 'tds-pair-a-pt', 'tds-pair-a-tax' );
		$two = get_save_post_hook( 'tds-pair-b-pt', 'tds-pair-b-tax' );

		$this->assertNotSame( $one, $two );
	}

	public function hook_getter_provider(): array {
		return array(
			array( 'get_save_post_hook' ),
			array( 'get_save_term_hook' ),
			array( 'get_delete_post_hook' ),
			array( 'get_delete_term_hook' ),
			array( 'get_post_link_hook' ),
			array( 'get_post_type_link_hook' ),
		);
	}
}
