<?php
/**
 * Block Name:        List Item
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class CoreListItem extends PRC_Block_Library {

	/**
	* @TODO Search and replace {coreBlockChangeMyName} for your block name, e.g. "core/list-item".
	*/
	public static $block_name = 'core/list-item';

	public function __construct($init = false) {
		if ( true === $init ) {
			add_action( 'init', array($this, 'register_new_styles') );
		}
	}


	public function register_new_styles() {
		register_block_style(
			self::$block_name,
			array(
				'name' => 'list-item-float-image-right',
				'label' => 'Float Image Right',
				'inline_style' => '.wp-block-list-item.is-style-list-item-float-image-right img { float: right; margin-left: 1em; margin-bottom: 1em; }',
			),
		);
	}

}

new CoreListItem(true);
