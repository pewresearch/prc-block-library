<?php
if ( is_admin() ) {
	return $content;
}

$image_attachment = array_key_exists('imageSource', $attributes) && array_key_exists('id', $attributes['imageSource']) ? wp_get_attachment_image_src( $attributes['imageSource']['id'], null) : null;
$image_url = null !== $image_attachment ? $image_attachment[0] : '';
if ( ! $image_url ) {
	$image_url = '';
}
$audio_url = wp_get_attachment_url( $attributes['source']['id'] );
$input_title = array_key_exists('title', $attributes) ? $attributes['title'] : '';
$input_description = array_key_exists('description', $attributes) ? $attributes['description'] : '';
$input_meta_title = array_key_exists('source', $attributes) && array_key_exists('title', $attributes['source']) ? $attributes['source']['title'] : '';
$input_meta_description = array_key_exists('source', $attributes) && array_key_exists('description', $attributes['source']) ? $attributes['source']['description'] : '';
$enable_tracking = array_key_exists('enableEventTracking', $attributes) ? $attributes['enableEventTracking'] : false;

$block_wrapper_attrs = get_block_wrapper_attributes( array(
	'data-title' => $input_title,
	'data-description' => $input_description,
	'data-source' => $audio_url,
	'data-image' => $image_url,
	'data-meta-title' => $input_meta_title,
	'data-meta-description' => $input_meta_description,
	'data-enable-tracking' => $enable_tracking,
));

echo wp_sprintf(
	'<div %1$s>%2$s</div>',
	$block_wrapper_attrs,
    $content
);
