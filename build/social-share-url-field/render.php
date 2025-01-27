<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$context = $block->context;

$url = isset( $context['core/social-links/url'] ) ? $context['core/social-links/url'] : false;
$url = ( false === $url && isset( $attributes['url'] ) ) ? $attributes['url'] : $url;
// If after all that there is no url then try to fetch the short link.
if ( ! $url && isset( $context['postId'] ) ) {
	$url = wp_get_shortlink( $context['postId'] );
}
if ( ! $url ) {
	$url = get_permalink( $context['postId'] );
}

$state = wp_interactivity_state(
	'prc-block/social-share-url-field',
	array(
		'value'        => $url,
		'type'         => 'text',
		'isReadOnly'   => true,
		'isRequired'   => false,
		'isHidden'     => false,
		'isDisabled'   => false,
		'isError'      => false,
		'isSuccess'    => false,
		'isProcessing' => false,
	)
);

$block_attrs = get_block_wrapper_attributes(
	array(
		'data-wp-interactive' => 'prc-block/social-share-url-field',
	)
);

// add an data-wp-on--click handler to the first <input> tag we reach using the wp html tag processor...
$tags = new WP_HTML_Tag_Processor( $content );
if ( $tags->next_tag( 'input' ) ) {
	$tags->set_attribute( 'data-wp-on--click', 'actions.onInputClick' );
}
$content = $tags->get_updated_html();

echo wp_sprintf(
	'<div %s><span class="label">Share This Link:</span>%s</div>',
	$block_attrs,
	$content,
);
