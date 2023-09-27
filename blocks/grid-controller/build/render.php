<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

/**
 * Build an array with CSS classes and inline styles defining the colors
 * which will be applied to the grid controller markup in the front-end.
 *
 * @param array $attributes Grid Controller block attributes.
 *
 * @return array Colors CSS classes.
 */
$color_css_classes = array();

// Text color.
$has_named_text_color  = array_key_exists( 'textColor', $attributes );

// If has text color.
if ( $has_named_text_color ) {
	// Add has-text-color class.
	$color_css_classes[] = 'has-text-color';
}

if ( $has_named_text_color ) {
	// Add the color class.
	$color_css_classes[] = sprintf( 'has-%s-color', $attributes['textColor'] );
}

// Background color.
$has_named_background_color  = array_key_exists( 'backgroundColor', $attributes );

// If has background color.
if ( $has_named_background_color ) {
	// Add has-background class.
	$color_css_classes[] = 'has-background';
}

if ( $has_named_background_color ) {
	// Add the background-color class.
	$color_css_classes[] = sprintf( 'has-%s-background-color', $attributes['backgroundColor'] );
}

// Divider color.
$has_named_divider_color  = array_key_exists( 'dividerColor', $attributes );

// If has divider color.
if ( $has_named_divider_color ) {
	// Add has-divider class.
	$color_css_classes[] = 'has-divider';
}

if ( $has_named_divider_color ) {
	// Add the divider color class.
	$color_css_classes[] = sprintf( 'has-%s-divider-color', $attributes['dividerColor'] );
}

$css_classes = $color_css_classes;

$block_attrs = get_block_wrapper_attributes(array(
	'class' => classNames($css_classes),
));

echo wp_sprintf(
	'<div %1$s data-test="%3$s">%2$s</div>',
	$block_attrs,
	$content,
	$has_named_divider_color,
);
