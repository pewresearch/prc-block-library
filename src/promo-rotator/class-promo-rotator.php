<?php
/**
 * Promo Rotator Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Promo Rotator
 * Version:           0.1.0
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Promo_Rotator {
	/**
	 * Constructor
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		$this->init( $loader );
	}

	/**
	 * Initialize the block
	 *
	 * @param mixed $loader Loader.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
		}
	}

	/**
	 * Randomly select inner block
	 *
	 * @hook render_block
	 *
	 * @param string $block_content Block content.
	 * @param array  $block Block.
	 * @return string
	 */
	public function randomly_select_inner_block( $block_content, $block ) {
		if ( 'prc-block/promo-rotator' === $block['blockName'] ) {
			$iteration = array_rand( $block['innerBlocks'] );
			return render_block( $block['innerBlocks'][ $iteration ] );
		}
		return $block_content;
	}

	/**
	 * Render callback for prc-block/promo-rotator
	 *
	 * @param mixed $attributes Block attributes.
	 * @param mixed $content Block content.
	 * @param mixed $block Block.
	 * @return string|false
	 */
	public function render_block_callback( $attributes, $content, $block ) {
		ob_start();
		echo wp_kses( $content, 'post' );
		return ob_get_clean();
	}

	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @hook init
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/promo-rotator',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}
