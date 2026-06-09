<?php
/**
 * Sub Title Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

if ( defined( 'WP_CLI' ) && \WP_CLI ) {
	require_once __DIR__ . '/class-sub-title-migrate-cli.php';
}

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
		if ( 'local' === wp_get_environment_type() ) {
			do_action( 'qm/debug', 'Counts: ' . $this->render_counts );
		}
		if ( is_singular( 'post' ) && $this->render_counts >= 2 ) {
			$block_content = preg_replace(
				'/<h2[^>]*class="[^"]*\bwp-block-prc-block-subtitle\b[^"]*"[^>]*>.*?<\/h2>/s',
				'<!-- Sub Title Was Here -->',
				$block_content
			);
		}
		return $block_content;
	}

	/**
	 * Render callback for the block
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content    Block content.
	 * @param object $block      Block object.
	 * @return string
	 */
	public function render_callback( $attributes, $content, $block ) {
		$context_post_id = $block->context['postId'] ?? null;
		if ( ! $context_post_id ) {
			return '';
		}

		$text_align = isset( $attributes['textAlign'] ) ? $attributes['textAlign'] : 'left';
		$sub_title  = trim( (string) get_post_meta( $context_post_id, 'sub_title', true ) );

		if ( '' === $sub_title ) {
			return '';
		}

		return wp_sprintf(
			'<h2 %1$s>%2$s</h2>',
			get_block_wrapper_attributes(
				array(
					'class'      => 'has-text-align-' . $text_align,
					'aria-level' => '2',
				)
			),
			$sub_title
		);
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

		register_post_meta(
			'',
			'sub_title',
			array(
				'show_in_rest'      => true,
				'single'            => true,
				'type'              => 'string',
				'revisions_enabled' => true,
				'description'       => 'A sub title that appears under the post title.',
				'auth_callback'     => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);

		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/sub-title',
			array(
				'render_callback' => array( $this, 'render_callback' ),
			)
		);
	}
}
