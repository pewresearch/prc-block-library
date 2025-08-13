<?php
/**
 * Core Social Links Block
 *
 * @package PRC\Platform\Blocks
 */

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
	/**
	 * Block JSON
	 *
	 * @var array
	 */
	public $block_json;

	/**
	 * Block name
	 *
	 * @var string
	 */
	public $block_name = 'core/social-links';

	/**
	 * Child block name
	 *
	 * @var string
	 */
	public $child_block_name = 'core/social-link';

	/**
	 * View script handle
	 *
	 * @var string
	 */
	public $view_script_handle;

	/**
	 * Editor script handle
	 *
	 * @var string
	 */
	public $editor_script_handle;

	/**
	 * Style handle
	 *
	 * @var string
	 */
	public $style_handle;

	/**
	 * Constructor
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		$this->block_json = prc_block_library_manifest( 'core-social-links' );
		$this->init( $loader );
	}

	/**
	 * Initialize the block
	 *
	 * @param mixed $loader Loader.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'register_assets' );
			$loader->add_action( 'enqueue_block_editor_assets', $this, 'register_editor_script' );
			$loader->add_action( 'enqueue_block_assets', $this, 'register_style' );
			$loader->add_filter( 'block_type_metadata', $this, 'add_attributes', 100, 1 );
			$loader->add_filter( 'block_type_metadata_settings', $this, 'add_settings', 100, 2 );
			$loader->add_filter( 'render_block_data', $this, 'social_links_url_fallback', 1, 3 );
			$loader->add_filter( 'render_block_context', $this, 'social_links_context_handler', 100, 3 );
			$loader->add_filter( 'render_block', $this, 'social_link_render_callback', 100, 3 );
		}
	}

	/**
	 * Register assets
	 *
	 * @hook init
	 * @return void
	 */
	public function register_assets() {
		$this->editor_script_handle = register_block_script_handle( $this->block_json, 'editorScript' );
		$this->view_script_handle   = register_block_script_module_id( $this->block_json, 'viewScriptModule' );
		$this->style_handle         = register_block_style_handle( $this->block_json, 'style' );
	}

	/**
	 * Register editor script
	 *
	 * @hook enqueue_block_editor_assets
	 * @return void
	 */
	public function register_editor_script() {
		wp_enqueue_script( $this->editor_script_handle );
	}

	/**
	 * Register style
	 *
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
	 * @param mixed $metadata Metadata.
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
	 * @param mixed $settings Settings.
	 * @param mixed $metadata Metadata.
	 * @return mixed
	 */
	public function add_settings( array $settings, array $metadata ) {
		if ( $this->block_name === $metadata['name'] ) {
			$settings['provides_context'] = array_merge(
				array_key_exists( 'provides_context', $settings ) ? $settings['provides_context'] : array(),
				array(
					'core/socialLinksTitle'       => 'title',
					'core/socialLinksDescription' => 'description',
					'core/socialLinksUrl'         => 'url',
					'core/socialLinksImageId'     => 'imageId',
					'core/socialLinksHashtags'    => 'hashtags',
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

		// Ingest context on child block.
		if ( $this->child_block_name === $metadata['name'] ) {
			$settings['uses_context'] = array_merge(
				array_key_exists( 'uses_context', $settings ) ? $settings['uses_context'] : array(),
				array(
					'postId',
					'queryId',
					'core/socialLinksTitle',
					'core/socialLinksDescription',
					'core/socialLinksUrl',
					'prc-quiz/results/score',
				)
			);
		}
		return $settings;
	}

	// public function get_description_context_value( $description, $block ) {
	// if description does not have %s in it then just return $description
	// if ( false === strpos( $description, '%s' ) ) {
	// return $description;
	// }
	// Right now we only support "score" as a value, from the quiz results block.
	// $score = array_key_exists( 'prc-quiz/results/score', $block->context ) ? $block->context['prc-quiz/results/score'] : false;

	// if ( false === $score ) {
	// return $description;
	// }

	// return sprintf( $description, $score );
	// }

	/**
	 * Fallback to shortlink if no url is provided for social links.
	 *
	 * @hook render_block_data
	 * @param mixed $parsed_block Parsed block.
	 * @return mixed
	 */
	public function social_links_url_fallback( $parsed_block ) {
		if ( 'core/social-links' === $parsed_block['blockName'] ) {
			if ( ! isset( $parsed_block['attrs']['url'] ) || empty( $parsed_block['attrs']['url'] ) ) {
				$parsed_block['attrs']['url'] = wp_get_shortlink( get_the_ID() );
			}
		}
		return $parsed_block;
	}

	/**
	 * Handle defining the context value for blocks that may appear inside core/social-links.
	 *
	 * @hook render_block_context
	 * @param mixed $context Context.
	 * @param mixed $parsed_block Parsed block.
	 */
	public function social_links_context_handler( $context, $parsed_block ) {
		if ( in_array(
			$parsed_block['blockName'],
			array(
				'core/social-link',
				'prc-block/social-share-sheet',
				'prc-block/social-share-url-field',
			)
		) ) {
			if ( ! isset( $context['postId'] ) ) {
				return $context;
			}
			$post_obj = false;
			// Save for shortlinks, we handle these values primitively for efficiency and speed.
			if ( ! isset( $context['core/socialLinksUrl'] ) || empty( $context['core/socialLinksUrl'] ) ) {
				$context['core/socialLinksUrl'] = wp_get_shortlink( $context['postId'] );
			}
			if ( ! isset( $context['core/socialLinksDescription'] ) || ! isset( $context['core/socialLinksTitle'] ) ) {
				if ( isset( $context['postId'] ) ) {
					$post_obj = get_post( $context['postId'] );
				}
			}
			// Check if description is set and if it isnt then lets set the context accoridngly...
			if ( ! isset( $context['core/socialLinksDescription'] ) ) {
				// Get the excerpt directly from the post object, do not try to auto-generate it.
				if ( $post_obj ) {
					$excerpt = $post_obj->post_excerpt;
					if ( ! empty( $excerpt ) ) {
						$context['core/socialLinksDescription'] = $excerpt;
					}
				}
			}
			// Check if title is set and if it isnt then lets set the context accordingly...
			if ( ! isset( $context['core/socialLinksTitle'] ) ) {
				if ( $post_obj ) {
					$title = $post_obj->post_title;
					if ( ! empty( $title ) ) {
						$context['core/socialLinksTitle'] = apply_filters( 'the_title', $title );
					}
				}
			}
		}

		return $context;
	}

	/**
	 * Render the social link block
	 *
	 * @hook render_block
	 * @param mixed $block_content Block content.
	 * @param mixed $block Block.
	 * @param mixed $instance Instance.
	 * @return mixed
	 */
	public function social_link_render_callback( $block_content, $block, $instance ) {
		if ( $this->child_block_name === $block['blockName'] && is_string( $block_content ) && ! is_admin() ) {
			wp_enqueue_script_module( $this->view_script_handle );
			wp_enqueue_script( 'wp-url' );

			$context = $instance->context;

			$tags = new WP_HTML_Tag_Processor( $block_content );
			$tags->next_tag( 'li' );

			$url = isset( $context['core/socialLinksUrl'] ) ? $context['core/socialLinksUrl'] : false;

			$title = isset( $context['core/socialLinksTitle'] ) ? $context['core/socialLinksTitle'] : null;

			$description = isset( $context['core/socialLinksDescription'] ) ? $context['core/socialLinksDescription'] : null;

			$tags->set_attribute( 'data-wp-interactive', 'core/social-links' );

			$platform = preg_replace( '/^wp-social-link-/', '', $tags->get_attribute( 'class' ) );

			$tags->set_attribute(
				'data-wp-context',
				wp_json_encode(
					array(
						'url'         => $url,
						'title'       => $title,
						'description' => $description,
						'platform'    => $platform,
					)
				)
			);

			$tags->set_attribute( 'data-wp-on--click', 'actions.onShareClick' );

			return $tags->get_updated_html();
		}
		return $block_content;
	}
}
