<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.
$context = $block->context;
$value_to_fetch = array_key_exists( 'valueToFetch', $attributes ) ? $attributes['valueToFetch'] : false;
if ( false !== $value_to_fetch && array_key_exists( $value_to_fetch, $context ) ) {
	$value_to_fetch = $context[$value_to_fetch];
}

$template = '<div %1$s>%2$s</div>';
$staff_link = false;
if ( array_key_exists('enableLink', $attributes ) && $attributes['enableLink'] ) {
	$template = '<a href="%3$s" %1$s>%2$s</a>';
	$staff_link = array_key_exists( 'staffLink', $context ) ? $context['staffLink'] : false;
}

$block_attrs = get_block_wrapper_attributes();

echo wp_sprintf(
	$template,
	$block_attrs,
	$value_to_fetch,
	$staff_link,
);
