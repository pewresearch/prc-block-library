<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$image_attachment = wp_get_attachment_image_src( $attributes['imageSource']['id'], null);
$image_url = $image_attachment[0];

do_action('qm/debug', $image_url);

$audio_url = wp_get_attachment_url( $attributes['source']['id'] );

do_action('qm/debug', $attributes['source']);

$block_wrapper_attrs = get_block_wrapper_attributes( array(
	'data-title' => $attributes['title'],
	'data-description' => $attributes['description'],
	'data-source' => $audio_url,
	'data-image' => $image_url,
	'data-meta-title' => $attributes['source']['title'],
	'data-meta-description' => $attributes['source']['description'],
));

echo wp_sprintf(
	'<div %1$s>%2$s</div>',
	$block_wrapper_attrs,
    $content
);
