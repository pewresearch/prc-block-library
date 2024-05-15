<?php

$disengage_click_handler = array_key_exists('disengageClickHandler', $attributes) && true === $attributes['disengageClickHandler'];

$block_wrapper_attrs = array(
	'data-wp-interactive' => wp_json_encode(array(
		'namespace' => 'prc-block/popup-controller',
	)),
);
if ( true !== $disengage_click_handler ) {
	$block_wrapper_attrs['data-wp-on--click'] = 'actions.open';
}

$block_wrapper_attrs = get_block_wrapper_attributes($block_wrapper_attrs);

echo wp_sprintf(
	'<div %1$s>%2$s</div>',
	$block_wrapper_attrs,
	$content,
);
