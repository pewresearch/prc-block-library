<?php
namespace PRC\Platform\Blocks;

$block_wrapper_attrs = array(
    'aria-labelledby' => array_key_exists('label', $attributes) ? md5($attributes['label']) : false,
	'data-wp-interactive' => wp_json_encode(array('namespace' => 'prc-block/form-field')),
	'style' => '--block-gap: ' . \PRC\Platform\Block_Utils\get_block_gap_support_value($attributes) . ';',
);
if ( array_key_exists('required', $attributes) && $attributes['required'] ) {
	$block_wrapper_attrs['required'] = true;
}

echo wp_sprintf(
	'<div %1$s><label data-wp-on--click="actions.onLabelClick">%2$s</label>%3$s</div>',
	get_block_wrapper_attributes($block_wrapper_attrs),
	$attributes['label'],
	$content,
);
