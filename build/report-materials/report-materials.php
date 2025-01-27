<?php
namespace PRC\Platform\Blocks;

use WP_Error;
use WP_HTML_Heading_Processor;
/**
 * Block Name:        Report Materials
 * Description:       Displays a list of materials from a post report package.
 * Version:           3.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Report_Materials {
	public function __construct( $loader ) {
		$this->init( $loader );
	}

	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
		}
	}

	public function get_item_label( $item ) {
		if ( array_key_exists( 'label', $item ) && ! empty( $item['label'] ) ) {
			return $item['label'];
		}
		switch ( $item['type'] ) {
			case 'detailTable':
				return 'Data Table';
			case 'link':
				return 'Link';
			case 'presentation':
				return 'Presentation';
			case 'pressRelease':
				return 'Press Release';
			case 'promo':
				return 'Promo';
			case 'qA':
				return 'Q & A';
			case 'questionnaire':
				return 'Questionnaire';
			case 'report':
				return 'Report PDF';
			case 'supplemental':
				return 'Supplemental';
			case 'topline':
				return 'Topline';
			default:
				return 'Unknown';
		}
	}

	public function get_item_icon( $item ) {
		switch ( $item['type'] ) {
			case 'detailTable':
				return 'table';
			case 'link':
				return 'link';
			case 'presentation':
				return 'presentation-screen';
			case 'pressRelease':
				return 'file';
			case 'promo':
				return 'file';
			case 'qA':
				return 'file';
			case 'questionnaire':
				return 'clipboard';
			case 'report':
				return 'file';
			case 'supplemental':
				return 'file';
			case 'topline':
				return 'clipboard';
			case 'dataset':
				return 'download';
			default:
				return 'file';
		}
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$post_id = $block->context['postId'];

		$report_package = new \PRC\Platform\Post_Report_Package( null, null );
		$materials      = $report_package->get_report_materials( $post_id );
		if ( is_string( $materials ) && ! empty( $materials ) ) {
			do_action( 'qm/debug', 'MATERIALS IS STRING' . $materials );
			$materials = json_decode( $materials, true );
			do_action( 'qm/debug', 'MATERIALS:' . print_r( $materials, true ) );
		}

		if ( empty( $materials ) ) {
			return '';
		}

		$color_supports = new Additional_Color_Supports( null );

		$heading_text = array_key_exists( 'heading', $attributes ) ? $attributes['heading'] : false;

		$list_item_classnames = $color_supports->get_list_classnames(
			'wp-block-prc-block-table-of-materials',
			false,
			$attributes,
		) . ' flex-align-center';

		foreach ( $materials as $material ) {
			$icon     = \PRC\Platform\Icons\render( 'solid', $this->get_item_icon( $material ) );
			$content .= wp_sprintf(
				'<li class="%1$s" data-material-type="%2$s">%3$s<a href="%4$s" target="_blank">%5$s</a></li>',
				$list_item_classnames,
				$material['type'],
				$icon,
				$material['url'],
				$this->get_item_label( $material )
			);
		}

		$block_attrs = get_block_wrapper_attributes(
			array(
				'class' => 'common-block-style--baseball-card',
			)
		);

		$block_gap = \PRC\Platform\Block_Utils\get_block_gap_support_value( $attributes );

		$heading = wp_sprintf(
			'<div class="%1$s"><h2>%2$s</h2></div>',
			\PRC\Platform\Block_Utils\classNames(
				'wp-block-prc-block-table-of-contents__heading',
				array(
					'has-text-color' => $attributes['headingTextColor'],
					'has-' . $attributes['headingTextColor'] . '-color' => $attributes['headingTextColor'],
					'has-background' => $attributes['headingBackgroundColor'],
					'has-' . $attributes['headingBackgroundColor'] . '-background-color' => $attributes['headingBackgroundColor'],
					'is-hidden'      => true === $attributes['hideHeading'],
				),
			),
			$heading_text,
		);

		$list = wp_sprintf(
			'<ul class="wp-block-prc-block-report-materials__list" role="list" %1$s>%2$s</ul>',
			'style="--block-gap: ' . $block_gap . ';"',
			$content,
		);

		return wp_sprintf(
			'<div %1$s>%2$s %3$s</div>',
			$block_attrs,
			$heading,
			$list
		);
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
			PRC_BLOCK_LIBRARY_DIR . '/build/report-materials',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}
