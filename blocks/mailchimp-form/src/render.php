<?php
namespace PRC\Platform\Blocks;

//@benwormald see example of how to manually include @wordpress packages in a module for now... this will be automatic once the modules system is complete and wordpress/scripts is updated accordingly.
gutenberg_enqueue_module('prc-block/mailchimp-form-view');
wp_enqueue_script('wp-api-fetch');
wp_enqueue_script('wp-url');

$mailchimp = new \PRC\Platform\Mailchimp(null, null);
$nonce = $mailchimp->get_nonce('subscribe');

// Here we're setting up the "state" for just this instance of this block. There can be multiple instances of this block on a page, each with their own state. In the wordpress/interactivity api this is called "context". Think of this as "instanced state". Whereas "state" in wordpress/interactivity is global and shared for all instances of a block on a page.
$initial_context = array(
	'NONCE' => $nonce,
	'interest' => array_key_exists( 'interest', $attributes ) ? $attributes['interest'] : false,
	'emailAddress' => array_key_exists( 'value', $attributes ) ? $attributes['value'] : '',
	'buttonId' => null, // onInit we set this to the id of the button element so that we can target it in global state later to hide, disable, set an error or success state, and or change the text. This is a hacky way to do this, but it's simple and direct and stable.
	'inputId' => null, // ^ same as above but for the input element. For simple form's like this it reduces javascript complexity to have a direct key to various elements.
	'captchaHidden' => true,
	'captchaToken' => false,
	'isError' => false,
	'isSuccess' => false,
	'isDisabled' => false,
	'isProcessing' => false,
);

$block_gap = \PRC\Platform\Block_Utils\get_block_gap_support_value( $attributes );

echo wp_sprintf(
	'<div %1$s>%2$s</div>',
	get_block_wrapper_attributes(
		array(
			'id' => wp_unique_id( 'mailchimp-form-' ),
			'class' => array_key_exists( 'className', $attributes ) ? $attributes['className'] : '',
			'style' => '--block-gap: ' . $block_gap,
			'data-wp-interactive' => wp_json_encode(array(
				'namespace' => 'prc-block/mailchimp-form'
			)),
			'data-wp-context' => wp_json_encode($initial_context),
			'data-wp-init' => 'callbacks.onInit',
			'data-wp-watch--onInputChange' => 'callbacks.onInputChange',
			'data-wp-watch--on--captchaDisplayHideFormElements' => 'callbacks.onCaptchaDisplayHideFormElements',
			'data-wp-watch--on--captchaVerifyHideCaptcha' => 'callbacks.onCaptchaVerifyHideCaptcha',
			'data-wp-watch--on--captchaVerifyThenSubscribe' => 'callbacks.onCaptchaVerifyThenSubscribe',
			'data-wp-watch--on--success' => 'callbacks.onSuccess',
			'data-wp-watch--on--error' => 'callbacks.onError',
		)
	),
	$content,
);
