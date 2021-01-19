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

use function BLOCKNAVIGATION\enqueue;

class PRC_Block_Library {
	/**
	 * Registered wpackio assets
	 *
	 * @var array
	 */
	public $registered          = array();
	public $enqueue             = false;
	public $mailchimp_interests = false;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_filter( 'wp_kses_allowed_html', array( $this, 'allowed_html_tags' ), 10, 2 );
			add_action( 'init', array( $this, 'register_assets' ), 10 );
			add_action( 'init', array( $this, 'register_blocks' ), 11 );
			add_action( 'init', array( $this, 'register_block_patterns' ) );
			add_action( 'rest_api_init', array( $this, 'register_rest_endpoints' ) );

			add_action( 'prc_block_area_enqueue_scripts', array( $this, 'enqueue_block_area_assets' ), 10, 2 );
			add_filter( 'the_content', array( $this, 'enqueue_frontend_assets' ) );

			if ( class_exists( 'PRC_API_Mailchimp' ) ) {
				$mailchimp                 = new PRC_API_Mailchimp( false );
				$this->mailchimp_interests = $mailchimp->get_interests();
			}

			require_once plugin_dir_path( __FILE__ ) . '/src/fact-sheet-collection/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/menu/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/menu-link/index.php';
			require_once plugin_dir_path( __FILE__ ) . '/src/story-item/index.php';
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

