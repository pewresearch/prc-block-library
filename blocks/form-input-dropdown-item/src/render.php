<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$block_wrapper_attrs = get_block_wrapper_attributes( array(
	'data-title' => $attributes['title'],
	'data-value' => $attributes['value'],
));

echo wp_sprintf(
	'<option %1$s></option>',
	$block_wrapper_attrs,
	$content
);




