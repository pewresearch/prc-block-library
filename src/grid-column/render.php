<?php
namespace PRC\Platform\Blocks;

/**
 * Build an array with CSS classes defining the column's layout
 * which will be applied to the column markup in the front-end.
 *
 * @param array $attributes Grid Column block attributes.
 *
 * @return array Grid CSS classes.
 */
$grid_defaults = array(
	'index'       => 0,
	'desktopSpan' => 4,
	'tabletSpan'  => 4,
	'mobileSpan'  => 4,
);
$attrs         = wp_parse_args( $attributes['gridLayout'], $grid_defaults );
$index         = $attrs['index'];

$vertical_alignment = array_key_exists( 'verticalAlignment', $attributes ) ? $attributes['verticalAlignment'] : 'top';

// Build the layout CSS classes.
$column_classes = array(
	'is-vertically-aligned-' . $vertical_alignment,
	'column' . $index . '-desktop-grid__span-' . $attrs['desktopSpan'],
	'column' . $index . '-tablet-grid__span-' . $attrs['tabletSpan'],
	'column' . $index . '-mobile-grid__span-' . $attrs['mobileSpan'],
);

$block_attrs = get_block_wrapper_attributes(
	array(
		'class' => \PRC\Platform\Block_Utils\classNames( $column_classes ),
	)
);

echo wp_sprintf(
	'<div %1$s>%2$s</div>',
	$block_attrs,
	$content
);
