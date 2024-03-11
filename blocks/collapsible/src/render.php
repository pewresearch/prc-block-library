<?php
namespace PRC\Platform\Blocks;

$is_deprecated = array_key_exists( 'deprecated', $attributes ) ? true : false;
$collapsible_title = array_key_exists( 'title', $attributes ) ? $attributes['title'] : 'How we did this';
$collapsible_title = wp_specialchars_decode($collapsible_title);
// If someone has erroneously added bold to a collapsible title then remove that from the string.
$collapsible_title = str_replace(["u003cstrongu003e", "u003c/strongu003e"], "", $collapsible_title);
$classname = array_key_exists('className', $attributes) ? $attributes['className'] : '';

$block_gap = \PRC\Platform\Block_Utils\get_block_gap_support_value($attributes);

if ( $is_deprecated ) {
	$classname = $classname . ' is-style-plus';
}

$collapsible_id = sanitize_title($collapsible_title);

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

do_action('qm/debug', print_r($content, true));

ob_start();
\PRC\Platform\Icons\Render('light', 'circle-plus');
$icon = ob_get_clean();

if ( function_exists( 'apple_news_is_exporting' ) && apple_news_is_exporting() ) {
	// echo wp_sprintf();
} else {
	echo wp_sprintf(
		'<div %s><div class="wp-block-prc-block-collapsible__title"><div>%s</div><button class="wp-block-prc-block-collapsible__icon" data-wp-on--click="actions.onClick">%s</button></div><div class="wp-block-prc-block-collapsible__content">%s</div></div>',
		$wrapper_attrs,
		esc_html($collapsible_title),
		$icon,
		$content,
	);
}
