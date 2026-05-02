<?php
/**
 * Timeline Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Timeline
 * Description:       Display a series of blocks in a timeline
 * Requires at least: 6.7
 * Requires PHP:      8.2
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */
class Timeline {
	/**
	 * Constructor
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		$this->init( $loader );
	}

	/**
	 * Initialize the block
	 *
	 * @param mixed $loader Loader.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
		}
	}

	/**
	 * Resolve slide label from inner block attrs (must match Timeline_Slide::resolve_slide_label).
	 *
	 * @param array $attrs Inner block attributes.
	 * @param int   $index Zero-based slide index.
	 * @return string
	 */
	private function resolve_inner_slide_label( array $attrs, int $index ): string {
		$name  = $attrs['metadata']['name'] ?? '';
		$label = is_string( $name ) ? trim( $name ) : '';
		if ( '' === $label ) {
			$legacy = $attrs['label'] ?? '';
			$label  = is_string( $legacy ) ? trim( $legacy ) : '';
		}
		if ( '' === $label ) {
			return sprintf( 'Slide %d', $index + 1 );
		}
		return $label;
	}

	/**
	 * CSS value for --tick-color: theme preset slug (var(--wp--preset--color--*)) or legacy raw (#, rgb, var()).
	 *
	 * @param string $value Attribute string from the editor (slug or legacy hex/rgb).
	 * @return string Safe fragment for inline style, or empty string when unset.
	 */
	private function get_tick_color_css_value( string $value ): string {
		$value = trim( $value );
		if ( '' === $value ) {
			return '';
		}
		if (
			str_starts_with( $value, '#' )
			|| str_starts_with( $value, 'rgb' )
			|| str_starts_with( $value, 'var(' )
		) {
			return esc_attr( $value );
		}

		return 'var(--wp--preset--color--' . esc_attr( $value ) . ')';
	}

	/**
	 * Render callback for the block
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content    Block content.
	 * @param object $block      Block object.
	 * @return string
	 */
	public function render_callback( $attributes, $content, $block ) {
		$block_id            = wp_unique_id( 'timeline-' );
		$min_steps           = 0;
		$ticks               = array();
		$tick_mark_interval  = $attributes['tickMarkInterval'] ?? 1;
		$tick_mark_height    = $attributes['tickMarkHeight'] ?? 8;
		$show_all_tick_marks = $attributes['showAllTickMarks'] ?? false;
		$hide_last_tick      = $attributes['hideLastTick'] ?? false;
		$tick_label_angle    = $attributes['tickLabelAngle'] ?? 0;
		$visible_ticks       = $attributes['visibleTicks'] ?? array();
		$tick_mark_color     = $attributes['tickMarkColor'] ?? '';
		$tick_mark_width     = isset( $attributes['tickMarkWidth'] ) ? (int) $attributes['tickMarkWidth'] : 2;

		$inner_blocks = $block->parsed_block['innerBlocks'] ?? array();
		if ( empty( $inner_blocks ) ) {
			return sprintf(
				'<div %s>%s</div>',
				get_block_wrapper_attributes(),
				$content
			);
		}

		foreach ( $inner_blocks as $index => $inner_block ) {
			$attrs = $inner_block['attrs'] ?? array();
			$label = $this->resolve_inner_slide_label( $attrs, (int) $index );

			// Calculate the percentage position for this tick.
			$total_items = count( $inner_blocks );
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
		 */
		$tick_count = count( $ticks );
		$density    = 'sparse';
		if ( ! $use_manual_control ) {
			switch ( true ) {
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

		$inline_style   = '--tick-height: ' . esc_attr( (string) $tick_mark_height ) . 'px; --tick-label-angle: ' . esc_attr( (string) $tick_label_angle ) . 'deg; --tick-width: ' . esc_attr( (string) $tick_mark_width ) . 'px';
		$tick_color_css = $this->get_tick_color_css_value( (string) $tick_mark_color );
		if ( '' !== $tick_color_css ) {
			$inline_style .= '; --tick-color: ' . $tick_color_css;
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
				'style'               => $inline_style,
			)
		);

		$play_icon  = \PRC\Platform\Icons\render( 'solid', 'play' );
		$pause_icon = \PRC\Platform\Icons\render( 'solid', 'pause' );

		return wp_sprintf(
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
	}

	/**
	 * Registers the block using the block manifest (if registered). Fails over to the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @hook init
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/timeline',
			array(
				'render_callback' => array( $this, 'render_callback' ),
			)
		);
	}
}
