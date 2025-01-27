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
	public $block_json;
	public $block_name       = 'core/social-links';
	public $child_block_name = 'core/social-link';
	public $view_script_handle;
	public $editor_script_handle;
	public $style_handle;

	public function __construct( $loader ) {
		$this->block_json = $this->block_json = prc_block_library_manifest( 'core-social-links' );
		$this->init( $loader );
	}

	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'register_assets' );
			$loader->add_action( 'enqueue_block_editor_assets', $this, 'register_editor_script' );
			$loader->add_action( 'enqueue_block_assets', $this, 'register_style' );
			$loader->add_filter( 'block_type_metadata', $this, 'add_attributes', 100, 1 );
			$loader->add_filter( 'block_type_metadata_settings', $this, 'add_settings', 100, 2 );
			$loader->add_filter( 'render_block_data', $this, 'social_links_url_fallback', 1, 3 );
			$loader->add_filter( 'render_block_data', $this, 'social_link_url_fallback', 100, 3 );
			$loader->add_filter( 'render_block', $this, 'social_link_render_callback', 100, 3 );
		}
	}

	/**
	 * @hook init
	 * @return void
	 */
	public function register_assets() {
		$this->editor_script_handle = register_block_script_handle( $this->block_json, 'editorScript' );
		$this->view_script_handle   = register_block_script_handle( $this->block_json, 'viewScript' );
		$this->style_handle         = register_block_style_handle( $this->block_json, 'style' );
	}

	/**
	 * @hook enqueue_block_editor_assets
	 * @return void
	 */
	public function register_editor_script() {
		wp_enqueue_script( $this->editor_script_handle );
	}

	/**
	 * @hook enqueue_block_assets
	 * @return void
	 */
	public function register_style() {
		wp_enqueue_style( $this->style_handle );
	}

	/**
	 * Register additional attributes for the "core/social-links" block.
	 *
	 * @hook block_type_metadata
	 * @param mixed $metadata
	 * @return mixed
	 */
	public function add_attributes( $metadata ) {
		if ( $this->block_name !== $metadata['name'] ) {
			return $metadata;
		}

		if ( ! array_key_exists( 'title', $metadata['attributes'] ) ) {
			$metadata['attributes']['title'] = array(
				'type' => 'text',
			);
		}

		if ( ! array_key_exists( 'description', $metadata['attributes'] ) ) {
			$metadata['attributes']['description'] = array(
				'type' => 'string',
			);
		}

		if ( ! array_key_exists( 'url', $metadata['attributes'] ) ) {
			$metadata['attributes']['url'] = array(
				'type' => 'string',
			);
		}

		if ( ! array_key_exists( 'imageId', $metadata['attributes'] ) ) {
			$metadata['attributes']['imageId'] = array(
				'type' => 'number',
			);
		}

		if ( ! array_key_exists( 'hashtags', $metadata['attributes'] ) ) {
			$metadata['attributes']['hashtags'] = array(
				'type'  => 'array',
				'items' => array(
					'type' => 'string',
				),
			);
		}

		return $metadata;
	}

	/**
	 * Register additional settings, like context, for the "core/social-links" block.
	 *
	 * @hook block_type_metadata_settings
	 * @param mixed $settings
	 * @param mixed $metadata
	 * @return mixed
	 */
	public function add_settings( array $settings, array $metadata ) {
		// Add context on root block
		if ( $this->block_name === $metadata['name'] ) {
			$settings['provides_context'] = array_merge(
				array_key_exists( 'provides_context', $settings ) ? $settings['provides_context'] : array(),
				array(
					'core/social-links/title'       => 'title',
					'core/social-links/description' => 'description',
					'core/social-links/url'         => 'url',
					'core/social-links/imageId'     => 'imageId',
					'core/social-links/hashtags'    => 'hashtags',
				)
			);

			$settings['supports']['typography'] = array_merge(
				array_key_exists( 'typography', $settings['supports'] ) ? $settings['supports']['typography'] : array(),
				array(
					'fontSize'                      => true,
					'lineHeight'                    => true,
					'__experimentalFontFamily'      => true,
					'__experimentalFontWeight'      => true,
					'__experimentalFontStyle'       => true,
					'__experimentalTextTransform'   => true,
					'__experimentalTextDecoration'  => true,
					'__experimentalLetterSpacing'   => true,
					'__experimentalDefaultControls' => array(
						'fontSize'                 => true,
						'__experimentalFontFamily' => true,
					),
				)
			);
		}

		// Ingest context on child block
		if ( $this->child_block_name === $metadata['name'] ) {
			$settings['uses_context'] = array_merge(
				array_key_exists( 'uses_context', $settings ) ? $settings['uses_context'] : array(),
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
	 * Fallback to shortlink if no url is provided for social links.
	 *
	 * @hook render_block_data
	 * @TODO: maybe refine this further by only applying this logic if the parent block has a specific classname or context on it?
	 * @filter render_block_data
	 * @param mixed $parsed_block
	 * @param mixed $source_block
	 * @param mixed $parent_block
	 * @return void
	 */
	public function social_links_url_fallback( $parsed_block, $source_block, $parent_block ) {
		if ( 'core/social-links' === $parsed_block['blockName'] && ( empty( $parsed_block['attrs']['url'] ) || '#' === $parsed_block['attrs']['url'] ) ) {
			$parsed_block['attrs']['url'] = wp_get_shortlink( get_the_ID() );
		}
		return $parsed_block;
	}

	/**
	 * Fallback to shortlink if no url is provided for social links.
	 *
	 * @hook render_block_data
	 * @TODO: maybe refine this further by only applying this logic if the parent block has a specific classname or context on it?
	 * @filter render_block_data
	 * @param mixed $parsed_block
	 * @param mixed $source_block
	 * @param mixed $parent_block
	 * @return void
	 */
	public function social_link_url_fallback( $parsed_block, $source_block, $parent_block ) {
		if ( $this->child_block_name === $parsed_block['blockName'] && ( empty( $parsed_block['attrs']['url'] ) || '#' === $parsed_block['attrs']['url'] ) ) {
			$parsed_block['attrs']['url'] = wp_get_shortlink( get_the_ID() );
		}
		return $parsed_block;
	}

	/**
	 * @hook render_block
	 * @param mixed $block_content
	 * @param mixed $block
	 * @param mixed $instance
	 * @return mixed
	 */
	public function social_link_render_callback( $block_content, $block, $instance ) {
		if ( $this->child_block_name === $block['blockName'] && is_string( $block_content ) && ! is_admin() ) {
			wp_enqueue_script( $this->view_script_handle );

			$attributes = $block['attrs'];
			$context    = $instance->context;

			$tags = new WP_HTML_Tag_Processor( $block_content );
			$tags->next_tag( 'li' );

			$service = $attributes['service'];

			$url = isset( $context['core/social-links/url'] ) ? $context['core/social-links/url'] : false;
			$url = ( false === $url && isset( $attributes['url'] ) ) ? $attributes['url'] : $url;
			// If after all that there is no url then try to fetch the short link.
			if ( ! $url && isset( $context['postId'] ) ) {
				$url = wp_get_shortlink( $context['postId'] );
			}

			$title = isset( $context['core/social-links/title'] ) ? $context['core/social-links/title'] : null;
			if ( ! $title && isset( $context['postId'] ) ) {
				$title = get_the_title( $context['postId'] );
			}

			$description = isset( $context['core/social-links/description'] ) ? $context['core/social-links/description'] : null;
			if ( ! $description && isset( $context['postId'] ) ) {
				$description = get_the_excerpt( $context['postId'] );
			}

			if ( $url ) {
				$tags->set_attribute( 'data-share-url', esc_url( $url ) );
			}
			if ( $title ) {
				$tags->set_attribute( 'data-share-title', esc_attr( $title ) );
			}
			if ( $description ) {
				$tags->set_attribute( 'data-share-description', esc_attr( $description ) );
			}

			return $tags->get_updated_html();
		}
		return $block_content;
	}
}
