<?php
namespace PRC\Platform\Blocks;
if ( is_admin() ) {
	return;
}

$current_dir = dirname(__FILE__);
$assets_dir = dirname($current_dir) . '/assets';

$collapsible_title = array_key_exists( 'title', $attributes ) ? $attributes['title'] : 'How we did this';
$collapsible_title = wp_specialchars_decode($collapsible_title);
// If someone has erroneously added bold to a collapsible title then remove that from the string.
$collapsible_title = str_replace(["u003cstrongu003e", "u003c/strongu003e"], "", $collapsible_title);
$collapsible_title = esc_html($collapsible_title);
$classname = array_key_exists('className', $attributes) ? $attributes['className'] : '';
$is_deprecated = array_key_exists( 'deprecated', $attributes ) ? true : false;
$is_co_branded = array_key_exists( 'isCoBranded', $attributes ) ? true : false;

$block_gap = \PRC\Platform\Block_Utils\get_block_gap_support_value($attributes);

$collapsible_id = sanitize_title($collapsible_title);

if ( $is_deprecated ) {
	$classname = $classname . ' is-style-plus';
}

if ( $is_co_branded ) {
	$classname = $classname . ' is-co-branded';
	$collapsible_title = wp_sprintf(
		'<a href="%s"><img src="%s" alt="%s" height="35px" class="wp-block-prc-block-collapsible__co-branding" /></a>',
		get_bloginfo('url') . '/pew-knight',
		$assets_dir . '/pew-knight-logo.svg',
		'Pew Knight Partnership'
	);
	$collapsible_id = wp_unique_id('pew-knight-collapsible-');
}

$block_wrapper_attrs = array(
	'class' => $classname,
	'id' => $collapsible_id,
	'data-wp-interactive' => wp_json_encode(array(
		'namespace' => 'prc-block/collapsible',
	)),
	'data-wp-context' => wp_json_encode(array(
		'collapsibleId' => $collapsible_id,
		'isOpen' => get_query_var('collapsibleId') === $collapsible_id,
	)),
	'data-wp-class--is-open' => 'context.isOpen',
	'data-wp-init--scroll-into-view' => 'callbacks.onInitScrollIntoView',
);
if ( $block_gap ) {
	$block_wrapper_attrs['style'] = '--block-gap: ' . $block_gap . ';';
}

$wrapper_attrs = get_block_wrapper_attributes($block_wrapper_attrs);

$plus_icon = \PRC\Platform\Icons\Render('light', 'circle-plus');
$minus_icon = \PRC\Platform\Icons\Render('light', 'circle-minus');

if ( function_exists( 'apple_news_is_exporting' ) && apple_news_is_exporting() ) {
	// echo wp_sprintf();
} else {
	echo wp_sprintf(
		'<div %s><div class="wp-block-prc-block-collapsible__title" data-wp-on--click="actions.onClick"><div>%s</div><button class="wp-block-prc-block-collapsible__icon"><span data-wp-bind--hidden="context.isOpen">%s</span><span data-wp-bind--hidden="!context.isOpen" hidden>%s</span></button></div><div class="wp-block-prc-block-collapsible__content">%s</div></div>',
		$wrapper_attrs,
		$collapsible_title,
		$plus_icon,
		$minus_icon,
		$content,
	);
}
