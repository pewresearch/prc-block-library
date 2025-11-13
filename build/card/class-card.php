<?php
/**
 * "Baseball" Card Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Card
 * Description:       A card block with heading.
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */
class Card {
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
			$loader->add_filter( 'render_block', $this, 'hide_empty_card', 100, 2 );
		}
	}

	/**
	 * Hide the block if it has no content in the .prc-card__content div.
	 *
	 * @hook render_block Fires late, to ensure interior blocks have rendered.
	 *
	 * @param string $content The block content.
	 * @param array  $block The block data.
	 */
	public function hide_empty_card( $content, $block ) {
		if ( 'prc-block/card' === $block['blockName'] ) {
			// Check if the $content has anything inside its prc-card__content div.
			$has_content = preg_match( '/<div class="prc-card__content">\s*<\/div>/', $content ) === 0;
			// If not, hide the block.
			if ( ! $has_content ) {
				return ''; // Return empty string to hide the block.
			}
		}
		return $content;
	}

	/**
	 * Build inline CSS custom properties for color settings.
	 *
	 * @param array $attributes Block attributes.
	 * @param bool  $is_vertical Whether the tabs are vertical.
	 *
	 * @return string Inline CSS string.
	 */
	private function generate_color_styles( array $attributes ): string {
		$styles = array(
			'--custom-heading-text-color'       => $attributes['customHeadingTextColor'] ?? '',
			'--custom-heading-background-color' => $attributes['customHeadingBackgroundColor'] ?? '',
		);

		$style_string = array_map(
			static function ( string $key, string $value ): string {
				return ! empty( $value ) ? $key . ': ' . $value . ';' : '';
			},
			array_keys( $styles ),
			$styles
		);

		return implode( ' ', array_filter( $style_string ) );
	}

	/**
	 * Render Block Callback
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content Block content.
	 * @return string Rendered block HTML.
	 */
	public function render_block_callback( $attributes, $content ) {
		$color_styles = $this->generate_color_styles( $attributes );
		$styles       = trim( $color_styles );
		$tag          = new \WP_HTML_Tag_Processor( $content );
		$tag->next_tag();
		$tag->set_attribute( 'style', $styles );
		return $tag->get_updated_html();
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
			PRC_BLOCK_LIBRARY_DIR . '/build/card',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}
