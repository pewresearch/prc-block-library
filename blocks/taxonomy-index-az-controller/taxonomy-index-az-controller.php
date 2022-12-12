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
	public static $range = null;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			if ( null === self::$range ) {
				self::$range = range( 'A', 'Z' );
			}
			add_action('init', array($this, 'block_init'));
		}
	}

	public function render_az_list( $block ) {
		$present = array();
		foreach ( $block->inner_blocks as $grid ) {
			foreach ( $grid->inner_blocks as $column ) {
				foreach ( $column->inner_blocks as $az_block ) {
					if ( array_key_exists( 'letter', $az_block->attributes ) ) {
						$present[] = strtoupper( $az_block->attributes['letter'] );
					}
				}
			}
		}
		$list = '';
		foreach ( self::$range as $letter ) {
			$class = classNames( 'item', array( 'disabled' => ! in_array( $letter, $present ) ) );
			$list .= "<a href='#{$letter}' class='{$class}'>{$letter}</a>";
		}
		return empty( $list ) ? false : $list;
	}

	public function render_as_accordion( $block ) {
		$menu_items = array();
		$panes = array();

		foreach ( self::$range as $letter ) {
			$menu_item_block = array(
				'blockName' => 'prc-block/menu-item',
				'attrs' => array(
					'slug' => $letter,
					'title' => $letter,
				),
			);
			$menu_item_block['attrs']['uuid'] = md5( wp_json_encode( array(
				'slug' => $letter,
				'title' => $letter,
			) ) );
			$menu_items[] = $menu_item_block;
		}

		foreach ( $block->inner_blocks as $grid ) {
			foreach ( $grid->inner_blocks as $column ) {
				foreach ( $column->inner_blocks as $az_block ) {
					if ( array_key_exists( 'letter', $az_block->attributes ) ) {
						$pane_block = array(
							'blockName' => 'prc-block/pane',
							'attrs' => array(),
							'innerBlocks' => array($az_block->parsed_block),
						);
						$pane_block['attrs']['uuid'] = md5( wp_json_encode( array(
							'slug' => $az_block->attributes['letter'],
							'title' => $az_block->attributes['letter'],
						) ) );
						$panes[] = $pane_block;
					}
				}
			}
		}

		$block_args = new WP_Block_Parser_Block(
			'prc-block/tabs',
			array(
				'className' => 'is-style-accordion',
			),
			array(
				array(
					'blockName' => 'prc-block/menu',
					'innerBlocks' => $menu_items,
				),
				array(
					'blockName' => 'prc-block/panes',
					'innerBlocks' => $panes,
				)
			),
			'',
			'',
		);

		do_action('qm/debug', print_r((array) $block_args, true));

		return render_block( (array) $block_args);
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$wrapper_attributes = get_block_wrapper_attributes();
		$is_mobile = jetpack_is_mobile();

		$content = $this->render_az_list( $block ) . $content;
		$content = $this->render_as_accordion( $block ) . $content;

		return wp_sprintf(
			'<div %1$s>%2$s</div>',
			$wrapper_attributes,
			$content
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
