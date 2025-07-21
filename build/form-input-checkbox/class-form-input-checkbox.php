<?php
/**
 * Form Input Checkbox Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Form Input Checkbox
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Form_Input_Checkbox {
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
	 * Add interactivity api attributes to the block.
	 *
	 * @param array    $attributes Block attributes.
	 * @param string   $content Block content.
	 * @param WP_Block $block Block object.
	 * @return string Block content.
	 */
	public function render_block_callback( $attributes, $content, $block ) {
		$target_namespace = array_key_exists( 'interactiveNamespace', $attributes ) ? $attributes['interactiveNamespace'] : 'prc-block/form';
		$target_store     = $target_namespace . '::';
		$has_subsumption  = array_key_exists( 'interactiveSubsumption', $attributes ) ? $attributes['interactiveSubsumption'] : false;

		$input_name = array_key_exists( 'metadata', $attributes ) && array_key_exists( 'name', $attributes['metadata'] ) ? $attributes['metadata']['name'] : '';

		$tag = new \WP_HTML_Tag_Processor( $content );
		$tag->next_tag(
			array(
				'class_name' => 'wp-block-prc-block-form-input-checkbox',
			)
		);

		// Add directives to block wrapper.
		// Events.
		$tag->set_attribute( 'data-wp-on--mouseenter', $target_store . 'actions.onInputMouseEnter' );
		$tag->set_attribute( 'data-wp-on--mouseleave', $target_store . 'actions.onInputMouseLeave' );
		$tag->set_attribute( 'data-wp-on--click', $target_store . 'actions.onInputCheckboxClick' );

		// Classnames.
		$tag->set_attribute( 'data-wp-class--is-error', $target_store . 'state.isInputError' );
		$tag->set_attribute( 'data-wp-class--is-success', $target_store . 'state.isInputSuccess' );
		$tag->set_attribute( 'data-wp-class--is-processing', $target_store . 'state.isInputProcessing' );

		// Get, store, and remove the id attribute from the block wrapper.
		$block_id = $tag->get_attribute( 'id' );
		$tag->remove_attribute( 'id' );
		// If the input does not have an anchor, or id set generate a unique one for this page instance.
		if ( ! $block_id ) {
			$block_id = wp_unique_id( 'prc-block-form-input-checkbox-' );
		}

		$input_value    = $attributes['value'] ?? '';
		$input_checked  = $attributes['defaultChecked'] ?? false;
		$input_required = $attributes['required'] ?? false;

		while ( $tag->next_tag( 'input' ) ) {
			// Move the id to the input tag.
			$tag->set_attribute( 'id', $block_id );
			$input_value    = $tag->get_attribute( 'value' );
			$input_checked  = $tag->get_attribute( 'checked' );
			$input_required = $tag->get_attribute( 'required' );

			// Events.
			$tag->set_attribute( 'data-wp-on--focus', $target_store . 'actions.onInputFocus' );
			$tag->set_attribute( 'data-wp-on--blur', $target_store . 'actions.onInputBlur' );
			$tag->set_attribute( 'data-wp-bind--required', $target_store . 'state.isInputRequired' );
			$tag->set_attribute( 'data-wp-bind--value', $target_store . 'state.inputValue' );
			$tag->set_attribute( 'data-wp-bind--placeholder', $target_store . 'state.inputPlaceholder' );
			$tag->set_attribute( 'data-wp-bind--hidden', $target_store . 'state.isInputHidden' );
			$tag->set_attribute( 'data-wp-bind--readonly', $target_store . 'state.isInputReadOnly' );
			$tag->set_attribute( 'data-wp-bind--disabled', $target_store . 'state.isInputDisabled' );
			$tag->set_attribute( 'data-wp-bind--checked', $target_store . 'state.isInputChecked' );
			if ( $has_subsumption ) {
				$tag->set_attribute( 'data-wp-bind--name', $target_store . 'state.inputName' );
			}

			$label_text = '';
			while ( $tag->next_tag( 'label' ) ) {
				// Set the for attribute to the block id.
				$tag->set_attribute( 'for', $block_id );

				// Add derived state directives to the label tag if the block has subsumption turned on.
				if ( $has_subsumption ) {
					// Property Bindings.
					if ( $has_subsumption ) {
						$tag->set_attribute( 'data-wp-bind--for', $target_store . 'state.inputId' );
						$tag->set_attribute( 'data-wp-text', $target_store . 'state.inputLabel' );
					}
				}
				if ( $tag->next_token() ) {
					if ( '#text' === $tag->get_token_type() ) {
						$label_text = $tag->get_modifiable_text();
						$label_text = trim( $label_text );
					}
				}
			}
		}
		if ( empty( $label_text ) ) {
			$label_text = $attributes['label'] ?? '';
		}

		if ( ! $has_subsumption ) {
			$state                  = wp_interactivity_state( $target_namespace );
			$existing_form_fields   = $state['formFields'] ?? array();
			$existing_form_fields[] = array(
				'id'       => $block_id,
				'name'     => $input_name,
				'label'    => $label_text,
				'type'     => $attributes['type'] ?? 'checkbox',
				'value'    => $input_value ?? '',
				'checked'  => $input_checked ?? false,
				'required' => $input_required ?? false,
				'hidden'   => null,
				'readonly' => null,
				'disabled' => null,
				'error'    => null,
			);
			$state                  = wp_interactivity_state(
				$target_namespace,
				array(
					'formFields' => $existing_form_fields,
				)
			);
		}

		$content = $tag->get_updated_html();
		return $content;
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
			PRC_BLOCK_LIBRARY_DIR . '/build/form-input-checkbox',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}
