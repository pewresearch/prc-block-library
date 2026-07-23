<?php
/**
 * @package PRC\BlockUtils\Tests
 */

namespace PRC\BlockUtils\Tests;

use PRC\BlockUtils\Pagination;
use WP_UnitTestCase;

class Test_Pagination extends WP_UnitTestCase {

	public function setUp(): void {
		parent::setUp();
		wp_register_style( 'prc-block-library--pagination', false );
	}

	public function test_current_page_and_total() {
		$items = array(
			array(
				'title'     => '1',
				'id'        => '1',
				'link'      => '/1',
				'is_active' => true,
			),
			array(
				'title'     => '2',
				'id'        => '2',
				'link'      => '/2',
				'is_active' => false,
			),
		);
		$p = new Pagination( $items );
		$this->assertSame( 2, $p->total );
		$this->assertSame( 1, $p->current_page_num );
	}

	public function test_render_range_single_page_returns_empty() {
		$items = array(
			array(
				'title'     => '1',
				'link'      => '/1',
				'is_active' => true,
			),
		);
		$p = new Pagination( $items );
		$this->assertSame( '', $p->render_range_of_links() );
	}

	public function test_get_markup_not_empty_for_multiple_pages() {
		$items = array(
			array(
				'title'     => '1',
				'link'      => '/1',
				'is_active' => true,
			),
			array(
				'title'     => '2',
				'link'      => '/2',
				'is_active' => false,
			),
		);
		$p       = new Pagination( $items );
		$markup = $p->get_markup();
		$this->assertStringContainsString( 'common-block-style__pagination__container', $markup );
	}
}
