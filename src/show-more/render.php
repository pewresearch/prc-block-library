<?php
namespace PRC\Platform\Blocks;

use Automattic\Jetpack\Device_Detection;
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$current_device = \PRC\Platform\get_current_device();

$block_attrs = \PRC\Platform\Block_Utils\get_block_attributes( 'prc-block/show-more', $attributes );

$block_id = md5( $content );

$block_wrapper_attrs = get_block_wrapper_attributes(
	array(
		'id'                         => $block_id,
		'data-wp-interactive'        => wp_json_encode(
			array(
				'namespace' => 'prc-block/show-more',
			)
		),
		'data-wp-class--is-expanded' => 'context.isExpanded',
		'data-wp-context'            => wp_json_encode(
			array(
				'showLabel'     => $block_attrs['showLabel'],
				'hideLabel'     => $block_attrs['hideLabel'],
				'isExpanded'    => get_query_var( 'show-more-block', false ) === $block_id,
				'heights'       => $block_attrs['heights'],
				'currentDevice' => $current_device,
			)
		),
		'data-wp-on-window--resize'  => 'callbacks.onResize',
		'data-wp-bind--style'        => 'callbacks.getStyle',
	)
);

$plus_icon  = \PRC\Platform\Icons\render( 'light', 'circle-plus' );
$minus_icon = \PRC\Platform\Icons\render( 'light', 'circle-minus' );

$button = wp_sprintf(
	'<button class="prc-show-more__expand-button" type="button" data-wp-on--click="actions.toggleExpanded"><span data-wp-bind--hidden="context.isExpanded">%s</span><span data-wp-bind--hidden="!context.isExpanded">%s</span><span data-wp-text="state.label" class="prc-show-more__expand-button__label"></span></button>',
	$plus_icon,
	$minus_icon,
);

echo wp_sprintf(
	'<div %1$s><div class="prc-show-more__inner-blocks">%2$s</div>%3$s</div>',
	$block_wrapper_attrs,
	$content,
	$button,
);
