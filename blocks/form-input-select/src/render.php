<?php
namespace PRC\Platform\Blocks;

$target_namespace = array_key_exists( 'interactiveNamespace', $attributes ) ? $attributes['interactiveNamespace'] : null;

if ( ! $target_namespace ) {
	$target_namespace = 'prc-block/form-input-select';
}

$input_placeholder = array_key_exists( 'placeholder', $attributes ) ? $attributes['placeholder'] : 'Click to select';
$input_name = array_key_exists('metadata', $attributes) && array_key_exists('name', $attributes['metadata']) ? $attributes['metadata']['name'] : null;
$input_options = array_key_exists( 'options', $attributes ) ? $attributes['options'] : array();
$input_id = md5( $target_namespace . $input_name . $input_placeholder . wp_json_encode($input_options));

// $options = '';
// foreach ($input_options as $option) {
// 	$options .= wp_sprintf(
// 		'<li role="option" aria-selected="%1$s" aria-controls="%2$s" data-wp-on--click="%3$s" data-wp-key="%4$s" class="wp-block-prc-block-form-input-select__list-item">%4$s</li>',
// 		false, // aria-selected
// 		$input_id, // aria-controls
// 		'actions.onSelect', // data-wp-on--click
// 		$option['value'], // data-wp-key
// 		$option['label'], // label
// 	);
// }
// $listbox = wp_sprintf(
// 	'<ul aria-labelledby="%1$s" role="listbox" class="wp-block-prc-block-form-input-select__list">%2$s</ul>',
// 	$input_id, // aria-labelledby
// 	$options, // listbox content
// );

wp_interactivity_state(
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
			'options'       => $input_options,
			'filteredOptions' => $input_options,
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
		'activeId' => 0,
		'value' => '',
		'filteredOptions' => $input_options,
	)),
	'data-wp-init--watch-for-outside-clicks' => 'callbacks.onInit',
	'data-wp-class--is-open' => $target_namespace.'::state.'.$input_id.'.isOpen',
	'data-wp-bind--hidden' => $target_namespace.'::state.'.$input_id.'.isHidden',
	'data-wp-class--is-disabled' => $target_namespace.'::state.'.$input_id.'.isDisabled',
	'data-wp-class--is-error' => $target_namespace.'::state.'.$input_id.'.isError',
	'data-wp-class--is-success' => $target_namespace.'::state.'.$input_id.'.isSuccess',
	'data-wp-class--is-processing' => $target_namespace.'::state.'.$input_id.'.isProcessing',
	'data-wp-on-document--keydown' => 'callbacks.onESCKey',
	'data-wp-watch--on--value-change' => 'callbacks.onValueChange',
	'style' => '--block-gap:' . \PRC\Platform\Block_Utils\get_block_gap_support_value($attributes, 'horizontal') . ';',
));

// echo wp_sprintf(
// 	'<div %1$s><button type="button" aria-controls="%2$s" class="wp-block-prc-block-form-input-select__button" data-wp-on--click="%3$s" data-wp-text="%4$s"></button>%5$s</div>',
// 	$block_wrapper_attrs, // wrapper attributes
// 	$input_id,
// 	'actions.onOpen', // data-wp-on--click
// 	$target_namespace.'::state.'.$input_id.'.label', // data-wp-text
// 	$listbox, // listbox content
// );

$input_attrs = array(
	'id' 					=> $input_id.'-input',
	'role' 					=> 'combobox',
	'type' 					=> 'search',
	'aria-controls' 		=> $input_id,
	'data-wp-interactive' 	=> wp_json_encode(array(
		'namespace' => 'prc-block/form-input-select'
	)),
	'placeholder' 			=> $input_placeholder,
	'data-wp-bind--value' 	=> $target_namespace.'::state.'.$input_id.'.inputText',
	'data-wp-on--keyup' 	=> 'actions.onKeyUp',
	'data-wp-on--focus' 	=> 'actions.onOpen',
	'data-wp-on--blur' 		=> 'actions.onClose',
);

$input_attrs = get_block_wrapper_attributes($input_attrs);

$input = wp_sprintf(
	'<input %1$s />',
	$input_attrs
);

$option_attrs = array(
	'role' => 'option',
	'data-wp-interactive' => wp_json_encode(array(
		'namespace' => 'prc-block/form-input-select'
	)),
	'aria-selected' => 'false',
	'aria-controls' => $input_id,
	'data-wp-on--click' => 'actions.onSelect',
	'class' => 'wp-block-prc-block-form-input-select__list-item',
	'data-wp-text' => 'context.option.label',
	'data-wp-bind--refid' => 'context.option.value',
);

$option_attrs = get_block_wrapper_attributes($option_attrs);

$option = wp_sprintf(
	'<li %1$s />',
	$option_attrs
);

?>

<div <?php echo $block_wrapper_attrs;?> >
	<div>You've selected <span data-wp-text="<?php echo $target_namespace.'::state.'.$input_id.'.label'; ?>"></span></div>
	<div>
		<div>
			<?php echo $input; ?>
		</div>
	</div>
	<ul
		role="listbox"
		class="wp-block-prc-block-form-input-select__list"
		id="listbox-<?php echo $input_id; ?>"
		aria-autocomplete="list"
	>
			<!-- TODO: each-key doesn't seem to set in DOM? -->
			<template
				data-wp-each--option="<?php echo $target_namespace.'::state.'.$input_id.'.filteredOptions'; ?>"
				data-wp-each-key="context.option.value"
			>
				<?php echo $option; ?>
			</template>
	</ul>
</div>
