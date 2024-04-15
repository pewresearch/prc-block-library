<?php
namespace PRC\Platform\Blocks;
if ( is_admin() ) {
	return;
}

$target_namespace       = array_key_exists( 'interactiveNamespace', $attributes ) ? $attributes['interactiveNamespace'] : null;
$input_required         = array_key_exists('required', $attributes) ? $attributes['required'] : false;
$input_label            = array_key_exists('label', $attributes) ? $attributes['label'] : '';
$input_name             = array_key_exists('metadata', $attributes) && array_key_exists('name', $attributes['metadata']) ? $attributes['metadata']['name'] : null;
$input_checked          = array_key_exists('defaultChecked', $attributes) ? $attributes['defaultChecked'] : false;
$input_type             = array_key_exists('type', $attributes) ? $attributes['type'] : 'checkbox';
$input_value            = array_key_exists('value', $attributes) ? $attributes['value'] : '';
$input_id               = md5( $target_namespace . $input_name . $input_type );
$input_border_color     = array_key_exists('checkboxColor', $attributes) ? $attributes['checkboxColor'] : false;
$is_part_of_a_template = false;
if ( false === $is_part_of_a_template ) {
	// Hoist this block's values into the target interactive namespace state.
	// State is no longer "global" store, in the sense that it is not shared across all blocks on the page and is instead shared by all blocks of the same namespace on the page.
	// Whereas context is a "state" store instanced to each block of the namespace.
	wp_interactivity_state(
		$target_namespace,
		array(
			$input_id => array(
				'value' => $input_value,
				'checked' => $input_checked,
				'type' => $input_type,
				'required' => $input_required,
				'name' => $input_name,
			),
		),
	);
}

// if this is part of a template then our attrs need to change to be bound to the template's context and actions and such... effectively wp interactivity template context should drive these values, not something else.

$input_attrs = array(
	'id'                    	=> $input_id,
	'name'                  	=> $input_name,
	'required'	                => $input_required,
	'type'                      => $input_type, // You may ask, why aren't these bound like the other two attributes? The answer is that we don't want these to be dynamic, we want them to be static and unchanging so that we know what to expect at different states.
	'data-wp-bind--value'       => $target_namespace.'::state.'.$input_id.'.value',
	'data-wp-bind--checked'		=> $target_namespace.'::state.'.$input_id.'.checked',
	'class'						=> sprintf( 'has-border-%s-color', $input_border_color )
);

// Normalize input attributes as a html string.
$normalized_input_attrs = array();
foreach ( $input_attrs as $key => $value ) {
	$normalized_input_attrs[] = $key . '="' . esc_attr( $value ) . '"';
}
$normalized_input_attrs = implode( ' ', $normalized_input_attrs );

echo wp_sprintf(
	'<div %1$s><input %2$s/><label for="%3$s">%4$s</label></div>',
	get_block_wrapper_attributes(array(
		'data-wp-interactive'			=> wp_json_encode(array('namespace' => $target_namespace)),
		'data-wp-key'           		=> $input_id,
		'data-wp-class--is-selected'	=> $target_namespace.'::state.'.$input_id.'.checked',
		'data-wp-class--is-required'	=> $target_namespace.'::state.'.$input_id.'.required',
		'data-wp-on--click'				=> $target_namespace.'::actions.onCheckboxClick',
		'data-wp-on--mouseenter'		=> $target_namespace.'::actions.onCheckboxMouseEnter',
	)),
	$normalized_input_attrs,
	$input_id,
	$input_label,
);
