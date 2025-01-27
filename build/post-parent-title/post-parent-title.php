<?php
namespace PRC\Platform\Blocks;

/**
 * Block Name:        Parent Post Title
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Post_Parent_Title {
	public function __construct( $loader ) {
		$this->init( $loader );
	}

	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
		}
	}

	/**
	 * Renders the parent post's post title on the server.
	 *
	 * @param array    $attributes Block attributes.
	 * @param string   $content    Block default content.
	 * @param WP_Block $block      Block instance.
	 *
	 * @return string Returns the filtered parent post title for the current post wrapped inside "h" tags.
	 */
	function render_block_callback( $attributes, $content, $block ) {
		if ( ! isset( $block->context['postId'] ) ) {
			return '';
		}

		$parent_post_id = wp_get_post_parent_id( $block->context['postId'] );

		if ( 0 === $parent_post_id || false === $parent_post_id ) {
			return '';
		}

		$title = get_the_title( $parent_post_id );

		if ( ! $title ) {
			return '';
		}

		$tag_name = 'h4';
		if ( isset( $attributes['level'] ) ) {
			$tag_name = 'h' . $attributes['level'];
		}

		if ( isset( $attributes['isLink'] ) && $attributes['isLink'] ) {
			$rel   = ! empty( $attributes['rel'] ) ? 'rel="' . esc_attr( $attributes['rel'] ) . '"' : '';
			$title = sprintf( '<a href="%1$s" target="%2$s" %3$s>%4$s</a>', esc_url( get_the_permalink( $parent_post_id ) ), esc_attr( $attributes['linkTarget'] ), $rel, $title );
		}

		$classes = array();
		if ( isset( $attributes['textAlign'] ) ) {
			$classes[] = 'has-text-align-' . $attributes['textAlign'];
		}
		if ( isset( $attributes['style']['elements']['link']['color']['text'] ) ) {
			$classes[] = 'has-link-color';
		}
		$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => implode( ' ', $classes ) ) );

		return sprintf(
			'<%1$s %2$s>%3$s</%1$s>',
			$tag_name,
			$wrapper_attributes,
			$title . '<div data-wp-interactive="prc-block/table-of-contents" class="prc-post-parent-title__active-toc-part"><span data-wp-text="state.currentlyActivePartLabel"></span></div>'
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
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/post-parent-title',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			) 
		);
	}
}
