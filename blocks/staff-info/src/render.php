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

$block_attrs = get_block_wrapper_attributes();

echo wp_sprintf(
	'<div %1$s>%2$s</div>',
	$block_attrs,
	$value_to_fetch
);
