<?php
namespace PRC\Platform\Blocks;
use \PRC\Platform\Footnotes_API;

// Look at postId in block context first, otherwise default to the globally available post_id.
$object_id = array_key_exists('postId', $block->context) && !empty($block->context['postId']) ? $block->context['postId'] : get_the_ID();

$footnotes = new Footnotes_API( $object_id );
$footnotes = $footnotes->get_footnotes();
if ( false === $footnotes || empty( $footnotes['footnotes'] ) ) {
	return;
}

$start = $footnotes['start'];
$footnotes_callback = function($footnote, $index) use ($object_id, $start) {
	$index = $index + $start;
	$id = "fn-" . $object_id . "-" . $index;
	$link_back = "#fnref-" . $object_id . "-" . $index;
	return wp_sprintf(
		'<li class="wp-block-prc-block-footnotes__footnote" id="%s">%s<span class="wp-block-prc-block-footnotes__footnote__return"><a href="%s">↩</a></span></li>',
		$id,
		$footnote,
		$link_back,
	);
};
$footnotes = array_map(
	$footnotes_callback,
	$footnotes['footnotes'],
	array_keys($footnotes['footnotes'])
);
$content = implode( '', $footnotes );

$block_gap = \PRC\Platform\Block_Utils\get_block_gap_support_value($attributes);

$block_wrapper_attrs = get_block_wrapper_attributes([
	'id' => 'footnotes',
	'style' => '--block-gap: ' . $block_gap . ';',
	'start' => $start,
]);

echo wp_sprintf(
	'<ol %1$s>%2$s</ol>',
	$block_wrapper_attrs,
	$content,
);
