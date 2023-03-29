<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

if ( is_admin() ) {
	return $content;
}
$menu_item_id = $attributes['id'] ?? null;
$is_active = get_queried_object_id() === $menu_item_id;

/**
 * Build an array with CSS classes defining the colors
 * which will be applied to the menu markup in the front-end.
 */
$context = $block->context;

$block_wrapper_attrs = get_block_wrapper_attributes(array(
	'id' => 'item-' . md5( wp_json_encode( $attributes ) ),
	'class' => classNames(array(
		'is-active' => $is_active ?? false,
	)),
));

$block_template  = '<div %1$s>%2$s</div>';
$label_template  = !empty( $attributes['url'] ) ? '<a href="%1$s" class="%3$s">%2$s</a>' : '<span class="%3$s">%2$s</span>';

echo wp_sprintf(
	$block_template,
	$block_wrapper_attrs,
	wp_sprintf(
		$label_template,
		$attributes['url'] ?? '',
		$attributes['label'] ?? '',
		classNames('wp-block-prc-block-menu-link__label'),
	),
	$content,
);
