<?php
/**
 * Block Name:        Taxonomy Index A-Z Controller
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class TaxonomyIndexAzController extends PRC_Block_Library {
	public static $version = '0.1.0';
	public static $dir = __DIR__;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action('init', array($this, 'block_init'));
		}
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$wrapper_attributes = get_block_wrapper_attributes();

		return wp_sprintf(
			'<div %1$s>%2$s</div>',
			$wrapper_attributes,
			$content
		);
	}

	public function render_as_accordion() {
		// create a tabs block... but set it to is-style-accordion
		$accordion_block = new WP_Block(
			array(
				'blockName' => 'prc-block/tabs',
				'attrs' => array(
					'className' => 'is-style-accordion',
				),
				'innerblocks' => array(
					array(
						'blockName' => 'prc-block/menu',
						'innerblocks' => array(
							array(
								'blockName' => 'prc-block/menu-item',
							),
							array(
								'blockName' => 'prc-block/menu-item',
							),
							array(
								'blockName' => 'prc-block/menu-item',
							)
						)
					),
					array(
						'blockName' => 'prc-block/panes',
						'innerblocks' => array(
							array(
								'blockName' => 'prc-block/pane',
							),
							array(
								'blockName' => 'prc-block/pane',
							)
						),
					)
				),
			)
		);
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

new TaxonomyIndexAzController(true);
