<?php
namespace PRC\Platform\Blocks;

$context = $block->context;

$title = array_key_exists('core/social-links/title', $context) ? $context['core/social-links/title'] : '';
$description = array_key_exists('core/social-links/description', $context) ? $context['core/social-links/description'] : '';
$url = array_key_exists('core/social-links/url', $context) ? $context['core/social-links/url'] : '';
$hashtags = array_key_exists('core/social-links/hashtags', $context) ? $context['core/social-links/hashtags'] : array();
// prepend every hashtag with a # and then return a comma separated string. i... just don't think the hashtags should be stored with actual hash in the db.
$hashtags = implode(',', array_map(function($hashtag) {
	return '#' . $hashtag;
}, $hashtags));
$image_id = array_key_exists('core/social-links/imageId', $context) ? $context['core/social-links/imageId'] : '';

$block_wrapper_attrs = get_block_wrapper_attributes(array(
	'data-wp-interactive' => wp_json_encode(array(
		'namespace' => 'prc-block/social-share-sheet',
	)),
	'data-wp-context' => wp_json_encode(array(
		'title' => $title,
		'text' => $description,
		'url' => $url,
		'hashtags' => $hashtags,
		'image' => $image_id ? wp_get_attachment_image_url($image_id, 'full') : false,
	)),
	'data-wp-on--click' => 'actions.onClick',
));

echo wp_sprintf(
	'<button %1$s><i class="fa-regular fa-share-from-square"></i></button>',
	$block_wrapper_attrs,
	$content,
);
