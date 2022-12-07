<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$is_accordion = array_key_exists( 'asAccordion', $attributes ) ? $attributes['asAccordion'] : false;

$block_wrapper_attrs = get_block_wrapper_attributes(
	array(
		'id'            => 'tab-' . $attributes['uuid'],
		'href'          => '#panel-' . $attributes['uuid'],
		'aria-controls' => 'panel-' . $attributes['uuid'],
		'aria-role'     => 'tab',
		'aria-selected' => 'false',
	)
);

$content = $is_accordion ? '<i class="dropdown icon"></i>' : '';
$content .= wp_kses( $attributes['title'], 'post' );

echo wp_sprintf(
	'<a %1$s>%2$s</a>',
	$block_wrapper_attrs,
	$content,
);
