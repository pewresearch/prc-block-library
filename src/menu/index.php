<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';
use WPackio\Enqueue;

/**
 * Server-side rendering of the `prc-block/menu` block.
 *
 * @package PRC_Block_Library
 */

class PRC_Block_Menu extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function get_menu_class( $attributes ) {
		$menu_classes = array(
			'ui',
			'menu',
		);
		if ( array_key_exists( 'className', $attributes ) && 'is-style-text' === $attributes['className'] ) {
			$menu_classes[] = 'text';
		} elseif ( array_key_exists( 'className', $attributes ) && 'is-style-secondary' === $attributes['className'] ) {
			$menu_classes[] = 'secondary';
		} elseif ( array_key_exists( 'className', $attributes ) && 'is-style-secondary-pointing' === $attributes['className'] ) {
			$menu_classes[] = 'secondary';
			$menu_classes[] = 'pointing';
		} elseif ( array_key_exists( 'className', $attributes ) && 'is-style-tabular' === $attributes['className'] ) {
			$menu_classes[] = 'tabular';
		}
		if ( array_key_exists( 'orientation', $attributes ) && 'vertical' === $attributes['orientation'] ) {
			$menu_classes[] = 'vertical';
		}
		if ( array_key_exists( 'size', $attributes ) ) {
			$menu_classes[] = $attributes['size'];
		}
		return implode( ' ', $menu_classes );
	}

	/**
	 * Renders the `core/navigation` block on server.
	 *
	 * @param array $attributes The block attributes.
	 * @param array $content The saved content.
	 * @param array $block The parsed block.
	 *
	 * @return string Returns the post content with the legacy widget added.
	 */
	public function render_menu( $attributes, $content, $block ) {

		if ( empty( $block->inner_blocks ) ) {
			return '';
		}

		$classes = array_merge(
			( isset( $attributes['orientation'] ) && 'vertical' === $attributes['orientation'] ) ? array( 'vertical' ) : array(),
			isset( $attributes['itemsJustification'] ) ? array( 'items-justified-' . $attributes['itemsJustification'] ) : array()
		);

		$inner_blocks_html = '';
		foreach ( $block->inner_blocks as $inner_block ) {
			$inner_blocks_html .= $inner_block->render();
		}

		$block_styles = isset( $attributes['styles'] ) ? $attributes['styles'] : '';

		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'class' => implode( ' ', $classes ),
				'style' => $block_styles,
			)
		);

		$menu_classes = $this->get_menu_class( $attributes );

		return sprintf(
			'<nav %1$s><div class="%2$s">%3$s</div></nav>',
			$wrapper_attributes,
			$menu_classes,
			$inner_blocks_html
		);
	}

	public function register_block() {
		$js_deps       = array( 'react', 'react-dom', 'wp-dom-ready', 'wp-element', 'wp-i18n', 'wp-polyfill' );
		$block_js_deps = array_merge( $js_deps, array( 'lodash', 'wp-components' ) );
		$enqueue       = new Enqueue( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', plugin_dir_path( __DIR__ ) );

		$registered = $enqueue->register(
			'blocks',
			'menu',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => $block_js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . '/menu',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'render_callback' => array( $this, 'render_menu' ),
			)
		);
	}
}

new PRC_Block_Menu( true );
