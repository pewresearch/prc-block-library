<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.
$uuid = array_key_exists( 'uuid', $attributes ) ? $attributes['uuid'] : false;
if ( ! $uuid ) {
	return;
}
$currently_selected_uuid = array_key_exists( 'prc-block/tabs/activeUUID', $block->context ) ? $block->context['prc-block/tabs/activeUUID'] : null;
$is_selected = $currently_selected_uuid === $uuid;

$block_wrapper_attrs = get_block_wrapper_attributes(
	array(
		'id'          => 'panel-' . $attributes['uuid'],
		'aria-role'   => 'tabpanel',
		'class' => classNames(
			array_key_exists( 'className', $attributes ) ? $attributes['className'] : '',
			array(
				'is-active' => $is_selected,
			),
		),
	)
);
echo wp_sprintf(
	'<section %1$s>%2$s</section>',
	$block_wrapper_attrs,
	wp_kses( $content , 'post' ),
);
