<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$block_wrapper_attrs = get_block_wrapper_attributes();

$block_index         = array_key_exists( 'blockIndexAttr', $attributes ) ? $attributes['blockIndexAttr'] : 0;
$block_index         = true == $attributes['enableNumber'] ? $block_index + 1 : $block_index;
$popular_story_title = array_key_exists( 'title', $attributes ) ? $attributes['title'] : '';
$popular_story_url   = array_key_exists( 'url', $attributes ) ? $attributes['url'] : '';
if ( empty( $popular_story_title ) || empty( $popular_story_url ) ) {
	return;
}

// You can use this method...
echo wp_sprintf(
	'<aside %1$s>%2$s<a href="%3$s" class="title">%4$s</a></aside>',
	$block_wrapper_attrs,
	0 !== $block_index ? wp_sprintf( '<div class="big-number">%s</div>', $block_index ) : '',
	esc_url( $popular_story_url ),
	$popular_story_title
);
