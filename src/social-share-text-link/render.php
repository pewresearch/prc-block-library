<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

// Don't render the block's subtree if it has no label.
if ( empty( $attributes['label'] ) ) {
	return '';
}

if ( ! is_object( $block ) ) {
	return '';
}

// Don't render the block's subtree if it has no label.
if ( empty( $attributes['label'] ) ) {
	return '';
}

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'href'   => isset( $attributes['url'] ) ? esc_url( $attributes['url'] ) : false,
		'rel'    => 'nofollow',
		'target' => isset( $attributes['opensInNewTab'] ) && true === $attributes['opensInNewTab'] ? '_blank' : false,
	)
);

// End appending HTML attributes to anchor tag.
// Start anchor tag content.
$html = '<a ' . $wrapper_attributes . '>';

if ( isset( $attributes['label'] ) ) {
	$html .= wp_kses(
		$attributes['label'],
		array(
			'code'   => array(),
			'em'     => array(),
			'img'    => array(
				'scale' => array(),
				'class' => array(),
				'style' => array(),
				'src'   => array(),
				'alt'   => array(),
			),
			's'      => array(),
			'span'   => array(
				'style' => array(),
			),
			'strong' => array(),
		)
	);
}

$html .= '</a>';

echo normalize_whitespace( $html );
