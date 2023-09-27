<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$block_attrs = get_block_wrapper_attributes(array());

$url     = isset( $block->context['core/social-links/url'] ) ? $block->context['core/social-links/url'] : false;
$url     = ( false === $url && isset( $attributes['url'] ) ) ? $attributes['url'] : $url;

echo wp_sprintf(
	'<div %1$s><div class="label">Share This Link:</div><div class="ui input"><input type="text" readonly="" onclick="this.focus();this.select();" value="%2$s"></div></div>',
	$block_attrs,
	$url
);
