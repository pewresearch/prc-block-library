<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$block_wrapper_attrs = get_block_wrapper_attributes();

$enable_sub_menu = $attributes['enableSubmenu'] ?? false;
$term_id 	     = $attributes['termId'] ?? 0;
$term_taxonomy 	 = $attributes['taxonomy'] ?? '';

// You can use this method...
echo wp_sprintf(
	'<div %1$s>%2$s<div class="wp-block-prc-block-taxonomy-menu-link__sub-menu">%3$s</div></div>',
	$block_wrapper_attrs,
	wp_sprintf(
		"<a href='%s'>%s</a>",
		$attributes['url'] ?? '',
		$attributes['label'] ?? ''
	),
	$content,
);
