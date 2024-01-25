<?php
namespace PRC\Platform\Blocks;

gutenberg_enqueue_module('prc-block/form-input-select-view');

$target_namespace = array_key_exists( 'interactiveNamespace', $attributes ) ? $attributes['interactiveNamespace'] : null;

$input_placeholder = array_key_exists( 'placeholder', $attributes ) ? $attributes['placeholder'] : 'Click to select';
$input_name = array_key_exists('metadata', $attributes) && array_key_exists('name', $attributes['metadata']) ? $attributes['metadata']['name'] : null;
$input_options = array_key_exists( 'options', $attributes ) ? $attributes['options'] : array();
$input_id = md5( $target_namespace . $input_name );

$options = '';
foreach ($input_options as $option) {
	$options .= wp_sprintf(
		'<li role="option" aria-selected="%1$s" aria-controls="%2$s" data-wp-on--click="%3$s" data-wp-key="%4$s" class="wp-block-prc-block-form-input-select__list-item">%4$s</li>',
		false, // aria-selected
		$input_id, // aria-controls
		'actions.onSelect', // data-wp-on--click
		$option['value'], // data-wp-key
		$option['label'], // label
	);
}
$listbox = wp_sprintf(
	'<ul aria-labelledby="%1$s" role="listbox" class="wp-block-prc-block-form-input-select__list">%2$s</ul>',
	$input_id, // aria-labelledby
	$options, // listbox content
);

wp_initial_state(
	$target_namespace,
	array(
		$input_id => array(
			'isOpen'        => false,
			'value'         => array_key_exists( 'value', $attributes ) ? $attributes['value'] : null,
			'label'         => $input_placeholder,
			'isHidden'      => false,
			'isDisabled'    => array_key_exists( 'disabled', $attributes ) ? $attributes['disabled'] : false,
			'isError'       => false,
			'isSuccess'     => false,
			'isProcessing'  => false,
		)
	)
);

$block_wrapper_attrs = get_block_wrapper_attributes(array(
	'id' => $input_id,
	'data-wp-key' => $input_name,
	'data-wp-interactive' => wp_json_encode(array(
		'namespace' => 'prc-block/form-input-select'
	)),
	'data-wp-context' => wp_json_encode(array(
		'targetNamespace' => $target_namespace,
	)),
	'data-wp-init--watch-for-outside-clicks' => 'callbacks.onInit',
	'data-wp-class--is-open' => $target_namespace.'::state.'.$input_id.'.isOpen',
	'data-wp-bind--hidden' => $target_namespace.'::state.'.$input_id.'.isHidden',
	'data-wp-class--is-disabled' => $target_namespace.'::state.'.$input_id.'.isDisabled',
	'data-wp-class--is-error' => $target_namespace.'::state.'.$input_id.'.isError',
	'data-wp-class--is-success' => $target_namespace.'::state.'.$input_id.'.isSuccess',
	'data-wp-class--is-processing' => $target_namespace.'::state.'.$input_id.'.isProcessing',
	'data-wp-on--keyup' => 'callbacks.onESCKey',
));

echo wp_sprintf(
	'<div %1$s><button type="button" aria-controls="%2$s" class="wp-block-prc-block-form-input-select__button" data-wp-on--click="%3$s" data-wp-text="%4$s"></button>%5$s</div>',
	$block_wrapper_attrs, // wrapper attributes
	$input_id,
	'actions.onOpen', // data-wp-on--click
	$target_namespace.'::state.'.$input_id.'.label', // data-wp-text
	$listbox, // listbox content
);
