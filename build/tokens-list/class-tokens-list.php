<?php
/**
 * Class Tokens_List
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:
 * Requires at least: 6.7
 * Requires PHP:      8.2
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Tokens_List {

	/**
	 * Constructor
	 *
	 * @param \PRC\Platform\Blocks\Loader $loader The loader instance.
	 */
	public function __construct( $loader ) {
		$this->init( $loader );
	}

	/**
	 * Initialize the block
	 * phpcs:ignore
	 * @param \PRC\Platform\Blocks\Loader $loader The loader instance.
	 *
	 * @return void
	 */
	public function init( $loader ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
		}
	}

	/**
	 * Construct the clear button
	 *
	 * @param string $button_template The button template.
	 * @return string The updated button template.
	 */
	public function construct_clear_button( $button_template ) {
		$tag_processor = new \WP_HTML_Tag_Processor( $button_template );
		$tag_processor->next_tag( 'div' );
		$tag_processor->set_attribute(
			'data-wp-context',
			wp_json_encode(
				array(
					'token' => array(
						'label' => 'Reset',
						'value' => 'reset',
						'slug'  => 'reset',
					),
				)
			)
		);
		$tag_processor->add_class( 'prc-block-tokens-list__clear-button' );
		$tag_processor->next_tag( 'button' );
		$tag_processor->set_attribute( 'data-wp-on--click', 'actions.clearAllTokens' );
		return $tag_processor->get_updated_html();
	}

	/**
	 * Render the block
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content    Block content.
	 * @return string Block markup.
	 */
	public function render_block_callback( $attributes, $content, $block ) {
		$target_namespace = array_key_exists( 'interactiveNamespace', $attributes ) ? $attributes['interactiveNamespace'] : null;
		$tokens           = array_key_exists( 'tokens', $attributes ) ? $attributes['tokens'] : array();
		$tokens           = array_key_exists( 'tokens/list', $block->context ) ? array_merge( $tokens, $block->context['tokens/list'] ) : $tokens;
		$tag_processor    = new \WP_HTML_Tag_Processor( $content );
		while ( $tag_processor->next_tag( 'div' ) ) {
			$block_id = $tag_processor->get_attribute( 'id' );
			if ( ! $block_id ) {
				$block_id = wp_unique_id( 'prc-block-tokens-list-' );
				$tag_processor->set_attribute( 'id', $block_id );
			}
			$tag_processor->set_attribute( 'data-wp-interactive', 'prc-block/tokens-list' );
			$tag_processor->set_attribute( 'data-wp-class--has-tokens', 'state.hasTokens' );
			$tag_processor->set_attribute(
				'data-wp-context',
				wp_json_encode(
					array(
						'id'              => $block_id,
						'targetNamespace' => $target_namespace,
					)
				)
			);

			if ( $tag_processor->next_tag( 'label' ) ) {
				$tag_processor->add_class( 'prc-block-tokens-list__label' );
			}

			if ( $tag_processor->next_tag( 'div' ) ) {
				// We set this here so we can use it in our search and replace below.
				$tag_processor->add_class( 'prc-block-tokens-list__tokens' );

				$tag_processor->next_tag( 'button' );
				$tag_processor->set_attribute( 'data-wp-text', 'context.token.label' );
				$tag_processor->set_attribute( 'data-wp-bind--value', 'context.token.value' );
				$tag_processor->set_attribute( 'data-wp-bind--name', 'state.tokenName' );
				$tag_processor->set_attribute( 'data-wp-on--click', 'actions.onTokenClick' );
			}
		}

		$processed = $tag_processor->get_updated_html();
		// Now we're going to splice in a <template/> to take our innerblocks and iterate that multiple times for each token, in context.tokens, also retrieved by derived state at state.tokens, which will get this block's local tokens.
		// Get the template element, the prc-block-tokens-list__tokens div.
		$template_inner = preg_match(
			'/<div[^>]*class="[^"]*prc-block-tokens-list__tokens[^"]*"[^>]*>(.*?)<\/div>/s',
			$processed,
			$matches
		);
		if ( $template_inner ) {
			$template_inner = $matches[0];
			$template_tag   = new \WP_HTML_Tag_Processor( $template_inner );
			$template_tag->next_tag( 'div' );
			$template_tag->remove_class( 'prc-block-tokens-list__tokens' );
			$template_inner = $template_tag->get_updated_html();
		}
		$template  = wp_sprintf(
			'<div class="prc-block-tokens-list__tokens"><template data-wp-each--token="%s" data-wp-each-key="context.token.value">%s</template></div>%s',
			'state.tokens',
			$template_inner,
			$this->construct_clear_button( $template_inner )
		);
		$processed = preg_replace(
			'/<div[^>]*class="[^"]*prc-block-tokens-list__tokens[^"]*"[^>]*>.*?<\/div>/s',
			$template,
			$processed
		);
		return $processed;
	}

	/**
	 * Registers the block using the block manifest (if registered). Fails over to the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @hook init
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/tokens-list',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}
