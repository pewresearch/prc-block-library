<?php
namespace PRC\Platform\Blocks;

// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$target_namespace = array_key_exists( 'interactiveNamespace', $attributes ) ? $attributes['interactiveNamespace'] : null;

if ( null === $target_namespace ) {
	return;
}

$close_icon = \PRC\Platform\Icons\render( 'solid', 'circle-xmark' );

$content = '<template data-wp-each--message="context.messages" data-wp-each-key="context.message.id"><div class="wp-block-prc-block-form-input-message__message" role="alert" aria-live="assertive"><strong class="wp-block-prc-block-form-input-message__text" data-wp-text="context.message.text"></strong><button data-wp-on--click="actions.processMessage" class="wp-block-prc-block-form-input-message__close-button" aria-label="Take action on this message"><span data-wp-text="context.message.action.label"></span><span>%s</span></button></div></template>';
$content = wp_sprintf( $content, $close_icon );

$block_wrapper_attrs = get_block_wrapper_attributes(
	array(
		'data-wp-interactive'       => $target_namespace,
		'data-wp-class--is-error'   => 'context.isError',
		'data-wp-class--is-success' => 'context.isSuccess',
	)
);

echo wp_sprintf(
	'<div %1$s>%2$s</div>',
	$block_wrapper_attrs,
	$content,
);
