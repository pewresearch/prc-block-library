<?php
namespace PRC\Platform\Blocks;
if ( is_admin() ) {
	return;
}
$target_namespace = array_key_exists( 'interactiveNamespace', $attributes ) ? $attributes['interactiveNamespace'] : null;
if ( null === $target_namespace ) {
	return;
}
// Sometimes, like the password form block, targets have their own target namespace. We will use that to construct a unique id for some of these if present.
$target_target_namespace = array_key_exists( 'prc-block/form-input-target-namespace', $block->context ) ? $block->context['prc-block/form-input-target-namespace'] : null;

// These values are derived from the context of form-field block that may be wrapping this block. They are NOT derived from attributes.
$input_label = array_key_exists( 'prc-block/form-field/label', $block->context ) ? $block->context['prc-block/form-field/label'] : null;
$input_required = array_key_exists( 'prc-block/form-field/required', $block->context ) ? $block->context['prc-block/form-field/required'] : false;

// These values are derived from the attributes of this block and only this block.
$input_type = array_key_exists('type', $attributes) ? $attributes['type'] : 'text';
$input_name = array_key_exists('metadata', $attributes) && array_key_exists('name', $attributes['metadata']) ? $attributes['metadata']['name'] : null;
$input_id = md5( $target_target_namespace . $target_namespace . $input_name . $input_label . $input_type );
$input_value = array_key_exists('value', $attributes) ? $attributes['value'] : '';
$input_placeholder = array_key_exists( 'placeholder', $attributes ) ? $attributes['placeholder'] : 'Enter text...';

wp_interactivity_state(
	$target_namespace,
	array(
		$input_id => array(
			'value' => $input_value,
			'type' => $input_type,
			'required' => $input_required,
			'name' => $input_name,
			'isHidden' => null,
			'isDisabled' => null,
			'isError' => null,
			'isSuccess' => null,
			'isProcessing' => null,
		),
	),
);

$block_attrs = get_block_wrapper_attributes(array(
	'id' => $input_id,
	'name' => $input_name,
	'type' => $input_type,
	'placeholder' => $input_placeholder,
	'data-wp-interactive' => wp_json_encode(array(
		'namespace' => $target_namespace,
	)),
	'data-wp-on--keyup'             => $target_namespace.'::actions.onInputChange',
	'data-wp-on--focus'             => $target_namespace.'::actions.onInputFocus',
	'data-wp-on--blur'              => $target_namespace.'::actions.onInputBlur',
	'data-wp-bind--required'	    => $target_namespace.'::state.'.$input_id.'.required',
	'data-wp-bind--type'	        => $target_namespace.'::state.'.$input_id.'.type',
	'data-wp-bind--value'           => $target_namespace.'::state.'.$input_id.'.value',
	'data-wp-bind--hidden'          => $target_namespace.'::state.'.$input_id.'.isHidden',
	'data-wp-bind--disabled'        => $target_namespace.'::state.'.$input_id.'.isDisabled',
	'data-wp-class--is-disabled'    => $target_namespace.'::state.'.$input_id.'.isDisabled',
	'data-wp-class--is-error'       => $target_namespace.'::state.'.$input_id.'.isError',
	'data-wp-class--is-success'     => $target_namespace.'::state.'.$input_id.'.isSuccess',
	'data-wp-class--is-processing'  => $target_namespace.'::state.'.$input_id.'.isProcessing',
	'data-1p-ignore' => 'true',
	'data-lpignore' => 'true',
));

echo wp_sprintf(
	'<%1$s %2$s></%1$s>',
	'textrarea' !== $input_type ? 'input' : 'textarea',
	$block_attrs,
);
