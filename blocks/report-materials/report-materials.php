<?php
namespace PRC\Platform\Blocks;
use WP_Error;
use WP_HTML_Heading_Processor;
/**
 * Block Name:        Report Materials
 * Description:       Displays a list of materials from a post report package.
 * Version:           3.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Report_Materials {
	public static $dir = __DIR__;

	public function __construct( $plugin_version ) {

	}

	public function construct_report_materials( $post_id ) {
		$report_package = new \PRC\Platform\Post_Report_Package(null, null);
		return $report_package->get_constructed_report_materials( $post_id );
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$post_id = $block->context['postId'];

		$materials = $this->construct_report_materials( $post_id );

		foreach ($materials as $material) {
			$content .= '<li>'.$material['key'].'</li>';
		}

		$block_attrs = get_block_wrapper_attributes(array());

		return wp_sprintf(
			'<div %1$s>%2$s</div>',
			$block_attrs,
			$content
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

