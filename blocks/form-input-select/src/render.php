<?php
namespace PRC\Platform\Blocks;

$target_namespace = array_key_exists( 'interactiveNamespace', $attributes ) ? $attributes['interactiveNamespace'] : null;

if ( ! $target_namespace ) {
	$target_namespace = 'prc-block/form-input-select';
}

$input_placeholder = array_key_exists( 'placeholder', $attributes ) ? $attributes['placeholder'] : 'Click to select';
$input_name = array_key_exists('metadata', $attributes) && array_key_exists('name', $attributes['metadata']) ? $attributes['metadata']['name'] : null;
$input_options = array_key_exists( 'options', $attributes ) ? $attributes['options'] : array();
$block_context = array_key_exists( 'prc-block/form-input-options', $block->context) ? $block->context['prc-block/form-input-options'] : array();
$input_options = empty($input_options) ? $block_context : $input_options;
$input_id = md5( $target_namespace . $input_name . $input_placeholder . wp_json_encode($input_options));
do_action('qm/debug', print_r($input_options, true));

wp_interactivity_state(
	$target_namespace,
	array(
		$input_id => array(
			'value'         => array_key_exists( 'value', $attributes ) ? $attributes['value'] : null,
			'isOpen'        => false,
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
		'activeId' => 0,
		'label' => $input_placeholder,
		'filteredOptions' => $input_options,
		'options' => $input_options,
	)),
	'data-wp-init' => 'callbacks.onInit',
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

$input_attrs = array(
	'id' 					=> $input_id.'-input',
	'role' 					=> 'combobox',
	'type' 					=> 'search',
	'aria-controls' 		=> $input_id,
	'placeholder' 			=> $input_placeholder,
	'data-wp-bind--value' 	=> $target_namespace.'::state.'.$input_id.'.inputText',
	'data-wp-on--keyup' 	=> 'actions.onKeyUp',
	'data-wp-on--focus' 	=> 'actions.onOpen',
	'data-wp-on--blur' 		=> 'actions.onClose',
);

$input_attrs = \PRC\Platform\Block_Utils\get_block_html_attributes( $input_attrs );


$input = wp_sprintf(
	'<input %1$s />',
	$input_attrs
);

$option_attrs = array(
	'role' => 'option',
	'aria-selected' => 'false',
	'aria-controls' => $input_id,
	'data-wp-on--click' => 'actions.onClick',
	'class' => 'wp-block-prc-block-form-input-select__list-item',
	'data-wp-text' => 'context.option.label',
	'data-wp-bind--refid' => 'context.option.value',
);

$option_attrs = \PRC\Platform\Block_Utils\get_block_html_attributes( $option_attrs );

$option = wp_sprintf(
	'<li %1$s />',
	$option_attrs
);

do_action('qm/debug', print_r($target_namespace.'::state.'.$input_id.'.filteredOptions', true));

?>

<div <?php echo $block_wrapper_attrs;?> >
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
			<template
				data-wp-each--option="context.filteredOptions"
				data-wp-each-key="context.option.value"
			>
				<?php echo $option; ?>
			</template>
	</ul>
</div>
