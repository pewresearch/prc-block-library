<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.
$context = $block->context;
$value_to_fetch = array_key_exists( 'valueToFetch', $attributes ) ? $attributes['valueToFetch'] : false;
$value_to_fetch_key = $value_to_fetch;
$is_image = 'staffImage' === $value_to_fetch_key;
$prefix = array_key_exists( 'prefix', $attributes ) && !empty($attributes['prefix']) ? $attributes['prefix'] : false;
if ( false !== $value_to_fetch && array_key_exists( $value_to_fetch_key, $context ) ) {
	if ( 'staffLink' === $value_to_fetch_key ) {
		$value_to_fetch = $attributes['prefix'] ? $attributes['prefix'] : '...';
	} else {
		$value_to_fetch = $context[$value_to_fetch_key];
	}
}

if ( $is_image && is_array($value_to_fetch) ) {
	$img = $value_to_fetch;
	$thumbnail = $img['thumbnail'];
	$value_to_fetch = wp_sprintf(
		'<img src="%1$s" width="%2$s" height="%3$s" alt="Portrait photo of staff" />',
		$thumbnail[0],
		$thumbnail[1],
		$thumbnail[2],
	);
} else if ( is_array($value_to_fetch) ) {
	// see if $value_to_fetch contains any item with a 'url' and 'label' key
	$value_to_fetch = array_map( function( $item ) {
		if ( array_key_exists( 'url', $item ) && array_key_exists( 'label', $item ) ) {
			return wp_sprintf(
				'<a href="%1$s">%2$s</a>',
				$item['url'],
				$item['label'],
			);
		}
		return $item;
	}, $value_to_fetch );
	$value_to_fetch = implode( '<span>,</span>', $value_to_fetch );
}

// if the $value_to_fetch is empty... return...
if ( empty($value_to_fetch) ) {
	return;
}

$template = '<div %1$s>%2$s%3$s</div>';
$staff_link = false;
if ( array_key_exists('enableLink', $attributes ) && $attributes['enableLink'] && array_key_exists( 'staffLink', $context ) && false !== $context['staffLink'] ) {
	$template = '<div %1$s>%2$s<a href="%4$s">%3$s</a></div>';
	$staff_link = array_key_exists( 'staffLink', $context ) ? $context['staffLink'] : false;
}

$classname = 'wp-block-prc-block-staff-info__' . strtolower(preg_replace('/([a-zA-Z])(?=[A-Z])/', '$1-', $value_to_fetch_key));

$block_attrs = get_block_wrapper_attributes(array(
	'class' => $classname,
));

echo wp_sprintf(
	$template,
	$block_attrs,
	$prefix ? wp_sprintf( '<span class="wp-block-prc-block-staff-info__prefix">%1$s</span>', $prefix ) : '',
	$value_to_fetch,
	$staff_link,
);
