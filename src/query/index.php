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
			add_filter( 'block_type_metadata', array( $this, 'filter_block_metadata' ), 100, 1 );
			add_action( 'enqueue_block_editor_assets', array( $this, 'register_script' ) );
		}
	}

	/**
	 * Helper function that constructs a WP_Query args array from
	 * a `Query` block properties.
	 *
	 * It's used in QueryLoop, QueryPaginationNumbers and QueryPaginationNext blocks.
	 *
	 * @param WP_Block $block Block instance.
	 * @param int      $page  Current query's page.
	 *
	 * @return array Returns the constructed WP_Query arguments.
	 */
	private function build_query_vars_from_attributes( $block, $page ) {
		error_log( 'build_query_vars_from_query_block' . print_r( $block, true ) );
		$query = array(
			'post_type'    => 'post',
			'order'        => 'DESC',
			'orderby'      => 'date',
			'post__not_in' => array(),
			'post_parent'  => 0, // Only retrieve parent posts.
		);

		if ( isset( $block['query'] ) ) {
			if ( ! empty( $block['query']['postType'] ) ) {
				$post_type_param = $block['query']['postType'];
				if ( is_post_type_viewable( $post_type_param ) ) {
					$query['post_type'] = $post_type_param;
				}
			}
			if ( isset( $block['query']['sticky'] ) && ! empty( $block['query']['sticky'] ) ) {
				$sticky = get_option( 'sticky_posts' );
				if ( 'only' === $block['query']['sticky'] ) {
					$query['post__in'] = $sticky;
				} else {
					$query['post__not_in'] = array_merge( $query['post__not_in'], $sticky );
				}
			}
			if ( ! empty( $block['query']['exclude'] ) ) {
				$excluded_post_ids     = array_map( 'intval', $block['query']['exclude'] );
				$excluded_post_ids     = array_filter( $excluded_post_ids );
				$query['post__not_in'] = array_merge( $query['post__not_in'], $excluded_post_ids );
			}
			if (
				isset( $block['query']['perPage'] ) &&
				is_numeric( $block['query']['perPage'] )
			) {
				$per_page = absint( $block['query']['perPage'] );
				$offset   = 0;

				if (
					isset( $block['query']['offset'] ) &&
					is_numeric( $block['query']['offset'] )
				) {
					$offset = absint( $block['query']['offset'] );
				}

				$query['offset']         = ( $per_page * ( $page - 1 ) ) + $offset;
				$query['posts_per_page'] = $per_page;
			}
			if ( ! empty( $block['query']['categoryIds'] ) ) {
				$term_ids              = array_map( 'intval', $block['query']['categoryIds'] );
				$term_ids              = array_filter( $term_ids );
				$query['category__in'] = $term_ids;
			}
			if ( ! empty( $block['query']['tagIds'] ) ) {
				$term_ids         = array_map( 'intval', $block['query']['tagIds'] );
				$term_ids         = array_filter( $term_ids );
				$query['tag__in'] = $term_ids;
			}
			if (
				isset( $block['query']['order'] ) &&
					in_array( strtoupper( $block['query']['order'] ), array( 'ASC', 'DESC' ), true )
			) {
				$query['order'] = strtoupper( $block['query']['order'] );
			}
			if ( isset( $block['query']['orderBy'] ) ) {
				$query['orderby'] = $block['query']['orderBy'];
			}
			if (
				isset( $block['query']['author'] ) &&
				(int) $block['query']['author'] > 0
			) {
				$query['author'] = (int) $block['query']['author'];
			}
			if ( ! empty( $block['query']['search'] ) ) {
				$query['s'] = $block['query']['search'];
			}
		}
		if ( ! empty( $block['taxQuery'] ) && ! empty( $block['taxQuery']['data'] ) ) {
			$query['tax_query'] = $block['taxQuery'];
		}
		return $query;
	}

	public function post_template_block( $block ) {
		error_log( 'post_template_block' . print_r( $block, true ) );
		$page_key = isset( $block['queryId'] ) ? 'query-' . $block['queryId'] . '-page' : 'query-page';
		$page     = empty( $_GET[ $page_key ] ) ? 1 : (int) $_GET[ $page_key ];

		$query_args = $this->build_query_vars_from_attributes( $block['attrs'], $page );
		
		// Override the custom query with the global query if needed.
		$use_global_query = ( isset( $block['query']['inherit'] ) && $block['query']['inherit'] );
		if ( $use_global_query ) {
			error_log( 'using global wp query' );
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

		$query = new WP_Query( $query_args );

		if ( ! $query->have_posts() ) {
			return '';
		}

		$wrapper_attributes = array( 'class' => 'ui divided relaxed story items' );
		if ( isset( $block['attrs']['displayLayout'] ) ) {
			if ( isset( $block['attrs']['displayLayout']['type'] ) && 'flex' === $block['attrs']['displayLayout']['type'] ) {
				$wrapper_attributes['data-columns'] = $block['attrs']['displayLayout']['columns'];
			}
		}
		$wrapper_attributes = get_block_wrapper_attributes( $wrapper_attributes );

		$block_template = $block['innerBlocks'];

		$content = '';
		while ( $query->have_posts() ) {
			$query->the_post();
			foreach ( $block_template as $b ) {
				// Do Story Item Blocks.
				if ( 'prc-block/story-item' === $b['blockName'] ) {
					$id                      = get_the_ID();
					$b['attrs']['postId']    = $id;
					$b['attrs']['excerpt']   = get_the_excerpt( $id );
					$b['attrs']['inLoop']    = 'list' === $block['attrs']['displayLayout']['type'];
					$template_block          = new WP_Block( $b );
					$template_block->context = array(
						'inLoop' => 'list' === $block['attrs']['displayLayout']['type'],
						'query'  => $query_args,
					);
				} else {
					$template_block = new WP_Block( $b );
				}
				$content .= $template_block->render();
			}
		}
		wp_reset_postdata();

		return sprintf(
			'<section %1$s>%2$s</section>',
			$wrapper_attributes,
			$content
		);
	}

	public function filter_block_render( $block_content, $block ) {
		if ( 'core/query' !== $block['blockName'] ) {
			return $block_content;
		}
		
		$classnames = classNames( 'wp-query' );

		$query_template = $block['innerBlocks'];

		$context = is_array( $block ) ? $block['attrs'] : $block->attrs;

		$content = '';
		error_log( 'STARTING QUERY' );
		foreach ( $query_template as $q_b ) {
			if ( 'core/post-template' === $q_b['blockName'] ) {
				$q_b['attrs'] = $context;
				$content     .= $this->post_template_block( $q_b );
			} else {
				$block    = new WP_Block( $q_b, $context );
				$content .= $block->render();
			}
		}
		error_log( 'ENDING QUERY' );

		return sprintf(
			'<div class="%1$s">%2$s</div>',
			$classnames,
			$content
		);
	}

	public function filter_block_metadata( $metadata ) {
		if ( 'core/query' !== $metadata['name'] ) {
			return $metadata;
		}

		if ( ! array_key_exists( 'taxQuery', $metadata['attributes'] ) ) {
			$metadata['attributes']['taxQuery'] = array(
				'type'    => 'object',
				'default' => array(
					'relation' => 'OR',
					'data'     => array(),
				),
			);
		}
		return $metadata;
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
