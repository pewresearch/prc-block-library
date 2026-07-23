<?php
/**
 * @package PRC\BlockUtils\Tests
 */

namespace PRC\BlockUtils\Tests;

use WP_UnitTestCase;

use function PRC\BlockUtils\get_block_attributes;

class Test_GetBlockAttributes extends WP_UnitTestCase {

	public function setUp(): void {
		parent::setUp();
		register_block_type(
			'prc-block-utils/test-block',
			array(
				'attributes' => array(
					'title'    => array(
						'type'    => 'string',
						'default' => 'default-title',
					),
					'flag'     => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'optional' => array(
						'type' => 'string',
					),
				),
			)
		);
	}

	public function tearDown(): void {
		unregister_block_type( 'prc-block-utils/test-block' );
		parent::tearDown();
	}

	public function test_merges_defaults() {
		$attrs = get_block_attributes( 'prc-block-utils/test-block', array() );
		$this->assertSame( 'default-title', $attrs['title'] );
		$this->assertFalse( $attrs['flag'] );
		$this->assertNull( $attrs['optional'] );
	}

	public function test_overrides_defaults() {
		$attrs = get_block_attributes(
			'prc-block-utils/test-block',
			array(
				'title' => 'custom',
				'flag'  => true,
			)
		);
		$this->assertSame( 'custom', $attrs['title'] );
		$this->assertTrue( $attrs['flag'] );
	}

	public function test_desired_attribute_only() {
		$v = get_block_attributes(
			'prc-block-utils/test-block',
			array( 'title' => 'x' ),
			'title'
		);
		$this->assertSame( 'x', $v );
	}
}
