<?php
/**
 * Block Name:        Promo Rotator
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class PromoRotator extends PRC_Block_Library {
	public static $version = '0.1.0';
	public static $dir = __DIR__;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action('init', array($this, 'block_init'));
			add_filter( 'render_block', array( $this, 'randomly_select_inner_block' ), 10, 2 );
		}
	}

	// Randomly selects one inner block to display.
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
	 * @param mixed $attributes
	 * @param mixed $content
	 * @param mixed $block
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
	* @see https://developer.wordpress.org/reference/functions/register_block_type/
	*/
	public function block_init() {
		register_block_type(
			self::$dir . '/build',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}

}

new PromoRotator(true);
