<?php
namespace PRC\Platform\Blocks;
use WP_HTML_Tag_Processor;
/**
 * Block Name:        Query Pagination Numbers
 * Version:           0.1.0
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Core_Query_Pagination_Numbers {
	public function __construct($loader) {
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_filter('render_block', $this, 'enqueue_common_pagination_styles', 10, 2);
		}
	}

	/**
	 * @hook render_block
	 * @return void
	 */
	public function enqueue_common_pagination_styles($block_content, $block) {
		if ( $block['blockName'] === 'core/query-pagination' ) {
			wp_enqueue_style('prc-block-library--pagination');
			$block_content = '<div class="common-block-style__pagination__container">' . $block_content . '</div>';
		}
		return $block_content;
	}
}

