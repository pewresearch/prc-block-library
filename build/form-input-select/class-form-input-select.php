<?php
/**
 * Form Input Select Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Form Input Select
 * Description:       Create a dropdown element with a list of options.
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */
class Form_Input_Select {
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
	 * Construct the options list for the select input.
	 *
	 * @param array  $attributes The attributes of the block.
	 * @param object $block The block object.
	 * @return array The filtered options.
	 */
	public function construct_options_list( $attributes, $block ) {
		// Determine whether the block should use default options or custom options.
		$type          = array_key_exists( 'type', $attributes ) ? $attributes['type'] : 'custom';
		$input_options = array();
		// If the block should use default options, set the input_options to the appropriate default option set.
		if ( 'countries' === $type ) {
			if ( function_exists( 'vip_geo_get_country_code' ) ) {
				// We're going to automatically inject the value into attributes, very early.
				$country_code = vip_geo_get_country_code();
				if ( 'default' !== $country_code ) {
					$attributes['value'] = $country_code;
				}
			}
			$input_options = \PRC\Platform\get_list_of( 'countries' );
		} elseif ( 'countries-and-regions' === $type ) {
			$input_options = \PRC\Platform\get_list_of( 'countries-and-regions' );
		} elseif ( 'us-states' === $type ) {
			$input_options = \PRC\Platform\get_list_of( 'us-states' );
		} elseif ( 'industries' === $type ) {
			$input_options = \PRC\Platform\get_list_of( 'industries' );
		}

		// Merge in any custom options that are set on the block.
		if ( array_key_exists( 'options', $attributes ) && ! empty( $attributes['options'] ) ) {
			$input_options = array_merge( $input_options, $attributes['options'] );
		}

		// Check if the block has context and if it has form-input-select/options, if so, merge those with the input_options as well.
		$input_options = array_merge( $input_options, $block->context['form-input-select/options'] ?? array() );

		// If there are no options return a default array.
		if ( empty( $input_options ) ) {
			return array(
				array(
					'label'    => 'No options available',
					'value'    => '',
					'disabled' => true,
				),
			);
		}

		// Ensure input_options have disabled and isSelected properties set to a default false value if not already set.
		$input_options = array_map(
			function ( $option ) {
				if ( ! array_key_exists( 'disabled', $option ) ) {
						$option['disabled'] = false;
				}
				if ( ! array_key_exists( 'isSelected', $option ) ) {
					$option['isSelected'] = false;
				}
				return $option;
			},
			$input_options
		);

		// Create an array of filtered options, remove options that are being implicitly disabled.
		$filtered_options = array();
		foreach ( $input_options as $option ) {
			if ( true === $option['disabled'] ) {
				continue;
			}
			$filtered_options[] = $option;
		}
		// Sort the filtered options such that isSelected are on top.
		usort(
			$filtered_options,
			function ( $a, $b ) {
				if ( $a['isSelected'] === $b['isSelected'] ) {
					return 0;
				}
				return $a['isSelected'] ? -1 : 1;
			}
		);

		return $filtered_options;
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
		$allow_search     = $attributes['allowSearch'] ?? true;
		$target_namespace = array_key_exists( 'interactiveNamespace', $attributes ) ? $attributes['interactiveNamespace'] : 'prc-block/form';
		$target_store     = $target_namespace . '::';
		// If this block has subsumption, it's directives and context/state will be handled by it's parent.
		$has_subsumption = array_key_exists( 'interactiveSubsumption', $attributes ) ? $attributes['interactiveSubsumption'] : false;
		if ( $has_subsumption ) {
			$target_store = '';
		}
		$input_name = array_key_exists( 'metadata', $attributes ) && array_key_exists( 'name', $attributes['metadata'] ) ? $attributes['metadata']['name'] : '';
		$block_id   = null;

		$tag = new \WP_HTML_Tag_Processor( $content );
		if ( $tag->next_tag(
			array(
				'class_name' => 'wp-block-prc-block-form-input-select',
			)
		) ) {
			$tag->set_bookmark( 'start' );
			if ( ! $has_subsumption ) {
				$tag->set_attribute( 'data-wp-interactive', 'prc-block/form-input-select' );
			}
			$tag->set_attribute( 'data-wp-class--is-open', 'state.isOpen' );
			if ( $attributes['hasClearIcon'] ?? false ) {
				$tag->set_attribute( 'data-wp-class--has-selection', 'state.hasValue' );
			}
			$block_id = $tag->get_attribute( 'id' );
			// Get, store, and remove the id attribute from the block wrapper.
			$tag->remove_attribute( 'id' );
		}

		// If the input does not have an anchor, or id set generate a unique one for this page instance.
		if ( null === $block_id ) {
			$block_id = wp_unique_id( 'prc-block-form-input-select-' );
		}

		// Now that we have an id, we can set the context on the main wrapper.
		if ( $tag->seek( 'start' ) && ! $has_subsumption ) {
			$tag->set_attribute(
				'data-wp-context',
				wp_json_encode(
					array(
						'targetNamespace' => $target_namespace,
						'id'              => $block_id,
						'hasClearIcon'    => $attributes['hasClearIcon'] ?? false,
						'searchTerm'      => '',
						'activeIndex'     => 0,
						'processing'      => false,
						'allowSearch'     => $attributes['allowSearch'] ?? true,
					)
				)
			);
		}

		$label_text = '';
		if ( true === $attributes['displayLabel'] && $tag->next_tag( 'label' ) ) {
			$tag->set_attribute( 'data-wp-on--click', 'actions.onLabelClick' );
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

		$options_list = $this->construct_options_list( $attributes, $block );

		$is_required       = $attributes['required'] ?? false;
		$is_disabled       = $attributes['disabled'] ?? false;
		$input_placeholder = $attributes['placeholder'] ?? '';
		$input_value       = $attributes['value'] ?? '';

		if ( $tag->next_tag( 'input' ) ) {
			$is_required       = $tag->get_attribute( 'required' );
			$is_disabled       = $tag->get_attribute( 'disabled' );
			$input_placeholder = $tag->get_attribute( 'placeholder' );
			$input_value       = $tag->get_attribute( 'value' );
			$tag->set_attribute( 'id', $block_id );
			$tag->set_attribute( 'ariaControls', 'dropdown-list-' . $block_id );
			$tag->set_attribute( 'data-wp-bind--ariaExpanded', 'state.isOpen' );
			$tag->set_attribute( 'data-wp-on-async--focus', 'actions.onInputFocus' );
			$tag->set_attribute( 'data-wp-on-async--blur', 'actions.onInputBlur' );
			$tag->set_attribute( 'data-wp-on-async--keyup', 'actions.onInputKeyUp' );
			$tag->set_attribute( 'data-wp-on-async--keydown', 'actions.onInputKeyDown' );
			$tag->set_attribute( 'data-wp-bind--value', 'state.inputValue' );
			$tag->set_attribute( 'data-wp-bind--name', 'state.inputName' );
			$tag->set_attribute( 'data-wp-bind--placeholder', 'state.inputPlaceholder' );
			$tag->set_attribute( 'data-wp-bind--disabled', 'state.isInputDisabled' );
			$tag->set_attribute( 'data-wp-bind--required', 'state.isInputRequired' );
			$tag->set_attribute( 'data-wp-bind--readonly', 'state.isInputReadonly' );
			// Prevent 1password, lastpass, and so on from adding their addons to the input.
			$tag->set_attribute( 'data-1p-ignore', 'true' );
			$tag->set_attribute( 'data-lpignore', 'true' );
			$tag->set_attribute( 'autocomplete', 'off' );
		}

		$content = $tag->get_updated_html();

		if ( ! $has_subsumption ) {
			// Set the initial state for the blocks interface interactions.
			wp_interactivity_state(
				'prc-block/form-input-select',
				array(
					$block_id => array(
						'isOpen'      => false,
						'name'        => $input_name,
						'label'       => $label_text,
						'value'       => $input_value ?? '',
						'required'    => $is_required ?? false,
						'placeholder' => $input_placeholder ?? '',
						'hidden'      => null,
						'readonly'    => ! $allow_search,
						'disabled'    => $is_disabled ?? false,
						'error'       => null,
						'options'     => $options_list,
					),
				)
			);
		}

		if ( ! $has_subsumption ) {
			// Hoist the standard formField state into the target namespace.
			// The onValueChange callback detects value changes and updates the target namespace store accordingly.
			$state                  = wp_interactivity_state( $target_namespace );
			$existing_form_fields   = $state['formFields'] ?? array();
			$existing_form_fields[] = array(
				'id'          => $block_id,
				'name'        => $input_name,
				'label'       => $label_text,
				'type'        => 'select',
				'value'       => $input_value ?? '',
				'required'    => $is_required ?? false,
				'placeholder' => $input_placeholder ?? '',
				'hidden'      => null,
				'readonly'    => ! $allow_search,
				'disabled'    => $is_disabled ?? false,
				'error'       => null,
				'options'     => $options_list,
			);
			$state                  = wp_interactivity_state(
				$target_namespace,
				array(
					'formFields' => $existing_form_fields,
				)
			);
		}

		// Options list, clear button, and dropdown arrow.
		$options_list_template = wp_sprintf(
			'<div class="prc-block-form-input-select__icon-wrapper"><button class="wp-block-prc-block-form-input-select__clear-button" data-wp-on--click="actions.onInputClearButtonClick" data-wp-bind--hidden="!state.hasClearIcon" type="button">%4$s</button><button class="wp-block-prc-block-form-input-select__dropdown-arrow" data-wp-on--click="actions.onDropdownArrowClick" data-wp-class--is-open="context.isOpen" type="button">%5$s</button></div><ul role="listbox" id="dropdown-list-%1$s" class="wp-block-prc-block-form-input-select__list" ><template data-wp-each--option="%2$s" data-wp-each-key="context.option.value">%3$s</template></ul>',
			$block_id,
			'state.inputOptions',
			'<li role="option" data-wp-on--click="actions.onInputOptionClick" data-wp-text="context.option.label" data-wp-bind--data-ref-value="context.option.value"></li>',
			\PRC\Platform\Icons\render( 'solid', 'circle-xmark' ),
			\PRC\Platform\Icons\render( 'solid', 'chevron-down' ),
		);

		return str_replace( '<div class="prc-block-form-input-select__list__placeholder"></div>', $options_list_template, $content );
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
			PRC_BLOCK_LIBRARY_DIR . '/build/form-input-select',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}
