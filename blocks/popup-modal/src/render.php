<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$position = str_replace(' ', '-', strtolower($attributes['position']));
$position = jetpack_is_mobile() ? 'center-center' : $position;
$outer_class = classNames('wp-block-prc-block-popup-modal--outer', 'is-position-' . $position);
$block_wrapper_attrs = get_block_wrapper_attributes();
$is_video_modal = array_key_exists('popup-controller/className', $block->context) && 'is-style-video' === $block->context['popup-controller/className'];
$heading = wp_sprintf(
	'<div class="wp-block-prc-block-popup-modal--header"><h2>%1$s</h2></div>',
	array_key_exists('title', $attributes) ? $attributes['title'] : ''
);

// You can use this method...
echo wp_sprintf(
	'<div class="%4$s"><div %1$s><div class="wp-block-prc-block-popup-modal--close-button"></div>%2$s<div class="wp-block-prc-block-popup-modal--inner">%3$s</div></div></div>',
	$block_wrapper_attrs,
	false === $is_video_modal ? $heading : '',
	$content,
	$outer_class
);
