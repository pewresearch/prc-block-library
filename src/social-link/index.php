<?php

// Eventually we'll move the enqueuer into prc core, probably when we rewrite the theme base js and stylesheet.
require_once PRC_VENDOR_DIR . '/autoload.php';
use WPackio\Enqueue;

/**
 * Server-side rendering of the `prc-block/menu-link` block.
 *
 * @package gutenberg
 */

class PRC_Social_Link extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function render_as_icon( $attributes, $content, $block ) {

	}

	public function render_as_button( $attributes, $content, $block ) {

	}

	public function get_menu_link( $attributes, $is_chiclet = false ) {
		// Don't render the block's subtree if it has no label.
		if ( empty( $attributes['label'] ) ) {
			return '';
		}

		$is_active = ! empty( $attributes['id'] ) && ( get_the_ID() === $attributes['id'] );

		$css_classes = ! empty( $attributes['className'] ) ? implode( ' ', (array) $attributes['className'] ) : false;

		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'class' => ( $is_chiclet ? 'ui basic button ' : 'item ' ) . $css_classes . ( $is_active ? ' active' : '' ),
			)
		);

		$html = '<a ' . $wrapper_attributes . ' ';

		// Start appending HTML attributes to anchor tag.
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

		$html .= '</a>';
		// End anchor tag content.

		return $html;
	}

	public function enqueue_frontend_script() {
		$enqueue  = new Enqueue( 'prcBlocksLibrary', 'dist', '1.0.0', 'plugin', plugin_dir_path( __DIR__ ) );
		$frontend = $enqueue->enqueue(
			'frontend',
			'social-link',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => array( 'wp-dom-ready' ),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
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
		$this->enqueue_frontend_script();
		// Don't render the block's subtree if it has no label.
		if ( empty( $attributes['label'] ) ) {
			return '';
		}

		if ( ! is_object( $block ) ) {
			return '';
		}

		if ( 'is-style-text' === $block->context['prc-block/menu'] ) {
			return '<div class="item">' . $this->get_menu_link( $attributes, true ) . '</div>';
		} else {
			return $this->get_menu_link( $attributes );
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

		$block = $enqueue->register(
			'blocks',
			'social-link',
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
			plugin_dir_path( __DIR__ ) . '/social-link',
			array(
				'editor_script'   => array_pop( $block['js'] )['handle'],
				'render_callback' => array( $this, 'render_menu_item_link' ),
			)
		);
	}
}

new PRC_Social_Link( true );
