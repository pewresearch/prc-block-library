<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$block_wrapper_attrs =  get_block_wrapper_attributes(array(
	'aria-role' => 'tablist',
));

$uuids = array_map(
	function( $item ) {
		return $item['attrs']['uuid'];
	},
	$block->parsed_block['innerBlocks']
);

$content = '';
foreach ( $block->parsed_block['innerBlocks'] as $i => $menu_item ) {
	if ( ! in_array( get_query_var( 'menuItem' ), $uuids ) && 0 === $i ) {
		$menu_item['attrs']['active'] = true;
	}
	$content .= '<li>' . render_block( $menu_item ) . '</li>';
}

// You can use this method...
echo wp_sprintf(
	'<ul %1$s>%2$s</ul>',
	$block_wrapper_attrs,
	$content,
);
