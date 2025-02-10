<?php
namespace PRC\Platform\Blocks;

use WP_HTML_Tag_Processor;

/**
 * Block Name:        core/heading
 * Version:           2.0.0
 * Requires at least: 6.7
 * Requires PHP:      8.2
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Core_Heading {
	/**
	 * The name of the block.
	 *
	 * @var string
	 */
	public $block_name = 'core/heading';
	/**
	 * The block json from the library manifest.
	 *
	 * @var mixed
	 */
	public $block_json;
	/**
	 * The handle for the editor script.
	 *
	 * @var string
	 */
	public $editor_script_handle;
	/**
	 * The handle for the style.
	 *
	 * @var string
	 */
	public $style_handle;
	/**
	 * Additional custom style options.
	 *
	 * @var array
	 */
	public $styles = array(
		array(
			'name'  => 'layout-heading',
			'label' => 'Layout Heading',
		),
		array(
			'name'  => 'hidden',
			'label' => 'Hidden',
		),
	);
	/**
	 * Check if the legacy heading check, which requires a get_date request
	 * has been completed.
	 *
	 * @var bool
	 */
	public $legacy_heading_check_completed = false;

	/**
	 * Constructor for the Core_Heading class.
	 */
	public function __construct( $loader ) {
		$this->block_json = prc_block_library_manifest( 'core-heading' );
		$this->init( $loader );
	}

	/**
	 * Initialize the class.
	 *
	 * @param mixed $loader
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'register_assets' );
			$loader->add_action( 'enqueue_block_editor_assets', $this, 'register_editor_script' );
			$loader->add_action( 'enqueue_block_assets', $this, 'register_editor_style' );
			$loader->add_filter( 'block_type_metadata', $this, 'add_attributes', 100, 1 );
			$loader->add_filter( 'block_type_metadata_settings', $this, 'add_settings', 100, 2 );
			$loader->add_filter( 'render_block', $this, 'render', 100, 3 );
			$loader->add_filter( 'render_block_context', $this, 'check_if_legacy_chapter_heading', 100, 3 );
		}
	}

	/**
	 * Register the assets for the core-heading block.
	 *
	 * @hook init
	 * @return void
	 */
	public function register_assets() {
		$this->editor_script_handle = register_block_script_handle( $this->block_json, 'editorScript' );
		$this->style_handle         = register_block_style_handle( $this->block_json, 'style' );
		$this->register_new_styles();
	}

	/**
	 * Register the new styles for the core-heading block.
	 */
	public function register_new_styles() {
		foreach ( $this->styles as $style_args ) {
			register_block_style(
				$this->block_name,
				$style_args,
			);
		}
	}

	/**
	 * Register the editor script for the core-heading block.
	 *
	 * @hook enqueue_block_editor_assets
	 * @return void
	 */
	public function register_editor_script() {
		wp_enqueue_script( $this->editor_script_handle );
	}

	/**
	 * Register the editor style for the core-heading block.
	 *
	 * @hook enqueue_block_assets
	 * @return void
	 */
	public function register_editor_style() {
		wp_enqueue_style( $this->style_handle );
	}

	/**
	 * Register additional attributes for the core-heading block.
	 *
	 * @hook block_type_metadata
	 * @param mixed $metadata
	 * @return mixed
	 */
	public function add_attributes( $metadata ) {
		if ( $this->block_name !== $metadata['name'] ) {
			return $metadata;
		}
		// @TODO Update this to isSection in the future and do a data upgrade in the ugprades class.
		if ( ! array_key_exists( 'isChapter', $metadata['attributes'] ) ) {
			$metadata['attributes']['isChapter'] = array(
				'type'    => 'boolean',
				'default' => false,
			);
		}
		if ( ! array_key_exists( 'altTocText', $metadata['attributes'] ) ) {
			$metadata['attributes']['altTocText'] = array(
				'type'    => 'string',
				'default' => '',
			);
		}

		return $metadata;
	}

	/**
	 * Register additional settings, like context, for the core-heading block.
	 *
	 * @hoook block_type_metadata_settings
	 * @param mixed $settings
	 * @param mixed $metadata
	 * @return mixed
	 */
	public function add_settings( array $settings, array $metadata ) {
		if ( $this->block_name === $metadata['name'] ) {
			$settings['attributes']['level']['default'] = 4;
			$settings['uses_context']                   = array_merge(
				array_key_exists( 'uses_context', $settings ) ? $settings['uses_context'] : array(),
				array(
					'postId',
					'prcLegacyChapter',
				)
			);
		}
		return $settings;
	}

	/**
	 * Check once, if this is a legacy chapter heading.
	 * If it is, then we'll set the context to true.
	 * This is only run once per post.
	 */
	public function check_if_legacy_chapter_heading( $context, $parsed_block, $parent_block ) {
		if ( $this->block_name !== $parsed_block['blockName'] ) {
			return $context;
		}
		// This makes sure this only runs on headings inside core/post-content, which helps ensure we don't run this on other headings like in the site layout.
		if ( ! empty( $parent_block->name ) ) {
			return $context;
		}
		if ( true === $this->legacy_heading_check_completed ) {
			$context['prcLegacyChapter'] = true;
			return $context;
		}
		// If this has postId, then lets check the date and determine if its before 2022, if it is then we should add to context 'prcLegacyChapter' => true...
		if ( array_key_exists( 'postId', $context ) && false === $this->legacy_heading_check_completed ) {
			$post_date    = get_the_date( 'Y-m-d H:i:s', $context['postId'] );
			$last_updated = get_the_modified_date( 'Y-m-d H:i:s', $context['postId'] );
			// We set this to true so we don't run this check again.
			$this->legacy_heading_check_completed = true;
			if ( strtotime( $post_date ) < strtotime( '2022-01-01 00:00:00' ) ) {
				$context['prcLegacyChapter'] = true;
			} else {
				// The check has been run and did not find any legacy chapters.
				// No need to run it again, but also it's not true.
				$this->legacy_heading_check_completed = null;
			}
		}

		return $context;
	}

	/**
	 * Render the core-heading block
	 *
	 * @hook render_block
	 * @param string $block_content
	 * @param mixed  $block
	 * @return mixed
	 */
	public function render( $block_content, $block, $wp_block ) {
		if ( $this->block_name !== $block['blockName'] || is_admin() ) {
			return $block_content;
		}

		wp_enqueue_style( $this->style_handle );

		$attributes = $block['attrs'];
		$context    = $wp_block->context;

		$heading_tag = new WP_HTML_Tag_Processor( $block_content );
		$heading_tag->next_tag();
		$id = $heading_tag->get_attribute( 'id' );

		// if $id begins with an h- then remove the h- from the id. for example h-testing-a-heading-w-an-anchor-tag should just become testing-a-heading-w-an-anchor-tag and if it has an integer immediately following the h- then replace the integer with a word that too. for example h-1-testing-a-heading-w-an-anchor-tag should just become one-testing-a-heading-w-an-anchor-tag, and h-5-things-you-need-to-know would become five-things-you-need-to-know

		if ( $id ) {
			if ( preg_match( '/^h-(\d+)-/', $id, $matches ) ) {
				$number = $matches[1];
				$number = intval( $number );
				$number = \convert_number_to_words( $number );
				if ( is_wp_error( $number ) ) {
					$id = preg_replace( '/^h-(\d+)-/', '', $id );
				} else {
					$id = preg_replace( '/^h-(\d+)-/', $number . '-', $id );
				}
			} else {
				$id = preg_replace( '/^h-/', '', $id );
			}
		} else {
			// If there is no ID then we'll generate one that is reproducible and the same on every page load.
			$id = md5( $block_content );
		}

		$heading_tag->set_attribute( 'id', $id );

		// @TODO: Update this to isSection in the future.
		// If the current post is older than 2021 we should automatically set isChapter to true if its an h3...
		if ( array_key_exists( 'prcLegacyChapter', $context ) && true == $context['prcLegacyChapter'] ) {
			// Only set isChapter if it hasn't been explicitly set already
			if ( ! array_key_exists( 'isChapter', $attributes ) ) {
				$attributes['isChapter'] = 'H3' === $heading_tag->get_tag();
			}
		}
		if ( array_key_exists( 'isChapter', $attributes ) && true === $attributes['isChapter'] ) {
			// If this is a chapter heading then some information like its ID and desired TOC label will be injected into prc-block/table-of-contents iAPI state.
			$state          = wp_interactivity_state( 'prc-block/table-of-contents' );
			$sections_found = $state['sectionsFound'] ?? array();
			if ( ! in_array( $id, $sections_found, true ) ) {
				if ( preg_match( '/<h[2-4][^>]*>(.*?)<\/h[2-4]>/', $block_content, $matches ) ) {
					// Check for altTocText and use it as the label instead of the heading text if present.
					$section_label         = ! empty( $attributes['altTocText'] ) ? $attributes['altTocText'] : $matches[1];
					$sections_found[ $id ] = strip_tags( $section_label );
				}
			}
			$state['sectionsFound'] = $sections_found;
			// Add this core/heading isChapter block to the TOC state.
			wp_interactivity_state( 'prc-block/table-of-contents', $state );

			$heading_tag->set_attribute( 'data-is-section', 'true' );
			$heading_tag->set_attribute( 'data-wp-interactive', wp_json_encode( array( 'namespace' => 'prc-block/table-of-contents' ) ) );
			$heading_tag->set_attribute(
				'data-wp-context',
				wp_json_encode(
					array(
						'id' => $id,
					)
				)
			);
			$heading_tag->set_attribute( 'data-wp-on-document--scroll', 'callbacks.watchForSectionScroll' );
		}

		$block_content = $heading_tag->get_updated_html();

		return $block_content;
	}
}
