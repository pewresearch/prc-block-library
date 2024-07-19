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

$content = '<template data-wp-each--message="context.messages" data-wp-each-key="context.message.id"><div class="wp-block-prc-block-form-input-message__message"><span data-wp-text="context.message.text"></span></div></template>';

$block_wrapper_attrs = get_block_wrapper_attributes([
	'data-wp-interactive' => wp_json_encode(['namespace' => $target_namespace]),
	'data-wp-on--click' => 'actions.clearMessages',
]);

echo wp_sprintf(
	'<div %1$s>%2$s</div>',
	$block_wrapper_attrs,
	$content,
);
