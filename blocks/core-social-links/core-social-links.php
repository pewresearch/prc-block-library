<?php
/**
 * Block Name:        Core Social-Links
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class CoreSocialLinks extends PRC_Block_Library {

	public static $block_name = "core/social-links";
	public static $child_block_name = 'core/social-link';
	public static $block_json = null;
	public static $editor_script_handle = null;
	public static $view_script_handle = null;
	public static $style_handle = null;

	public function __construct($init = false) {
		if ( true === $init ) {
			$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/core-social-links/build/block.json';
			self::$block_json = wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
			self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );

			add_action( 'init', array($this, 'init_assets') );
			add_action( 'enqueue_block_editor_assets', array($this, 'register_editor_assets') );
			add_filter( 'block_type_metadata', array( $this, 'add_attributes' ), 100, 1 );
			add_filter( 'block_type_metadata_settings', array( $this, 'add_settings' ), 100, 2 );
			add_filter( 'render_block', array( $this, 'social_link_render_callback' ), 10, 3 );
		}
	}

	public function init_assets() {
		self::$editor_script_handle = register_block_script_handle( self::$block_json, 'editorScript' );
		self::$view_script_handle = register_block_script_handle( self::$block_json, 'viewScript' );
		self::$style_handle = register_block_style_handle( self::$block_json, 'style' );
	}


	public function register_editor_assets() {
		wp_enqueue_script( self::$editor_script_handle );
		wp_enqueue_style( self::$style_handle );
	}

	/**
	* Register additional attributes for the "core/social-links" block.
	* @param mixed $metadata
	* @return mixed
	*/
	public function add_attributes( $metadata ) {
		if ( self::$block_name !== $metadata['name'] ) {
			return $metadata;
		}

		if ( ! array_key_exists( 'title', $metadata['attributes'] ) ) {
			$metadata['attributes']['title'] = array(
				'type'    => 'text',
			);
		}

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

	/**
	* Register additional settings, like context, for the "core/social-links" block.
	* @param mixed $settings
	* @param mixed $metadata
	* @return mixed
	*/
	public function add_settings(array $settings, array $metadata) {
		// Add context on root block
		if ( self::$block_name === $metadata['name'] ) {
			$settings['provides_context'] = array_merge(
				array_key_exists('provides_context', $settings) ? $settings['provides_context'] : array(),
				array(
					'core/social-links/title' => 'title',
					'core/social-links/description' => 'description',
					'core/social-links/url' => 'url',
				)
			);
		}

		// Ingest context on child block
		if ( self::$child_block_name === $metadata['name'] ) {
			$settings['uses_context'] = array_merge(
				array_key_exists('uses_context', $settings) ? $settings['uses_context'] : array(),
				array(
					'core/social-links/title',
					'core/social-links/description',
					'core/social-links/url',
					'postId',
					'queryId',
					'prc-quiz/results/score',
				)
			);
		}
		return $settings;
	}

	public function get_description_context_value( $description, $block ) {
		// if description does not have %s in it then just return $description
		if ( false === strpos( $description, '%s' ) ) {
			return $description;
		}
		// Right now we only support "score" as a value, from the quiz results block.
		$score = array_key_exists( 'prc-quiz/results/score', $block->context ) ? $block->context['prc-quiz/results/score'] : false;

		if ( false === $score ) {
			return $description;
		}

		return sprintf( $description, $score );
	}

	/**
	 * Renders the `core/social-link` child block on server.
	 *
	 * @param String   $block_content The block content about to be appended.
	 * @param WP_Block $block      Block array.
	 *
	 * @return string Rendered HTML of the referenced block.
	 */
	public function social_link_render_callback( $block_content, $block_args, $block ) {
		if ( self::$child_block_name !== $block_args['blockName'] ) {
			return $block_content;
		}

		wp_enqueue_script( self::$view_script_handle );
		wp_enqueue_style( self::$style_handle );

		$attributes = $block_args['attrs'];
		$open_in_new_tab = isset( $block->context['openInNewTab'] ) ? $block->context['openInNewTab'] : false;

		$service = ( isset( $attributes['service'] ) ) ? $attributes['service'] : 'Icon';
		$url     = isset( $block->context['core/social-links/url'] ) ? $block->context['core/social-links/url'] : false;
		$url     = ( false === $url && isset( $attributes['url'] ) ) ? $attributes['url'] : $url;
		// If after all that there is no url then try to fetch the short link.
		if ( ! $url && isset($block->context['postId']) ) {
			$url = wp_get_shortlink($block->context['postId']);
		}
		$title = isset( $block->context['core/social-links/title'] ) ? $block->context['core/social-links/title'] : null;
		if ( ! $title && isset($block->context['postId']) ) {
			$title = get_the_title($block->context['postId']);
		}
		$description = isset( $block->context['core/social-links/description'] ) ? $block->context['core/social-links/description'] : null;
		$description = $this->get_description_context_value($description, $block);
		if ( ! $description && isset($block->context['postId']) ) {
			$description = get_the_excerpt($block->context['postId']);
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

		$icon = block_core_social_link_get_icon( $service );

		$block_attrs = array(
			'class' => 'wp-block-social-link wp-social-link wp-social-link-' . $service . $class_name,
			'style' => \block_core_social_link_get_color_styles( $block->context ),
		);
		if ( $url ) {
			$block_attrs['data-share-url'] = esc_url($url);
		}
		if ( $title ) {
			$block_attrs['data-share-title'] = esc_attr($title);
		}
		if ( $description ) {
			$block_attrs['data-share-description'] = esc_attr($description);
		}

		// @TODO: update this to use $block_content and just modify whats needed using wp html tag processor https://github.com/pewresearch/pewresearch-org/issues/3247
		$wrapper_attributes = parent::_get_block_wrapper_attributes($block_attrs);

		$link  = '<li ' . $wrapper_attributes . '>';
		$link .= '<a href="' . esc_url( $url ) . '" ' . $rel_target_attributes . ' class="wp-block-social-link-anchor">';
		$link .= $icon;
		$link .= '<span class="wp-block-social-link-label' . ( $show_labels ? '' : ' screen-reader-text' ) . '">';
		$link .= esc_html( $label );
		$link .= '</span></a></li>';

		return $link;
	}

}

new CoreSocialLinks(true);
