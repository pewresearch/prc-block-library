<?php
namespace PRC\Platform\Blocks;

$target_namespace = array_key_exists( 'interactiveNamespace', $attributes ) ? $attributes['interactiveNamespace'] : 'prc-block/form-input-select';

$input_placeholder = array_key_exists( 'placeholder', $attributes ) ? $attributes['placeholder'] : 'Click to select';
$input_name = array_key_exists('metadata', $attributes) && array_key_exists('name', $attributes['metadata']) ? $attributes['metadata']['name'] : 'prc-block/form-input-select';
$input_value = array_key_exists('value', $attributes) ? $attributes['value'] : null;
$input_options = array_key_exists( 'options', $attributes ) ? $attributes['options'] : array(
	array(
		'label' => 'Option 1',
		'value' => 'option-1',
		'isSelected' => false,
	),
);
$input_disabled = array_key_exists( 'disabled', $attributes ) ? $attributes['disabled'] : false;
$input_options = empty($input_options) && array_key_exists( 'prc-block/form-input-options', $block->context) ? $block->context['prc-block/form-input-options'] : $input_options;

$input_options = array_map( function( $option ) use ( $input_value ) {
	$option['isSelected'] = $option['value'] === $input_value;
	return $option;
}, $input_options );
$input_id = md5( $target_namespace . $input_name );

$input_attrs = \PRC\Platform\Block_Utils\get_block_html_attributes( array(
	'id' 					=> $input_id.'-input',
	'role' 					=> 'combobox',
	'type' 					=> 'text', // we should make this "search" but how do we get rid of the "x" clear button?
	'aria-controls' 		=> $input_id.'-input',
	'placeholder' 			=> $input_placeholder,
	'data-wp-bind--value' 	=> 'context.label',
	'data-wp-on--keyup' 	=> 'actions.onKeyUp',
	'data-wp-on--focus' 	=> 'actions.onOpen', // open the list when the input is focused
	'data-wp-on--blur' 		=> 'actions.onClose', // close the list when the input is blurred
) );
$input = wp_sprintf(
	'<input %1$s />',
	$input_attrs
);

$option_attrs = \PRC\Platform\Block_Utils\get_block_html_attributes( array(
	'role' => 'option',
	'aria-controls' => $input_id.'-input',
	'class' => 'wp-block-prc-block-form-input-select__list-item',
	'data-wp-bind--aria-selected' => 'context.option.isSelected',
	'data-wp-bind--data-ref-value' => 'context.option.value',
	'data-wp-text' => 'context.option.label',
	'data-wp-on--click' => 'actions.onClick',
) );
$option_template = wp_sprintf(
	'<li %1$s/>',
	$option_attrs
);
// Generate the list of options from context.filteredOptions.
$options_list = wp_sprintf(
	'<template data-wp-each--option="context.filteredOptions" data-wp-each-key="context.option.value">%1$s</template>',
	$option_template,
);

$block_wrapper_attrs = get_block_wrapper_attributes( array(
	'id' => $input_id,
	'data-wp-key' => wp_unique_id('prc-block-form-input-select-'),
	'data-wp-interactive' => wp_json_encode(array(
		'namespace' => 'prc-block/form-input-select'
	)),
	'data-wp-context' => wp_json_encode(array(
		'targetNamespace' => $target_namespace,
		'activeIndex' => 0,
		'value' => $input_value,
		'label' => null,
		'isOpen' => false,
		'isHidden' => false,
		'isDisabled' => $input_disabled,
		'isError' => false,
		'isSuccess' => false,
		'isProcessing' => false,
		'filteredOptions' => $input_options,
		'options' => $input_options,
	)),
	'data-wp-init' => 'callbacks.onInit',
	'data-wp-bind--hidden' => 'context.isHidden',
	'data-wp-class--is-open' => 'context.isOpen',
	'data-wp-class--is-disabled' => 'context.isDisabled',
	'data-wp-class--is-error' => 'context.isError',
	'data-wp-class--is-success' => 'context.isSuccess',
	'data-wp-class--is-processing' => 'context.isProcessing',
	'data-wp-watch--on-value-change' => 'callbacks.onValueChange',
	'style' => '--block-gap:' . \PRC\Platform\Block_Utils\get_block_gap_support_value($attributes, 'horizontal') . ';',
) );

echo wp_sprintf(
	'<div %1$s><div class="wp-block-prc-block-form-input-select__input">%2$s</div><ul class="wp-block-prc-block-form-input-select__list" role="listbox" id="%3$s-listbox" aria-autocomplete="list">%4$s</ul></div>',
	$block_wrapper_attrs,
	$input,
	$input_id,
	$options_list
);


