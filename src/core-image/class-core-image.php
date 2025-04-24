<?php
/**
 * Core Image Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use WP_HTML_Tag_Processor;
/**
 * Block Name:
 * Version:           0.1.0
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Core_Image {
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
	public $block_name = 'core/image';

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
		$this->block_json = prc_block_library_manifest( 'core-image' );
		$this->init( $loader );
	}

	/**
	 * Initialize the block
	 *
	 * @param mixed $loader Loader.
	 */
	public function init( $loader = null ) {
		$loader->add_action( 'init', $this, 'register_assets' );
		$loader->add_action( 'enqueue_block_editor_assets', $this, 'register_editor_script' );
		$loader->add_action( 'enqueue_block_assets', $this, 'register_style' );
		$loader->add_filter( 'render_block_data', $this, 'set_image_to_lazy_load_inside_blocks', 10, 3 );
		$loader->add_filter( 'render_block_core/image', $this, 'share_figure_no_lazy_load_classname_with_img', 10, 2 );
		$loader->add_filter(
			'wp_img_tag_add_loading_attr',
			$this,
			'eager_load',
			10,
			3
		);
		$loader->add_filter( 'dominant_color_img_tag_add_dominant_color', $this, 'disable_dominate_color_for_no_lazy_loading', 10, 5 );
		$loader->add_filter( 'block_type_metadata', $this, 'add_attributes', 100, 1 );
	}

	/**
	 * Register additional attributes for the core-image block
	 *
	 * @hook block_type_metadata 100, 1
	 * @param mixed $metadata Metadata.
	 * @return mixed
	 */
	public function add_attributes( $metadata ) {
		if ( $this->block_name !== $metadata['name'] ) {
			return $metadata;
		}

		if ( ! array_key_exists( 'disableLazyLoading', $metadata['attributes'] ) ) {
			$metadata['attributes']['disableLazyLoading'] = array(
				'type'    => 'boolean',
				'default' => false,
			);
		}

		return $metadata;
	}

	/**
	 * Register assets
	 *
	 * @hook init
	 */
	public function register_assets() {
		$this->editor_script_handle = register_block_script_handle( $this->block_json, 'editorScript' );
		$this->style_handle         = register_block_style_handle( $this->block_json, 'style' );
	}

	/**
	 * Here we're hijacking the core/image block's style and providing our own.
	 *
	 * @hook enqueue_block_assets
	 */
	public function register_style() {
		wp_deregister_style( 'wp-block-image' );
		global $wp_styles;
		$style = $wp_styles->registered[ $this->style_handle ];
		$src   = $style->src;
		wp_register_style( 'wp-block-image', $src, array(), PRC_BLOCK_LIBRARY_VERSION );
	}

	/**
	 * Register editor script
	 *
	 * @hook enqueue_block_editor_assets
	 */
	public function register_editor_script() {
		wp_enqueue_script( $this->editor_script_handle );
	}

	/**
	 * If a core/image block is inside a prc-block/carousel-slide or
	 * prc-block/timeline-slide block, this will set the attribute
	 * `disableLazyLoading` to true.
	 *
	 * @hook render_block_data
	 *
	 * @param array         $parsed_block Parsed block.
	 * @param array         $source_block Source block.
	 * @param WP_Block|null $parent_block Parent block.
	 * @return array
	 */
	public function set_image_to_lazy_load_inside_blocks( $parsed_block, $source_block, $parent_block ) {
		// Check if the image parent is a prc-block/carousel-slide or prc-block/timeline-slide to set the attribute disableLazyLoading to true.
		if ( $parent_block && ( in_array( $parent_block->name, array( 'prc-block/carousel-slide', 'prc-block/timeline-slide' ) ) ) ) {
			$parsed_block['attrs']['disableLazyLoading'] = true;
		}
		return $parsed_block;
	}

	/**
	 * Pass the 'no-lazy-load' classname when present on a figure element to the img element within.
	 *
	 * @hook render_block_core/image
	 *
	 * @param string $block_content Block content.
	 * @param array  $block Block.
	 * @return string
	 */
	public function share_figure_no_lazy_load_classname_with_img( $block_content, $block ) {
		$attributes           = $block['attrs'];
		$disable_lazy_loading = array_key_exists( 'disableLazyLoading', $attributes ) && $attributes['disableLazyLoading'];
		if ( ! $disable_lazy_loading ) {
			return $block_content;
		}
		$tag_processor = new WP_HTML_Tag_Processor( $block_content );
		if ( $tag_processor->next_tag(
			array(
				'tag_name' => 'figure',
			)
		) ) {
			$tag_processor->next_tag( 'img' );
			$tag_processor->add_class( 'no-lazy-load' );
			$tag_processor->set_attribute( 'decoding', 'sync' );
			$block_content = $tag_processor->get_updated_html();
		}
		return $block_content;
	}

	/**
	 * When 'no-lazy-load' is present on an image, set the loading attribute to 'eager'.
	 *
	 * @hook wp_img_tag_add_loading_attr
	 *
	 * @param string $value Value.
	 * @param string $image Image.
	 * @param string $context Context.
	 * @return string
	 */
	public function eager_load( $value, $image, $context ) {
		if ( strpos( $image, 'no-lazy-load' ) !== false ) {
			return 'eager';
		}

		return $value;
	}

	/**
	 * Disable the dominant color for no lazy loading
	 *
	 * @hook dominant_color_img_tag_add_dominant_color
	 *
	 * @param bool  $enabled Enabled.
	 * @param int   $attachment_id Attachment ID.
	 * @param array $image_meta Image meta.
	 */
	public function disable_dominate_color_for_no_lazy_loading( $enabled, $attachment_id, $image_meta, $filtered_image, $context ) {
		if ( strpos( $filtered_image, 'no-lazy-load' ) !== false ) {
			return false;
		}

		return $enabled;
	}
}
