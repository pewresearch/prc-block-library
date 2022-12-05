<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$label   = array_key_exists( 'label', $attributes ) ? $attributes['label'] : false;
$name    = sanitize_title( $label );
$checked = array_key_exists( 'defaultChecked', $attributes ) ? $attributes['defaultChecked'] : false;

$input_attrs = array(
	'type' => array_key_exists( 'type', $attributes ) ? $attributes['type'] : 'checkbox',
	'name' => $name,
	'value' => array_key_exists( 'value', $attributes ) ? $attributes['value'] : '',
);
if ( $checked ) {
	$input_attrs['checked'] = true;
}

$normalized_attributes = array();
foreach ( $input_attrs as $key => $value ) {
	$normalized_attributes[] = $key . '="' . esc_attr( $value ) . '"';
}
$normalized_attributes = implode( ' ', $normalized_attributes );

echo wp_sprintf(
	'<div %1$s><input %2$s/><label for="%3$s">%4$s</label></div>',
	get_block_wrapper_attributes(),
	$normalized_attributes,
	esc_attr($name),
	$label,
);
