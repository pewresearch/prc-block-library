<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';
use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/menu-link` block.
 *
 * @package gutenberg
 */

class PRC_Social_Link extends PRC_Block_Library {

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
			// Ensure new frontend script is running even on template functions.
			add_filter(
				'prc_social_link_icon',
				function( $markup, $attributes ) {
					$this->enqueue_frontend_script();
					return $markup;
				},
				10,
				2
			);
		}
	}

	public function enqueue_frontend_script() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', plugin_dir_path( __DIR__ ) );
		return $enqueue->enqueue(
			'frontend',
			'social-link',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => array( 'wp-dom-ready', 'wp-url' ),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
	}
	
	/**
	 * Renders the `prc-block/social-link` block.
	 *
	 * @param array $attributes The block attributes.
	 * @param array $content The saved content.
	 * @param array $block The parsed block.
	 *
	 * @return string Returns the post content with the legacy widget added.
	 */
	public function render_social_link_block( $attributes, $content, $block ) {
		if ( ! is_object( $block ) ) {
			return '';
		}
		return apply_filters( 'prc_social_link_icon', false, $attributes );
	}

	/**
	 * Register the menu link block.
	 *
	 * @uses render_block_core_navigation()
	 * @throws WP_Error An WP_Error exception parsing the block definition.
	 */
	public function register_block() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', plugin_dir_path( __DIR__ ) );

		$block = $enqueue->register(
			'blocks',
			'social-link',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . '/social-link',
			array(
				'editor_script'   => array_pop( $block['js'] )['handle'],
				'render_callback' => array( $this, 'render_social_link_block' ),
			)
		);
	}
}

new PRC_Social_Link( true );
