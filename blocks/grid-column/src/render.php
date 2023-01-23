<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

/**
 * Build an array with CSS classes defining the column's layout
 * which will be applied to the column markup in the front-end.
 *
 * @param array $attributes Grid Column block attributes.
 *
 * @return array Grid CSS classes.
 */

$grid_defaults = array(
	"index"        => 0,
	"desktopSpan"  => 4,
	"tabletSpan"   => 4,
	"mobileSpan"   => 4,
);
$attrs = wp_parse_args( $attributes['gridLayout'], $grid_defaults );
$index = $attrs['index'];

$vertical_alignment = array_key_exists( 'verticalAlignment', $attributes ) ? $attributes['verticalAlignment'] : 'top';

// Build the CSS classes.
$column_classes = array(
	'are-vertically-aligned-' . $vertical_alignment,
	'column'.$index.'-desktop-grid__span-'.$attrs['desktopSpan'],
	'column'.$index.'-tablet-grid__span-'.$attrs['tabletSpan'],
	'column'.$index.'-mobile-grid__span-'.$attrs['mobileSpan'],
);

$block_attrs = get_block_wrapper_attributes(array(
	'class' => classNames($column_classes),
));

echo wp_sprintf(
	'<div %1$s>%2$s</div>',
	$block_attrs,
	$content
);

