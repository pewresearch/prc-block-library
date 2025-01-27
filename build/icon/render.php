<?php
namespace PRC\Platform\Blocks;
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$block_wrapper_attrs = get_block_wrapper_attributes();
$library = array_key_exists( 'library', $attributes ) ? $attributes['library'] : '';
$icon = array_key_exists( 'icon', $attributes ) ? $attributes['icon'] : '';
$size = array_key_exists( 'size', $attributes ) ? $attributes['size'] : '1em';
$svg = \PRC\Platform\Icons\render($library, $icon, $size);

echo wp_sprintf(
	'<span %1$s>%2$s</span>',
	$block_wrapper_attrs,
	$svg,
);
