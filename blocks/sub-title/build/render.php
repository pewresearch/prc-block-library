<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.
$postId = $block->context['postId'];
$parent_post_id = wp_get_post_parent_id( $postId );
if ( 0 !== $parent_post_id ) {
	return;
}
$text_align = isset( $attributes['textAlign'] ) ? $attributes['textAlign'] : 'left';
$legacy_sub_headline = get_post_meta( $postId, 'sub_headline', true );
$sub_title = get_post_meta( $postId, 'sub_title', true );
$sub_title = $sub_title ? $sub_title : $legacy_sub_headline;

if ( ! $sub_title ) {
	return;
}

echo wp_sprintf(
	'<h2 %1$s>%2$s</h2>',
	get_block_wrapper_attributes(array(
		'class' => 'has-text-align' . '-' . $text_align,
		'aria-level' => '2',
	)),
	$sub_title
);
