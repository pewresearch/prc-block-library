<?php
require_once PRC_VENDOR_DIR . '/autoload.php';

// Modify the core/social-link block.
// See: https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/social-link/index.php


use \WPackio as WPackio;

class Social_Link extends PRC_Block_Library {

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'admin_enqueue_scripts', array( $this, 'register_admin_assets' ), 0 );
			add_action( 'wp_enqueue_scripts', array( $this, 'register_frontend_assets' ) );
			add_filter( 'render_block', array( $this, 'social_link_render_callback' ), 10, 3 );
		}
	}

	/**
	 * Renders the `core/social-link` block on server.
	 *
	 * @param String   $block_content The block content about to be appended.
	 * @param WP_Block $block      Block array.
	 *
	 * @return string Rendered HTML of the referenced block.
	 */
	public function social_link_render_callback( $block_content, $block_args, $block ) {
		if ( 'core/social-link' !== $block_args['blockName'] ) {
			return $block_content;
		}

		$attributes = $block_args['attrs'];
		$open_in_new_tab = isset( $block->context['openInNewTab'] ) ? $block->context['openInNewTab'] : false;

		$service     = ( isset( $attributes['service'] ) ) ? $attributes['service'] : 'Icon';
		$url         = ( isset( $attributes['url'] ) ) ? $attributes['url'] : false;
		// If no url then try to fetch the short link.
		if ( ! $url ) {
			$url = wp_get_shortlink();
		}
		$label       = ( isset( $attributes['label'] ) ) ? $attributes['label'] : block_core_social_link_get_name( $service );
		$show_labels = array_key_exists( 'showLabels', $block->context ) ? $block->context['showLabels'] : false;
		$class_name  = isset( $attributes['className'] ) ? ' ' . $attributes['className'] : false;

		// Don't render a link if there is no URL set.
		if ( ! $url ) {
			return '';
		}

		$rel_target_attributes = '';
		if ( $open_in_new_tab ) {
			$rel_target_attributes = 'rel="noopener nofollow" target="_blank"';
		}

		$icon               = block_core_social_link_get_icon( $service );
		$wrapper_attributes = $this->_get_block_wrapper_attributes(
			array(
				'class' => 'wp-block-social-link wp-social-link wp-social-link-' . $service . $class_name,
				'style' => block_core_social_link_get_color_styles( $block->context ),
				'data-share-url' => esc_url($url),
			)
		);

		error_log(print_r($wrapper_attributes, true));

		$link  = '<li ' . $wrapper_attributes . '>';
		$link .= '<a href="' . esc_url( $url ) . '" ' . $rel_target_attributes . ' class="wp-block-social-link-anchor">';
		$link .= $icon;
		$link .= '<span class="wp-block-social-link-label' . ( $show_labels ? '' : ' screen-reader-text' ) . '">';
		$link .= esc_html( $label );
		$link .= '</span></a></li>';

		return $link;
	}

	/**
	 * @return void
	 * @throws LogicException
	 */
	public function register_admin_assets() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
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

		wp_enqueue_script( array_pop($registered['js'])['handle'] );
	}

	/**
	 * @return void
	 * @throws LogicException
	 */
	public function register_frontend_assets() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );

		//@TODO We need to check for the old social link and dequeue its assets before enqueing these.

		$registered = $enqueue->register(
			'frontend',
			'social-link',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		wp_enqueue_script( array_pop($registered['js'])['handle'] );
	}
}

new Social_Link( true );
