<?php
/**
 * @package PRC\BlockUtils\Tests
 */

namespace PRC\BlockUtils\Tests;

use WP_UnitTestCase;

use function PRC\BlockUtils\get_block_gap_support_value;

class Test_GetBlockGapSupportValue extends WP_UnitTestCase {

	public function test_non_array_attributes() {
		$this->assertSame( '', get_block_gap_support_value( null ) );
	}

	public function test_missing_style() {
		$this->assertSame( 'inherit', get_block_gap_support_value( array() ) );
	}

	public function test_preset_numeric_spacing() {
		$attrs = array(
			'style' => array(
				'spacing' => array(
					'blockGap' => 'var:preset|spacing|60',
				),
			),
		);
		$this->assertSame(
			'var(--wp--preset--spacing--60)',
			get_block_gap_support_value( $attrs )
		);
	}

	public function test_horizontal_dimension() {
		$attrs = array(
			'style' => array(
				'spacing' => array(
					'blockGap' => array(
						'left' => '1rem',
						'top'  => '2rem',
					),
				),
			),
		);
		$this->assertSame( '1rem', get_block_gap_support_value( $attrs, 'horizontal' ) );
		$this->assertSame( '2rem', get_block_gap_support_value( $attrs, 'vertical' ) );
	}
}
