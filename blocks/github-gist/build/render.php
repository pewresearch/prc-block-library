<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$url = array_key_exists('file', $attributes) && !empty($attributes['file']) ? "{$attributes['url']}.js?file={$attributes['file']}" : "{$attributes['url']}.js";

echo wp_sprintf(
	'<div %1$s><script src="%2$s"></script>%3$s</div>',
	get_block_wrapper_attributes(
		array(
			'id' => md5( wp_json_encode( $attributes ) ),
		)
	),
	esc_url($url),
	$content
);
