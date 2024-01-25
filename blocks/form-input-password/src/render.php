<?php
namespace PRC\Platform\Blocks;
gutenberg_enqueue_module('prc-block/form-input-password-view');

$interactive_context = array_key_exists( 'interactiveNamespace', $attributes ) ? $attributes['interactiveNamespace'] : null;
$includes_confirmation = array_key_exists( 'includesConfirmation', $attributes ) ? $attributes['includesConfirmation'] : false;
$input_placeholder = array_key_exists( 'placeholder', $attributes ) ? $attributes['placeholder'] : 'Enter text...';
$confimation_placeholder = array_key_exists( 'confirmationPlaceholder', $attributes ) ? $attributes['confirmationPlaceholder'] : 'Confirm text...';
$input_type = array_key_exists('type', $attributes) ? $attributes['type'] : 'text';
$input_name = array_key_exists('metadata', $attributes) && array_key_exists('name', $attributes['metadata']) ? $attributes['metadata']['name'] : null;

if ( $includes_confirmation ) {
	// @TODO: This could easily be some sort of "conditions checker" interactive block component used in other applications.
	$conditions = array(
		'hasLowerCase' => 'Includes one lowercase letter',
		'hasUpperCase' => 'Includes one uppercase letter',
		'hasNumber' => 'Includes one number',
		'hasSpecialCharacter' => 'Includes one special character',
		'hasLength' => 'Be at least 12 characters long',
		'hasNoInvalidCharacters' => 'Not include invalid characters',
	);
	ob_start();
	?>
	<div class="wp-block-prc-block-form-input-password__analyzer">
		<p>Password Must:</p>
		<ul>
			<?php foreach($conditions as $context_key => $label) {
				echo wp_sprintf(
					'<li data-wp-class--is-valid="context.%1$s"><span data-wp-class--icon-hidden="!context.%1$s"><i class="fa fa-solid fa-check"></i></span><span data-wp-class--icon-hidden="context.%1$s"><i class="fa fa-regular fa-xmark"></i></span><span class="password-analyzer__label">%2$s</span></li>',
					$context_key,
					$label
				);
			}?>
		</ul>
	</div>
	<?php
	$password_analyzer = ob_get_clean();
}

$block_attrs = array(
	'id' => wp_unique_id('wp-block-prc-block-form-input-password-'),
	'class' => \PRC\Platform\Block_Utils\classNames(array(
		'has-confirmation' => $includes_confirmation,
	)),
	'data-wp-interactive' => wp_json_encode(array('namespace' => 'prc-block/form-input-password')),
	'data-wp-context' => wp_json_encode(array(
		'targetNamespace' => $interactive_context,
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
