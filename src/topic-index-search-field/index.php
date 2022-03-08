<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';
use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/menu-link` block.
 *
 * @package gutenberg
 */

class Topic_Index_Search_Field extends PRC_Block_Library {
	public $parent_term_children = false;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
			add_action( 'rest_api_init', array( $this, 'register_search_endpoint' ) );
		}
	}

	public function register_search_endpoint() {
		register_rest_route(
			'prc-api/v2',
			'/blocks/topic-index-search',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'search_topics_restfully' ),
				'args'                => array(
					'search' => array(
						'validate_callback' => function( $param, $request, $key ) {
							return is_string( $param );
						},
					),
					'parent' => array(
						'validate_callback' => function( $param, $request, $key ) {
							return is_string( $param );
						},
					),
				),
				'permission_callback' => function () {
					return true;
				},
			)
		);
	}

	public function search_topics_restfully( \WP_REST_Request $request ) {
		$search_term = $request->get_param( 'search' );
		$parent      = $request->get_param( 'parent' );

		$args = array(
			'taxonomy'     => 'topic',
			'per_page'     => 25,
			'hierarchical' => true,
			'hide_empty'   => false,
		);
		if ( $search_term ) {
			$args['search'] = $search_term;
		}
		if ( $parent && false === $this->parent_term_children ) {
			$this->parent_term_children = get_term_children( $parent, 'topic' );
		}
		$terms = get_terms( $args );
		$terms = array_map(
			function( $term ) {
				$term->link        = get_term_link( $term, 'topic' );
				$term->description = wp_strip_all_tags( term_description( $term ) );
				return $term;
			},
			$terms
		);

		if ( false !== $this->parent_term_children ) {
			$terms = array_filter(
				$terms,
				function( $v ) {
					return false !== $this->parent_term_children && in_array( $v->term_id, $this->parent_term_children );
				}
			);
			// Reset value.
			$this->parent_term_children = false;
		}

		return array_values( $terms );
	}

	public function register_frontend() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );
		return $enqueue->register(
			'frontend',
			'topic-index-search-field',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
	}

	public function enqueue_frontend() {
		$registered    = $this->register_frontend();
		$script_handle = array_pop( $registered['js'] )['handle'];
		$style_handle  = array_pop( $registered['css'] )['handle'];
		wp_enqueue_script( $script_handle );
		wp_enqueue_style( $style_handle );
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$this->enqueue_frontend();
		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'class'        => 'js-react-topic-index-search-field',
				'data-term-id' => array_key_exists( 'id', $attributes ) ? $attributes['id'] : false,
			)
		);
		return wp_sprintf(
			'<div %1$s></div>',
			$wrapper_attributes,
		);
	}

	public function register_block() {
		$block_editor_js_deps = array( 'react', 'react-dom', 'wp-components', 'wp-element', 'wp-i18n', 'wp-polyfill' );
		$enqueue              = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', plugin_dir_path( __DIR__ ) );

		$registered = $enqueue->register(
			'blocks',
			'topic-index-search-field',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => $block_editor_js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . '/topic-index-search-field',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Topic_Index_Search_Field( true );
