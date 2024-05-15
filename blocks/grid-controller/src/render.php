<?php
namespace PRC\Platform\Blocks;
if ( is_admin() ) {
	return $content;
}
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

$block_gap = \PRC\Platform\Block_Utils\get_block_gap_support_value($attributes, 'horizontal');
$vertical_alignment = array_key_exists( 'verticalAlignment', $attributes ) ? $attributes['verticalAlignment'] : 'top';

$css_classes = array_merge($color_css_classes, array(
	'is-vertically-aligned-' . $vertical_alignment,
));

$block_attrs = get_block_wrapper_attributes(array(
	'class' => \PRC\Platform\Block_Utils\classNames($css_classes),
	'style' => '--grid-gutter: ' . $block_gap . ';',
));

echo wp_sprintf(
	'<div %1$s>%2$s</div>',
	$block_attrs,
	$content,
);
