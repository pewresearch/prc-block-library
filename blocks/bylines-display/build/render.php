<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$text_align = isset( $attributes['textAlign'] ) ? $attributes['textAlign'] : 'left';
$block_wrapper_attrs = get_block_wrapper_attributes(array(
	'class' => 'has-text-align' . '-' . $text_align,
));
$prefix = isset( $attributes['prefix'] ) ? $attributes['prefix'] : 'By';
$bylines = new \PRC\Platform\Bylines(get_the_ID());
$bylines_output = is_wp_error($bylines->bylines) ? '' : $bylines->format('html');

echo wp_sprintf(
	'<div %1$s>%2$s %3$s</div>',
	$block_wrapper_attrs,
	$prefix,
	$bylines_output
);
