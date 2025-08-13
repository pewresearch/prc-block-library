<?php
/**
 * Animation Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use WP_HTML_Tag_Processor;

/**
 * Block Name:
 * Requires at least: 6.7
 * Requires PHP:      8.2
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */
class Animation {
	/**
	 * Constructor.
	 *
	 * @param  object $loader The loader object.
	 */
	public function __construct( $loader ) {
		$this->init( $loader );
	}

	/**
	 * Initialize the block.
	 *
	 * @param  object $loader The loader object.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
		}
	}

	/**
	 * Render the block
	 *
	 * @param array  $attributes Block attributes
	 * @param string $content Block content
	 * @param array  $block WP_Block object
	 * @return string
	 */
	public function render_block_callback( $attributes, $content ) {
		// Modify markup to include interactivity API attributes.
		$block_id = uniqid( 'prc-block-animation-' );
		wp_interactivity_state(
			'prc-block/animation',
			array(
				$block_id => array(
					'animation' => $attributes['animation'] ?? 'confetti',
					'effect'    => $attributes['effect'] ?? 'center',
					'emoji'     => $attributes['emoji'] ?? '🎉',
					'speed'     => $attributes['speed'] ?? 5000,
					'enabled'   => false,
				),
			),
		);
		$tag = new WP_HTML_Tag_Processor( $content );
		$tag->next_tag();
		$tag->set_attribute( 'id', $block_id );
		$tag->set_attribute(
			'data-wp-interactive',
			'prc-block/animation'
		);
		$tag->set_attribute(
			'data-wp-watch--do-animation',
			'callbacks.onAnimate'
		);
		$tag->set_attribute(
			'data-wp-context',
			wp_json_encode(
				array(
					'id' => $block_id,
				)
			)
		);
		return $tag->get_updated_html();
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
			PRC_BLOCK_LIBRARY_DIR . '/build/animation',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}
