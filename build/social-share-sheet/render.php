<?php
namespace PRC\Platform\Blocks;

$is_mobile = 'mobile' === \PRC\Platform\get_current_device();

$context = $block->context;

$link_title       = array_key_exists( 'core/socialLinksTitle', $context ) ? $context['core/socialLinksTitle'] : '';
$link_description = array_key_exists( 'core/socialLinksDescription', $context ) ? $context['core/socialLinksDescription'] : '';
$link_url         = array_key_exists( 'core/socialLinksUrl', $context ) ? $context['core/socialLinksUrl'] : '';

$hashtags = array_key_exists( 'core/socialLinksHashtags', $context ) ? $context['core/socialLinksHashtags'] : array();
// prepend every hashtag with a # and then return a comma separated string. i... just don't think the hashtags should be stored with actual hash in the db.
$hashtags = implode(
	',',
	array_map(
		function ( $hashtag ) {
			return '#' . $hashtag;
		},
		$hashtags
	)
);
$image_id = array_key_exists( 'core/socialLinksImageId', $context ) ? $context['core/socialLinksImageId'] : '';

wp_interactivity_state(
	'prc-block/social-share-sheet',
	array(
		'enabled' => $is_mobile,
	)
);

$label               = array_key_exists( 'label', $attributes ) ? $attributes['label'] : 'Share';
$block_wrapper_attrs = get_block_wrapper_attributes(
	array(
		'data-wp-interactive'                => wp_json_encode(
			array(
				'namespace' => 'prc-block/social-share-sheet',
			)
		),
		'data-wp-context'                    => wp_json_encode(
			array(
				'title'    => $link_title,
				'text'     => $link_description,
				'url'      => $link_url,
				'hashtags' => $hashtags,
				'image'    => $image_id ? wp_get_attachment_image_url( $image_id, 'full' ) : false,
			)
		),
		'data-wp-on--click'                  => 'actions.onClick',
		'data-wp-class--web-share-supported' => 'state.enabled',
		'data-wp-init'                       => 'callbacks.detectWebShareSupport',
		'style'                              => '--block-gap:' . \PRC\Platform\Block_Utils\get_block_gap_support_value( $attributes, 'horizontal' ) . ';',
	)
);

$icon = \PRC\Platform\Icons\render( 'solid', 'up-from-bracket' );

$native_template = wp_sprintf(
	'<a href="%s"><span class="wp-block-prc-block-social-share-sheet__label">%s</span>%s</a>',
	$link_url,
	$label,
	$icon,
);

echo wp_sprintf(
	'<div %s>%s</div>',
	$block_wrapper_attrs,
	$content . $native_template,
);
