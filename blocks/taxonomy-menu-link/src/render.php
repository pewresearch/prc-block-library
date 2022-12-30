<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$block_wrapper_attrs = get_block_wrapper_attributes();

$enable_sub_menu = $attributes['enableSubMenu'] ?? false;
$template        = $enable_sub_menu && !empty($content) ? '<div %1$s>%2$s<div class="wp-block-prc-block-taxonomy-menu-link__sub-menu">%3$s</div></div>' : '<div %1$s>%2$s</div>';
$label           = 'is-style-sub-tree' === $attributes['className'] ? $attributes['label'] . ' <span class="icon">+</span>' : $attributes['label'];
$label           = 'is-style-sub-expand' === $attributes['className'] ? '<span class="icon">+</span> ' . $attributes['label'] : $label;

// You can use this method...
echo wp_sprintf(
	$template,
	$block_wrapper_attrs,
	wp_sprintf(
		!empty( $attributes['url'] ) ? '<a href="%1$s">%2$s</a>' : '%2$s',
		$attributes['url'] ?? '',
		$label,
	),
	$content,
);
