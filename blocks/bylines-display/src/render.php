<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

// get the post id from context...
if ( isset( $block->context['postId'] ) ) {
	$object_id = $block->context['postId'];
} else {
	$object_id = get_the_ID();
}

$block_wrapper_attrs = get_block_wrapper_attributes();
$prefix = isset( $attributes['prefix'] ) ? $attributes['prefix'] : 'By';
$bylines = new \PRC\Platform\Bylines((int) $object_id);
if ( is_wp_error($bylines->bylines) ) {
	return;
}
if ( false === $bylines->should_display ) {
	return;
}

$bylines_output = $bylines->format('html');

if ( 2 >= strlen($bylines_output) ) {
	return;
}

echo wp_sprintf(
	'<div %1$s><span>%2$s</span><div class="wp-block-prc-block-bylines-display__bylines">%3$s</div></div>',
	$block_wrapper_attrs,
	$prefix,
	$bylines_output
);
