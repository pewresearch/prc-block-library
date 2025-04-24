<?php
/**
 * Core Query Pagination Numbers Block
 *
 * @package PRC\Platform\Blocks
 */

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
			$loader->add_filter( 'render_block', $this, 'enqueue_common_pagination_styles', 10, 2 );
		}
	}

	/**
	 * Enqueue common pagination styles
	 *
	 * @hook render_block
	 * @param string $block_content Block content.
	 * @param array  $block Block.
	 * @return string
	 */
	public function enqueue_common_pagination_styles( $block_content, $block ) {
		if ( 'core/query-pagination' === $block['blockName'] ) {
			wp_enqueue_style( 'prc-block-library--pagination' );
			$block_content = '<div class="common-block-style__pagination__container">' . $block_content . '</div>';
		}
		return $block_content;
	}
}
