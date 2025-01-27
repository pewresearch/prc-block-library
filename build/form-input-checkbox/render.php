<?php
namespace PRC\Platform\Blocks;
if ( is_admin() ) {
	return;
}

$target_namespace       = array_key_exists( 'interactiveNamespace', $attributes ) ? $attributes['interactiveNamespace'] : null;
$has_subsumption        = array_key_exists( 'interactiveSubsumption', $attributes ) ? $attributes['interactiveSubsumption'] : false;
// Subsumption is useful if you want to render this block out as a template and use in a wp-template directive. This allows the parent block to control the state of this block directly.
if ( null === $target_namespace && false === $has_subsumption ) {
	return;
}
$input_required         = array_key_exists('required', $attributes) ? $attributes['required'] : false;
$input_label            = array_key_exists('label', $attributes) ? $attributes['label'] : '';
$input_name             = array_key_exists('metadata', $attributes) && array_key_exists('name', $attributes['metadata']) ? $attributes['metadata']['name'] : sanitize_title( $input_label );
$input_checked          = array_key_exists('defaultChecked', $attributes) ? $attributes['defaultChecked'] : false;
$input_type             = array_key_exists('type', $attributes) ? $attributes['type'] : 'checkbox';
$input_value            = array_key_exists('value', $attributes) ? $attributes['value'] : '';
$input_id               = md5( $target_namespace . $input_name . $input_type );
$input_border_color     = array_key_exists('checkboxColor', $attributes) ? $attributes['checkboxColor'] : false;

// Hoist this block's values into the target's global state.
if (false === $has_subsumption) {
	wp_interactivity_state(
		$target_namespace,
		[
			$input_id => [
				'value' => $input_value,
				'checked' => $input_checked,
				'type' => $input_type,
				'required' => $input_required,
				'name' => $input_name,
			],
		],
	);
}

// Input
$input_border_color = sprintf( 'has-border-%s-color', $input_border_color );
if (true === $has_subsumption) {
	$input_attrs = [
		'class'						=> $input_border_color,
		'type'                      => 'toggle' === $input_type ? 'checkbox' : $input_type,
		'data-wp-bind--value'       => 'state.value',
		'data-wp-bind--checked'		=> 'state.checked',
		'data-wp-bind--name'		=> 'state.name',
	];
} else {
	$input_attrs = [
		'id'                    	=> $input_id,
		'name'                  	=> $input_name,
		'required'	                => $input_required,
		'type'                      => 'toggle' === $input_type ? 'checkbox' : $input_type,
		'class'						=> $input_border_color,
		 // You may ask, why aren't these ^ bound like the other two attributes? The answer is that we don't want these to be dynamic, we want them to be static and unchanging so that we know what to expect from the input.
		'data-wp-bind--value'       => $target_namespace.'::state.'.$input_id.'.value',
		'data-wp-bind--checked'		=> $target_namespace.'::state.'.$input_id.'.checked',
	];
}
$normalized_input_attrs = array();
foreach ( $input_attrs as $key => $value ) {
	$normalized_input_attrs[] = $key . '="' . esc_attr( $value ) . '"';
}
$normalized_input_attrs = implode( ' ', $normalized_input_attrs );


// Label
if (true === $has_subsumption) {
	$label_attrs = [
		'data-wp-bind--for' => 'state.id',
		'data-wp-text' => 'state.label',
	];
} else {
	$label_attrs = [
		'for' => $input_id,
	];
}
$normalized_label_attrs = array();
foreach ( $label_attrs as $key => $value ) {
	$normalized_label_attrs[] = $key . '="' . esc_attr( $value ) . '"';
}
$normalized_label_attrs = implode( ' ', $normalized_label_attrs );
$label_inner_html = !$has_subsumption ? $input_label : '';
$label = wp_sprintf( '<label %1$s>%2$s</label>', $normalized_label_attrs, $label_inner_html );

$label = 'toggle' === $input_type ? '<div class="wp-block-prc-block-form-input-checkbox__toggle" data-wp-class--is-selected="state.isSelected"><div class="wp-block-prc-block-form-input-checkbox__toggle__switch"></div></div>' . $label : $label;

$classname = \PRC\Platform\Block_Utils\classNames([
	'is-type-checkbox' => 'checkbox' === $input_type,
	'is-type-radio' => 'radio' === $input_type,
	'is-type-toggle' => 'toggle' === $input_type,
]);

// Block Wrapper
if ( true === $has_subsumption ) {
	$block_attrs = [
		'data-wp-class--is-selected'	=> 'state.isSelected',
		'data-wp-on--click'				=> 'actions.onCheckboxClick',
		'data-wp-on--mouseenter'		=> 'actions.onCheckboxMouseEnter',
		'class'                         => $classname,
	];
} else {
	$block_attrs = [
		'data-wp-key'           		=> $input_id,
		'data-wp-interactive'			=> wp_json_encode(['namespace' => $target_namespace]),
		'data-wp-class--is-selected'	=> $target_namespace.'::state.'.$input_id.'.checked',
		'data-wp-class--is-required'	=> $target_namespace.'::state.'.$input_id.'.required',
		'data-wp-on--click'				=> $target_namespace.'::actions.onCheckboxClick',
		'data-wp-on--mouseenter'		=> $target_namespace.'::actions.onCheckboxMouseEnter',
		'class'	                        => $classname,
	];
}
$block_wrapper_attrs = get_block_wrapper_attributes($block_attrs);

echo wp_sprintf(
	'<div %1$s><input %2$s/>%3$s</div>',
	$block_wrapper_attrs,
	$normalized_input_attrs,
	$label,
);
