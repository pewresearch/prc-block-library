<?php

echo wp_sprintf(
	'<div %1$s>%2$s</div>',
	get_block_wrapper_attributes(),
	$content,
);
