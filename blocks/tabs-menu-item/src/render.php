<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$is_accordion = array_key_exists( 'asAccordion', $attributes ) ? $attributes['asAccordion'] : false;
$uuid = array_key_exists( 'uuid', $attributes ) ? $attributes['uuid'] : false;
if ( ! $uuid ) {
	return;
}
$currently_selected_uuid = array_key_exists( 'prc-block/tabs/activeUUID', $block->context ) ? $block->context['prc-block/tabs/activeUUID'] : null;
$is_selected = $currently_selected_uuid === $uuid;

$block_wrapper_attrs = get_block_wrapper_attributes(
	array(
		'id'            => 'tab-' . $uuid,
		'class' => classNames(
			array_key_exists( 'className', $attributes ) ? $attributes['className'] : '',
			array(
				'is-active' => $is_selected,
			),
		),
	)
);

// @TODO: ICONS
$content = $is_accordion ? '<i class="dropdown icon"></i>' : '';
$content .= wp_kses( $attributes['title'], 'post' );

echo wp_sprintf(
	'<button %1$s>%2$s</button>',
	$block_wrapper_attrs,
	$content,
);
