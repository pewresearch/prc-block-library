<?php
/**
 * Form Input Text Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Input Text Field
 * Version:           0.1.0
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Form_Input_Text {
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
	 * Converts the block markup to support interactivity.
	 *
	 * @hook render_block_prc-block/form-input-text
	 *
	 * @param string $attributes Block attributes.
	 * @param string $content    Block content.
	 * @param object $block      Block object.
	 *
	 * @return string Rendered block content.
	 */
	public function render_block_callback( $attributes, $content, $block ) {
		$target_namespace = array_key_exists( 'interactiveNamespace', $attributes ) ? $attributes['interactiveNamespace'] : 'prc-block/form';
		$target_store     = $target_namespace . '::';
		$has_subsumption  = array_key_exists( 'interactiveSubsumption', $attributes ) ? $attributes['interactiveSubsumption'] : false;

		$tag = new \WP_HTML_Tag_Processor( $content );

		$tag->next_tag(
			array(
				'class_name' => 'wp-block-prc-block-form-input-text',
			)
		);
		$block_id = $tag->get_attribute( 'id' );
		if ( ! $block_id ) {
			$block_id = wp_unique_id( 'prc-block-form-input-text-' );
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

		$input_name        = $attributes['name'] ?? '';
		$input_type        = $attributes['type'] ?? 'text';
		$input_value       = $attributes['value'] ?? '';
		$input_placeholder = $attributes['placeholder'] ?? '';
		$input_required    = $attributes['required'] ?? false;

		if ( $tag->next_tag( 'input' ) ) {
			$input_name        = $tag->get_attribute( 'name' );
			$input_type        = $tag->get_attribute( 'type' );
			$input_value       = $tag->get_attribute( 'value' );
			$input_placeholder = $tag->get_attribute( 'placeholder' );
			$input_required    = $tag->get_attribute( 'required' );
			$tag->set_attribute( 'id', $block_id );

			// Events.
			$tag->set_attribute( 'data-wp-on--mouseenter', $target_store . 'actions.onInputMouseEnter' );
			$tag->set_attribute( 'data-wp-on--mouseleave', $target_store . 'actions.onInputMouseLeave' );
			if ( in_array( $input_type, array( 'date', 'time', 'datetime-local' ), true ) ) {
				$tag->set_attribute( 'data-wp-on--change', $target_store . 'actions.onInputChange' );
			} else {
				$tag->set_attribute( 'data-wp-on--keyup', $target_store . 'actions.onInputChange' );
			}
			$tag->set_attribute( 'data-wp-on--focus', $target_store . 'actions.onInputFocus' );
			$tag->set_attribute( 'data-wp-on--blur', $target_store . 'actions.onInputBlur' );

			// Property Bindings.
			$tag->set_attribute( 'data-wp-bind--required', $target_store . 'state.isInputRequired' );
			$tag->set_attribute( 'data-wp-bind--hidden', $target_store . 'state.isInputHidden' );
			$tag->set_attribute( 'data-wp-bind--readonly', $target_store . 'state.isInputReadOnly' );
			$tag->set_attribute( 'data-wp-bind--disabled', $target_store . 'state.isInputDisabled' );
			$tag->set_attribute( 'data-wp-bind--placeholder', $target_store . 'state.inputPlaceholder' );
			$tag->set_attribute( 'data-wp-bind--value', $target_store . 'state.inputValue' );
			if ( $has_subsumption ) {
				$tag->set_attribute( 'data-wp-bind--type', $target_store . 'state.inputType' );
				$tag->set_attribute( 'data-wp-bind--name', $target_store . 'state.inputName' );
			}

			// Classnames.
			$tag->set_attribute( 'data-wp-class--is-disabled', $target_store . 'state.isInputDisabled' );
			$tag->set_attribute( 'data-wp-class--is-error', $target_store . 'state.isInputError' );
			$tag->set_attribute( 'data-wp-class--is-success', $target_store . 'state.isInputSuccess' );
			$tag->set_attribute( 'data-wp-class--is-processing', $target_store . 'state.isInputProcessing' );

			$state                  = wp_interactivity_state( $target_namespace );
			$existing_form_fields   = $state['formFields'] ?? array();
			$existing_form_fields[] = array(
				'id'          => $block_id,
				'name'        => $input_name,
				'label'       => $label_text,
				'type'        => $input_type,
				'value'       => $input_value,
				'required'    => $input_required,
				'placeholder' => $input_placeholder,
				'hidden'      => null,
				'readonly'    => null,
				'disabled'    => null,
				'error'       => null,
			);
			$state                  = wp_interactivity_state(
				$target_namespace,
				array(
					'formFields' => $existing_form_fields,
				)
			);
		}

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
			PRC_BLOCK_LIBRARY_DIR . '/build/form-input-text',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}
