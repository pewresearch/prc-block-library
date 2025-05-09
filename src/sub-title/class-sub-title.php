<?php
/**
 * Sub Title Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Post Sub-Title
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Sub_Title {
	/**
	 * Whether the sub title has already been rendered.
	 *
	 * @var bool
	 */
	public $render_counts = 0;

	/**
	 * Loader.
	 *
	 * @var mixed
	 */
	public $loader;

	/**
	 * Constructor
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		$this->loader = $loader;
		$this->init();
	}

	/**
	 * Initialize the block
	 */
	public function init() {
		$this->loader->add_action( 'init', $this, 'block_init' );
		$this->loader->add_filter( 'vip_block_data_api__sourced_block_result', $this, 'add_data_to_vip_blocks_api', 10, 4 );
		$this->loader->add_filter( 'render_block_prc-block/subtitle', $this, 'render_hooks', 10, 3 );
		$this->loader->add_filter( 'render_block_core/post-content', $this, 'remove_unneeded_sub_title_blocks', 10, 3 );
	}

	/**
	 * Render hooks for the subtitle block
	 *
	 * @hook render_block_prc-block/subtitle
	 * @param string $block_content The block content.
	 * @param array  $block The block.
	 * @param array  $wp_block The WP block.
	 * @return string The block content.
	 */
	public function render_hooks( $block_content, $block, $wp_block ) {
		if ( 'prc-block/subtitle' === $block['blockName'] ) {
			++$this->render_counts;
		}
		return $block_content;
	}

	/**
	 * Remove the sub title from the post content as we display it
	 * in a pattern in the template instead.
	 *
	 * @hook render_block
	 *
	 * @param string $block_content The block content.
	 * @param array  $block The block.
	 * @param array  $wp_block The WP block.
	 * @return string The block content.
	 */
	public function remove_unneeded_sub_title_blocks( $block_content, $block, $wp_block ) {
		if ( is_singular( 'post' ) && $this->render_counts > 2 ) {
			$block_content = preg_replace(
				'/<h2[^>]*class="[^"]*\bwp-block-prc-block-subtitle\b[^"]*"[^>]*>.*?<\/h2>/s',
				'<!-- Sub Title Was Here -->',
				$block_content
			);
		}
		return $block_content;
	}

	/**
	 * Add data to VIP blocks API
	 *
	 * @hook vip_block_data_api__sourced_block_result
	 * @param array  $sourced_block Sourced block.
	 * @param string $block_name Block name.
	 * @param int    $post_id Post ID.
	 * @param array  $block Block.
	 * @return array
	 */
	public function add_data_to_vip_blocks_api( $sourced_block, $block_name, $post_id, $block ) {
		if ( 'prc-block/sub-title' !== $block_name ) {
			return $sourced_block;
		}

		// check for new value if it exists use it for $value otherwise check for legacy...
		$new_value    = get_post_meta( $post_id, 'sub_title', true );
		$legacy_value = get_post_meta( $post_id, 'sub_headline', true );

		// Add custom attribute to REST API result
		$sourced_block['attributes']['content'] = $new_value ? $new_value : $legacy_value;

		return $sourced_block;
	}

	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		// Legacy
		register_post_meta(
			'',
			'sub_headline',
			array(
				'show_in_rest'  => true,
				'single'        => true,
				'type'          => 'string',
				'description'   => 'A sub title that appears under the post title.',
				'auth_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);

		// New
		// @TODO: switch block over to this when we start the ui/update
		register_post_meta(
			'',
			'sub_title',
			array(
				'show_in_rest'  => true,
				'single'        => true,
				'type'          => 'string',
				'description'   => 'A sub title that appears under the post title.',
				'auth_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);

		register_block_type_from_metadata( PRC_BLOCK_LIBRARY_DIR . '/build/sub-title' );
	}
}
