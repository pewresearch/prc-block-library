<?php
/**
 * PRC Block Library
 *
 * @package           PRC_Block_Library
 * @author            Seth Rubenstein
 * @copyright         2021 Pew Research Center
 * @license           GPL-2.0-or-later
 *
 * @wordpress-plugin
 * Plugin Name:       PRC Block Library
 * Plugin URI:        https://pewresearch.org
 * Description:       PRC Block Library
 * Version:           1.0.0
 * Requires at least: 5.2
 * Requires PHP:      7.4
 * Author:            Seth Rubenstein
 * Author URI:        https://sethrubenstein.info
 * Text Domain:       prc-user-surveys
 * License:           GPL v2 or later
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';
use WPackio\Enqueue;

class PRC_Block_Library {
	/**
	 * Easily accessible variable that points to the plugin filepath. 
	 *
	 * @var string
	 */
	public static $plugin_file = __FILE__;
	/**
	 * Version, change whenever you push a change to production otherwise script concatenation will break Gutenberg.
	 *
	 * @var string
	 */
	public static $version = '1.0.1';

	/**
	 * Registered wpackio assets
	 *
	 * @var array
	 */
	public $registered = array();
	public $enqueue    = false;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			// @TODO Needs to be moved into shared wpack vendor outputs.
			require_once plugin_dir_path( __FILE__ ) . '/src/fact-sheet-collection/index.php';

			// Using shared wpack vendor outputs.
			// Layout Primitives.
			require_once plugin_dir_path( __FILE__ ) . '/src/grid/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/row/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/column/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/chart-builder-data-wrapper/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/chart-builder/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/collapsible/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/cover/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/group/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/heading/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/mailchimp-form/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/menu/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/menu-link/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/post-bylines/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/post-title/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/promo/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/promo-rotator/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/social-link/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/story-item/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/table/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/tabs/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/taxonomy-tree/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/taxonomy-tree-more/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/topic-index-az/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/topic-index-az-controller/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/topic-index-categorized/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/topic-index-condensed/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/topic-index-search-field/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/wp-query/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/wp-object/index.php';

			// @TODO This needs to be gone through once all the blocks are moved into the format ^ above
			add_filter( 'wp_kses_allowed_html', array( $this, 'allowed_html_tags' ), 10, 2 );
			add_action( 'init', array( $this, 'register_assets' ), 10 );
			add_action( 'init', array( $this, 'register_blocks' ), 11 );
			add_action( 'rest_api_init', array( $this, 'register_rest_endpoints' ) );
		}
	}

	/**
	 * Filter the allowed tags for KSES to allow for amp-story children.
	 *
	 * @param array $allowed_tags Allowed tags.
	 * @return array Allowed tags.
	 */
	public static function allowed_html_tags( $allowed_tags ) {
		$allowed_tags['div']['style']  = true;
		$allowed_tags['img']['srcset'] = true;
		$allowed_tags['img']['sizes']  = true;
		$allowed_tags['picture']       = true;
		$allowed_tags['source']        = array(
			'srcset' => true,
			'media'  => true,
			'type'   => true,
		);
		// Add SVG Support
		$allowed_tags['svg']  = array(
			'xmlns'       => array(),
			'fill'        => array(),
			'viewbox'     => array(),
			'role'        => array(),
			'aria-hidden' => array(),
			'focusable'   => array(),
		);
		$allowed_tags['path'] = array(
			'd'    => array(),
			'fill' => array(),
		);
		$allowed_tags['rect'] = array(
			'x'      => array(),
			'y'      => array(),
			'width'  => array(),
			'height' => array(),
			'fill'   => array(),
		);
		return $allowed_tags;
	}

	public function get_handle( $block_name, $asset_type, $location = 'block' ) {
		return array_pop( $this->registered[ $location ][ $block_name ][ $asset_type ] )['handle'];
	}

	/**
	 * Register block assets here. Format as follows:
	 * $this->registered[block|frontend][blockName] = wpPackIo register array
	 *
	 * @return void
	 * @throws LogicException
	 */
	public function register_assets() {
		$js_deps       = array( 'react', 'react-dom', 'wp-dom-ready', 'wp-element', 'wp-i18n', 'wp-polyfill' );
		$block_js_deps = array_merge( $js_deps, array( 'wp-components' ) );
		$enqueue       = new Enqueue( 'prcBlocksLibrary', 'dist', '1.0.0', 'plugin', __DIR__ . '/prc_blocks/' );

		/** Chapter */
		$this->registered['block']['prc-block/chapter'] = $enqueue->register(
			'chapter',
			'main',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => $block_js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		/** Flip Cards */
		$this->registered['block']['prc-block/flip-card']    = $enqueue->register(
			'flip-card',
			'main',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => $block_js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
		$this->registered['frontend']['prc-block/flip-card'] = $enqueue->register(
			'flip-card',
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

		/** Mailchimp Opt Down Special Form */
		$this->registered['block']['prc-block/mailchimp-opt-down']    = $enqueue->register(
			'mailchimp-opt-down',
			'main',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => $block_js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
		$this->registered['frontend']['prc-block/mailchimp-opt-down'] = $enqueue->register(
			'mailchimp-opt-down',
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

		/** Post Publish Date */
		$this->registered['block']['prc-block/post-publish-date'] = $enqueue->register(
			'post-publish-date',
			'main',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => $block_js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		/** Pullquote */
		$this->registered['block']['prc-block/pullquote'] = $enqueue->register(
			'pullquote',
			'main',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => array_merge( $block_js_deps, array( 'wp-block-editor', 'wp-blocks', 'wp-rich-text' ) ),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		/** Staff */
		$this->registered['block']['prc-block/staff'] = $enqueue->register(
			'staff',
			'main',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => $block_js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		/** Sub Title */
		$this->registered['block']['prc-block/subtitle'] = $enqueue->register(
			'subtitle',
			'main',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => $block_js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
	}

	/**
	 * Register blocks and editor scripts/styles. DO NOT use the `script` frontend attribute when registering a block type.
	 * If your block has frontend script asset that needs to be localized load the function `enqueue_frontend_assets`.
	 *
	 * @return void
	 */
	public function register_blocks() {

		/** Chapter */
		register_block_type(
			'prc-block/chapter',
			array(
				'editor_script' => array_pop( $this->registered['block']['prc-block/chapter']['js'] )['handle'],
			)
		);

		/** Flip Card */
		register_block_type(
			'prc-block/flip-card',
			array(
				'editor_script'   => array_pop( $this->registered['block']['prc-block/flip-card']['js'] )['handle'],
				'editor_style'    => array_pop( $this->registered['block']['prc-block/flip-card']['css'] )['handle'],
				'render_callback' => function( $attributes, $content, $block ) {
					wp_enqueue_script( array_pop( $this->registered['frontend']['prc-block/flip-card']['js'] )['handle'] );
					wp_enqueue_style( array_pop( $this->registered['frontend']['prc-block/flip-card']['css'] )['handle'] );
					return $content;
				},
			)
		);

		/** Mailchimp Opt Down Special Form */
		register_block_type(
			'prc-block/mailchimp-opt-down',
			array(
				'editor_script'   => array_pop( $this->registered['block']['prc-block/mailchimp-opt-down']['js'] )['handle'],
				'render_callback' => function( $attributes, $content, $block ) {
					wp_enqueue_script( array_pop( $this->registered['frontend']['prc-block/mailchimp-opt-down']['js'] )['handle'] );
					wp_enqueue_style( array_pop( $this->registered['frontend']['prc-block/mailchimp-opt-down']['css'] )['handle'] );
					return $content;
				},
			)
		);

		/** Post Publish Date */
		register_block_type(
			'prc-block/post-publish-date',
			array(
				'editor_script' => array_pop( $this->registered['block']['prc-block/post-publish-date']['js'] )['handle'],
			)
		);

		/** Pullquote */
		register_block_type(
			'prc-block/pullquote',
			array(
				'editor_script' => array_pop( $this->registered['block']['prc-block/pullquote']['js'] )['handle'],
			)
		);

		/** Staff */
		register_block_type(
			'prc-block/staff',
			array(
				'editor_script' => array_pop( $this->registered['block']['prc-block/staff']['js'] )['handle'],
				'style'         => array_pop( $this->registered['block']['prc-block/staff']['css'] )['handle'],
			)
		);

		/** Sub Title */
		register_post_meta(
			'post',
			'sub_headline',
			array(
				'show_in_rest'  => true,
				'single'        => true,
				'type'          => 'string',
				'description'   => 'A sub title for posts.',
				'auth_callback' => function() {
					return current_user_can( 'edit_posts' );
				},
			)
		);
		register_block_type(
			'prc-block/subtitle',
			array(
				'editor_script' => array_pop( $this->registered['block']['prc-block/subtitle']['js'] )['handle'],
			)
		);

	}

	public function register_rest_endpoints() {
		register_rest_route(
			'prc-api/v2',
			'/blocks/helpers/get-posts',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_block_lib_posts' ),
				'args'                => array(
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
				'permission_callback' => function () {
					return true;
				},
			)
		);

		register_rest_route(
			'prc-api/v2',
			'/blocks/helpers/get-staff-by-url',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_staff_post_by_post_url_restfully' ),
				'args'                => array(
					'url' => array(
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
			'posts_per_page'   => (int) $per_page,
			'post_parent'      => 0, // No Children.
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

		// The Query.
		switch_to_blog( 1 );
		$the_query = new WP_Query( $args );

		$return = array();
		// The Loop.
		if ( $the_query->have_posts() ) {
			while ( $the_query->have_posts() ) {
				$the_query->the_post();
				$stub_info = get_post_meta( get_the_ID(), '_stub_info', true );
				$term      = get_term_by( 'slug', $stub_info['_taxonomies'][ $label_taxonomy ][0], $label_taxonomy );
				$label     = $term->name;
				$link      = get_post_meta( get_the_ID(), '_redirect', true );
				$return[]  = array(
					'id'        => get_the_ID(),
					'title'     => get_the_title(),
					'date'      => get_the_date(),
					'timestamp' => get_the_time( 'c' ),
					'link'      => $link,
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

	public function get_staff_post_by_post_url_restfully( \WP_REST_Request $request ) {
		$url = $request->get_param( 'url' );

		switch_to_blog( 1 );

		$term_slug = basename( $url );
		$term      = get_term_by( 'slug', $term_slug, 'bylines' );

		$post_id = get_term_meta( $term->term_id, 'staff_post_id', true );
		if ( 0 === $post_id ) {
			restore_current_blog();
			return new WP_Error( '500', 'Could not find staff/byline term for url given: ' . $url );
		}

		$staff_post = get_post( $post_id );

		restore_current_blog();

		if ( false === $staff_post ) {
			return new WP_Error( '500', 'No staff post found for url given: ' . $url );
		}

		return array(
			'id'    => $staff_post->ID,
			'title' => $staff_post->post_title,
			'label' => get_post_meta( $staff_post->ID, 'job_title', true ),
			'image' => get_the_post_thumbnail_url( $staff_post->ID, 'large' ),
		);
	}

}

new PRC_Block_Library( true );
