<?php
namespace PRC\Platform\Blocks;
if ( is_admin() ) {
	return;
}
$target_namespace = array_key_exists( 'interactiveNamespace', $attributes ) ? $attributes['interactiveNamespace'] : null;
if ( null === $target_namespace ) {
	return;
}
$input_placeholder = array_key_exists( 'placeholder', $attributes ) ? $attributes['placeholder'] : 'Enter text...';
$confimation_placeholder = array_key_exists( 'confirmationPlaceholder', $attributes ) ? $attributes['confirmationPlaceholder'] : 'Confirm text...';
$input_type = array_key_exists('type', $attributes) ? $attributes['type'] : 'text';
$input_name = array_key_exists('metadata', $attributes) && array_key_exists('name', $attributes['metadata']) ? $attributes['metadata']['name'] : null;
$includes_confirmation = array_key_exists( 'includesConfirmation', $attributes ) ? $attributes['includesConfirmation'] : false;
$conditions = array();

// @TODO: This could easily be some sort of "conditions checker" interactive block component used in other applications.
if ( $includes_confirmation ) {
	ob_start();
	?>
	<div class="wp-block-prc-block-form-input-password__analyzer">
		<p>Password Must:</p>
		<ul>
		<template
			data-wp-each--condition="context.conditionsList"
			data-wp-each-key="context.condition.id"
		>
			<li data-wp-class--is-valid="context.condition.met">
				<span data-wp-class--icon-hidden="!context.condition.met">
					<?php echo \PRC\Platform\Icons\Render('solid', 'check'); ?>
				</span>
				<span data-wp-class--icon-hidden="context.condition.met">
					<?php echo \PRC\Platform\Icons\Render('regular', 'xmark'); ?>
				</span>
				<span class="password-analyzer__label" data-wp-text="context.condition.label"></span>
			</li>
		</template>
		</ul>
	</div>
	<?php
	$password_analyzer = ob_get_clean();

	$conditions = array(
		array(
			'id' => 'hasLowerCase',
			'label' => 'Includes one lowercase letter',
			'met' => false,
		),
		array(
			'id' => 'hasUpperCase',
			'label' => 'Includes one uppercase letter',
			'met' => false,
		),
		array(
			'id' => 'hasNumber',
			'label' => 'Includes one number',
			'met' => false,
		),
		array(
			'id' => 'hasSpecialCharacter',
			'label' => 'Includes one special character',
			'met' => false,
		),
		array(
			'id' => 'hasLength',
			'label' => 'Be at least 12 characters long',
			'met' => false,
		),
		array(
			'id' => 'hasNoInvalidCharacters',
			'label' => 'Not include invalid characters',
			'met' => false,
		),
	);
}

$block_attrs = array(
	'id' => wp_unique_id('wp-block-prc-block-form-input-password-'),
	'class' => \PRC\Platform\Block_Utils\classNames(array(
		'has-confirmation' => $includes_confirmation,
	)),
	'data-wp-interactive' => wp_json_encode(array('namespace' => 'prc-block/form-input-password')),
	'data-wp-context' => wp_json_encode(array(
		'targetNamespace' => $target_namespace,
		'hasConfirmation' => $includes_confirmation,
		'value' => '',
		'confirmationValue' => '',
		'passwordInputId' => null,
		'confirmationInputId' => null,
		'hasLowerCase' => false,
		'hasUpperCase' => false,
		'hasNumber' => false,
		'hasSpecialCharacter' => false,
		'hasLength' => false,
		'hasNoInvalidCharacters' => true,
		'passwordsMatch' => false,
		'conditionsList' => $conditions,
	)),
	'data-wp-watch--on--value-change' => 'callbacks.onValueChange',
	'style' => '--block-gap:' . \PRC\Platform\Block_Utils\get_block_gap_support_value($attributes, 'horizontal') . ';',
);
if ( $includes_confirmation ) {
	$block_attrs['data-wp-init--on-confirmation-init'] = 'callbacks.onConfirmationInit';
}
$block_attrs = get_block_wrapper_attributes($block_attrs);

echo wp_sprintf(
	'<div %1$s><div class="wp-block-prc-block-form-input-password__input">%2$s</div>%3$s</div>',
	$block_attrs,
	$content,
	$includes_confirmation ? $password_analyzer : ''
);
