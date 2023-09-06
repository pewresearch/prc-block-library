<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$is_deprecated = array_key_exists('deprecated', $attributes) ? true : false;

echo wp_sprintf(
	'<div %1$s><div class="wp-block-prc-block-collapsible__title"><div>%2$s</div><button class="wp-block-prc-block-collapsible__icon"><i aria-hidden="true" class="fa-light fa-circle-plus"></i><i aria-hidden="true" class="fa-light fa-circle-minus"></i></button></div><div class="wp-block-prc-block-collapsible__content">%3$s</div></div>',
	$is_deprecated ? 'class="is-style-plus wp-block-prc-block-collapsible"' : get_block_wrapper_attributes(array('id' => sanitize_title($attributes['title']))),
	array_key_exists( 'title', $attributes ) ? $attributes['title'] : 'How we did this',
	$content,
);
