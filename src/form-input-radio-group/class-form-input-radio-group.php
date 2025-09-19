<?php
/**
 * Form Input Radio Group Block.
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Form Input Radio Group
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Form_Input_Radio_Group {
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
			$loader->add_filter( 'render_block_data', $this, 'hook_inner_blocks', 10, 3 );
		}
	}

	// pre render block data, change any inner blocks that are form-input-checkbox to type = radio and interactiveNamespace = prc-block/form-input-radio-group.
	/**
	 * Modify inner blocks to be radio inputs.
	 *
	 * @hook render_block_data
	 *
	 * @param array    $parsed_block The parsed block.
	 * @param WP_Block $source_block The source block.
	 * @param WP_Block $parent_block The parent block.
	 * @return array The modified parsed block.
	 */
	public function hook_inner_blocks( $parsed_block, $source_block, $parent_block ) {
		if ( 'prc-block/form-input-radio-group' === $parsed_block['blockName'] && ! empty( $parsed_block['innerBlocks'] ) ) {
			foreach ( $parsed_block['innerBlocks'] as $index => $inner_block ) {
				if ( 'prc-block/form-input-checkbox' === $inner_block['blockName'] ) {
					$parsed_block['innerBlocks'][ $index ]['attrs']['type']                 = 'radio';
					$parsed_block['innerBlocks'][ $index ]['attrs']['interactiveNamespace'] = 'prc-block/form-input-radio-group';
				}
			}
		}
		return $parsed_block;
	}

	/**
	 * Adad interactivity api attributes to the block.
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

		$input_name     = array_key_exists( 'metadata', $attributes ) && array_key_exists( 'name', $attributes['metadata'] ) ? $attributes['metadata']['name'] : '';
		$input_required = $attributes['required'] ?? false;
		$label_text     = '';

		$tag = new \WP_HTML_Tag_Processor( $content );
		$tag->next_tag(
			array(
				'class_name' => 'wp-block-prc-block-form-input-radio-group',
			)
		);

		// Setup interactivity.
		$tag->set_attribute( 'data-wp-interactive', 'prc-block/form-input-radio-group' );
		$tag->set_attribute( 'data-wp-init', 'callbacks.onInit' );

		// Classnames.
		$tag->set_attribute( 'data-wp-class--is-error', $target_store . 'state.isInputError' );
		$tag->set_attribute( 'data-wp-class--is-success', $target_store . 'state.isInputSuccess' );
		$tag->set_attribute( 'data-wp-class--is-processing', $target_store . 'state.isInputProcessing' );

		// Store the id attribute from the block wrapper.
		$block_id = $tag->get_attribute( 'id' );
		// If the input does not have an anchor, or id set generate a unique one for this page instance.
		if ( ! $block_id ) {
			$block_id = wp_unique_id( 'prc-block-form-input-radio-group-' );
			$tag->set_attribute( 'id', $block_id );
		}
		// Watcher to change context.value to store(targetNamespace).state.formFields.find( (field) => field.id === context.id )?.value = context.value.
		$tag->set_attribute( 'data-wp-watch--on-value-change', 'callbacks.onValueChange' );

		$tag->set_bookmark( 'start' );

		if ( $tag->next_tag( 'label' ) ) {
			$tag->set_attribute( 'for', $block_id );
			// Get the label text.
			if ( $tag->next_token() ) {
				if ( '#text' === $tag->get_token_type() ) {
					$label_text = $tag->get_modifiable_text();
					$label_text = trim( $label_text );
				}
			}
		}

		$fields = array();
		while ( $tag->next_tag( 'input' ) ) {
			$tag->set_attribute( 'type', 'radio' );
			$fields[] = $tag->get_attribute( 'id' );
		}

		$tag->seek( 'start' );

		$tag->set_attribute(
			'data-wp-context',
			wp_json_encode(
				array(
					'id'              => $block_id,
					'targetNamespace' => $target_namespace,
					'value'           => null,
					'fields'          => $fields,
				)
			)
		);

		if ( ! $has_subsumption ) {
			$state                  = wp_interactivity_state( $target_namespace );
			$existing_form_fields   = $state['formFields'] ?? array();
			$existing_form_fields[] = array(
				'id'       => $block_id,
				'name'     => $input_name,
				'label'    => $label_text,
				'type'     => 'radioGroup',
				'value'    => null,
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
			PRC_BLOCK_LIBRARY_DIR . '/build/form-input-radio-group',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}
