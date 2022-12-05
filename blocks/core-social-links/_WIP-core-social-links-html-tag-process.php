<?php

use \WP_HTML_Tag_Processor;
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
	}


	public function register_editor_assets() {
		wp_enqueue_script( self::$editor_script_handle );
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
				)
			);
		}
		return $settings;
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

		$attributes = $block_args['attrs'];

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
		if ( ! $description && isset($block->context['postId']) ) {
			$description = get_the_excerpt($block->context['postId']);
		}

		// @TODO: This can be used once WP updates its version of Gutenberg to include this new class.
		$w = new WP_HTML_Tag_Processor( $block_content );
		$w->next_tag( 'li' );
		if ( $url ) {
			$w->set_attribute('data-share-url', esc_url($url));
		}
		if ( $title ) {
			$w->set_attribute('data-share-title', esc_attr($title));
		}
		if ( $description ) {
			$w->set_attribute('data-share-description', esc_attr($description));
		}
		return $w;
	}

}

new CoreSocialLinks(true);
