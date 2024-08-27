<?php
namespace PRC\Platform\Blocks;

if ( is_admin() ) {
	return;
}

/**
 * LOGIC: Determine the options for the select input.
 */

// Determine whether the block should use default options or custom options.
$default_options = array_key_exists( 'defaultOptions', $attributes ) ? $attributes['defaultOptions'] : 'custom';
// If the block should use default options, set the input_options to the appropriate default option set.
if ('custom'!== $default_options) {
	if ( 'countries' === $default_options ) {
		if (function_exists( 'vip_geo_get_country_code' )) {
			// We're going to automatically inject the value into attributes, very early.
			$country_code = vip_geo_get_country_code();
			if ( 'default' !== $country_code ) {
				$attributes['value'] = $country_code;
			}
		}
		$input_options = \PRC\Platform\get_list_of('countries');
	} elseif ( 'countries-and-regions' === $default_options ) {
		$input_options = \PRC\Platform\get_list_of('countries-and-regions');
	} elseif ( 'us-states' === $default_options ) {
		$input_options = \PRC\Platform\get_list_of('us-states');
	} elseif ( 'industries' === $default_options ) {
		$input_options = \PRC\Platform\get_list_of('industries');
	}
// Otherwise, check if the block has custom options.
} elseif (array_key_exists( 'options', $attributes ) && !empty($attributes['options'])) {
	$input_options = $attributes['options'];
} else {
	$input_options = [];
}
// If the block does not have any options at this point then check the block context for options.
$input_options = empty($input_options) && array_key_exists( 'prc-block/form-input-select/options', $block->context) ? $block->context['prc-block/form-input-select/options'] : $input_options;

// Ensure input_options have disabled and isSelected properties set to a default false value if not already set.
$input_options = array_map( function( $option ) {
	if ( ! array_key_exists( 'disabled', $option ) ) {
		$option['disabled'] = false;
	}
	if ( ! array_key_exists( 'isSelected', $option ) ) {
		$option['isSelected'] = false;
	}
	return $option;
}, $input_options );

// Create an array of filtered options, remove options that are being implicitly disabled.
$filtered_options = [];
foreach ($input_options as $option) {
	if ( true === $option['disabled'] ) {
		continue;
	}
	$filtered_options[] = $option;
}
// Sort the filtered options such that isSelected are on top.
usort($filtered_options, function($a, $b) {
	if ( $a['isSelected'] === $b['isSelected'] ) {
		return 0;
	}
	return $a['isSelected'] ? -1 : 1;
});

$target_namespace = array_key_exists( 'interactiveNamespace', $attributes ) ? $attributes['interactiveNamespace'] : 'prc-block/form-input-select';
$input_name = sanitize_title(array_key_exists('metadata', $attributes) && array_key_exists('name', $attributes['metadata']) ? $attributes['metadata']['name'] : 'prc-block/form-input-select');
$input_id = array_key_exists( 'id', $attributes ) ? $attributes['id'] : md5( $target_namespace . '/dropdown/' . $input_name );
$input_disabled = array_key_exists( 'disabled', $attributes ) ? $attributes['disabled'] : false;
$clear_icon = array_key_exists( 'hasClearIcon', $attributes ) ? $attributes['hasClearIcon'] : false;
$input_placeholder = array_key_exists( 'placeholder', $attributes ) ? $attributes['placeholder'] : 'Click to select';
$input_value = array_key_exists('value', $attributes) ? $attributes['value'] : null;
$input_label = null;
if ( null !== $input_value ) {
	foreach ( $input_options as $option ) {
		if ( $option['value'] === $input_value ) {
			$input_label = $option['label'];
			break;
		}
	}
}

/**
 * MARKUP: Render the block.
 */

