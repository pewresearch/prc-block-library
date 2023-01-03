<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

// Extract the id from the "restrictToTerm" attribute object
$restrict_to_term_id = $attributes['restrictToTerm']['id'] ?? null;
$restrict_to_term_name = $attributes['restrictToTerm']['name'] ?? null;

$block_wrapper_attrs = get_block_wrapper_attributes(array(
	'data-taxonomy' => $attributes['taxonomy'] ?? 'topic',
	'data-restrict-to-term-id' => $restrict_to_term_id,
	'data-restrict-to-term-name' => $restrict_to_term_name,
));

// You can use this method...
echo wp_sprintf(
	'<div %1$s>Loading taxonomy search...</div>',
	$block_wrapper_attrs
);
