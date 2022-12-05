<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

echo wp_sprintf(
	'<div %1$s>%2$s</div>',
	get_block_wrapper_attributes(
		array(
			'id'               => md5( wp_json_encode( $attributes ) ),
			'class'            => array_key_exists( 'className', $attributes ) ? $attributes['className'] : '',
			'data-segment-id'  => $attributes['interest'],
		)
	),
	$content
);
