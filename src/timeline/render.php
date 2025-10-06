<?php
/**
 * Renders the Timeline block on the front end.
 *
 * @package prc-block
 */

namespace PRC\Platform\Blocks;

$block_id            = wp_unique_id( 'timeline-' );
$min_steps           = 0;
$ticks               = array();
$tick_mark_interval  = $attributes['tickMarkInterval'] ?? 1;
$tick_mark_height    = $attributes['tickMarkHeight'] ?? 8;
$show_all_tick_marks = $attributes['showAllTickMarks'] ?? false;
$hide_last_tick      = $attributes['hideLastTick'] ?? false;
$tick_label_angle    = $attributes['tickLabelAngle'] ?? 0;
$visible_ticks       = $attributes['visibleTicks'] ?? array();

foreach ( $block->parsed_block['innerBlocks'] as $index => $inner_block ) {
	$label = $inner_block['attrs']['metadata']['name'] ?? '';
	if ( empty( $label ) ) {
		continue;
	}

	// Calculate the percentage position for this tick.
	$total_items = count( $block->parsed_block['innerBlocks'] );
	$percentage  = $total_items > 1 ? ( $index / ( $total_items - 1 ) ) * 100 : 0;

	// Determine if this tick should be visible based on settings.
	$is_first         = 0 === $index;
	$is_last          = $index === $total_items - 1;
	$is_first_or_last = $is_first || $is_last;

	// Check if we should hide the last tick.
	$hide_this_tick = $hide_last_tick && $is_last;

	// Check if using specific tick selection.
	$use_specific_selection   = ! empty( $visible_ticks );
	$is_specifically_selected = $use_specific_selection && in_array( $index, $visible_ticks, true );

	$should_show_tick = ! $hide_this_tick && (
		$use_specific_selection ? $is_specifically_selected : (
			$show_all_tick_marks ||
			$is_first_or_last ||
			( 0 === $index % $tick_mark_interval )
		)
	);

	$ticks[] = array(
		'label'    => $label,
		'value'    => $index,
		'id'       => md5( $label ),
		'isActive' => false,
		'position' => $percentage,
		'visible'  => $should_show_tick,
	);
}
$max_steps          = count( $ticks );
$first_id           = $ticks[0]['id'];
$enable_auto_play   = $attributes['enableAutoPlay'] ?? false;
$auto_play_interval = $attributes['autoPlayInterval'] ?? 3000;

/**
 * Determine if we should use automatic density-based hiding or manual interval control.
 * If user has set a custom interval (not 1) or enabled "show all", use manual control.
 */
$use_manual_control = $show_all_tick_marks || 1 !== $tick_mark_interval;

/**
 * Get the tick density based on the number of ticks.
 * Only used when automatic density control is enabled.
 *
 * @param int $count The number of ticks.
 * @return string The tick density.
 */
$tick_count = count( $ticks );
$density    = 'sparse';
if ( ! $use_manual_control ) {
	switch ( $tick_count ) {
		case $tick_count <= 10:
			$density = 'sparse';
			break;
		case $tick_count <= 20:
			$density = 'medium';
			break;
		case $tick_count <= 40:
			$density = 'dense';
			break;
		default:
			$density = 'very-dense';
			break;
	}
}

$block_wrapper_attrs = get_block_wrapper_attributes(
	array(
		'data-wp-interactive' => 'prc-block/timeline',
		'data-tick-density'   => $density,
		'data-show-all-ticks' => $show_all_tick_marks ? 'true' : 'false',
		'data-manual-control' => $use_manual_control ? 'true' : 'false',
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
		'style'               => '--tick-height: ' . esc_attr( $tick_mark_height ) . 'px; --tick-label-angle: ' . esc_attr( $tick_label_angle ) . 'deg;',
	)
);

$play_icon  = \PRC\Platform\Icons\render( 'solid', 'play' );
$pause_icon = \PRC\Platform\Icons\render( 'solid', 'pause' );

echo wp_sprintf(
	'<div %1$s><div class="tick-slider" role="region" aria-label="%7$s"><ul class="ticks" role="tablist"><template data-wp-each--tick="context.ticks"><li class="tick" role="tab" data-wp-bind--data-tick-id="context.tick.id" data-wp-on--click="actions.activateTick" data-wp-bind--style="callbacks.getTickPosition" data-wp-bind--data-visible="context.tick.visible" data-wp-class--is-hidden="callbacks.isTickHidden"><span data-wp-text="context.tick.label"></span></li></template></ul><div class="timeline-controls"><label for="%2$s" class="screen-reader-text">%8$s</label><input type="range" id="%2$s" min="%3$s" max="%4$s" value="%5$s"/><button class="play-pause-button" data-wp-on--click="actions.togglePlay" data-wp-bind--aria-label="callbacks.autoPlayButtonText" data-wp-class--is-playing="context.isPlaying">%9$s</button></div></div>%6$s</div>',
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
