<?php
/**
 * Block Name: Dialog Element
 * Requires at least: 6.4
 * Requires PHP: 8.1
 * Author: Seth Rubenstein
 *
 * @package prc-block
 */

namespace PRC\Platform\Blocks;

$context_id = isset( $block->context['dialog/id'] ) ? $block->context['dialog/id'] : null;

// Check for and apply our custom backdropColor class names.
$color_css_classes        = array();
$has_named_backdrop_color = array_key_exists( 'backdropColor', $attributes ) && ! empty( $attributes['backdropColor'] );
if ( $has_named_backdrop_color ) {
	$color_css_classes[] = 'has-backdrop-color';
}
if ( $has_named_backdrop_color ) {
	$color_css_classes[] = sprintf( 'has-%s-backdrop-color', $attributes['backdropColor'] );
}
$dialog_type = isset( $block->context['dialog/type'] ) ? $block->context['dialog/type'] : 'modal';
$dialog_size = isset( $block->context['dialog/size'] ) ? $block->context['dialog/size'] : 'small';

$block_wrapper_attrs = get_block_wrapper_attributes(
	array(
		'id'                        => wp_unique_id( 'dialog-element-' ),
		'class'                     => implode( ' ', $color_css_classes ) . ' is-size-' . $dialog_size,
		'aria-labelledby'           => $context_id,
		'data-wp-interactive'       => 'prc-block/dialog',
		'data-wp-class--is-mobile'  => 'state.isMobile',
		'data-wp-class--is-video'   => 'state.isVideo',
		'data-wp-class--is-closing' => 'state.isClosing',
		'data-wp-on--click'         => 'callbacks.onBackdropClick',
		'data-wp-dialog-type'       => $dialog_type,
	)
);

// This will enable anyone to supply their own close icon asset.
$close_icon = apply_filters( 'prc_dialog_block_close_icon', \PRC\Platform\Icons\render( 'light', 'circle-xmark' ) );

$close_button = wp_sprintf(
	'<button class="wp-block-prc-block-dialog-element__close-button" data-wp-on--click="actions.onClickClose" type="button" aria-label="Close dialog">%1$s</button>',
	$close_icon,
);

echo wp_sprintf(
	'<dialog %1$s>%2$s<div class="wp-block-prc-block-dialog-element__inner">%3$s</div></dialog>',
	$block_wrapper_attrs,
	$close_button,
	$content
);
