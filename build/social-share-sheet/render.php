<?php
namespace PRC\Platform\Blocks;

$is_mobile = wp_is_mobile();

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

$label = array_key_exists('label', $attributes) ? $attributes['label'] : 'Share';

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
		'enabled' => $is_mobile,
	)),
	'data-wp-on--click' => 'actions.onClick',
	'data-wp-class--web-share-supported' => 'context.enabled',
	'data-wp-init' => 'callbacks.detectWebShareSupport',
	'style' => '--block-gap:'. \PRC\Platform\Block_Utils\get_block_gap_support_value($attributes, 'horizontal') . ';',
));

$icon = \PRC\Platform\Icons\render('solid', 'up-from-bracket');

$native_template = wp_sprintf(
	'<a href="%s"><span class="wp-block-prc-block-social-share-sheet__label">%s</span>%s</a>',
	get_permalink(),
	$label,
	$icon,
);

echo wp_sprintf(
	'<div %s>%s</div>',
	$block_wrapper_attrs,
	$content . $native_template,
);
