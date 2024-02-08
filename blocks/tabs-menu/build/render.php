<?php
namespace PRC\Platform\Blocks;
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$block_wrapper_attrs =  get_block_wrapper_attributes(array(
	'aria-role' => 'tablist',
	'style' => '--block-gap: ' . \PRC\Platform\Block_Utils\get_block_gap_support_value($attributes) . ';',
));

$uuids = array_map(
	function( $item ) {
		return $item['attrs']['uuid'];
	},
	$block->parsed_block['innerBlocks']
);

$content = '';
foreach ( $block->parsed_block['innerBlocks'] as $i => $menu_item ) {
	$content .= '<li>' . render_block( $menu_item ) . '</li>';
}

// You can use this method...
echo wp_sprintf(
	'<ul %1$s>%2$s</ul>',
	$block_wrapper_attrs,
	$content,
);
