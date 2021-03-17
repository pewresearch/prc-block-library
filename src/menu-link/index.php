<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';
use WPackio\Enqueue;

/**
 * Server-side rendering of the `prc-block/menu-link` block.
 *
 * @package gutenberg
 */

class PRC_Menu_Link extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
			add_filter( 'query_vars', array( $this, 'register_query_vars' ), 20, 1 );
		}
	}

	public function register_query_vars( $qvars ) {
		$qvars[] = 'menuItemId';
		return $qvars;
	}

	public function get_menu_link( $attributes, $content = null, $in_menu = false, $is_chiclet = false ) {
		// Don't render the block's subtree if it has no label.
		if ( empty( $attributes['label'] ) ) {
			return '';
		}

		if ( in_array( $attributes['parentBlockName'], array( 'prc-block/menu-link', 'prc-block/taxonomy-tree-more' ) ) ) {
			$is_chiclet = false;
		}

		$menu_item_id = md5( json_encode( $attributes ) );

		$selected_menu_item = get_query_var( 'menuItemId' );

		$is_active = ! empty( $attributes['id'] ) && ( get_the_ID() === $attributes['id'] );
		if ( $menu_item_id === $selected_menu_item ) {
			$is_active = true;
		}

		$is_hidden = 'prc-block/taxonomy-tree-more' === $attributes['parentBlockName'];

		$css_classes = ! empty( $attributes['className'] ) ? implode( ' ', (array) $attributes['className'] ) : false;
		error_log( 'get_menu_link:: ' . print_r( $css_classes, true ) );

		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'class' => classNames(
					array(
						'hidden'             => $is_hidden,
						'item'               => ! $is_chiclet,
						'ui basic button'    => $is_chiclet,
						'active'             => $is_active,
						'ui simple dropdown' => ( $in_menu && ! empty( $content ) ),
					)
				),
			)
		);

		if ( ! empty( $content ) && true === $in_menu ) {
			$html = '<div ' . $wrapper_attributes . ' ';
		} elseif ( ! empty( $content ) ) {
			$html = '<div ' . $wrapper_attributes . '> <a ';
		} else {
			$html = '<a ' . $wrapper_attributes . ' ';
		}

		// Start appending HTML attributes to anchor tag.
		if ( false === $in_menu ) {
			if ( isset( $attributes['url'] ) ) {
				$html .= ' href="' . esc_url( $attributes['url'] ) . '"';
			}

			if ( isset( $attributes['opensInNewTab'] ) && true === $attributes['opensInNewTab'] ) {
				$html .= ' target="_blank"  ';
			}

			if ( isset( $attributes['rel'] ) ) {
				$html .= ' rel="' . esc_attr( $attributes['rel'] ) . '"';
			} elseif ( isset( $attributes['nofollow'] ) && $attributes['nofollow'] ) {
				$html .= ' rel="nofollow"';
			}

			if ( isset( $attributes['title'] ) ) {
				$html .= ' title="' . esc_attr( $attributes['title'] ) . '"';
			}
		}

		// End appending HTML attributes to anchor tag.

		// Start anchor tag content.
		$html .= '>';

		if ( isset( $attributes['label'] ) ) {
			$html .= wp_kses(
				$attributes['label'],
				array(
					'code'   => array(),
					'em'     => array(),
					'img'    => array(
						'scale' => array(),
						'class' => array(),
						'style' => array(),
						'src'   => array(),
						'alt'   => array(),
					),
					's'      => array(),
					'span'   => array(
						'style' => array(),
					),
					'strong' => array(),
				)
			);
		}

		if ( ! empty( $content ) && true === $in_menu ) {
			$html .= '<i class="dropdown icon"></i> <div class="menu">' . $content . '</div></div>';
		} elseif ( ! empty( $content ) ) {
			$html .= '</a> <span class="expand-sub-list" data-target="' . $menu_item_id . '">+</span><div id="' . $menu_item_id . '" class="hidden list">' . $content . '</div></div>';
		} else {
			$html .= '</a>';
		}
		// End anchor tag content.

		return $html;
	}

	public function register_frontend() {
		$js_deps = array( 'wp-dom-ready', 'wp-url' );
		$enqueue = new Enqueue( 'prcBlocksLibrary', 'dist', '1.0.0', 'plugin', parent::$plugin_file );
		return $enqueue->register(
			'frontend',
			'menu-link',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => $js_deps,
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
	}

	public function enqueue_frontend() {
		$registered    = $this->register_frontend();
		$script_handle = array_pop( $registered['js'] )['handle'];
		wp_enqueue_script( $script_handle );
	}

	/**
	 * Renders the `prc-block/menu-link` block.
	 *
	 * @param array $attributes The block attributes.
	 * @param array $content The saved content.
	 * @param array $block The parsed block.
	 *
	 * @return string Returns the post content with the legacy widget added.
	 */
	public function render_menu_item_link( $attributes, $content, $block ) {
		// Don't render the block's subtree if it has no label.
		if ( empty( $attributes['label'] ) ) {
			return '';
		}

		if ( ! is_object( $block ) ) {
			return '';
		}

		// If this has a sub menu enqueue the frontend handler.
		if ( ! empty( $content ) ) {
			$this->enqueue_frontend();
		}

		if ( array_key_exists( 'prc-block/menu', $block->context ) ) {
			if ( 'is-style-text' === $block->context['prc-block/menu'] ) {
				return '<div class="item">' . $this->get_menu_link( $attributes, $content, true, true ) . '</div>';
			} else {
				return $this->get_menu_link( $attributes, $content, true, false );
			}
		} else {
			return $this->get_menu_link( $attributes, $content );
		}
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
			'blocks',
			'menu-link',
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
			plugin_dir_path( __DIR__ ) . '/menu-link',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'render_callback' => array( $this, 'render_menu_item_link' ),
			)
		);
	}
}

new PRC_Menu_Link( true );