$input_template = wp_sprintf(
	/* html */
	'<input %1$s />',
	\PRC\Platform\Block_Utils\get_block_html_attributes( [
		'id' 					    => $input_id.'-input',
		'role' 					    => 'combobox',
		'type' 					    => 'text', // we should make this "search" but how do we get rid of the "x" clear button?
		'aria-controls' 		    => $input_id.'-input',
		'placeholder' 			    => $input_placeholder,
		'data-wp-bind--value' 	    => 'state.label',
		'data-wp-on--keyup' 	    => 'actions.onKeyUp',
		'data-wp-on-async--focus' 	=> 'actions.onOpen', // open the list when the input is focused
		'data-wp-on-async--blur' 	=> 'actions.onClose', // close the list when the input is blurred
		'data-wp-bind--disabled'    => 'callbacks.isDisabled',
		'data-1p-ignore'            => 'true', // Hide from 1password
		'data-lpignore'             => 'true', // Hide from lastpass
	] )
);

$option_li_template = wp_sprintf(
	/* html */'<li %1$s></li>',
	\PRC\Platform\Block_Utils\get_block_html_attributes( [
		'role' => 'option',
		'aria-controls' => $input_id,
		'class' => 'wp-block-prc-block-form-input-select__list-item',
		'data-wp-bind--aria-selected' => 'context.option.isSelected',
		'data-wp-bind--data-ref-value' => 'context.option.value',
		'data-wp-text' => 'context.option.label',
		'data-wp-on--click' => 'actions.onClick',
	] )
);
$options_template = wp_sprintf(
	/* html */'<template data-wp-each--option="%s" data-wp-each-key="context.option.value">%s</template>',
	'state.'.$input_id.'.filteredOptions',
	$option_li_template,
);
$has_clear_icon = array_key_exists('hasClearIcon', $attributes) ? $attributes['hasClearIcon'] : false;
$block_wrapper_attrs = get_block_wrapper_attributes([
	'id' => $input_id,
	'class' => \PRC\Platform\Block_Utils\classNames([
		'has-clear-icon' => $has_clear_icon,
	]),
	'data-wp-key' => $input_id,
	'data-wp-interactive' => wp_json_encode([
		'namespace' => 'prc-block/form-input-select'
	]),
	'data-wp-context' => wp_json_encode([
		'targetNamespace' => $target_namespace,
		'id' => $input_id,
		'md5Hash' => md5( $target_namespace . '/dropdown/' . $input_name . wp_json_encode($filtered_options) ), // This is used to force the interactivity api to re-render the block when the filteredOptions change.
	]),
	'data-wp-class--is-open' => 'state.isOpen',
	'data-wp-class--is-processing' => 'callbacks.isProcessing',
	'data-wp-class--has-value' => 'state.hasValue',
	'data-wp-init' => 'callbacks.onInit',
	'style' => '--block-gap:' . \PRC\Platform\Block_Utils\get_block_gap_support_value($attributes, 'horizontal') . ';',
]);

$caret_up = \PRC\Platform\Icons\Render('solid', 'caret-up');
$caret_down = \PRC\Platform\Icons\Render('solid', 'caret-down');
$icon_set = $caret_up . $caret_down;
$clear_icon = \PRC\Platform\Icons\Render('light', 'circle-xmark');
if ( $has_clear_icon ) {
	$icon_set .= $clear_icon;
}

$template = /* html */'<div %1$s><div class="wp-block-prc-block-form-input-select__close-toggle" data-wp-on--click="actions.onIconClick">%5$s</div><div class="wp-block-prc-block-form-input-select__input">%2$s</div><ul class="wp-block-prc-block-form-input-select__list" role="listbox" id="%3$s-listbox" aria-autocomplete="list">%4$s</ul></div>';

wp_interactivity_state( 'prc-block/form-input-select', [
	$input_id => [
		'activeIndex' => 0,
		'value' => $input_value,
		'label' => $input_label,
		'name' => $input_name,
		'placeholder' => $input_placeholder,
		'isOpen' => false,
		'isDisabled' => $input_disabled,
		'hasClearIcon' => $has_clear_icon,
		'options' => $input_options,
		'filteredOptions' => $filtered_options,
	]
]);

echo wp_sprintf(
	$template,
	$block_wrapper_attrs,
	$input_template,
	$input_id,
	$options_template,
	$icon_set,
);
