<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

wp_enqueue_style( 'prc-font-monospace' );

$detectedLanguage = array_key_exists( 'detectedLanguage', $attributes ) ? $attributes['detectedLanguage'] : ''; 
$forceLanguage = array_key_exists( 'forceLanguage', $attributes ) ? $attributes['forceLanguage'] : ''; 
$block_wrapper_attrs = get_block_wrapper_attributes();

// You can use this method...
echo wp_sprintf(
	'<div %1$s data-language="%2$s"><div class="wp-block-prc-block-code-syntax__ui"></div>%3$s</div>',
	$block_wrapper_attrs,
	!empty( $forceLanguage ) ? $forceLanguage : $detectedLanguage,
	$content,
);

