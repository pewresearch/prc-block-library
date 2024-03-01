<?php
namespace PRC\Platform\Blocks;
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$is_deprecated = array_key_exists('deprecated', $attributes) ? true : false;
$collapsible_title = array_key_exists( 'title', $attributes ) ? $attributes['title'] : 'How we did this';
$collapsible_title = wp_specialchars_decode($collapsible_title);
// If someone has erroneously added bold to a collapsible title then remove that from the string.
$collapsible_title = str_replace(["u003cstrongu003e", "u003c/strongu003e"], "", $collapsible_title);
$classname = array_key_exists('className', $attributes) ? $attributes['className'] : '';

if ( $is_deprecated ) {
	$classname = $classname . ' is-style-plus';
}

$collapsible_id = sanitize_title($collapsible_title);

$wrapper_attrs = get_block_wrapper_attributes(array(
	'class' => $classname,
	'id' => $collapsible_id,
	'style' => '--block-gap: ' . \PRC\Platform\Block_Utils\get_block_gap_support_value($attributes),
	'data-wp-interactive' => wp_json_encode(array(
		'namespace' => 'prc-block/collapsible',
	)),
	'data-wp-context' => wp_json_encode(array(
		'collapsibleId' => $collapsible_id,
		'isOpen' => get_query_var('collapsibleId') === $collapsible_id,
	)),
	'data-wp-class--is-open' => 'context.isOpen',
	'data-wp-init--scroll-into-view' => 'callbacks.onInitScrollIntoView',
));

if ( function_exists( 'apple_news_is_exporting' ) && apple_news_is_exporting() ) {
	// echo wp_sprintf();
} else {
	echo wp_sprintf(
		'<div %1$s><div class="wp-block-prc-block-collapsible__title"><div>%2$s</div><button class="wp-block-prc-block-collapsible__icon" data-wp-on--click="actions.onClick"><i aria-hidden="true" class="fa-light fa-circle-plus"></i><i aria-hidden="true" class="fa-light fa-circle-minus"></i></button></div><div class="wp-block-prc-block-collapsible__content">%3$s</div></div>',
		$wrapper_attrs,
		esc_html($collapsible_title),
		$content,
	);
}
