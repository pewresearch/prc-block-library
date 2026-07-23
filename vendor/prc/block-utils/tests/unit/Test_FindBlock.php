<?php
/**
 * @package PRC\BlockUtils\Tests
 */

namespace PRC\BlockUtils\Tests;

use WP_UnitTestCase;

use function PRC\BlockUtils\find_block;
use function PRC\BlockUtils\find_blocks;

class Test_FindBlock extends WP_UnitTestCase {

	public function test_find_block_top_level() {
		$tree = array(
			array(
				'blockName' => 'prc-block/form',
				'innerBlocks' => array(),
			),
		);
		$found = find_block( $tree, 'prc-block/' );
		$this->assertIsArray( $found );
		$this->assertSame( 'prc-block/form', $found['blockName'] );
	}

	public function test_find_block_nested() {
		$tree = array(
			array(
				'blockName' => 'core/group',
				'innerBlocks' => array(
					array(
						'blockName' => 'prc-block/promo',
						'innerBlocks' => array(),
					),
				),
			),
		);
		$found = find_block( $tree, 'prc-block/' );
		$this->assertSame( 'prc-block/promo', $found['blockName'] );
	}

	public function test_find_block_depth_limit() {
		$inner = array( 'blockName' => 'core/paragraph', 'innerBlocks' => array() );
		for ( $i = 0; $i < 10; $i++ ) {
			$inner = array(
				'blockName' => 'core/group',
				'innerBlocks' => array( $inner ),
			);
		}
		$tree = array( $inner );
		$this->assertNull( find_block( $tree, 'core/paragraph' ) );
	}

	public function test_find_blocks_multiple() {
		$tree = array(
			array(
				'blockName' => 'prc-block/a',
				'innerBlocks' => array(
					array(
						'blockName' => 'prc-block/b',
						'innerBlocks' => array(),
					),
				),
			),
		);
		$all = find_blocks( $tree, 'prc-block/' );
		$this->assertCount( 2, $all );
	}
}
