<?php
namespace PRC\Platform\Blocks;

$context = $block->context;

$link_title = array_key_exists('core/social-links/title', $context) ? $context['core/social-links/title'] : '';
$link_description = array_key_exists('core/social-links/description', $context) ? $context['core/social-links/description'] : '';
$link_url = array_key_exists('core/social-links/url', $context) ? $context['core/social-links/url'] : '';
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
		'title' => $link_title,
		'text' => $link_description,
		'url' => $link_url,
		'hashtags' => $hashtags,
		'image' => $image_id ? wp_get_attachment_image_url($image_id, 'full') : false,
	)),
	'data-wp-on--click' => 'actions.onClick',
));

$icon = \PRC\Platform\Icons\Render('sharp', 'up-from-bracket');

echo wp_sprintf(
	'<a %1$s><span class="wp-block-prc-block-social-share-sheet__label">Share</span>%2$s</a>',
	$block_wrapper_attrs,
	$icon,
	$content,
);
