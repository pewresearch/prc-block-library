<?php
namespace PRC\Platform\Blocks;
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$attrs = array(
	'class' => \PRC\Platform\Block_Utils\classNames('splide'),
	'aria-label' => 'A carousel alt...', // @TODO: Make this dynamic.
);
if ( function_exists('jetpack_is_mobile') && jetpack_is_mobile() ) {
	$attrs['data-is-mobile'] = true;
}

$block_wrapper_attrs = get_block_wrapper_attributes($attrs);

echo wp_sprintf(
	'<section %1$s><div class="splide__track"><ul class="splide__list">%2$s</ul></div></section>',
	$block_wrapper_attrs,
	$content
);
