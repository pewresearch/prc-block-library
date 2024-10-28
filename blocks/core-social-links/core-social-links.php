<?php
namespace PRC\Platform\Blocks;
use WP_HTML_Tag_Processor;

/**
 * Block Name:        Core Social-Links
 * Version:           0.1.0
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Core_Social_Links {
	public static $block_json = null;
	public static $version;
	public static $block_name = 'core/social-links';
	public static $child_block_name = 'core/social-link';
	public static $view_script_handle = null;
	public static $editor_script_handle = null;
	public static $style_handle = null;

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/core-social-links/build/block.json';
		self::$block_json = \wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		self::$version = self::$block_json['version'];
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action('init', $this, 'register_assets');
			$loader->add_action('enqueue_block_editor_assets', $this, 'register_editor_script');
			$loader->add_action('enqueue_block_assets', $this, 'register_style');
			$loader->add_filter('block_type_metadata', $this, 'add_attributes', 100, 1);
			$loader->add_filter('block_type_metadata_settings', $this, 'add_settings', 100, 2);
			$loader->add_filter('render_block_context', $this, 'social_link_url_context', 100, 3);
			$loader->add_filter('render_block', $this, 'social_link_render_callback', 100, 3);
		}
	}

	/**
	 * @hook init
	 * @return void
	 */
	public function register_assets() {
		self::$editor_script_handle = register_block_script_handle( self::$block_json, 'editorScript' );
		self::$view_script_handle = register_block_script_handle( self::$block_json, 'viewScript' );
		self::$style_handle = register_block_style_handle( self::$block_json, 'style' );
	}

	/**
	 * @hook enqueue_block_editor_assets
	 * @return void
	 */
	public function register_editor_script() {
		wp_enqueue_script( self::$editor_script_handle );
	}

	/**
	 * @hook enqueue_block_assets
	 * @return void
	 */
	public function register_style() {
		wp_enqueue_style( self::$style_handle );
	}

	/**
	* Register additional attributes for the "core/social-links" block.
	* @hook block_type_metadata
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

		if ( ! array_key_exists( 'imageId', $metadata['attributes'] ) ) {
			$metadata['attributes']['imageId'] = array(
				'type'    => 'number',
			);
		}

		if ( ! array_key_exists( 'hashtags', $metadata['attributes'] ) ) {
			$metadata['attributes']['hashtags'] = array(
				'type'    => 'array',
				'items' => array(
					'type' => 'string',
				),
			);
		}

		return $metadata;
	}

	/**
	* Register additional settings, like context, for the "core/social-links" block.
	* @hook block_type_metadata_settings
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
					'core/social-links/imageId' => 'imageId',
					'core/social-links/hashtags' => 'hashtags',
				)
			);

			$settings['supports']['typography'] = array_merge(
				array_key_exists('typography', $settings['supports']) ? $settings['supports']['typography'] : array(),
				[
					"fontSize"=> true,
					"lineHeight"=> true,
					"__experimentalFontFamily"=> true,
					"__experimentalFontWeight"=> true,
					"__experimentalFontStyle"=> true,
					"__experimentalTextTransform"=> true,
					"__experimentalTextDecoration"=> true,
					"__experimentalLetterSpacing"=> true,
					"__experimentalDefaultControls"=> [
						"fontSize" => true,
						"__experimentalFontFamily"=> true
					]
				]
			);
		}

		// Ingest context on child block
		if ( self::$child_block_name === $metadata['name'] ) {
			$settings['uses_context'] = array_merge(
				array_key_exists('uses_context', $settings) ? $settings['uses_context'] : array(),
				array(
					'postId',
					'queryId',
					'core/social-links/title',
					'core/social-links/description',
					'core/social-links/url',
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
	 * Get the facet data from server memory and apply it to the block context for the context provider, facet template, and selected tokens blocks.
	 * @hook render_block_context
	 * @param mixed $context
	 * @return mixed
	 */
	public function social_link_url_context($context, $parsed_block, $parent_block) {
		$allowed_blocks = [
			self::$block_name,
			self::$child_block_name,
			'prc-block/social-share-text-link',
			'prc-block/social-share-sheet',
		];
		if ( !in_array($parsed_block['blockName'], $allowed_blocks) ) {
			return $context;
		}

		$attributes = $parsed_block['attrs'];

		if ( isset($attributes['url']) && !empty($attributes['url']) && '#' !== $attributes['url'] ) {
			$context['core/social-links/url'] = $attributes['url'];
		} else {
			$post_id = array_key_exists('postId', $context) ? $context['postId'] : get_the_ID();
			$shortlink = wp_get_shortlink($post_id);
			if ( empty($shortlink) ) {
				$shortlink = get_permalink($post_id);
			}
			$context['core/social-links/url'] = $shortlink;
		}

		return $context;
	}

	/**
	 * @hook render_block
	 * @param mixed $block_content
	 * @param mixed $block
	 * @param mixed $instance
	 * @return mixed
	 */
	public function social_link_render_callback( $block_content, $block, $instance ) {
		if ( self::$child_block_name === $block['blockName'] && is_string($block_content) && !is_admin() ) {
			wp_enqueue_script( self::$view_script_handle );

			$attributes = $block['attrs'];
			$context = $instance->context;

			$tags = new WP_HTML_Tag_Processor($block_content);
			$tags->next_tag('li');

			$service = $attributes['service'];

			$url = isset( $context['core/social-links/url'] ) ? $context['core/social-links/url'] : false;
			$url = ( false === $url && !empty( $attributes['url'] ) ) ? $attributes['url'] : $url;
			// If after all that there is no url then try to fetch the short link.
			if ( ! $url && isset($context['postId']) ) {
				$url = wp_get_shortlink($context['postId']);
			}

			$title = isset( $context['core/social-links/title'] ) ? $context['core/social-links/title'] : null;
			if ( ! $title && isset($context['postId']) ) {
				$title = get_the_title($context['postId']);
			}

			$description = isset( $context['core/social-links/description'] ) ? $context['core/social-links/description'] : null;
			if ( ! $description && isset($context['postId']) ) {
				$description = get_the_excerpt($context['postId']);
			}

			if ( $url ) {
				$tags->set_attribute('data-share-url', esc_url($url));
			}
			if ( $title ) {
				$tags->set_attribute('data-share-title', esc_attr($title));
			}
			if ( $description ) {
				$tags->set_attribute('data-share-description', esc_attr($description));
			}

			return $tags->get_updated_html();
		}
		return $block_content;
	}
}
