<?php
/**
 * Dialog Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Dialog
 * Version:           1.0.0
 * Requires at least: 6.7
 * Requires PHP:      8.2
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Dialog {
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
			$loader->add_filter( 'render_block_data', $this, 'dialog_id_fallback', 100, 1 );
		}
	}

	/**
	 * Fallback to dialogID if not set by the block
	 *
	 * @hook render_block_data
	 * @param mixed $block Block.
	 * @return mixed
	 */
	public function dialog_id_fallback( $block ) {
		if ( 'prc-block/dialog' === $block['blockName'] ) {
			if ( ! isset( $block['attrs']['dialogId'] ) || empty( $block['attrs']['dialogId'] ) ) {
				$block['attrs']['dialogId'] = wp_unique_id( 'dialog-' );
			}
		}
		return $block;
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
		$block_id = array_key_exists( 'dialogId', $attributes ) ? $attributes['dialogId'] : null;

		if ( ! $block_id ) {
			_doing_it_wrong( 'dialog/render', esc_html__( 'The dialog block requires a dialogId attribute.', 'prc-block-library' ), '1.0.0' );
			return '';
		}

		$block_wrapper_attrs = array(
			'data-wp-interactive' => 'prc-block/dialog',
			'data-wp-context'     => wp_json_encode(
				array(
					'id' => $block_id,
				)
			),
			'data-wp-key'         => $block_id,
		);

		$block_wrapper_attrs = get_block_wrapper_attributes( $block_wrapper_attrs );

		return wp_sprintf(
			'<div %1$s>%2$s</div>',
			$block_wrapper_attrs, // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			$content, // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		);
	}

	/**
	 * Block init
	 *
	 * @hook init
	 * @return void
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/dialog',
			array(
				'render_callback' => array( $this, 'render_callback' ),
			)
		);
	}
}
