<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

if ( is_admin() ) {
	return $content;
}

$block_template  = '<div %1$s>%2$s</div>';
$label_template  = !empty( $attributes['url'] ) ? '<a href="%1$s" class="wp-block-prc-block-menu-link--label">%2$s</a>' : '<span class="wp-block-prc-block-menu-link--label">%2$s</span>';

/**
 * Build an array with CSS classes defining the colors
 * which will be applied to the menu markup in the front-end.
 */
$context = $block->context;
$css_classes = array();
$text_color = array_key_exists('menu/textColor', $context) ? $context['menu/textColor'] : null;
$background_color = array_key_exists('menu/backgroundColor', $context) ? $context['menu/backgroundColor'] : null;
$border_color = array_key_exists('menu/borderColor', $context) ? $context['menu/borderColor'] : null;
// If has text color.
if ( ! is_null( $text_color ) ) {
	// Add the color class.
	array_push( $css_classes, 'has-text-color', sprintf( 'has-%s-color', $text_color ) );
}
// If has background color.
if ( ! is_null( $background_color ) ) {
	// Add the background-color class.
	array_push( $css_classes, 'has-background', sprintf( 'has-%s-background-color', $background_color ) );
}
// If has border color.
if ( ! is_null( $border_color ) ) {
	// Add the border-color class.
	array_push( $css_classes, 'has-border-color', sprintf( 'has-%s-border-color', $border_color ) );
}

$block_wrapper_attrs = get_block_wrapper_attributes(array(
	'id' => 'item-' . md5( wp_json_encode( $attributes ) ),
	'class' => classNames($css_classes),
));

echo wp_sprintf(
	$block_template,
	$block_wrapper_attrs,
	wp_sprintf(
		$label_template,
		$attributes['url'] ?? '',
		$attributes['label'] ?? '',
	),
	$content,
);
