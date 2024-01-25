<?php
namespace PRC\Platform\Blocks;
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

/**
 * Build an array with CSS classes and inline styles defining the colors
 * which will be applied to the grid controller markup in the front-end.
 *
 * @param array $attributes Grid Controller block attributes.
 *
 * @return array Colors CSS classes.
 */

$block_wrapper_attrs = get_block_wrapper_attributes(array(
	'data-wp-interactive' => wp_json_encode(array('namespace' => 'prc-block/accordion-controller')),
	'data-wp-context' => wp_json_encode(array(
		'activeId' => null, // This is the id of the prc-block/accordion that is currently active, so that we can close the others.
	)),
	'class' => \PRC\Platform\Block_Utils\classNames(array(
		'has-block-gap' => "0" !== \PRC\Platform\Block_Utils\get_block_gap_support_value($attributes, 'vertical'),
	))
));

echo wp_sprintf(
	'<div %1$s>%2$s</div>',
	$block_wrapper_attrs,
	$content,
);