		/** A-Z Taxonomy List */
		$this->registered['block']['prc-block/a-z-taxonomy-list'] = $enqueue->register(
			'a-z-taxonomy-list',
			'main',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => array_merge( $block_js_deps, array( 'wp-html-entities' ) ),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		/** Button */
		$this->registered['block']['prc-block/button'] = $enqueue->register(
			'button',
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

		/** Card */
		$this->registered['block']['prc-block/card'] = $enqueue->register(
			'card',
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

		/** Callout */
		$this->registered['block']['prc-block/callout'] = $enqueue->register(
			'callout',
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

		/** Collapsible */
		$this->registered['block']['prc-block/collapsible']    = $enqueue->register(
			'collapsible',
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
		$this->registered['frontend']['prc-block/collapsible'] = $enqueue->register(
			'collapsible',
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
		// Add legacy support for shortcodes.
		add_filter(
			'prc_block_collapsible_frontend_shim',
			function() {
				return array_pop( $this->registered['frontend']['prc-block/collapsible']['js'] )['handle'];
			}
		);

		/** Collapsible List Frontend Helper (Used in Taxonomy Tree and A-Z Taxonomy blocks) */
		$this->registered['frontend']['helper/collapsible-list'] = $enqueue->register(
			'collapsible-list',
			'helper',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => array( 'jquery', 'wp-dom-ready' ),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		/** Columns */
		$this->registered['block']['prc-block/columns'] = $enqueue->register(
			'columns',
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
		$this->registered['block']['prc-block/column']  = $enqueue->register(
			'column',
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

		/** Follow Us */
		$this->registered['block']['prc-block/follow-us']    = $enqueue->register(
			'follow-us',
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
		$this->registered['frontend']['prc-block/follow-us'] = $enqueue->register(
			'follow-us',
			'frontend',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => array_merge( $js_deps, array( 'wp-api-fetch' ) ),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		/** Mailchimp Form */
		$this->registered['block']['prc-block/mailchimp-form'] = $enqueue->register(
			'mailchimp-form',
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

		$this->registered['frontend']['prc-block/mailchimp-form'] = $enqueue->register(
			'mailchimp-form',
			'frontend',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => array_merge( $js_deps, array( 'wp-api-fetch' ) ),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
		// Legacy PHP compatability
		add_filter(
			'prc_block_mailchimp_form_frontend_shim',
			function() {
				return array(
					'script' => array_pop( $this->registered['frontend']['prc-block/mailchimp-form']['js'] )['handle'],
					'style'  => array_pop( $this->registered['frontend']['prc-block/mailchimp-form']['css'] )['handle'],
				);
			}
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

		/** Promo */
		$this->registered['block']['prc-block/promo'] = $enqueue->register(
			'promo',
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
		// // Legacy PHP compat
		// add_filter(
		// 'prc_block_promo_frontend_shim',
		// function() {
		// error_log( print_r( $this->registered['block'], true ) );
		// return array(
		// 'style' => array_pop( $this->registered['block']['prc-block/promo']['css'] )['handle'],
		// );
		// }
		// );

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

		/** Posts */
		$this->registered['block']['prc-block/posts']    = $enqueue->register(
			'posts',
			'main',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => array_merge( $block_js_deps, array( 'moment' ) ),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
		$this->registered['frontend']['prc-block/posts'] = $enqueue->register(
			'posts',
			'frontend',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => array_merge( $js_deps, array( 'moment', 'wp-url', 'wp-api-fetch' ) ),
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

		/** Social - toolbar */
		$this->registered['block']['prc-block/social-toolbar'] = $enqueue->register(
			'social-toolbar',
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

		/** Tabs */
		$this->registered['block']['prc-block/tabs']    = $enqueue->register(
			'tabs',
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
		$this->registered['frontend']['prc-block/tabs'] = $enqueue->register(
			'tabs',
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

		/** Taxonomy Tree */
		$this->registered['block']['prc-block/taxonomy-tree']         = $enqueue->register(
			'taxonomy-tree',
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
		$this->registered['block']['prc-block/taxonomy-tree-list']    = $enqueue->register(
			'taxonomy-tree-list',
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
		$this->registered['frontend']['prc-block/taxonomy-tree-list'] = $enqueue->register(
			'taxonomy-tree-list',
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

		/** WP Query */
		$this->registered['block']['prc-block/wp-query'] = $enqueue->register(
			'wp-query',
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

		/** Social-toolbar */
		register_block_type(
			'prc-block/social-toolbar',
			array(
				'editor_script' => array_pop( $this->registered['block']['prc-block/social-toolbar']['js'] )['handle'],
			)
		);

		/** Button */
		register_block_type(
			'prc-block/button',
			array(
				'editor_script' => array_pop( $this->registered['block']['prc-block/button']['js'] )['handle'],
				'style'         => array_pop( $this->registered['block']['prc-block/button']['css'] )['handle'],
			)
		);

		/** Card */
		register_block_type(
			'prc-block/card',
			array(
				'editor_script' => array_pop( $this->registered['block']['prc-block/card']['js'] )['handle'],
				'style'         => array_pop( $this->registered['block']['prc-block/card']['css'] )['handle'],
			)
		);

		/** Callout */
		register_block_type(
			'prc-block/callout',
			array(
				'editor_script' => array_pop( $this->registered['block']['prc-block/callout']['js'] )['handle'],
			)
		);

		/** Chapter */
		register_block_type(
			'prc-block/chapter',
			array(
				'editor_script' => array_pop( $this->registered['block']['prc-block/chapter']['js'] )['handle'],
			)
		);

		/** Collapsible */
		register_block_type(
			'prc-block/collapsible',
			array(
				'editor_script' => array_pop( $this->registered['block']['prc-block/collapsible']['js'] )['handle'],
				'editor_style'  => array_pop( $this->registered['block']['prc-block/collapsible']['css'] )['handle'],
			)
		);

		/** Columns */
		register_block_type(
			'prc-block/columns',
			array(
				'editor_script' => array_pop( $this->registered['block']['prc-block/columns']['js'] )['handle'],
				'editor_style'  => array_pop( $this->registered['block']['prc-block/columns']['css'] )['handle'],
			)
		);

		/** Column */
		register_block_type(
			'prc-block/column',
			array(
				'editor_script' => array_pop( $this->registered['block']['prc-block/column']['js'] )['handle'],
				'editor_style'  => array_pop( $this->registered['block']['prc-block/column']['css'] )['handle'],
			)
		);

		/** Flip Card */
		register_block_type(
			'prc-block/flip-card',
			array(
				'editor_script' => array_pop( $this->registered['block']['prc-block/flip-card']['js'] )['handle'],
				'editor_style'  => array_pop( $this->registered['block']['prc-block/flip-card']['css'] )['handle'],
			)
		);

		/** Follow Us */
		$follow_us_handle = $this->get_handle( 'prc-block/follow-us', 'js', 'block' );
		wp_localize_script(
			$follow_us_handle,
			'prcFollowUsMailchimp',
			array(
				'interests' => $this->mailchimp_interests,
			)
		);
		register_block_type(
			'prc-block/follow-us',
			array(
				'editor_script' => $follow_us_handle,
			)
		);

		/** Mailchimp Form */
		$mailchimp_handle = $this->get_handle( 'prc-block/mailchimp-form', 'js' );
		wp_localize_script(
			$mailchimp_handle,
			'prcMailchimpForm',
			array(
				'interests' => $this->mailchimp_interests,
			)
		);
		register_block_type(
			'prc-block/mailchimp-form',
			array(
				'editor_script' => $mailchimp_handle,
				'style'         => array_pop( $this->registered['block']['prc-block/mailchimp-form']['css'] )['handle'],
			)
		);

		/** Mailchimp Opt Down Special Form */
		register_block_type(
			'prc-block/mailchimp-opt-down',
			array(
				'editor_script' => array_pop( $this->registered['block']['prc-block/mailchimp-opt-down']['js'] )['handle'],
			)
		);

		/** Promo */
		register_block_type(
			'prc-block/promo',
			array(
				'editor_script' => array_pop( $this->registered['block']['prc-block/promo']['js'] )['handle'],
				'style'         => array_pop( $this->registered['block']['prc-block/promo']['css'] )['handle'],
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

		/** Posts */
		register_block_type(
			'prc-block/posts',
			array(
				'editor_script' => array_pop( $this->registered['block']['prc-block/posts']['js'] )['handle'],
				'style'         => array_pop( $this->registered['block']['prc-block/posts']['css'] )['handle'],
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

		/** Tabs */
		register_block_type(
			'prc-block/tabs',
			array(
				'editor_script' => array_pop( $this->registered['block']['prc-block/tabs']['js'] )['handle'],
				'editor_style'  => array_pop( $this->registered['block']['prc-block/tabs']['css'] )['handle'],
			)
		);

		/** A-Z Taxonomy List */
		register_block_type(
			'prc-block/a-z-taxonomy-list',
			array(
				'editor_script' => array_pop( $this->registered['block']['prc-block/a-z-taxonomy-list']['js'] )['handle'],
				'style'         => array_pop( $this->registered['block']['prc-block/a-z-taxonomy-list']['css'] )['handle'],
			)
		);

		/** Taxonomy Tree */
		register_block_type(
			'prc-block/taxonomy-tree',
			array(
				'editor_script' => array_pop( $this->registered['block']['prc-block/taxonomy-tree']['js'] )['handle'],
				'style'         => array_pop( $this->registered['block']['prc-block/taxonomy-tree']['css'] )['handle'],
			)
		);

		/** Taxonomy Tree List */
		register_block_type(
			'prc-block/taxonomy-tree-list',
			array(
				'editor_script' => array_pop( $this->registered['block']['prc-block/taxonomy-tree-list']['js'] )['handle'],
				'style'         => array_pop( $this->registered['block']['prc-block/taxonomy-tree-list']['css'] )['handle'],
			)
		);

		/** WP Query */
		register_block_type(
			'prc-block/wp-query',
			array(
				'editor_script' => array_pop( $this->registered['block']['prc-block/wp-query']['js'] )['handle'],
			)
		);

	}

	/**
	 * Because of the cross site nature of widget block areas we need to force enqueing of assets.
	 */
	public function enqueue_block_area_assets( $post_id, $content ) {
		return $this->enqueue_frontend_assets( $content, $post_id );
	}

	/**
	 * Filters the_content looking for blocks, enqueues any `frontend` script/styles registered for a block.
	 */
	public function enqueue_frontend_assets( $content, $post_id = null ) {
		if ( is_admin() ) {
			return $content;
		}
		if ( is_front_page() ) {
			$homepage = get_current_homepage();
			$post_id  = $homepage->ID;
		} elseif ( null === $post_id ) {
			$post_id = get_the_ID();
		}

		foreach ( $this->registered['frontend'] as $block_name => $block_assets ) {
			if ( has_block( $block_name, $post_id ) ) {
				// Follow Us has some special conditions on the frontend that other blocks do not
				if ( 'prc-block/follow-us' === $block_name ) {
					// The Mailchimp form in Follow Us requires access to all the interests, they are maintained in the mailchimp api and set in this class in construct.
					$follow_us_handle = $this->get_handle( 'prc-block/follow-us', 'js', 'frontend' );
					wp_localize_script(
						$follow_us_handle,
						'prcFollowUsMailchimp',
						array(
							'interests' => $this->mailchimp_interests,
						)
					);
				}
				if ( array_key_exists( 'js', $block_assets ) ) {
					wp_enqueue_script( array_pop( $block_assets['js'] )['handle'] );
				}
				if ( array_key_exists( 'css', $block_assets ) ) {
					error_log( $block_name );
					wp_enqueue_style( array_pop( $block_assets['css'] )['handle'] );
				}
			}
		}
		// For blocks that take advantage of the collapsible list sub component.
		// Still trying to figure out a better way to handle this dependencies.
		if ( has_block( 'prc-block/taxonomy-tree' ) || has_block( 'prc-block/a-z-taxonomy-list' ) ) {
			wp_enqueue_script( $this->get_handle( 'helper/collapsible-list', 'js', 'frontend' ) );
		}

		return $content;
	}

	private function load_block_pattern( $name ) {
		return require __DIR__ . '/patterns/' . $name . '.php';
	}

	private function unregister_core_patterns() {
		if ( ! function_exists( 'unregister_block_pattern' ) || ! function_exists( 'unregister_block_pattern_category' ) ) {
			return;
		}
		// Patterns
		unregister_block_pattern( 'core/text-two-columns' );
		unregister_block_pattern( 'core/two-buttons' );
		unregister_block_pattern( 'core/two-images' );
		unregister_block_pattern( 'core/text-two-columns-with-images' );
		unregister_block_pattern( 'core/text-three-columns-buttons' );
		unregister_block_pattern( 'core/large-header' );
		unregister_block_pattern( 'core/three-buttons' );
		unregister_block_pattern( 'core/quote' );
		// Categories
		unregister_block_pattern_category( 'text' );
		unregister_block_pattern_category( 'columns' );
		unregister_block_pattern_category( 'buttons' );
		unregister_block_pattern_category( 'header' );
		unregister_block_pattern_category( 'gallery' );
	}

	public function register_block_patterns() {
		if ( ! function_exists( 'register_block_pattern' ) || ! function_exists( 'register_block_pattern_category' ) ) {
			return;
		}

		$this->unregister_core_patterns();

		// PRC Patterns
		register_block_pattern_category(
			'lede',
			array( 'label' => __( 'Lede', 'prc-blocks' ) )
		);
		register_block_pattern( 'prc-block/pattern/one-lede', $this->load_block_pattern( 'one-lede' ) );
		register_block_pattern( 'prc-block/pattern/one-lede-with-newsletter', $this->load_block_pattern( 'one-lede-with-newsletter' ) );
		register_block_pattern( 'prc-block/pattern/three-lede-vertical', $this->load_block_pattern( 'three-lede-vertical' ) );
		register_block_pattern( 'prc-block/pattern/three-lede-horizontal', $this->load_block_pattern( 'three-lede-horizontal' ) );
		register_block_pattern( 'prc-block/pattern/three-lede-wide', $this->load_block_pattern( 'three-lede-wide' ) );
		register_block_pattern( 'prc-block/pattern/four-lede-vertical', $this->load_block_pattern( 'four-lede-vertical' ) );
		register_block_pattern( 'prc-block/pattern/four-lede-horizontal', $this->load_block_pattern( 'four-lede-horizontal' ) );
		register_block_pattern( 'prc-block/pattern/four-lede', $this->load_block_pattern( 'four-lede' ) );
		register_block_pattern( 'prc-block/pattern/homepage', $this->load_block_pattern( 'homepage' ) );
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
			'/fetch-posts',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'restful_wp_query' ),
				'args'                => array(
					'postType'      => array(
						'validate_callback' => function( $param, $request, $key ) {
							return is_string( $param );
						},
					),
					'formatTermId'  => array(
						'validate_callback' => function( $param, $request, $key ) {
							return is_string( $param );
						},
					),
					'programTermId' => array(
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
					'expertsOnly'   => array(
						'validate_callback' => function( $param, $request, $key ) {
							error_log( 'expertsOnly' );
							error_log( print_r( $param, true ) );
							return rest_is_boolean( $param );
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

		register_rest_route(
			'prc-api/v2',
			'/blocks/helpers/get-taxonomy-by-letter',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_taxonomy_by_letter_restfully' ),
				'args'                => array(
					'taxonomy' => array(
						'validate_callback' => function( $param, $request, $key ) {
							return is_string( $param );
						},
					),
					'letter'   => array(
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

	public function restful_wp_query( \WP_REST_Request $request ) {
		$post_type      = $request->get_param( 'postType' );
		$per_page       = $request->get_param( 'perPage' );
		$label_taxonomy = $request->get_param( 'labelTaxonomy' );

		$fomat_term_id    = $request->get_param( 'formatTermId' );
		$program_term_id  = $request->get_param( 'programTermId' );
		$limit_to_experts = $request->get_param( 'expertsOnly' );

		// If the current site is not 1 then for the format and the program we should get their parent term ids
		if ( 1 !== get_current_blog_id() ) {
			$fomat_term_id   = get_term_meta( $fomat_term_id, '_origin_term_id', true );
			$program_term_id = get_term_meta( $program_term_id, '_origin_term_id', true );
		}

		$args = array(
			'post_type'      => $post_type,
			'posts_per_page' => (int) $per_page,
			'post_parent'    => 0, // No Children.
			'tax_query'      => array(
				'relation' => 'AND',
			),
		);

		if ( is_numeric( $program_term_id ) ) {
			$args['tax_query'][] = array(
				'taxonomy' => 'programs',
				'terms'    => $program_term_id,
				'field'    => 'term_id',
			);
		}

		// Stub Specific:
		if ( is_numeric( $fomat_term_id ) ) {
			$args['tax_query'][] = array(
				'taxonomy' => 'formats',
				'terms'    => $fomat_term_id,
				'field'    => 'term_id',
			);
		}
		if ( 'stub' === $post_type ) {
			$args['meta_key']         = 'hide_on_index';
			$args['meta_compare_key'] = 'NOT EXISTS';
		}

		// Staff Specific:
		if ( 'true' === $limit_to_experts ) {
			$args['tax_query'][] = array(
				'taxonomy' => 'areas-of-expertise',
				'operator' => 'EXISTS',
			);
		}
		if ( 'staff' === $post_type ) {
			$args['orderby']     = 'title';
			$args['order']       = 'ASC';
			$args['tax_query'][] = array(
				'taxonomy' => 'staff-type',
				'terms'    => 'former-staff',
				'field'    => 'slug',
				'operator' => 'NOT IN',
			);
		}

		$return = array();

		// The Query.
		switch_to_blog( 1 );
		$the_query = new WP_Query( $args );

		// The Loop.
		if ( $the_query->have_posts() ) {
			while ( $the_query->have_posts() ) {
				$the_query->the_post();

				$post_data = array(
					'id'        => get_the_ID(),
					'title'     => get_the_title(),
					'date'      => get_the_date(),
					'timestamp' => get_the_time( 'c' ),
					'link'      => get_the_permalink(),
					'image'     => get_the_post_thumbnail_url( get_the_ID(), 'large' ),
				);

				if ( 'stub' === $post_type ) {
					$stub_info = get_post_meta( get_the_ID(), '_stub_info', true );
					$term      = get_term_by( 'slug', $stub_info['_taxonomies'][ $label_taxonomy ][0], $label_taxonomy );

					$post_data['label'] = $term->name;
					$post_data['link']  = get_post_meta( get_the_ID(), '_redirect', true );
				}

				$return[] = $post_data;
			}
		}
		/* Restore original Post Data */
		wp_reset_postdata();
		restore_current_blog();

		return $return;
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

	public function get_taxonomy_by_letter_restfully( \WP_REST_Request $request ) {
		$taxonomy = $request->get_param( 'taxonomy' );
		$letter   = $request->get_param( 'letter' );

		$terms = get_terms(
			array(
				'taxonomy'   => $taxonomy,
				'hide_empty' => false,
				'name__like' => $letter,
				'orderby'    => 'slug',
			)
		);

		if ( empty( $terms ) ) {
			return false;
		}

		$return = array();

		function startsWith( $string, $startString ) {
			$len = strlen( $startString );
			return ( substr( $string, 0, $len ) === $startString );
		}

		foreach ( $terms as $term ) {
			if ( true === startsWith( $term->name, $letter ) ) {
				$return[] = $term;
			}
		}

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
