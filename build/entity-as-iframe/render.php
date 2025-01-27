<?php
// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$ref = array_key_exists( 'ref', $attributes ) ? (int) $attributes['ref'] : false;

// What we need to do... is tap into the embeds system and isntead of rendering the content directly we need to render the url for this ref as an iframe with the /iframe endpoint.
$url = get_permalink( $ref );

if ( ! $url ) {
	echo '<pre class="prc-platform-message__warning__not-found">No entity found</pre>';
	return;
}

$iframe_id = wp_unique_id( 'prc-entity-iframe-' );
$iframe_url = add_query_arg( array(
	'iframe' => true,
), $url );
// Check if the entity has a set height, otherwise default to 500px.
$iframe_height = get_post_meta( $ref, 'iframe_height', true) ?: 500;
$iframe_height = $iframe_height . 'px';

// @TODO figure out how to add external non module dependencies...
wp_enqueue_script('prc-platform-iframe-embeds-resizer-script');

wp_interactivity_state('prc-block/entity-as-iframe', array(
	$iframe_id => array(
		'isActive' => false,
		'resizer' => null,
	)
));

$content = wp_sprintf(
	'<iframe id="%1$s" data-wp-bind--src="context.src" height="%3$s" width="100%%" scrolling="no" frameborder="0"></iframe>',
	$iframe_id,
	$iframe_url,
	$iframe_height,
);

$block_wrapper_attrs = get_block_wrapper_attributes(array(
	'data-ref-id' => $ref,
	'data-wp-interactive' => wp_json_encode(array(
		'namespace' => 'prc-block/entity-as-iframe'
	)),
	'data-wp-context' => wp_json_encode(array(
		'id' => $iframe_id,
		'url' => $iframe_url,
		'src' => '',
	)),
	'data-wp-watch--on-activate' => 'callbacks.onActivate',
	'data-wp-class--is-active' => 'callbacks.isActive',
));

echo wp_sprintf(
	'<div %1$s data-iframe-height>%2$s %3$s</div>',
	$block_wrapper_attrs,
	$placeholder,
	$content,
);
