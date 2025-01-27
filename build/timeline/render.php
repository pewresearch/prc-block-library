<?php
/**
 * Renders the Timeline block on the front end.
 *
 * @package prc-block
 */

namespace PRC\Platform\Blocks;

$block_id  = wp_unique_id( 'timeline-' );
$min_steps = 0;
$ticks     = array();
foreach ( $block->parsed_block['innerBlocks'] as $index => $inner_block ) {
	$label   = $inner_block['attrs']['metadata']['name'] ?? '';
	$ticks[] = array(
		'label'    => $label,
		'value'    => $index,
		'id'       => md5( $label ),
		'isActive' => false,
	);
}
$max_steps           = count( $ticks );
$first_id            = $ticks[0]['id'];
$block_wrapper_attrs = get_block_wrapper_attributes(
	array(
		'data-wp-interactive' => 'prc-block/timeline',
		'data-wp-context'     => wp_json_encode(
			array(
				'id'           => $block_id,
				'activeTickId' => $first_id,
				'ticks'        => $ticks,
			)
		),
		'data-wp-init'        => 'callbacks.onInit',
	)
);

echo wp_sprintf(
	'<div %1$s><div class="tick-slider"><ul class="ticks"><template data-wp-each--tick="context.ticks"><li class="tick"><span data-wp-text="context.tick.label"></span></li></template></ul><input type="range" id="%2$s" min="%3$s" max="%4$s" step="1" value="%5$s"/></div>%6$s</div>',
	$block_wrapper_attrs,
	$block_id,
	$min_steps,
	$max_steps,
	0, // This ensures the slider is always at the start.
	$content,
);
