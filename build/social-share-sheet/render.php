<?php
namespace PRC\Platform\Blocks;

$is_mobile = wp_is_mobile();

$context = $block->context;

$link_title       = array_key_exists( 'core/socialLinksTitle', $context ) ? $context['core/socialLinksTitle'] : '';
$link_description = array_key_exists( 'core/social-links/description', $context ) ? $context['core/social-links/description'] : '';
$link_url         = isset( $attributes['url'] ) && ! empty( $attributes['url'] ) && '#' !== $attributes['url'] ? $attributes['url'] : false;
// Check context for the url.
// $link_url 		  = false === $link_url && isset( $context['core/socialLinksUrl'] ) && ! empty( $context['core/socialLinksUrl'] ) ? $context['core/socialLinksUrl'] : false;
// If after all that there is no url then try to fetch the short link for the current post id.
// if ( ! $link_url && isset( $context['postId'] ) ) {
// 	$link_url = wp_get_shortlink( $context['postId'] );
// }
$hashtags         = array_key_exists( 'core/socialLinksHashtags', $context ) ? $context['core/socialLinksHashtags'] : array();
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

$label = array_key_exists( 'label', $attributes ) ? $attributes['label'] : 'Share';
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
				'enabled'  => $is_mobile,
			)
		),
		'data-wp-on--click'                  => 'actions.onClick',
		'data-wp-class--web-share-supported' => 'context.enabled',
		'data-wp-run'			             => 'callbacks.detectWebShareSupport',
		'style'                              => '--block-gap:' . \PRC\Platform\Block_Utils\get_block_gap_support_value( $attributes, 'horizontal' ) . ';',
	)
);

$icon = \PRC\Platform\Icons\render( 'solid', 'up-from-bracket' );

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
