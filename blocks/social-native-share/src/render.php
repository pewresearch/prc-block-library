<?php
namespace PRC\Platform\Blocks;
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$id = 'xyz';

$title = array_key_exists('title', $attributes) ? $attributes['title'] : '';
$text = array_key_exists('text', $attributes) ? $attributes['text'] : '';
$url = array_key_exists('url', $attributes) ? $attributes['url'] : '';
$hashtags = array_key_exists('hashtags', $attributes) ? $attributes['hashtags'] : array();
// prepend every hashtag with a # and then return a comma separated string. i... just don't think the hashtags should be stored with actual hash in the db.
$hashtags = implode(',', array_map(function($hashtag) {
	return '#' . $hashtag;
}, $hashtags));
$image_id = array_key_exists('imageId', $attributes) ? $attributes['imageId'] : '';

wp_interactivity_state('prc-block/social-share-sheet', array(
	'title' => '',
	'text' => '',
	'url' => '',
	'hashtags' => '',
	'image' => '',
));

$block_wrapper_attrs = get_block_wrapper_attributes(array(
	'data-wp-interactive' => 'prc-block/social-share-sheet'
));

echo wp_sprintf(
	'<div %1$s>%2$s</div>',
	$block_wrapper_attrs,
	$content,
);
