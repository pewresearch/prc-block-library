<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

if ( is_admin() ) {
	return $content;
}

/**
 * Build an array with CSS classes defining the colors
 * which will be applied to the menu markup in the front-end.
 */
$context = $block->context;
$menu_class_names = array_key_exists('menu/className', $context) ? $context['menu/className'] : '';
$menu_class_names = explode(' ', $menu_class_names);
$is_text_style_menu = in_array('is-style-text', $menu_class_names);

$link_class_names = array();
$label_class_names = array('wp-block-prc-block-menu-link__label');
$text_color = array_key_exists('menu/textColor', $context) ? $context['menu/textColor'] : null;
$background_color = array_key_exists('menu/backgroundColor', $context) ? $context['menu/backgroundColor'] : null;
$border_color = array_key_exists('menu/borderColor', $context) ? $context['menu/borderColor'] : null;
// If has text color.
if ( ! is_null( $text_color ) ) {
	// Add the color class.
	array_push( $link_class_names, 'has-text-color', sprintf( 'has-%s-color', $text_color ) );
}
// If has background color.
if ( ! is_null( $background_color ) ) {
	// Add the background-color class.
	array_push( $link_class_names, 'has-background', sprintf( 'has-%s-background-color', $background_color ) );
}
// If has border color.
if ( ! is_null( $border_color ) ) {
	// Add the border-color class.
	if ( $is_text_style_menu ) {
		array_push( $label_class_names, 'has-border-color', sprintf( 'has-%s-border-color', $border_color ) );
	} else {
		array_push( $link_class_names, 'has-border-color', sprintf( 'has-%s-border-color', $border_color ) );
	}
}

$block_wrapper_attrs = get_block_wrapper_attributes(array(
	'id' => 'item-' . md5( wp_json_encode( $attributes ) ),
	'class' => classNames($link_class_names),
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
		classNames($label_class_names),
	),
	$content,
);
