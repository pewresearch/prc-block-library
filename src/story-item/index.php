<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';
use WPackio\Enqueue;

/**
 * Server-side rendering of the `prc-block/menu-link` block.
 *
 * @package gutenberg
 */

class PRC_Story_Item extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	/**
	 * Renders the `prc-block/story-item` placeholder block.
	 *
	 * @param array $attributes The block attributes.
	 * @param array $content The saved content.
	 * @param array $block The parsed block.
	 *
	 * @return string Returns the post content with the legacy widget added.
	 */
	public function render_story_item( $attributes, $content, $block ) {
		return 'Markup For React Here';
	}

	/**
	 * Register the menu link block.
	 *
	 * @uses render_block_core_navigation()
	 * @throws WP_Error An WP_Error exception parsing the block definition.
	 */
	public function register_block() {
		$js_deps       = array( 'react', 'react-dom', 'wp-dom-ready', 'wp-element', 'wp-i18n', 'wp-polyfill' );
		$block_js_deps = array_merge( $js_deps, array( 'lodash', 'wp-components' ) );
		$enqueue       = new Enqueue( 'prcBlocksLibrary', 'dist', '1.0.0', 'plugin', plugin_dir_path( __DIR__ ) );

		$registered = $enqueue->register(
			'story-item',
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

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . '/story-item',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'style'           => array_pop( $registered['css'] )['handle'],
				'render_callback' => array( $this, 'render_story_item' ),
			)
		);
	}
}

new PRC_Story_Item( true );

function get_story_item( $args ) {
	$story_item = new PRC_Story_Item( false );
	return $story_item->render_story_item();
}
