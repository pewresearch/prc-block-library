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
$wrapper_css_classes = array();

// Border color.
$has_named_border_color  = array_key_exists( 'borderColor', $attributes );
// If has border color.
if ( $has_named_border_color ) {
	// Add has-divider class.
	$wrapper_css_classes[] = 'has-border-color';
}
if ( $has_named_border_color ) {
	// Add the border color class.
	$wrapper_css_classes[] = sprintf( 'has-%s-border-color', $attributes['borderColor'] );
}

$block_wrapper_attrs = get_block_wrapper_attributes(array(
	'class' => classNames($wrapper_css_classes),
));

echo wp_sprintf(
	'<div %1$s>%2$s</div>',
	$block_wrapper_attrs,
	$content,
);
