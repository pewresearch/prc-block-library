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
	$label = $inner_block['attrs']['metadata']['name'] ?? '';
	if ( empty( $label ) ) {
		continue;
	}

	// Calculate the percentage position for this tick.
	$total_items = count( $block->parsed_block['innerBlocks'] );
	$percentage  = $total_items > 1 ? ( $index / ( $total_items - 1 ) ) * 100 : 0;

	$ticks[] = array(
		'label'    => $label,
		'value'    => $index,
		'id'       => md5( $label ),
		'isActive' => false,
		'position' => $percentage, // Add position to the tick data
	);
}
$max_steps          = count( $ticks );
$first_id           = $ticks[0]['id'];
$enable_auto_play   = $attributes['enableAutoPlay'] ?? false;
$auto_play_interval = $attributes['autoPlayInterval'] ?? 3000;

/**
 * Get the tick density based on the number of ticks.
 *
 * @param int $count The number of ticks.
 * @return string The tick density.
 */
function get_tick_density( $count ) {
	if ( $count <= 10 ) {
		return 'sparse';
	} elseif ( $count <= 20 ) {
		return 'medium';
	} elseif ( $count <= 40 ) {
		return 'dense';
	} else {
		return 'very-dense';
	}
}

$tick_count          = count( $ticks );
$block_wrapper_attrs = get_block_wrapper_attributes(
	array(
		'data-wp-interactive' => 'prc-block/timeline',
		'data-tick-density'   => get_tick_density( $tick_count ),
		'data-wp-context'     => wp_json_encode(
			array(
				'id'           => $block_id,
				'activeTickId' => $first_id,
				'ticks'        => $ticks,
				'isPlaying'    => $enable_auto_play,
				'interval'     => $auto_play_interval,
			)
		),
		'data-wp-init'        => 'callbacks.onInit',
	)
);

$play_icon  = \PRC\Platform\Icons\render( 'solid', 'play' );
$pause_icon = \PRC\Platform\Icons\render( 'solid', 'pause' );

echo wp_sprintf(
	'<div %1$s><div class="tick-slider" role="region" aria-label="%7$s"><ul class="ticks" role="tablist"><template data-wp-each--tick="context.ticks"><li class="tick" role="tab" data-wp-bind--data-tick-id="context.tick.id" data-wp-on--click="actions.activateTick" data-wp-bind--style="callbacks.getTickPosition"><span data-wp-text="context.tick.label"></span></li></template></ul><div class="timeline-controls"><label for="%2$s" class="screen-reader-text">%8$s</label><input type="range" id="%2$s" min="%3$s" max="%4$s" value="%5$s"/><button class="play-pause-button" data-wp-on--click="actions.togglePlay" data-wp-bind--aria-label="callbacks.autoPlayButtonText" data-wp-class--is-playing="context.isPlaying">%9$s</button></div></div>%6$s</div>',
	$block_wrapper_attrs,
	esc_attr( $block_id ),
	esc_attr( $min_steps ),
	esc_attr( $max_steps - 1 ),
	0,
	$content,
	esc_attr__( 'Timeline Navigation', 'prc-block-library' ),
	esc_attr__( 'Timeline Position', 'prc-block-library' ),
	$play_icon . $pause_icon,
);
