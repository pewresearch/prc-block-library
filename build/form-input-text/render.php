<?php
namespace PRC\Platform\Blocks;

if ( is_admin() ) {
	return;
}
$target_namespace = array_key_exists( 'interactiveNamespace', $attributes ) ? $attributes['interactiveNamespace'] : null;
$has_subsumption  = array_key_exists( 'interactiveSubsumption', $attributes ) ? $attributes['interactiveSubsumption'] : false;
// Subsumption is useful if you want to render this block out as a template and use in a wp-template directive. This allows the parent block to control the state of this block directly.
if ( null === $target_namespace && false === $has_subsumption ) {
	return;
}
// Sometimes, like the prc-user-accounts/password-form block, targets have their own target namespace. We will use that to construct a unique id for some of these if present.
$target_target_namespace = array_key_exists( 'prc-block/interactiveNamespace', $block->context ) ? $block->context['prc-block/interactiveNamespace'] : null;

// These values are derived from the context of form-field block that may be wrapping this block. They are NOT derived from attributes.
$input_label    = array_key_exists( 'prc-block/form-field/label', $block->context ) ? $block->context['prc-block/form-field/label'] : null;
$input_required = array_key_exists( 'prc-block/form-field/required', $block->context ) ? $block->context['prc-block/form-field/required'] : false;

// These "primitve" values are derived from the attributes of this block.
$input_type        = array_key_exists( 'type', $attributes ) ? $attributes['type'] : 'text';
$input_name        = array_key_exists( 'metadata', $attributes ) && array_key_exists( 'name', $attributes['metadata'] ) ? $attributes['metadata']['name'] : null;
$long_id           = $target_target_namespace . '/' . $target_namespace . '/' . $input_type . '/' . $input_name;
$input_id          = md5( $long_id ); // This will yield the mose unique but reproducible id for this input.
$input_value       = array_key_exists( 'value', $attributes ) ? $attributes['value'] : '';
$input_placeholder = array_key_exists( 'placeholder', $attributes ) ? $attributes['placeholder'] : 'Enter text...';

if ( false === $has_subsumption ) {
	wp_interactivity_state(
		$target_namespace,
		array(
			$input_id => array(
				'value'        => $input_value,
				'type'         => $input_type,
				'required'     => $input_required,
				'name'         => $input_name,
				'isHidden'     => null,
				'isDisabled'   => null,
				'isError'      => null,
				'isSuccess'    => null,
				'isProcessing' => null,
				'isReadOnly'   => null,
			),
		)
	);
}

// Static and unchanging attributes.
$block_attrs = array(
	'id'             => $input_id,
	'name'           => $input_name,
	'type'           => $input_type,
	'data-long-id'   => $long_id,
	'placeholder'    => $input_placeholder,
	'data-1p-ignore' => 'text' === $input_type,
	'data-lpignore'  => 'text' === $input_type,
);

// Interactive attributes.
// Target namespace directives:
if ( ! $has_subsumption ) {
	$block_attrs = array_merge(
		$block_attrs,
		array(
			'data-wp-interactive'          => $target_namespace,
			'data-wp-on--keyup'            => $target_namespace . '::actions.onInputChange',
			'data-wp-on--focus'            => $target_namespace . '::actions.onInputFocus',
			'data-wp-on--blur'             => $target_namespace . '::actions.onInputBlur',
			'data-wp-bind--required'       => $target_namespace . '::state.' . $input_id . '.required',
			'data-wp-bind--type'           => $target_namespace . '::state.' . $input_id . '.type',
			'data-wp-bind--value'          => $target_namespace . '::state.' . $input_id . '.value',
			'data-wp-bind--hidden'         => $target_namespace . '::state.' . $input_id . '.isHidden',
			'data-wp-bind--disabled'       => $target_namespace . '::state.' . $input_id . '.isDisabled',
			'data-wp-bind--readonly'       => $target_namespace . '::state.' . $input_id . '.isReadOnly',
			'data-wp-class--is-disabled'   => $target_namespace . '::state.' . $input_id . '.isDisabled',
			'data-wp-class--is-error'      => $target_namespace . '::state.' . $input_id . '.isError',
			'data-wp-class--is-success'    => $target_namespace . '::state.' . $input_id . '.isSuccess',
			'data-wp-class--is-processing' => $target_namespace . '::state.' . $input_id . '.isProcessing',
		)
	);
	// Subsumption directives:
} else {
	$block_attrs = array_merge(
		$block_attrs,
		array(
			'data-wp-on--keyup'            => 'actions.onInputChange',
			'data-wp-on--focus'            => 'actions.onInputFocus',
			'data-wp-on--blur'             => 'actions.onInputBlur',
			'data-wp-bind--required'       => 'state.isRequired',
			'data-wp-bind--type'           => 'state.type',
			'data-wp-bind--value'          => 'state.value',
			'data-wp-bind--hidden'         => 'state.isHidden',
			'data-wp-bind--disabled'       => 'state.isDisabled',
			'data-wp-bind--readonly'       => 'state.isReadOnly',
			'data-wp-class--is-disabled'   => 'state.isDisabled',
			'data-wp-class--is-error'      => 'state.isError',
			'data-wp-class--is-success'    => 'state.isSuccess',
			'data-wp-class--is-processing' => 'state.isProcessing',
		)
	);
}
$block_wrapper_attrs = get_block_wrapper_attributes( $block_attrs );

echo wp_sprintf(
	'<%1$s %2$s></%1$s>',
	'textrarea' !== $input_type ? 'input' : 'textarea',
	$block_wrapper_attrs,
);
