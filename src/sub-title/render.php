<?php

/**
 * Render the sub title block.
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

$context_post_id = $block->context['postId'];
$parent_post_id  = wp_get_post_parent_id( $context_post_id );
// If the post is a child do not render the sub title.
if ( 0 !== $parent_post_id ) {
	return;
}

$text_align          = isset( $attributes['textAlign'] ) ? $attributes['textAlign'] : 'left';
$legacy_sub_headline = get_post_meta( $context_post_id, 'sub_headline', true );
$sub_title           = get_post_meta( $context_post_id, 'sub_title', true );
$sub_title           = $sub_title ? $sub_title : $legacy_sub_headline;

if ( ! $sub_title ) {
	return;
}

echo wp_sprintf(
	'<h2 %1$s>%2$s</h2>',
	get_block_wrapper_attributes(
		array(
			'class'      => 'has-text-align-' . $text_align,
			'aria-level' => '2',
		)
	),
	$sub_title
);
