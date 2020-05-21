<?php
/**
 * Plugin Name: PRC Block Library
 * Plugin URI: https://pewresearch.org
 * Description: PRC Block Library: Story Item, Card, Pancake Promo, Posts (Fact Tank Widget)
 * Author: Seth Rubenstein
 * Author URI: https://sethrubenstein.info
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';
use WPackio\Enqueue;

class PRC_Block_Library {

	protected $js_deps = array( 'react', 'react-dom', 'wp-element', 'wp-components', 'wp-polyfill', 'wp-i18n' );
	public $plugin_dir = false;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			$this->plugin_dir = __DIR__ . '/prc_blocks/';
			add_action( 'init', array( $this, 'register_block_assets' ) );
			add_action( 'init', array( $this, 'block_story_item_register_meta' ) );
			add_filter( 'wp_kses_allowed_html', array( $this, 'allowed_html_tags' ), 10, 2 );
			add_action( 'rest_api_init', array( $this, 'register_rest_endpoints' ) );
			add_action( 'acf/init', array( $this, 'acf_shim' ) );
			add_action( 'wp_enqueue_scripts', array( $this, 'posts_block_dynamic_render' ) );
		}
	}

	public function acf_shim() {
		// get post types assigned to byline.
		// register a testimonial block.
		$post_types = array( 'post' );
		acf_register_block_type(
			array(
				'name'            => 'bylines',
				'title'           => __( 'Bylines' ),
				'description'     => __( 'Bylines' ),
				'render_callback' => array( $this, 'acf_byline_render' ),
				'category'        => 'formatting',
				'icon'            => 'groups',
				'keywords'        => array( 'byline', 'bylines' ),
				'post_types'      => $post_types,
				// 'mode'            => 'edit',
				'supports'        => array(
					'multiple' => false,
				),
			)
		);
	}

	public function acf_byline_render() {
		ob_start();
		?>
		<div>Bylines Test</div>
		<?php
		return ob_get_clean();
	}

	/**
	 * Filter the allowed tags for KSES to allow for amp-story children.
	 *
	 * @param array $allowed_tags Allowed tags.
	 * @return array Allowed tags.
	 */
	public static function allowed_html_tags( $allowed_tags ) {
		$allowed_tags['img']['srcset'] = true;
		$allowed_tags['img']['sizes']  = true;
		$allowed_tags['picture']       = true;
		$allowed_tags['source']        = array(
			'srcset' => true,
			'media'  => true,
			'type'   => true,
		);
		return $allowed_tags;
	}

	/**
	 * Enqueue Gutenberg block assets for both frontend + backend.
	 *
	 * Assets enqueued:
	 * 1. blocks.style.build.css - Frontend + Backend.
	 * 2. blocks.build.js - Backend.
	 * 3. blocks.editor.build.css - Backend.
	 *
	 * @uses {wp-blocks} for block type registration & related functions.
	 * @uses {wp-element} for WP Element abstraction — structure of blocks.
	 * @uses {wp-i18n} to internationalize the block's text.
	 * @uses {wp-editor} for WP editor styles.
	 * @since 1.0.0
	 */
	public function register_block_assets() { // phpcs:ignore
		$mailchimp = new PRC_API_Mailchimp( true );
		$enqueue   = new Enqueue( 'prcBlocksLibrary', 'dist', '1.0.0', 'plugin', $this->plugin_dir );

		// Story Item
		$js_deps    = $this->js_deps;
		$js_deps[]  = 'moment';
		$story_item = $enqueue->register(
			'story-item',
			'main',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => $js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
		register_block_type(
			'prc-block/story-item',
			array(
				// We're only enqueing these in the block editor, not the front end.
				'editor_script' => array_pop( $story_item['js'] )['handle'],
				'editor_style'  => array_pop( $story_item['css'] )['handle'],
			)
		);

		// Card
		$card = $enqueue->register(
			'card',
			'main',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => $js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
		register_block_type(
			'prc-block/card',
			array(
				// We're only enqueing these in the block editor, not the front end.
				'editor_script' => array_pop( $card['js'] )['handle'],
				'style'         => array_pop( $card['css'] )['handle'],
			)
		);

		// Callout
		$callout = $enqueue->register(
			'callout',
			'main',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => $this->js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
		register_block_type(
			'prc-block/callout',
			array(
				// We're only enqueing these in the block editor, not the front end.
				'editor_script' => array_pop( $callout['js'] )['handle'],
			)
		);

		// Collapsible
		$collapsible = $enqueue->register(
			'collapsible',
			'main',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => $this->js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
		$collapsible_frontend = $enqueue->register(
			'collapsible',
			'frontend',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => $this->js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
		// Will need frontend.
		register_block_type(
			'prc-block/collapsible',
			array(
				// We're only enqueing these in the block editor, not the front end.
				'editor_script' => array_pop( $collapsible['js'] )['handle'],
				'script' =>  array_pop( $collapsible_frontend['js'] )['handle'],
			)
		);

		// Columns
		$columns = $enqueue->register(
			'columns',
			'main',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => $js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
		register_block_type(
			'prc-block/columns',
			array(
				// We're only enqueing these in the block editor, not the front end.
				'editor_script' => array_pop( $columns['js'] )['handle'],
				'editor_style'         => array_pop( $columns['css'] )['handle'],
			)
		);

		// Column
		$column = $enqueue->register(
			'column',
			'main',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => $js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
		register_block_type(
			'prc-block/column',
			array(
				// We're only enqueing these in the block editor, not the front end.
				'editor_script' => array_pop( $column['js'] )['handle'],
				'editor_style'         => array_pop( $column['css'] )['handle'],
			)
		);

		// Follow Us
		$js_deps                   = $this->js_deps;
		$follow_us                 = $enqueue->register(
			'follow-us',
			'main',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => $js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
		$js_deps                   = $this->js_deps;
		$js_deps[]                 = 'wp-block-editor';
		$js_deps[]                 = 'wp-api-fetch';
		$follow_us_frontend        = $enqueue->register(
			'follow-us',
			'frontend',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => $js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
		$follow_us_frontend_handle = array_pop( $follow_us_frontend['js'] )['handle'];
		wp_localize_script(
			$follow_us_frontend_handle,
			'prcMailchimpBlock', // Array containing dynamic data for a JS Global.
			$mailchimp->get_interests()
		);
		register_block_type(
			'prc-block/follow-us',
			array(
				// We're only enqueing these in the block editor, not the front end.
				'editor_script' => array_pop( $follow_us['js'] )['handle'],
				'script'        => $follow_us_frontend_handle,
			)
		);

		// Mailchimp Form
		$js_deps                        = $this->js_deps;
		$mailchimp_form_block           = $enqueue->register(
			'mailchimp-form',
			'main',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => $js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
		$mailchimp_form_frontend        = $enqueue->register(
			'mailchimp-form',
			'frontend',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => $js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
		$mailchimp_form_block_script    = array_pop( $mailchimp_form_block['js'] )['handle'];
		$mailchimp_form_frontend_script = array_pop( $mailchimp_form_frontend['js'] )['handle'];
		// $mailchimp_form_style           = array_pop( $mailchimp_form_block['css'] )['handle'];
		wp_localize_script(
			$mailchimp_form_block_script,
			'prcMailchimpForm', // Array containing dynamic data for a JS Global.
			array(
				'interests' => $mailchimp->get_interests(),
			)
		);
		register_block_type(
			'prc-block/mailchimp-form',
			array(
				// We're only enqueing these in the block editor, not the front end.
				'editor_script' => $mailchimp_form_block_script,
				'script'        => $mailchimp_form_frontend_script,
				// 'style'         => $$mailchimp_form_style,
			)
		);

		// Promo
		$promo = $enqueue->register(
			'promo',
			'main',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => $this->js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
		register_block_type(
			'prc-block/promo',
			array(
				// We're only enqueing these in the block editor, not the front end.
				'editor_script' => array_pop( $promo['js'] )['handle'],
				'style'         => array_pop( $promo['css'] )['handle'],
			)
		);

		// Button
		$button = $enqueue->register(
			'button',
			'main',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => $this->js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
		register_block_type(
			'prc-block/button',
			array(
				// We're only enqueing these in the block editor, not the front end.
				'editor_script' => array_pop( $button['js'] )['handle'],
				'style'         => array_pop( $button['css'] )['handle'],
			)
		);

		// Posts
		$js_deps   = $this->js_deps;
		$js_deps[] = 'moment';
		$posts     = $enqueue->register(
			'posts',
			'main',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => $js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
		register_block_type(
			'prc-block/posts',
			array(
				// We're only enqueing these in the block editor, not the front end.
				'editor_script' => array_pop( $posts['js'] )['handle'],
				'style'         => array_pop( $posts['css'] )['handle'],
			)
		);

		// Taxonomy Tree
		$taxonomy_tree = $enqueue->register(
			'taxonomy-tree',
			'main',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => $this->js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
		$taxonomy_tree_frontend = $enqueue->register(
			'taxonomy-tree',
			'frontend',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => $this->js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
		register_block_type(
			'prc-block/taxonomy-tree',
			array(
				// We're only enqueing these in the block editor, not the front end.
				'editor_script' => array_pop( $taxonomy_tree['js'] )['handle'],
				'style'         => array_pop( $taxonomy_tree['css'] )['handle'],
				'script'        => array_pop( $taxonomy_tree_frontend['js'] )['handle'],
			)
		);

		// Taxonomy Tree List
		$tax_tree_list = $enqueue->register(
			'taxonomy-tree-list',
			'main',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => $this->js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
		$tax_tree_list_frontend = $enqueue->register(
			'taxonomy-tree-list',
			'frontend',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => $this->js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
		register_block_type(
			'prc-block/taxonomy-tree-list',
			array(
				// We're only enqueing these in the block editor, not the front end.
				'editor_script' => array_pop( $tax_tree_list['js'] )['handle'],
				'script'        => array_pop( $tax_tree_list_frontend['js'] )['handle'],
				'style'         => array_pop( $tax_tree_list['css'] )['handle'],
			)
		);

	}

	/**
	 * Enqueue prc-block/posts in the front end for dynamic rendering.
	 *
	 * @return void
	 */
	public function posts_block_dynamic_render() {
		$enqueue   = new Enqueue( 'prcBlocksLibrary', 'dist', '1.0.0', 'plugin', $this->plugin_dir );
		$js_deps   = $this->js_deps;
		$js_deps[] = 'moment';
		$js_deps[] = 'wp-block-editor';

		$enqueue->enqueue(
			'posts',
			'frontend',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => $js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
	}

	// register custom meta tag field
	public function block_story_item_register_meta() {
		register_post_meta(
			'prc-block-areas',
			'featured_posts',
			array(
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'string',
			)
		);
	}

	public function register_rest_endpoints() {
		register_rest_route(
			'prc-api/v2/blocks/helpers',
			'/get-posts',
			array(
				'methods'  => 'GET',
				'callback' => array( $this, 'get_block_lib_posts' ),
				'args'     => array(
					'format'        => array(
						'validate_callback' => function( $param, $request, $key ) {
							return is_string( $param );
						},
					),
					'program'       => array(
						'validate_callback' => function( $param, $request, $key ) {
							return is_string( $param );
						},
					),
					'perPage'       => array(
						'validate_callback' => function( $param, $request, $key ) {
							return is_string( $param );
						},
					),
					'labelTaxonomy' => array(
						'validate_callback' => function( $param, $request, $key ) {
							return is_string( $param );
						},
					),
				),
			)
		);
		register_rest_route(
			'prc-api/v2/blocks/helpers',
			'/get-post-by-url',
			array(
				'methods'  => 'GET',
				'callback' => array( $this, 'get_stub_post_by_post_url_restfully' ),
				'args'     => array(
					'url'    => array(
						'validate_callback' => function( $param, $request, $key ) {
							return is_string( $param );
						},
					),
					'siteID' => array(
						'validate_callback' => function( $param, $request, $key ) {
							return is_string( $param );
						},
					),
				),
			)
		);
	}

	public function get_block_lib_posts( \WP_REST_Request $request ) {
		$format         = $request->get_param( 'format' );
		$program        = $request->get_param( 'program' );
		$per_page       = $request->get_param( 'perPage' );
		$label_taxonomy = $request->get_param( 'labelTaxonomy' );

		// If the current site is not 1 then for the format and the program we should get their parent term ids
		if ( 1 !== get_current_blog_id() ) {
			$format  = get_term_meta( $format, '_origin_term_id', true );
			$program = get_term_meta( $program, '_origin_term_id', true );
		}

		$args = array(
			'post_type'        => 'stub',
			'post_per_page'    => (int) $per_page,
			'post_parent'      => 0, // No Children
			'meta_key'         => 'hide_on_index',
			'meta_compare_key' => 'NOT EXISTS',
			'tax_query'        => array(
				'relation' => 'AND',
			),
		);
		if ( $format ) {
			$args['tax_query'][] = array(
				'taxonomy' => 'formats',
				'terms'    => $format,
				'field'    => 'term_id',
			);
		}
		if ( $program ) {
			$args['tax_query'][] = array(
				'taxonomy' => 'programs',
				'terms'    => $program,
				'field'    => 'term_id',
			);
		}

		// The Query
		switch_to_blog( 1 );
		$the_query = new WP_Query( $args );

		$return = array();
		// The Loop
		if ( $the_query->have_posts() ) {
			while ( $the_query->have_posts() ) {
				$the_query->the_post();
				$stub_info = get_post_meta( get_the_ID(), '_stub_info', true );
				$term      = get_term_by( 'slug', $stub_info['_taxonomies'][ $label_taxonomy ][0], $label_taxonomy );
				$label     = $term->name;
				$return[]  = array(
					'id'        => get_the_ID(),
					'title'     => get_the_title(),
					'date'      => get_the_date(),
					'timestamp' => get_the_time( 'c' ),
					'link'      => get_permalink(),
					'label'     => $label,
					'image'     => get_the_post_thumbnail_url( get_the_ID(), 'large' ),
				);
			}
		}

		/* Restore original Post Data */
		wp_reset_postdata();
		restore_current_blog();
		return $return;
	}

	public function get_stub_post_by_post_url_restfully( \WP_REST_Request $request ) {
		$url     = $request->get_param( 'url' );
		$site_id = $request->get_param( 'siteID' );
		return $this->get_stub_post_by_post_url( $url, $site_id );
	}

	private function get_fact_tank_post_by_slug( $slug ) {
		if ( ! is_string( $slug ) ) {
			return false;
		}
		$args  = array(
			'name'        => $slug,
			'post_type'   => 'fact-tank',
			'post_status' => 'publish',
			'numberposts' => 1,
		);
		$posts = get_posts( $args );
		if ( $posts ) {
			return $posts[0]->ID;
		} else {
			return false;
		}
	}

	public function get_stub_post_by_post_url( $url, $site_id ) {
		$return = false;
		if ( false == $site_id ) {
			return 'No Site ID Found ' . $url;
		}

		$current_site_id = get_current_blog_id();

		switch_to_blog( $site_id );
		// If url contains fact-tank right after the url then go get the slug and fetch post that way.
		$test = 'http://pewresearch.local/fact-tank/2020/04/02/5-facts-about-partisan-reactions-to-covid-19-in-the-u-s/';
		if ( false !== strpos( $url, '/fact-tank/' ) ) {
			$slug    = basename( $url );
			$post_id = $this->get_fact_tank_post_by_slug( $slug );
		} else {
			$post_id = url_to_postid( $url );
		}

		if ( 0 === $post_id ) {
			return 'URL TO POSTID ' . $site_id . '-' . $url;
		}

		$stub_id = get_post_meta( $post_id, '_stub_post', true );
		if ( ! $stub_id ) {
			return 'GET STUB POST ' . $site_id . '-' . $post_id . '-' . $url;
		}
		restore_current_blog();

		if ( 1 !== $current_site_id ) {
			switch_to_blog( 1 );
		}

		$stub_post = get_post( $stub_id );
		if ( false === $stub_post ) {
			return 'STUB ' . $site_id . '-' . $post_id . '-' . $stub_id;
		}

		$stub_info = get_post_meta( $stub_post->ID, '_stub_info', true );

		$format_term = get_term_by( 'slug', $stub_info['_taxonomies']['formats'][0], 'formats' );

		$featured_image = array();

		$return = array(
			'id'        => $stub_post->ID,
			'title'     => esc_attr( $stub_post->post_title ),
			'excerpt'   => "<p>{$stub_post->post_excerpt}</p>",
			'date'      => get_the_date( 'M d, Y', $stub_post->ID ),
			'timestamp' => get_the_time( 'c', $stub_post->ID ),
			'label'     => $format_term->name,
			'link'      => get_post_meta( $stub_post->ID, '_redirect', true ),
			'image'     => $stub_info['_featured_image'],
			'imageID'   => '',
		);

		if ( 1 !== $current_site_id ) {
			restore_current_blog();
		}

		return $return;
	}
}

new PRC_Block_Library( true );
