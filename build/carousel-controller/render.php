<?php
/**
 * Render callback for the Carousel Controller block.
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

$attributes = \PRC\Platform\Block_Utils\get_block_attributes(
	'prc-block/carousel-controller',
	$attributes
);

$classname         = $attributes['className'] ?? '';
$is_vertical       = 'vertical' === $attributes['orientation'];
$classname        .= $is_vertical ? ' is-style-vertical' : '';
$arrows_navigation = strpos( $classname, 'arrows-navigation' ) !== false;
$dots_navigation   = strpos( $classname, 'dots-navigation' ) !== false;
$count             = count( $block->parsed_block['innerBlocks'] );

$navigation_type = $arrows_navigation ? 'arrows' : 'dots';

// Create an array of the number of slides.
$slides      = array();
$i           = 0;
$innerblocks = array_fill( 0, $count, null );
foreach ( $innerblocks as $innerblock ) {
	$slides[] = array(
		'label' => 'Go to slide ' . ( $i + 1 ),
		'index' => $i,
	);
	++$i;
}

$block_id = wp_unique_id( 'prc-block-carousel-controller-' );

$wrapper_attrs = array(
	'class'                       => $classname,
	'id'                          => $block_id,
	'data-wp-interactive'         => 'prc-block/carousel-controller',
	'data-wp-context'             => wp_json_encode(
		array(
			'id'                 => $block_id,
			'enabled'            => false,
			'containerMaxHeight' => 0,
			'slideIndex'         => 0,
			'count'              => $count,
			'navigationType'     => $navigation_type,
			'orientation'        => $attributes['orientation'],
			'slides'             => $slides,
		)
	),
	'data-wp-init'                => 'callbacks.onInit',
	'data-wp-class--is-enabled'   => 'context.enabled',
	'data-wp-on-document--scroll' => 'callbacks.onCoverScroll',
);

$block_wrapper_attrs = get_block_wrapper_attributes( $wrapper_attrs );

if ( $arrows_navigation ) {
	$navigation_element = wp_sprintf(
		'<div class="prc-block-carousel-controller__arrows"><button class="prc-block-carousel-controller__arrow prc-block-carousel-controller__arrow--prev" data-wp-on--click="actions.goToPreviousSlide" aria-label="Previous slide">%s</button><button class="prc-block-carousel-controller__arrow prc-block-carousel-controller__arrow--next" data-wp-on--click="actions.goToNextSlide" aria-label="Next slide">%s</button></div>',
		\PRC\Platform\Icons\render( 'solid', $is_vertical ? 'chevron-up' : 'chevron-left' ),
		\PRC\Platform\Icons\render( 'solid', $is_vertical ? 'chevron-down' : 'chevron-right' )
	);
}

if ( $dots_navigation ) {
	$navigation_element = wp_sprintf(
		'<div class="prc-block-carousel-controller__dots"><template data-wp-each--dot="context.slides"><button class="prc-block-carousel-controller__dot" data-wp-on--click="actions.goToDot" data-wp-bind--data-slide-index="context.dot.index" data-wp-bind--aria-label="context.dot.label" data-wp-bind--data-active="callbacks.isDotActive">%s</button></template></div>',
		\PRC\Platform\Icons\render( 'solid', 'circle' )
	);
}
echo wp_sprintf(
	'<div %s><div class="prc-block-carousel-controller__track">%s</div>%s</div>',
	$block_wrapper_attrs,
	$content,
	$navigation_element
);
