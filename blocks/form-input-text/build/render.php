<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$block_attrs = get_block_wrapper_attributes(array(
	'placeholder' => array_key_exists( 'placeholder', $attributes ) ? $attributes['placeholder'] : 'Enter email address...',
	'type'        => array_key_exists( 'type', $attributes ) ? $attributes['type'] : 'email',
));

echo wp_sprintf(
	'<input %1$s></input>',
	$block_attrs,
	$content
);
