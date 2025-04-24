<?php
/**
 * Core List Item Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use WP_HTML_Tag_Processor;
/**
 * Block Name:        List Item
 * Version:           0.1.0
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Core_List_Item {
	/**
	 * Block name
	 *
	 * @var string
	 */
	public static $block_name = 'core/list-item';

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
			$loader->add_action( 'init', $this, 'register_new_styles', 10 );
		}
	}

	/**
	 * Register new styles
	 *
	 * @hook init
	 * @return void
	 */
	public function register_new_styles() {
		register_block_style(
			self::$block_name,
			array(
				'name'         => 'list-item-float-image-right',
				'label'        => 'Float Image Right',
				'inline_style' => '.wp-block-list-item.is-style-list-item-float-image-right img { float: right; margin-left: 1em; margin-bottom: 1em; }',
			),
		);
	}
}
