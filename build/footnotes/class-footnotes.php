<?php
/**
 * Footnotes
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Footnotes
 * Description:       A unique take on footnotes. Supports numoffset.
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Pew Research Center
 */
class Footnotes {
	/**
	 * The constructor.
	 *
	 * @param mixed $loader The loader.
	 */
	public function __construct( $loader ) {
		require_once PRC_BLOCK_LIBRARY_DIR . '/src/footnotes/class-footnotes-api.php';
		$this->init( $loader );
	}

	/**
	 * Initialize the class.
	 *
	 * @param mixed $loader The loader.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
			$loader->add_filter( 'the_content', $this, 'filter_content', 100 );
		}
	}

	/**
	 * Filter the content.
	 *
	 * @hook the_content, 100
	 *
	 * @param string $content The content.
	 * @return string
	 */
	public function filter_content( $content ) {
		if ( ! is_singular() ) {
			return $content;
		}
		global $post;
		$post_id       = $post->ID;
		$footnotes_api = new Footnotes_API( $post_id, $content );
		return $footnotes_api->get_content();
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
		// Look at postId in block context first, otherwise default to the globally available post_id.
		$object_id = array_key_exists( 'postId', $block->context ) && ! empty( $block->context['postId'] ) ? $block->context['postId'] : get_the_ID();

		$footnotes = new Footnotes_API( $object_id );
		$footnotes = $footnotes->get_footnotes();
		if ( false === $footnotes || empty( $footnotes['footnotes'] ) ) {
			return '';
		}

		$start              = $footnotes['start'];
		$footnotes_callback = function ( $footnote, $index ) use ( $object_id, $start ) {
			$index     = $index + $start;
			$id        = 'fn-' . $object_id . '-' . $index;
			$link_back = '#fnref-' . $object_id . '-' . $index;
			return wp_sprintf(
				'<li class="wp-block-prc-block-footnotes__footnote" id="%s">%s<span class="wp-block-prc-block-footnotes__footnote__return"><a href="%s">↩</a></span></li>',
				$id,
				$footnote,
				$link_back,
			);
		};
		$footnotes          = array_map(
			$footnotes_callback,
			$footnotes['footnotes'],
			array_keys( $footnotes['footnotes'] )
		);
		$content            = implode( '', $footnotes );

		$block_gap = \PRC\Platform\Block_Utils\get_block_gap_support_value( $attributes );

		$block_wrapper_attrs = get_block_wrapper_attributes(
			array(
				'id'    => 'footnotes',
				'style' => '--block-gap: ' . $block_gap . ';',
				'start' => $start,
			)
		);

		return wp_sprintf(
			'<ol %1$s>%2$s</ol>',
			// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			$block_wrapper_attrs,
			// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			$content,
		);
	}

	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @hook init
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/footnotes',
			array(
				'render_callback' => array( $this, 'render_callback' ),
			)
		);
	}
}
