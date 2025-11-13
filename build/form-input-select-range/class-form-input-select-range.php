<?php
/**
 * Form Input Select Range Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Form Input Select Range
 * Description:       Create a range selector with minimum and maximum select dropdowns.
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */
class Form_Input_Select_Range {
	/**
	 * Constructor.
	 *
	 * @param object $loader The loader object.
	 */
	public function __construct( $loader ) {
		$this->init( $loader );
	}

	/**
	 * Initialize the block.
	 *
	 * @param object $loader The loader object.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
		}
	}

	/**
	 * Generate options based on block type.
	 *
	 * @param array $attributes The attributes of the block.
	 * @return array The options array.
	 */
	public function generate_options( $attributes ) {
		$type        = $attributes['type'] ?? 'custom';
		$range_start = $attributes['rangeStart'] ?? 0;
		$range_end   = $attributes['rangeEnd'] ?? 100;
		$range_step  = $attributes['rangeStep'] ?? 1;

		$options = array();

		switch ( $type ) {
			case 'years':
				$current_year = (int) gmdate( 'Y' );
				for ( $i = 0; $i <= 100; $i++ ) {
					$year      = $current_year - $i;
					$options[] = array(
						'label' => (string) $year,
						'value' => (string) $year,
					);
				}
				break;

			case 'numbers':
				for ( $i = $range_start; $i <= $range_end; $i += $range_step ) {
					$options[] = array(
						'label' => (string) $i,
						'value' => (string) $i,
					);
				}
				break;

			case 'custom':
			default:
				// Custom options should be provided via block context or attributes.
				break;
		}

		return $options;
	}

	/**
	 * Render the block callback.
	 *
	 * @param array  $attributes The attributes of the block.
	 * @param string $content The content of the block.
	 * @param object $block The block object.
	 * @return string The updated HTML.
	 */
	public function render_block_callback( $attributes, $content, $block ) {
		$target_namespace = 'prc-block/form';
		$block_id         = null;

		// Generate options based on type.
		$options = $this->generate_options( $attributes );

		// Provide options to inner blocks via block context.
		$block->context['form-input-select/options'] = $options;

		$tag = new \WP_HTML_Tag_Processor( $content );
		if ( $tag->next_tag(
			array(
				'class_name' => 'wp-block-prc-block-form-input-select-range',
			)
		) ) {
			$tag->set_bookmark( 'start' );
			$tag->set_attribute( 'data-wp-interactive', 'prc-block/form-input-select-range' );
			$tag->set_attribute( 'data-wp-class--is-valid', 'state.isValidRange' );
			$tag->set_attribute( 'data-wp-class--has-complete-range', 'state.hasCompleteRange' );

			// Get the id attribute from the block wrapper.
			$block_id = $tag->get_attribute( 'id' );
			$tag->remove_attribute( 'id' );
		}

		// If the block does not have an anchor or id set, generate a unique one.
		if ( null === $block_id ) {
			$block_id = wp_unique_id( 'prc-block-form-input-select-range-' );
		}

		// Set the context on the main wrapper.
		if ( $tag->seek( 'start' ) ) {
			$tag->set_attribute(
				'data-wp-context',
				wp_json_encode(
					array(
						'targetNamespace' => $target_namespace,
						'id'              => $block_id,
					)
				)
			);
			$tag->set_attribute( 'data-wp-init', 'callbacks.onInit' );
			$tag->set_attribute( 'data-wp-watch', 'callbacks.onRangeValidation' );
			$tag->set_attribute( 'data-wp-watch--value-change', 'callbacks.onValueChange' );
		}

		// TODO: Use html tag processor to find the min and max select inputs and get some info and add/change some directives.

		wp_interactivity_state(
			'prc-block/form-input-select-range',
			array(
				$block_id => array(
					'isValidRange'     => false,
					'hasCompleteRange' => false,
					'minValue'         => '',
					'maxValue'         => '',
					'minInputId'       => '',
					'maxInputId'       => '',
				),
			)
		);

		return $tag->get_updated_html();
	}

	/**
	 * Register the block.
	 */
	public function block_init() {
		register_block_type(
			PRC_BLOCK_LIBRARY_DIR . '/build/form-input-select-range',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}
