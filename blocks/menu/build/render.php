<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$background_color = array_key_exists('backgroundColor', $attributes) ? $attributes['backgroundColor'] : null;
$border_color = array_key_exists('borderColor', $attributes) ? $attributes['borderColor'] : null;
$css_classes = array();
$classname = array_key_exists('className', $attributes) ? $attributes['className'] : null;

// If has background color.
if ( ! is_null( $background_color ) && 'is-style-secondary' === $classname) {
	// Add the background-color class.
	array_push( $css_classes, 'has-background', sprintf( 'has-%s-background-color', $background_color ) );
}

// If has border color.
if ( ! is_null( $border_color ) && 'is-style-secondary' === $classname ) {
	// Add the border-color class.
	array_push( $css_classes, 'has-border-color', sprintf( 'has-%s-border-color', $border_color ) );
}

$block_wrapper_attrs = get_block_wrapper_attributes(array(
	'class' => classNames($css_classes),
));

// You can use this method...
echo wp_sprintf(
	'<nav %1$s>%2$s</nav>',
	$block_wrapper_attrs,
	$content,
);
