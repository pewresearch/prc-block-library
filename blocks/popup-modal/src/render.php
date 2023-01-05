<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$block_wrapper_attrs = get_block_wrapper_attributes();

// You can use this method...
echo wp_sprintf(
	'<div class="wp-block-prc-block-popup-modal--outer"><div %1$s><div class="wp-block-prc-block-modal--header">%2$s</div><div class="wp-block-prc-block-popup-modal--inner">%3$s</div></div></div>',
	$block_wrapper_attrs,
	$attributes['title'] ? '<h2>' . $attributes['title'] . '</h2>' : '',
	$content,
);
