<?php
namespace PRC\Platform\Blocks;

$uuid = array_key_exists( 'uuid', $attributes ) ? $attributes['uuid'] : false;
if ( ! $uuid ) {
	return;
}

$block_wrapper_attrs = get_block_wrapper_attributes(
	array(
		'data-wp-interactive' => '{"namespace":"prc-block/tabs-controller"}',
		'data-wp-key' => 'tab-'.$uuid,
		'data-wp-class--is-active' => 'callbacks.isActive',
		'data-wp-context' => wp_json_encode(array('uuid' => $uuid)),
		'data-wp-on--click' => 'actions.setActiveTab',
	)
);

$content = wp_kses( $attributes['title'], 'post' );

echo wp_sprintf(
	'<button %1$s>%2$s</button>',
	$block_wrapper_attrs,
	$content,
);
