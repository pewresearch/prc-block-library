<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$block_id = array_key_exists( 'id', $attributes ) ? $attributes['id'] : md5( wp_json_encode( $block ) );

$block_wrapper_attrs = get_block_wrapper_attributes(
	array(
		'id'    => $block_id,
		'style' => 'display: none;',
	)
);

$allowed_html = wp_kses_allowed_html( 'post' );
if ( is_array( $allowed_html ) ) {
	$allowed_html['style']        = true;
	$allowed_html['div']['style'] = true;
	$allowed_html['p']['style']   = true;
}

ob_start();
if ( array_key_exists( 'additionalStyles', $attributes ) && ! empty( $attributes['additionalStyles'] ) ) {
	$styles = preg_replace( '/\.([a-zA-Z0-9_-]+)(?!\s*#)/', '#' . $block_id . ' .$1', $attributes['additionalStyles'] );
	echo '<style>' . $styles . '</style>';
}
$style_block = ob_get_clean();

echo wp_sprintf(
	'<div %1$s>%2$s</div>',
	$block_wrapper_attrs,
	wp_kses( $content, $allowed_html ) . $style_block
);
