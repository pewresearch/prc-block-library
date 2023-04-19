<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

global $PRC_QUIZ;

$attributes['barColor'] = $PRC_QUIZ->get_color_by_slug($attributes['barColor'])['hex'];
$attributes['backgroundColor'] = $PRC_QUIZ->get_color_by_slug($attributes['backgroundColor'])['hex'];

echo wp_sprintf(
	'<div %1$s><div class="ui active centered inline loader"></div></div>',
	get_block_wrapper_attributes(
		array(
			'id'               		 => md5( wp_json_encode( $attributes ) ),
			'data-max-width'   		 => $attributes['maxWidth'],
			'data-bar-color'   		 => $attributes['barColor'],
			'data-background-color'  => $attributes['backgroundColor'],
			'data-max-value' 		 => $attributes['maxValue'],
			'data-current-value' 	 => $attributes['currentValue'],
			'data-axis-label' 		 => $attributes['axisLabel'],
			'data-axis-padding' 	 => $attributes['axisPadding'],
			'data-label-format' 	 => $attributes['labelFormat'],
			'data-label-position-dx' => $attributes['labelPositionDX'],
			'data-label-position-dy' => $attributes['labelPositionDY'],
			'data-show-axis-label' 	 => $attributes['showAxisLabel'],
			)
	)
);
