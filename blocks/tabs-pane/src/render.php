<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$block_wrapper_attrs = get_block_wrapper_attributes(
	array(
		'id'          => 'panel-' . $attributes['uuid'],
		'aria-role'   => 'tabpanel',
		'aria-hidden' => 'true',
	)
);
echo wp_sprintf(
	'<section %1$s>%2$s</section>',
	$block_wrapper_attrs,
	wp_kses( $content , 'post' ),
);
