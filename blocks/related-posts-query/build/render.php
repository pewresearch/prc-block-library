<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$related_posts = apply_filters( 'prc_related_posts', get_the_ID(), array(
	'post_type' => array_key_exists( 'postType', $attributes ) ? $attributes['postType'] : 'post',
	'taxonomy' => array_key_exists( 'taxonomy', $attributes ) ? $attributes['taxonomy'] : 'category',
) );

if ( empty( $related_posts ) ) {
	return; // Exit Early No Related Posts.
}

$block_attrs = get_block_wrapper_attributes();

$block_content = '';

$block_instance = $block->parsed_block;

// Set the block name to one that does not correspond to an existing registered block.
// This ensures that for the inner instances of the Related Posts block, we do not render any block supports.
$block_instance['blockName'] = 'core/null';

foreach( $related_posts as $related_post ) {
	// Render the inner blocks of the Related Posts block with `dynamic` set to `false` to prevent calling
	// `render_callback` and ensure that no wrapper markup is included.
	$block_content .= (
		new WP_Block(
			$block_instance,
			array(
				'queryId' => 0,
				'postId'  => $related_post['postId'],
				'postType' => $related_post['postType'],
			)
		)
	)->render( array( 'dynamic' => false ) );
}

echo wp_sprintf(
	'<div %1$s>%2$s</div>',
	$block_attrs,
	$block_content
);
