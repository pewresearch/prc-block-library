<?php
/**
 * Social Share URL Field Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use WP_HTML_Tag_Processor;

/**
 * Block Name:        Social Share Url Field
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Social_Share_URL_Field {
	/**
	 * Constructor
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		$this->init( $loader );
	}

	/**
	 * Initialize the block
	 *
	 * @param mixed $loader Loader.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
		}
	}

	/**
	 * Render the block callback
	 *
	 * @param array    $attributes Attributes.
	 * @param string   $content Content.
	 * @param WP_Block $block Block.
	 * @return string
	 */
	public function render_block_callback( $attributes, $content, $block ) {
		$context = $block->context;

		// Check context for the url.
		$url = array_key_exists( 'core/socialLinksUrl', $context ) ? $context['core/socialLinksUrl'] : '';
		// If after all that there is no url then try to fetch the short link for the current post id.
		if ( ! $url && isset( $context['postId'] ) ) {
			$url = wp_get_shortlink( $context['postId'] );
		}

		$block_attrs = get_block_wrapper_attributes(
			array(
				'data-wp-interactive' => 'prc-block/social-share-url-field',
				'data-wp-context'     => wp_json_encode(
					array(
						'url' => $url,
					)
				),
			)
		);

		$tags = new WP_HTML_Tag_Processor( $content );
		if ( $tags->next_tag( 'input' ) ) {
			$tags->set_attribute( 'data-wp-on--click', 'actions.onInputClick' );
			$tags->set_attribute( 'data-wp-bind--value', 'context.url' );
		}
		$content = $tags->get_updated_html();

		return wp_sprintf(
			'<div %1$s><span class="label">Share This Link:</span>%2$s</div>',
			$block_attrs, // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			$content // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		);
	}

	/**
	 * Block init
	 *
	 * @hook init
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/social-share-url-field',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}
