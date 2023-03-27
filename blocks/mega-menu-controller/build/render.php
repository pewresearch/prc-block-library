<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$active_color = array_key_exists( 'activeColor', $attributes ) ? $attributes['activeColor'] : '';
$active_border_color = array_key_exists( 'activeBorderColor', $attributes ) ? $attributes['activeBorderColor'] : '';
$block_wrapper_attrs = get_block_wrapper_attributes(array(
	'class' => classNames(array(
		'has-active-color' => !!$active_color,
		'has-' . $active_color . '-active-color' => !!$active_color,
		'has-active-border-color' => !!$active_border_color,
		'has-' . $active_border_color . '-active-border-color' => !!$active_border_color,
	))
));
$label = array_key_exists( 'label', $attributes ) ? $attributes['label'] : '';

// Change the width of the svg icon to 14px:
$svg = file_get_contents( plugin_dir_path( __FILE__ ) . '../assets/icon-caret-down.svg' );

// You can use this method...
echo wp_sprintf(
	'<div %1$s><div class="wp-block-prc-block-menu-link__label"><span>%3$s</span><button class="wp-block-prc-block-mega-menu__toggle">%5$s</button></div><div class="%4$s">%2$s</div></div>',
	$block_wrapper_attrs,
	$content,
	$label,
	classNames('wp-block-prc-block-mega-menu__inner-container', array(
		'has-background' => !!$active_color,
		'has-' . $active_color . '-background-color' => !!$active_color,
	)),
	$svg,
);