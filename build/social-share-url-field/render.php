<?php
$context = $block->context;

// Check context for the url.
$url = array_key_exists( 'core/socialLinksUrl', $context ) ? $context['core/socialLinksUrl'] : '';
// If after all that there is no url then try to fetch the short link for the current post id.
if ( ! $url && isset( $context['postId'] ) ) {
	$url = wp_get_shortlink( $context['postId'] );
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
