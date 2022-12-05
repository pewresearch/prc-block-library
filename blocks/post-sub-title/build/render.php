<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$text_align = isset( $attributes['textAlign'] ) ? $attributes['textAlign'] : 'left';
$sub_title = prc_get_subheadline( (int) get_the_ID() );
if ( empty( $sub_title ) ) {
	return;
}
$classnames = array(
	'class' => 'has-text-align' . '-' . $text_align,
);
echo wp_sprintf(
	'<h2 %1$s>%2$s</h2>',
	get_block_wrapper_attributes($classnames),
	$sub_title
);
