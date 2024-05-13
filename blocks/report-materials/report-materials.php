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
	public static $block_json = null;
	public static $version;
	public static $block_name;
	public static $dir = __DIR__;

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/report-materials/build/block.json';
		self::$block_json = \wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		self::$version = self::$block_json['version'];
		self::$block_name = self::$block_json['name'];
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action('init', $this, 'block_init');
		}
	}

	public function construct_report_materials( $post_id ) {
		$report_package = new \PRC\Platform\Post_Report_Package(null, null);
		return $report_package->get_constructed_report_materials( $post_id );
	}

	public function get_item_label($item) {
		if ( array_key_exists('label', $item) && !empty($item['label']) ) {
			return $item['label'];
		}
		switch ($item['type']) {
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

	public function get_item_icon($item) {
		error_log('get_item_icon'.print_r($item, true));
		switch ($item['type']) {
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
		$color_supports = new Additional_Color_Supports(null);

		$post_id = $block->context['postId'];

		$heading_text = array_key_exists('heading', $attributes) ? $attributes['heading'] : false;

		$materials = $this->construct_report_materials( $post_id );

		if ( empty($materials) ) {
			return '';
		}

		$list_item_classnames = $color_supports->get_list_classnames(
			'wp-block-prc-block-table-of-materials',
			false,
			$attributes,
		) . ' flex-align-center';
		error_log(print_r($materials, true));

		foreach ($materials as $material) {
			$icon = \PRC\Platform\Icons\Render('solid', $this->get_item_icon($material));
			$content .= wp_sprintf(
				'<li class="%1$s">%2$s<a href="%3$s" target="_blank">%4$s</a></li>',
				$list_item_classnames,
				$icon,
				$material['url'],
				$this->get_item_label($material)
			);
		}

		$block_attrs = get_block_wrapper_attributes(array(
			'class' => 'common-block-style--baseball-card',
		));

		$block_gap = \PRC\Platform\Block_Utils\get_block_gap_support_value($attributes);

		$heading = wp_sprintf(
			'<div class="%1$s"><h2>%2$s</h2></div>',
			\PRC\Platform\Block_Utils\classNames(
				'wp-block-prc-block-table-of-contents__heading',
				array(
					'has-text-color' => $attributes['headingTextColor'],
					'has-'.$attributes['headingTextColor'].'-color' => $attributes['headingTextColor'],
					'has-background' => $attributes['headingBackgroundColor'],
					'has-'.$attributes['headingBackgroundColor'].'-background-color' => $attributes['headingBackgroundColor'],
					'is-hidden' => true === $attributes['hideHeading'],
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
		register_block_type(
			self::$dir . '/build',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}

}
