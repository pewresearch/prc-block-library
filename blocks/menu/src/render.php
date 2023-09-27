<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$active_color = array_key_exists('activeColor', $attributes) ? $attributes['activeColor'] : null;
$background_color = array_key_exists('backgroundColor', $attributes) ? $attributes['backgroundColor'] : null;
$text_color = array_key_exists('textColor', $attributes) ? $attributes['textColor'] : null;
$border_color = array_key_exists('borderColor', $attributes) ? $attributes['borderColor'] : null;
$classname = array_key_exists('className', $attributes) ? $attributes['className'] : null;

// Default to pills with specific style attributes if the default legacy menu is detected or a pills style with no border color defined. This is not intended to be a feature but rather a backwards compatibility fix.
if ( in_array($classname, array('is-style-text', 'is-style-pills')) && null === $border_color ) {
	$attributes['className'] = $classname;
	$active_color = 'gray';
	$background_color = 'white';
	$text_color = 'gray-alt';
	$border_color = 'gray-light';
}

$css_classes = array();
// If has active color.
if ( ! is_null( $active_color ) ) {
	// Add the active color class.
	array_push( $css_classes, 'has-active' );
}
// If has background color.
if ( ! is_null( $background_color ) ) {
	// Add the background-color class.
	array_push( $css_classes, 'has-background' );
}
// If has border color.
if ( ! is_null( $border_color ) ) {
	// Add the border-color class.
	array_push( $css_classes, 'has-border' );
}
// If has text color.
if ( ! is_null( $text_color ) ) {
	// Add the text color class.
	array_push( $css_classes, 'has-text' );
}

$block_wrapper_attrs = get_block_wrapper_attributes(array(
	'class' => classNames($classname, $css_classes),
	'style' => '
		--menu--active-color: var(--wp--preset--color--' . $active_color . ');
		--menu--border-color: var(--wp--preset--color--' . $border_color . ');
		--menu--text-color: var(--wp--preset--color--' . $text_color . ');
		--menu--background-color: var(--wp--preset--color--' . $background_color . ');
	',
));

echo wp_sprintf(
	'<nav %1$s>%2$s</nav>',
	$block_wrapper_attrs,
	$content,
);
