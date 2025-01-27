<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$block_wrapper_attrs = get_block_wrapper_attributes();

// You can use this method...
echo wp_sprintf(
	'<aside %1$s><div class="big-number">%2$s</div><a href="%3$s" class="title">%4$s</a></aside>',
	$block_wrapper_attrs,
	$attributes['enableNumber'] == true ? $attributes['blockIndexAttr'] + 1 : $attributes['blockIndexAttr'],
	esc_url( $attributes['url'] ),
	$attributes['title']
);
