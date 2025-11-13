<?php
/**
 * Form Input Range Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Input Range Field
 * Version:           0.1.0
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Form_Input_Range {
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
	 * Format the value based on the output format
	 *
	 * @param mixed  $value  The value to format.
	 * @param string $format The format type (number, currency, percentage).
	 * @return string Formatted value.
	 */
	private function format_value( $value, $format ) {
		if ( null === $value || '' === $value ) {
			return '';
		}

		switch ( $format ) {
			case 'currency':
				return '$' . number_format( (float) $value, 2 );
			case 'percentage':
				return $value . '%';
			case 'number':
			default:
				return (string) $value;
		}
	}

	/**
	 * Converts the block markup to support interactivity.
	 *
	 * @hook render_block_prc-block/form-input-range
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content    Block content.
	 * @param object $_block     Block object.
	 *
	 * @return string Rendered block content.
	 */
	public function render_block_callback( $attributes, $content, $_block ) {
		$target_namespace = array_key_exists( 'interactiveNamespace', $attributes ) ? $attributes['interactiveNamespace'] : 'prc-block/form';
		$target_store     = $target_namespace . '::';
		$has_subsumption  = array_key_exists( 'interactiveSubsumption', $attributes ) ? $attributes['interactiveSubsumption'] : false;

		$tag = new \WP_HTML_Tag_Processor( $content );

		$tag->next_tag(
			array(
				'class_name' => 'wp-block-prc-block-form-input-range',
			)
		);
		$block_id = $tag->get_attribute( 'id' );
		if ( ! $block_id ) {
			$block_id = wp_unique_id( 'prc-block-form-input-range-' );
		}
		$tag->remove_attribute( 'id' );
		$tag->set_bookmark( 'start' );

		$label_text = '';
		if ( true === $attributes['displayLabel'] && $tag->next_tag( 'label' ) ) {
			$tag->set_attribute( 'data-wp-on--click', $target_store . 'actions.onLabelClick' );
			$tag->set_attribute( 'for', $block_id );
			if ( $tag->next_token() ) {
				if ( '#text' === $tag->get_token_type() ) {
					$label_text = $tag->get_modifiable_text();
					$label_text = trim( $label_text );
				}
			}
		}
		if ( empty( $label_text ) ) {
			$label_text = $attributes['label'] ?? '';
		}

		$tag->seek( 'start' );

		$input_name     = $attributes['metadata']['name'] ?? '';
		$input_type     = 'range';
		$input_value    = $attributes['value'] ?? 50;
		$input_min      = $attributes['min'] ?? 0;
		$input_max      = $attributes['max'] ?? 100;
		$input_step     = $attributes['step'] ?? 1;
		$input_required = $attributes['required'] ?? false;
		$output_format  = $attributes['outputFormat'] ?? 'number';

		if ( $tag->next_tag( 'input' ) ) {
			$input_name     = $tag->get_attribute( 'name' );
			$input_value    = $tag->get_attribute( 'value' );
			$input_min      = $tag->get_attribute( 'min' );
			$input_max      = $tag->get_attribute( 'max' );
			$input_step     = $tag->get_attribute( 'step' );
			$input_required = $tag->get_attribute( 'required' );
			$tag->set_attribute( 'id', $block_id );

			// Events - Use onInputRangeChange for range inputs.
			$tag->set_attribute( 'data-wp-on--mouseenter', $target_store . 'actions.onInputMouseEnter' );
			$tag->set_attribute( 'data-wp-on--mouseleave', $target_store . 'actions.onInputMouseLeave' );
			$tag->set_attribute( 'data-wp-on--input', $target_store . 'actions.onInputRangeChange' );
			$tag->set_attribute( 'data-wp-on--change', $target_store . 'actions.onInputChange' );
			$tag->set_attribute( 'data-wp-on--focus', $target_store . 'actions.onInputFocus' );
			$tag->set_attribute( 'data-wp-on--blur', $target_store . 'actions.onInputBlur' );

			// Property Bindings.
			$tag->set_attribute( 'data-wp-bind--required', $target_store . 'state.isInputRequired' );
			$tag->set_attribute( 'data-wp-bind--hidden', $target_store . 'state.isInputHidden' );
			$tag->set_attribute( 'data-wp-bind--readonly', $target_store . 'state.isInputReadOnly' );
			$tag->set_attribute( 'data-wp-bind--disabled', $target_store . 'state.isInputDisabled' );
			$tag->set_attribute( 'data-wp-bind--value', $target_store . 'state.inputValue' );
			if ( $has_subsumption ) {
				$tag->set_attribute( 'data-wp-bind--type', $target_store . 'state.inputType' );
				$tag->set_attribute( 'data-wp-bind--name', $target_store . 'state.inputName' );
				$tag->set_attribute( 'data-wp-bind--min', $target_store . 'state.inputMin' );
				$tag->set_attribute( 'data-wp-bind--max', $target_store . 'state.inputMax' );
				$tag->set_attribute( 'data-wp-bind--step', $target_store . 'state.inputStep' );
			}

			// Classnames.
			$tag->set_attribute( 'data-wp-class--is-disabled', $target_store . 'state.isInputDisabled' );
			$tag->set_attribute( 'data-wp-class--is-error', $target_store . 'state.isInputError' );
			$tag->set_attribute( 'data-wp-class--is-success', $target_store . 'state.isInputSuccess' );
			$tag->set_attribute( 'data-wp-class--is-processing', $target_store . 'state.isInputProcessing' );
		}

		$tag->seek( 'start' );

		// Update the output element if displayValue is true.
		if ( true === $attributes['displayValue'] && $tag->next_tag( 'output' ) ) {
			$tag->set_attribute( 'data-wp-text', $target_store . 'state.formattedInputValue' );
		}

		$tag->seek( 'start' );

		// Register the field in the form state.
		$state                  = wp_interactivity_state( $target_namespace );
		$existing_form_fields   = $state['formFields'] ?? array();
		$existing_form_fields[] = array(
			'id'           => $block_id,
			'name'         => $input_name,
			'label'        => $label_text,
			'type'         => $input_type,
			'value'        => $input_value,
			'min'          => $input_min,
			'max'          => $input_max,
			'step'         => $input_step,
			'required'     => $input_required,
			'outputFormat' => $output_format,
			'hidden'       => null,
			'readonly'     => null,
			'disabled'     => null,
			'error'        => null,
		);
		$state                  = wp_interactivity_state(
			$target_namespace,
			array(
				'formFields' => $existing_form_fields,
			)
		);

		return $tag->get_updated_html();
	}

	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @hook init
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/form-input-range',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}
