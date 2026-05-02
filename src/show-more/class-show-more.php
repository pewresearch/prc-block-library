<?php
/**
 * Show More Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Hide In View
 * Description:       Hide content in view, set a height for preview, clicking expand opens the rest of the block for display
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Show_More {
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
		$current_device = \PRC\BlockUtils\get_current_device();

		$block_attrs = \PRC\BlockUtils\get_block_attributes( 'prc-block/show-more', $attributes );

		$block_id = md5( $content );

		$block_wrapper_attrs = get_block_wrapper_attributes(
			array(
				'id'                         => $block_id,
				'data-wp-interactive'        => wp_json_encode(
					array(
						'namespace' => 'prc-block/show-more',
					)
				),
				'data-wp-class--is-expanded' => 'context.isExpanded',
				'data-wp-context'            => wp_json_encode(
					array(
						'showLabel'     => $block_attrs['showLabel'],
						'hideLabel'     => $block_attrs['hideLabel'],
						'isExpanded'    => get_query_var( 'show-more-block', false ) === $block_id,
						'heights'       => $block_attrs['heights'],
						'currentDevice' => $current_device,
					)
				),
				'data-wp-on-window--resize'  => 'callbacks.onResize',
				'data-wp-bind--style'        => 'callbacks.getStyle',
			)
		);

		$plus_icon  = \PRC\Platform\Icons\render( 'light', 'circle-plus' );
		$minus_icon = \PRC\Platform\Icons\render( 'light', 'circle-minus' );

		$button = wp_sprintf(
			'<button class="prc-show-more__expand-button" type="button" data-wp-on--click="actions.toggleExpanded"><span data-wp-bind--hidden="context.isExpanded">%s</span><span data-wp-bind--hidden="!context.isExpanded">%s</span><span data-wp-text="state.label" class="prc-show-more__expand-button__label"></span></button>',
			$plus_icon,
			$minus_icon,
		);

		return wp_sprintf(
			'<div %1$s><div class="prc-show-more__inner-blocks">%2$s</div>%3$s</div>',
			$block_wrapper_attrs,
			$content,
			$button,
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
			PRC_BLOCK_LIBRARY_DIR . '/build/show-more',
			array(
				'render_callback' => array( $this, 'render_callback' ),
			)
		);
	}
}
