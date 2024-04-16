<?php
namespace PRC\Platform\Blocks;

wp_enqueue_script('cloudflare-turnstile');

$interactive_namespace = array_key_exists( 'interactiveNamespace', $attributes ) ? $attributes['interactiveNamespace'] : null;

$block_wrapper_attrs = get_block_wrapper_attributes(array(
	'data-wp-interactive' => wp_json_encode(array('namespace' => 'prc-block/form-captcha')),
	'data-wp-context' => wp_json_encode(array(
		'targetNamespace' => $interactive_namespace,
	)),
	'data-wp-watch--onDisplayCaptcha' => 'callbacks.onDisplayCaptcha',
	'data-wp-bind--hidden' => $interactive_namespace . '::' . 'context.captchaHidden',
));

echo wp_sprintf(
	'<div %1$s>%2$s</div>',
	$block_wrapper_attrs,
	'<div class="wp-block-prc-block-form-captcha__captcha"></div>',
);
