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
			$loader->add_filter('render_block_context', $this, 'render_context_filter', 10, 3 );
		}
	}

	/**
	 * Generate options based on block type.
	 *
	 * @param array $attributes The attributes of the block.
	 * @return array The options array.
	 */
	public function generate_options( $attributes ) {
		$type        = $attributes['type'] ?? 'numbers';
		$range_start = $attributes['rangeStart'] ?? 0;
		$current_year = $attributes['currentYear'] ?? false;
		$range_end   = ( $type === "years" && $current_year ) ? (int) gmdate( 'Y' ) : $attributes['rangeEnd'] ?? $range_start + 100;
		$range_step  = $attributes['rangeStep'] ?? 1;

		$options = array();

		for ( $i = $range_start; $i <= $range_end; $i += $range_step ) {
			$options[] = array(
				'label' => (string) $i,
				'value' => (string) $i,
			);
		}
		return $options;
	}


	public function render_context_filter($context, $parsed_block, $parent_block) {
		if ( 'prc-block/form-input-select-range' !== $parsed_block['blockName'] ) {
			return $context;
		}
		// If there there were no options passed, create the options from scratch. 
		if ( ! isset( $context['form-input-select/options'] ) ) {
			$context['form-input-select/options'] = $this->generate_options( $parsed_block['attrs']);
		}
		return $context;
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
		$has_subsumption = array_key_exists( 'interactiveSubsumption', $attributes ) ? $attributes['interactiveSubsumption'] : false;
		$target_namespace = $attributes['interactiveNamespace'] ?? 'prc-block/form';
		$block_id         = null;

		// Provide options to inner blocks via block context.
		$tag = new \WP_HTML_Tag_Processor( $content );
		if ( $tag->next_tag(
			array(
				'class_name' => 'wp-block-prc-block-form-input-select-range',
			)
		) ) {
			$tag->set_bookmark( 'start' );
			if ( ! $has_subsumption ) {
				$tag->set_attribute( 'data-wp-interactive', 'prc-block/form-input-select-range' );
			}
			$tag->set_attribute( 'data-wp-class--is-error', 'state.isRangeError' );

			// Get the id attribute from the block wrapper.
			$block_id = $tag->get_attribute( 'id' );
			$tag->remove_attribute( 'id' );
		}

		// If the block does not have an anchor or id set, generate a unique one.
		if ( null === $block_id ) {
			$block_id = wp_unique_id( 'prc-block-form-input-select-range-' );
		}

		// Supports two inputs
		$min = null;
		$max = null; 
		while ( $tag->next_tag( 'input' ) ){
			if ( is_null( $min ) ) {
				$min = $tag->get_attribute( 'id' );
			}else{
				$max = $tag->get_attribute( 'id' );
			}
		}


		// Set the context on the main wrapper (when not subsumed).
		if ( $tag->seek( 'start' ) ) {
			if ( ! $has_subsumption ) {
				$tag->set_attribute(
					'data-wp-context',
					wp_json_encode(
						array(
							'targetNamespace' => $target_namespace,
							'id'              => $block_id,
						)
					)
				);
				$tag->set_attribute( 'data-wp-watch--publish-range', 'callbacks.publishRange' );
				$tag->set_attribute( 'data-wp-watch--validate-range', 'callbacks.limitSelections' );
			}

		}

		if ( ! $has_subsumption ) {		
			$current_year = $attributes['currentYear'] ?? false;
			$type        = $attributes['type'] ?? 'numbers';
			$input_max   = ( $type === "years" && $current_year ) ? (int) gmdate( 'Y' ) : $attributes['rangeEnd'];
			wp_interactivity_state(
				'prc-block/form-input-select-range',
				array(
					$block_id => array(
						'minValue'         => $attributes['rangeStart'],
						'maxValue'         => $attributes['rangeEnd'],
						'initMinValue'     => $attributes['rangeStart'],
						'initMaxValue'     => $input_max,
						'minInputId'	   => $min,
						'maxInputId'       => $max,
						'isRangeError'     => null
					)
				)
			);
		}

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
