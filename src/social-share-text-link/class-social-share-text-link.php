<?php
/**
 * Social Share Text Link Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Social Share Text Link
 * Version:           0.1.0
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Social_Share_Text_Link {
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
	 * Render callback for the block
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content    Block content.
	 * @param object $block      Block object.
	 * @return string
	 */
	public function render_callback( $attributes, $content, $block ) {
		// Don't render the block's subtree if it has no label.
		if ( empty( $attributes['label'] ) ) {
			return '';
		}

		if ( ! is_object( $block ) ) {
			return '';
		}

		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'href'   => isset( $attributes['url'] ) ? esc_url( $attributes['url'] ) : false,
				'rel'    => 'nofollow',
				'target' => isset( $attributes['opensInNewTab'] ) && true === $attributes['opensInNewTab'] ? '_blank' : false,
			)
		);

		// End appending HTML attributes to anchor tag.
		// Start anchor tag content.
		$html = '<a ' . $wrapper_attributes . '>';

		if ( isset( $attributes['label'] ) ) {
			$html .= wp_kses(
				$attributes['label'],
				array(
					'code'   => array(),
					'em'     => array(),
					'img'    => array(
						'scale' => array(),
						'class' => array(),
						'style' => array(),
						'src'   => array(),
						'alt'   => array(),
					),
					's'      => array(),
					'span'   => array(
						'style' => array(),
					),
					'strong' => array(),
				)
			);
		}

		$html .= '</a>';

		return normalize_whitespace( $html );
	}

	/**
	 * Block init
	 *
	 * @hook init
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/social-share-text-link',
			array(
				'render_callback' => array( $this, 'render_callback' ),
			)
		);
	}
}
