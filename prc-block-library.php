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
require_once __DIR__ . '/vendor/autoload.php';

class PRC_Block_Library {

	protected $js_deps = array( 'react', 'react-dom', 'wp-element', 'wp-components', 'wp-polyfill', 'wp-i18n' );
	public $plugin_dir = false;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			$this->plugin_dir = __DIR__ . '/prc_blocks/';
			add_action( 'init', array( $this, 'register_block_assets' ) );
			add_action( 'init', array( $this, 'block_story_item_register_meta' ) );
			add_action( 'rest_api_init', array( $this, 'register_rest_endpoints' ) );
			add_action( 'acf/init', array( $this, 'acf_shim' ) );
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
		$enqueue = new \WPackio\Enqueue( 'prcBlocksLibrary', 'dist', '1.0.0', 'plugin', $this->plugin_dir );

		// Story Item
		$js_deps    = $this->js_deps;
		$js_deps[]  = 'moment';
		$story_item = $enqueue->register(
			'story-item',
			'main',
			[
				'js'        => true,
				'css'       => true,
				'js_dep'    => $js_deps,
				'css_dep'   => [],
				'in_footer' => true,
				'media'     => 'all',
			]
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
			[
				'js'        => true,
				'css'       => false,
				'js_dep'    => $js_deps,
				'css_dep'   => [],
				'in_footer' => true,
				'media'     => 'all',
			]
		);
		register_block_type(
			'prc-block/card',
			array(
				// We're only enqueing these in the block editor, not the front end.
				'editor_script' => array_pop( $card['js'] )['handle'],
			)
		);

		// Pancake Promo
		$pancake_promo = $enqueue->register(
			'pancake-promo',
			'main',
			[
				'js'        => true,
				'css'       => true,
				'js_dep'    => $this->js_deps,
				'css_dep'   => [],
				'in_footer' => true,
				'media'     => 'all',
			]
		);
		register_block_type(
			'prc-block/pancake-promo',
			array(
				// We're only enqueing these in the block editor, not the front end.
				'editor_script' => array_pop( $pancake_promo['js'] )['handle'],
				'style'         => array_pop( $pancake_promo['css'] )['handle'],
			)
		);

		// Posts
		$js_deps   = $this->js_deps;
		$js_deps[] = 'moment';
		$posts     = $enqueue->register(
			'posts',
			'main',
			[
				'js'        => true,
				'css'       => true,
				'js_dep'    => $js_deps,
				'css_dep'   => [],
				'in_footer' => true,
				'media'     => 'all',
			]
		);
		register_block_type(
			'prc-block/posts',
			array(
				// We're only enqueing these in the block editor, not the front end.
				'editor_script' => array_pop( $posts['js'] )['handle'],
				'style'         => array_pop( $posts['css'] )['handle'],
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
			'/get-post-by-url',
			array(
				'methods'  => 'GET',
				'callback' => array( $this, 'get_stub_post_by_post_url_restfully' ),
				'args'     => array(
					'url' => array(
						'validate_callback' => function( $param, $request, $key ) {
							return is_string( $param );
						},
					),
				),
			)
		);
	}

	public function get_stub_post_by_post_url_restfully( \WP_REST_Request $request ) {
		$url = $request->get_param( 'url' );
		return $this->get_stub_post_by_post_url( $url );
	}

	public function get_stub_post_by_post_url( $url ) {
		$return = false;

		$site_id = prc_get_site_id_from_url( $url, true, prc_is_dev_env() );

		switch_to_blog( $site_id );
		$post_id = url_to_postid( $url );
		if ( false === $post_id ) {
			return false;
		}
		$stub_id = get_post_meta( $post_id, '_stub_post', true );
		if ( ! $stub_id ) {
			return false;
		}
		restore_current_blog();

		$stub_post = get_post( $stub_id );
		if ( false === $stub_post ) {
			return false;
		}

		$stub_info = get_post_meta( $stub_post->ID, '_stub_info', true );

		$format_term = get_term_by( 'slug', $stub_info['_taxonomies']['formats'][0], 'formats' );

		$return = array(
			'id'      => $stub_post->ID,
			'title'   => esc_attr( $stub_post->post_title ),
			'excerpt' => "<p>{$stub_post->post_excerpt}</p>",
			'date'    => get_the_date( 'M d, Y', $stub_post->ID ),
			'label'   => $format_term->name,
			'link'    => get_post_meta( $stub_post->ID, '_redirect', true ),
			'image'   => $stub_info['_featured_image'],
		);

		return $return;
	}
}

new PRC_Block_Library( true );
