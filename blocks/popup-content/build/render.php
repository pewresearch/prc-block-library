<?php

$block_wrapper_attrs = get_block_wrapper_attributes(array(
	'data-wp-interactive' => wp_json_encode(array(
		'namespace' => 'prc-block/popup-controller',
	)),
	'data-wp-on--click' => 'actions.open',
));

echo wp_sprintf(
	'<div %1$s>%2$s</div>',
	$block_wrapper_attrs,
	$content,
);
