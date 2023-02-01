<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

if ( is_admin() ) {
	return $content;
}

$enable_sub_menu = $attributes['enableSubMenu'] ?? false;
$block_template  = $enable_sub_menu && !empty($content) ? '<div %1$s>%2$s<div class="wp-block-prc-block-taxonomy-menu-link--sub-menu">%3$s</div></div>' : '<div %1$s>%2$s</div>';
$label_template  = !empty( $attributes['url'] ) ? '<a href="%1$s" class="wp-block-prc-block-taxonomy-menu-link--label">%2$s</a>' : '<span class="wp-block-prc-block-taxonomy-menu-link--label">%2$s</span>';
$label_template  = $enable_sub_menu && !empty($content) ? ( empty( $attributes['url'] ) ? '<span class="wp-block-prc-block-taxonomy-menu-link--label wp-block-prc-block-taxonomy-menu-link--toggle">%2$s</span>%3$s' : '<a href="%1$s" class="wp-block-prc-block-taxonomy-menu-link--label">%2$s</a>%3$s' ) : $label_template;

/**
 * Build an array with CSS classes defining the colors
 * which will be applied to the menu markup in the front-end.
 */
$context = $block->context;
$css_classes = array();
$text_color = array_key_exists('taxonomy-menu/textColor', $context) ? $context['taxonomy-menu/textColor'] : null;
$background_color = array_key_exists('taxonomy-menu/backgroundColor', $context) ? $context['taxonomy-menu/backgroundColor'] : null;
$border_color = array_key_exists('taxonomy-menu/borderColor', $context) ? $context['taxonomy-menu/borderColor'] : null;
$text_decoration = $context->style['typography']['textDecoration'] ?? null;
$orientation = array_key_exists('taxonomy-menu/layout', $context) && array_key_exists('orientation', $context['taxonomy-menu/layout']) ? $context['taxonomy-menu/layout']['orientation'] : null;

// If has text color.
if ( ! is_null( $text_color ) ) {
	// Add the color class.
	array_push( $css_classes, 'has-text-color', sprintf( 'has-%s-color', $text_color ) );
}

// If has background color.
if ( ! is_null( $background_color ) && 'horizontal' === $orientation ) {
	// Add the background-color class.
	array_push( $css_classes, 'has-background', sprintf( 'has-%s-background-color', $background_color ) );
}

// If has border color.
if ( ! is_null( $border_color ) && 'horizontal' === $orientation ) {
	// Add the border-color class.
	array_push( $css_classes, 'has-border-color', sprintf( 'has-%s-border-color', $border_color ) );
}

// If has text decoration.
if ( ! is_null( $text_decoration ) ) {
	// Add the text-decoration class.
	array_push( $css_classes, sprintf( 'has-text-decoration-%s', $text_decoration ) );
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
		$enable_sub_menu && !empty($content) ? '<button class="wp-block-prc-block-taxonomy-menu-link--icon wp-block-prc-block-taxonomy-menu-link--toggle"><span></span></button>' : ''
	),
	$content,
);
