<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$bylines = apply_filters( 'prc_block_library_bylines_query', get_the_ID() );

$block_attrs = get_block_wrapper_attributes();

$block_content = '';

$block_instance = $block->parsed_block;

// Set the block name to one that does not correspond to an existing registered block.
// This ensures that for the inner instances of the Staff Query block, we do not render any block supports.
$block_instance['blockName'] = 'core/null';

foreach( $bylines as $byline_context ) {
	// Render the inner blocks of the Bylines Query block with `dynamic` set to `false` to prevent calling
	// `render_callback` and ensure that no wrapper markup is included.
	$block_content .= (
		new WP_Block(
			$block_instance,
			$byline_context
		)
	)->render( array( 'dynamic' => false ) );
}

echo wp_sprintf(
	'<div %1$s>%2$s</div>',
	$block_attrs,
	$block_content
);
