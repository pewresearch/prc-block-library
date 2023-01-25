<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$block_wrapper_attrs = get_block_wrapper_attributes( array(
	'id' => md5(wp_json_encode($attributes)),
	'search' => $attributes['search'],
	'multiple' => $attributes['multiple'],
	'multiple-search' => $attributes['multipleSearch'],
	'placeholder' => $attributes['placeholder'],
	'inline' => $attributes['inline'],
	'animated' => $attributes['animated'],
	
));

echo wp_sprintf(
	'<select %1$s>%2$s</select>',
	$block_wrapper_attrs,
	$content
);
