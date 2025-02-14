<?php
namespace PRC\Platform\Blocks;

$block_wrapper_attrs = get_block_wrapper_attributes(
	array(
		'data-wp-interactive' => 'prc-block/carousel-controller',
		'data-wp-context'     => wp_json_encode(
			array(
				'isActive' => false,
			)
		),
	)
);

echo wp_sprintf(
	'<div %1$s><div>%2$s</div></div>',
	$block_wrapper_attrs,
	$content
);
