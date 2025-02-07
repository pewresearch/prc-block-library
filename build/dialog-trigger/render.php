<?php
$context_id = isset( $block->context['dialog/id'] ) ? $block->context['dialog/id'] : null;

$disengage_click_handler = array_key_exists( 'disengageClickHandler', $attributes ) && true === $attributes['disengageClickHandler'];

$block_wrapper_attrs = array(
	'data-wp-interactive' => 'prc-block/dialog',
	'aria-labelledby'     => $context_id,
);
if ( true !== $disengage_click_handler ) {
	$block_wrapper_attrs['data-wp-on--click'] = 'actions.onClickOpen';
}

$block_wrapper_attrs = get_block_wrapper_attributes( $block_wrapper_attrs );

echo wp_sprintf(
	'<button %1$s>%2$s</button>',
	$block_wrapper_attrs,
	$content,
);
