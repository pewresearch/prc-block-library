<?php
namespace PRC\Platform\Blocks;

wp_enqueue_script('wp-api-fetch');
wp_enqueue_script('wp-url');

$mailchimp = new \PRC\Platform\Mailchimp(null, null);
$nonce = $mailchimp->get_nonce('subscribe');

$initial_context = wp_json_encode(array(
	'NONCE' => $nonce,
	'interests' => array(),
	'emailAddress' => '',
	'buttonId' => '',
	'inputId' => '',
	'captchaHidden' => true,
	'captchaToken' => false,
	'isError' => null,
	'isSuccess' => null,
	'isDisabled' => null,
	'isProcessing' => null,
));

$wrapper_attributes = get_block_wrapper_attributes(array(
	'id' => wp_unique_id( 'mailchimp-select-' ),
	'data-wp-interactive' => wp_json_encode(array(
		'namespace' => 'prc-block/mailchimp-select'
	)),
	'data-wp-context' => $initial_context,
	'data-wp-init' => 'callbacks.onInit',
	'data-wp-watch--on--input-change' => 'callbacks.onInputChange',
	'data-wp-watch--on--captcha-verify' => 'callbacks.onCaptchaVerify',
	'data-wp-watch--on--error' => 'callbacks.onError',
	'data-wp-watch--on--success' => 'callbacks.onSuccess',
));

echo wp_sprintf(
	'<div %1$s>%2$s</div>',
	$wrapper_attributes,
	$content,
);
