<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$ref_id = array_key_exists('postId', $block->context) ? $block->context['postId'] : false;
$term_id = array_key_exists('termId', $attributes) ? $attributes['termId'] : false;
// if $term_id is false, we need to get the current collection taxonomy terms for this post and get the first one, pop it off and use that.
if ( false === $term_id ) {
	$terms = get_the_terms( $ref_id, 'collection' );
	if ( false === $terms || empty( $terms ) ) {
		return;
	}
	$collection_term = array_shift( $terms );
	if ( false === $collection_term || empty( $collection_term ) ) {
		return;
	}
	$term_id = $collection_term->term_id;
} else if ( false !== $term_id ) {
	$collection_term = get_term( $term_id );
	if ( false === $collection_term || empty( $collection_term ) ) {
		return;
	}
}
// get the kicker_image id from the term meta for this term. if it exists, use it for $kicker_image. Which should return an array with the image url, width, height, etc. If it has all that then do wp_sprintf('<img src="%1$s" width="%2$s" height="%3$s" alt="%4$s" />', $kicker_image['url'], $kicker_image['width'], $kicker_image['height'], $kicker_image['alt']); and assign that to $kicker_image
$kicker_image_id = get_term_meta( $term_id, 'kicker', true );
$kicker_image = wp_get_attachment_image_src( $kicker_image_id, 'full' );
if ( false !== $kicker_image ) {
	$kicker_image = wp_sprintf('<img src="%1$s" width="%2$s" height="%3$s" alt="%4$s" />', $kicker_image[0], $kicker_image[1], $kicker_image[2], $kicker_image[3]);
}
// define $kicker_text as the name of this $collection_term, be sure to sanitize it and return it as wp_sprintf('<span>%1$s</span>', $kicker_text);
$kicker_text = sanitize_text_field( $collection_term->name );
$kicker_text = wp_sprintf('<span><a href="%1$s">%2$s</a></span>', get_term_link( $collection_term ), $kicker_text);

$content = $kicker_image . $kicker_text;

$block_wrapper_attrs = get_block_wrapper_attributes(array(
	'class' => sanitize_title('collection-term__'.$collection_term->name),
));

echo wp_sprintf(
	'<div %1$s>%2$s</div>',
	$block_wrapper_attrs,
	$content,
);
