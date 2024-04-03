<?php
namespace PRC\Platform\Blocks;

if ( is_admin() ) {
	return $content;
}

wp_enqueue_script('wp-url');

$is_sub_heading  = array_key_exists('className', $attributes) && false !== strpos($attributes['className'], 'is-style-sub-heading');
$enable_sub_menu = $attributes['enableSubMenu'] ?? false;
$block_template  = $enable_sub_menu && !empty($content) ? '<div %1$s>%2$s<div class="wp-block-prc-block-taxonomy-list-link__sub-menu">%3$s</div></div>' : '<div %1$s>%2$s</div>';
$label_template  = !empty( $attributes['url'] ) ? '<a href="%1$s" class="wp-block-prc-block-taxonomy-list-link__label">%2$s</a>' : '<span class="wp-block-prc-block-taxonomy-list-link__label">%2$s</span>';
$label_template  = $is_sub_heading ? $label_template . \PRC\Platform\Icons\Render('solid', 'chevron-right') : $label_template;
$label_template  = $enable_sub_menu && !empty($content) ? ( empty( $attributes['url'] ) ? '<span class="wp-block-prc-block-taxonomy-list-link__label wp-block-prc-block-taxonomy-list-link__toggle">%2$s</span>%3$s' : '<a href="%1$s" class="wp-block-prc-block-taxonomy-list-link__label">%2$s</a>%3$s' ) : $label_template;

$plus_icon = \PRC\Platform\Icons\Render('light', 'circle-plus');
$minus_icon = \PRC\Platform\Icons\Render('light', 'circle-minus');

/**
 * Build an array with CSS classes defining the colors
 * which will be applied to the menu markup in the front-end.
 */
$context = $block->context;
$css_classes = array();
$text_color = array_key_exists('taxonomy-menu/textColor', $context) ? $context['taxonomy-menu/textColor'] : null;

// If has text color.
if ( ! is_null( $text_color ) ) {
	// Add the color class.
	array_push( $css_classes, 'has-text-color', sprintf( 'has-%s-color', $text_color ) );
}

if ( array_key_exists('className', $attributes) && 'is-style-sub-expand' === $attributes['className'] ) {
	$attributes['label'] = "More";
	$plus_icon = \PRC\Platform\Icons\Render('light', 'plus');
	$minus_icon = \PRC\Platform\Icons\Render('light', 'minus');
}

$block_id = 'item-' . md5( wp_json_encode( $attributes ) );

$block_wrapper_attrs = get_block_wrapper_attributes(array(
	'id' => $block_id,
	'class' => \PRC\Platform\Block_Utils\classNames($css_classes),
	'data-wp-interactive' => wp_json_encode(array('namespace' => 'prc-block/taxonomy-list-link')),
	'data-wp-context' => wp_json_encode(array(
		'isActive' => get_query_var('taxonomyLink', false) === $block_id,
		'id' => $block_id,
	)),
	'data-wp-class--is-active' => 'context.isActive',
	'data-wp-init' => 'callbacks.onInit',
));

$button = wp_sprintf(
	'<button class="wp-block-prc-block-taxonomy-list-link__icon wp-block-prc-block-taxonomy-list-link__toggle" data-wp-on--click="actions.onClick"><span data-wp-bind--hidden="context.isActive">%s</span><span data-wp-bind--hidden="!context.isActive" hidden>%s</span></button>',
	$plus_icon,
	$minus_icon
);


echo wp_sprintf(
	$block_template,
	$block_wrapper_attrs,
	wp_sprintf(
		$label_template,
		$attributes['url'] ?? '',
		$attributes['label'] ?? '',
		$enable_sub_menu && !empty($content) ? $button : ''
	),
	$content,
);
