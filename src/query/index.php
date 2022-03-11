<?php
require_once PRC_VENDOR_DIR . '/autoload.php';

use \WPackio as WPackio;

/**
 * This code involves a lot of hijacking of the query block and its internal processes and should only be touched by someone well versed in the WordPress Core and Gutenberg development and source code.
 *
 * @package prc-block-library
 */

class Query_Block extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_filter( 'render_block', array( $this, 'filter_block_render' ), 20, 2 );
			add_action( 'enqueue_block_editor_assets', array( $this, 'register_script' ) );
		}
	}

	/**
	 * Builds the query arguments from a `Query` block properties and renders the block template.
	 * @uses gutenberg_build_query_vars_from_query_block() and build_query_vars_from_query_block()
	 * @param mixed $block
	 * @param mixed $block_context
	 * @param string $content
	 * @return mixed
	 */
	public function post_template_block( $block, $block_context, $content = '' ) {
		if ( ! function_exists('gutenberg_build_query_vars_from_query_block') ) {
			return new WP_Error( 'missing_function', 'gutenberg_build_query_vars_from_query_block' );
		}
		$page_key = isset( $block_context['queryId'] ) ? 'query-' . $block_context['queryId'] . '-page' : 'query-page';
		$page     = empty( $_GET[ $page_key ] ) ? 1 : (int) $_GET[ $page_key ];

		$query_args = gutenberg_build_query_vars_from_query_block( (object) array('context' => $block_context), $page );
		$query_args['tax_query']['relation'] = 'AND'; // Enforce the AND relationship between taxonomies.

		// Override the custom query with the global query if needed.
		$use_global_query = ( isset( $block_context['query']['inherit'] ) && $block_context['query']['inherit'] );
		if ( $use_global_query ) {
			global $wp_query;
			if ( $wp_query && isset( $wp_query->query_vars ) && is_array( $wp_query->query_vars ) ) {
				// Unset `offset` because if is set, $wp_query overrides/ignores the paged parameter and breaks pagination.
				unset( $query_args['offset'] );
				$query_args = wp_parse_args( $wp_query->query_vars, $query_args );

				if ( empty( $query_args['post_type'] ) && is_singular() ) {
					$query_args['post_type'] = get_post_type( get_the_ID() );
				}
			}
		}

		$display_layout = isset( $block_context['displayLayout'] ) && isset( $block_context['displayLayout']['type'] ) ? $block_context['displayLayout']['type'] : false;

		$query = new WP_Query( $query_args );

		if ( ! $query->have_posts() ) {
			return '';
		}

		$wrapper_attributes = array( 'class' => 'ui divided relaxed story items' );
		if ( false !== $display_layout && 'flex' === $display_layout ) {
			// $wrapper_attributes['data-columns'] = $block['attrs']['displayLayout']['columns'];
		}

		$normalized_attributes = array();
		foreach ( $wrapper_attributes as $key => $value ) {
			$normalized_attributes[] = $key . '="' . esc_attr( $value ) . '"';
		}

		$block_template = $block['innerBlocks'];

		while ( $query->have_posts() ) {
			$query->the_post();
			foreach ( $block_template as $b ) {
				// Do Story Item Blocks.
				if ( 'prc-block/story-item' === $b['blockName'] ) {
					$id                      = get_the_ID();
					$b['attrs']['postId']    = $id;
					$b['attrs']['excerpt']   = get_the_excerpt( $id );
					$b['attrs']['inLoop']    = 'list' === $display_layout;
					$b['attrs'] = array_diff_key( $b['attrs'], array(
						'title' => '',
						'url' => '',
						'label' => '',
						'date' => '',
					) );
					$template_block          = new WP_Block( $b );
					$template_block->context = array(
						'inLoop' => 'list' === $display_layout,
						'query'  => $query_args,
					);
				} else {
					$template_block = new WP_Block( $b );
				}
				// Render the template block.
				$content .= $template_block->render();
			}
		}
		wp_reset_postdata();

		return wp_sprintf(
			'<section %1$s>%2$s</section>',
			implode( ' ', $normalized_attributes ),
			$content
		);
	}

	public function filter_block_render( $block_content, $block ) {
		if ( 'core/query' !== $block['blockName'] ) {
			return $block_content;
		}

		$query_template = $block['innerBlocks'];

		$context = is_array( $block ) ? $block['attrs'] : $block->attrs;

		$content = '';

		foreach ( $query_template as $q_b ) {
			if ( 'core/post-template' === $q_b['blockName'] ) {
				$content     .= $this->post_template_block( $q_b, $context );
			} else {
				$block    = new WP_Block( $q_b, $context );
				$content .= $block->render();
			}
		}

		return wp_sprintf(
			'<div class="%1$s">%2$s</div>',
			classNames( 'wp-query' ),
			$content
		);
	}

	/**
	 * Enqueue a filter plugin for the core/table block. Add's CSV drag and drop support.
	 *
	 * @uses Enqueue
	 */
	public function register_script() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );
		$enqueue->enqueue(
			'blocks',
			'query',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
	}
}

new Query_Block( true );
