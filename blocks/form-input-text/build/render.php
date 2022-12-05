<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

// If this block is going to be used in the theme or be called directly by PHP it is sometimes easier to use our internal function for of this function.
// See https://github.com/pewresearch/pewresearch-org/blob/main/plugins/prc-block-library/prc-block-library.php#L131 for how to use `$this->_get_block_wrapper_attributes()`
$block_attrs = get_block_wrapper_attributes(array(
	'placeholder' => array_key_exists( 'placeholder', $attributes ) ? $attributes['placeholder'] : 'Enter email address...',
	'type'        => array_key_exists( 'type', $attributes ) ? $attributes['type'] : 'email',
));

echo wp_sprintf(
	'<input %1$s></input>',
	$block_attrs,
	$content
);
