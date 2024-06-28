<?php
namespace PRC\Platform\Blocks;
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.
$context = $block->context;

$context_colors = array(
	'titleBackgroundColor' => array_key_exists('prc-block/accordion-controller/title-background', $context) ? $context['prc-block/accordion-controller/title-background'] : null,
	'titleTextColor' => array_key_exists('prc-block/accordion-controller/title-text', $context) ? $context['prc-block/accordion-controller/title-text'] : null,
	'contentBackgroundColor' => array_key_exists('prc-block/accordion-controller/content-background', $context) ? $context['prc-block/accordion-controller/content-background'] : null,
	'contentTextColor' => array_key_exists('prc-block/accordion-controller/content-text', $context) ? $context['prc-block/accordion-controller/content-text'] : null,
);

$attributes = wp_parse_args($attributes, $context_colors);

/**
 * Build an array with CSS classes and inline styles defining the colors
 * which will be applied to the grid controller markup in the front-end.
 *
 * @param array $attributes Grid Controller block attributes.
 *
 * @return array Colors CSS classes.
 */
$wrapper_css_classes = array();

// Title
$title_css_classes = array(
	'wp-block-prc-block-accordion__title'
);
// Title background color.
$has_named_title_background_color  = array_key_exists( 'titleBackgroundColor', $attributes );
// If has title background color.
if ( $has_named_title_background_color ) {
	// Add has-background class.
	$title_css_classes[] = 'has-background';
}
if ( $has_named_title_background_color ) {
	// Add the title background color class.
	$title_css_classes[] = sprintf( 'has-%s-background-color', $attributes['titleBackgroundColor'] );
}
// Title text color.
$has_named_title_text_color  = array_key_exists( 'titleTextColor', $attributes );
// If has title background color.
if ( $has_named_title_text_color ) {
	// Add has-background class.
	$title_css_classes[] = 'has-text-color';
}
if ( $has_named_title_text_color ) {
	// Add the title background color class.
	$title_css_classes[] = sprintf( 'has-%s-color', $attributes['titleTextColor'] );
}

$content_css_classes = array(
	'wp-block-prc-block-accordion__content'
);
// Content background color.
$has_named_content_background_color  = array_key_exists( 'contentBackgroundColor', $attributes );
// If has content background color.
if ( $has_named_content_background_color ) {
	// Add has-background class.
	$content_css_classes[] = 'has-background';
}
if ( $has_named_content_background_color ) {
	// Add the content background color class.
	$content_css_classes[] = sprintf( 'has-%s-background-color', $attributes['contentBackgroundColor'] );
}
// Content text color.
$has_named_content_text_color  = array_key_exists( 'contentTextColor', $attributes );
// If has content text color.
if ( $has_named_content_text_color ) {
	// Add has-text-color class.
	$content_css_classes[] = 'has-text-color';
}
if ( $has_named_content_text_color ) {
	// Add the content text color class.
	$content_css_classes[] = sprintf( 'has-%s-text-color', $attributes['contentTextColor'] );
}


$block_wrapper_attrs = get_block_wrapper_attributes(array(
	'class' => \PRC\Platform\Block_Utils\classNames($wrapper_css_classes),
	'id' => wp_unique_id('accordion-'),
	'data-wp-interactive' => wp_json_encode(array('namespace' => 'prc-block/accordion-controller')),
	'data-wp-class--is-active' => 'callbacks.isActiveAccordion'
));

echo wp_sprintf(
	'<div %1$s><button class="%2$s" data-wp-on--click="actions.onClick"><span class="wp-block-prc-block-accordion__icon">&#8227;</span><h3>%3$s</h3></button><div class="%4$s">%5$s</div></div>',
	$block_wrapper_attrs,
	\PRC\Platform\Block_Utils\classNames($title_css_classes),
	$attributes['title'],
	\PRC\Platform\Block_Utils\classNames($content_css_classes),
	$content,
);
