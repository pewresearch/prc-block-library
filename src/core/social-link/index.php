<?php
require_once PRC_VENDOR_DIR . '/autoload.php';
use \WPackio as WPackio;

// Modify the core/social-link block.
// See: https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/social-link/index.php
class Core_Social_Link extends PRC_Block_Library {
	public static $block_name = 'core/pullquote';
	public static $version = '1.0.1';

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_filter( 'block_type_metadata', array( $this, 'add_attributes' ), 100, 1 );
			add_filter( 'block_type_metadata_settings', array( $this, 'add_settings' ), 100, 2 );
			add_action( 'admin_enqueue_scripts', array( $this, 'register_admin_assets' ), 0 );
			add_filter( 'render_block', array( $this, 'social_link_render_callback' ), 10, 3 );
		}
	}

	/**
	 * Register additional attributes for social links block.
	 * @param mixed $metadata
	 * @return mixed
	 */
	public function add_attributes( $metadata ) {
		if ( 'core/social-links' !== $metadata['name'] ) {
			return $metadata;
		}

		if ( ! array_key_exists( 'title', $metadata['attributes'] ) ) {
			$metadata['attributes']['title'] = array(
				'type'    => 'text',
			);
		}

		// If you pass an id to the block, it will be used as the anchor for when the mobile viewpoint is reached.
		if ( ! array_key_exists( 'description', $metadata['attributes'] ) ) {
			$metadata['attributes']['description'] = array(
				'type'    => 'string',
			);
		}

		if ( ! array_key_exists( 'url', $metadata['attributes'] ) ) {
			$metadata['attributes']['url'] = array(
				'type'    => 'string',
			);
		}

		return $metadata;
	}

	public function add_settings(array $settings, array $metadata) {
		if ( 'core/social-links' === $metadata['name'] ) {
			$settings['provides_context'] = array_merge(
				array_key_exists('provides_context', $settings) ? $settings['provides_context'] : array(),
				array(
					'core/social-links/title' => 'title',
					'core/social-links/description' => 'description',
					'core/social-links/url' => 'url',
				)
			);
		}
		if ( 'core/social-link' === $metadata['name'] ) {
			$settings['uses_context'] = array_merge(
				array_key_exists('uses_context', $settings) ? $settings['uses_context'] : array(),
				array(
					'core/social-links/title',
					'core/social-links/description',
					'core/social-links/url'
				)
			);
		}
		return $settings;
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

		$this->enqueue_frontend_assets();

		$attributes = $block_args['attrs'];
		$open_in_new_tab = isset( $block->context['openInNewTab'] ) ? $block->context['openInNewTab'] : false;

		$service = ( isset( $attributes['service'] ) ) ? $attributes['service'] : 'Icon';
		$url     = isset( $block->context['core/social-links/url'] ) ? $block->context['core/social-links/url'] : false;
		$url     = ( false === $url && isset( $attributes['url'] ) ) ? $attributes['url'] : $url;
		// If after all that there is no url then try to fetch the short link.
		if ( ! $url ) {
			$url = wp_get_shortlink();
		}
		$label       = ( isset( $attributes['label'] ) ) ? $attributes['label'] : block_core_social_link_get_name( $service );
		$show_labels = array_key_exists( 'showLabels', $block->context ) ? $block->context['showLabels'] : false;
		$class_name  = isset( $attributes['className'] ) ? ' ' . $attributes['className'] : false;
		$title = isset( $block->context['core/social-links/title'] ) ? $block->context['core/social-links/title'] : null;
		$description = isset( $block->context['core/social-links/description'] ) ? $block->context['core/social-links/description'] : null;

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
				'data-share-title' => esc_attr($title),
				'data-share-description' => esc_attr($description),
			)
		);

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
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', self::$version, 'plugin', parent::$plugin_file );

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
	public function enqueue_frontend_assets() {
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

new Core_Social_Link( true );
