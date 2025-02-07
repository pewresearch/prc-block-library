<?php
/**
 * Renders the Timeline Slide block on the front end.
 *
 * @package prc-block
 */

namespace PRC\Platform\Blocks;

if ( empty( $attributes['metadata']['name'] ) ) {
	return;
}

$block_id = md5( $attributes['metadata']['name'] );

$block_wrapper_attrs = get_block_wrapper_attributes(
	array(
		'data-wp-interactive'      => 'prc-block/timeline',
		'data-wp-context'          => wp_json_encode(
			array(
				'id' => $block_id,
			)
		),
		'data-wp-class--is-active' => 'callbacks.isTimelineSlideActive',
	)
);

echo wp_sprintf(
	'<section %1$s>%2$s</section>',
	$block_wrapper_attrs,
	$content,
);
