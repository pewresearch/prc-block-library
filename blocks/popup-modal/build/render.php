<?php
namespace PRC\Platform\Blocks;

$position = str_replace(' ', '-', strtolower($attributes['position']));
$position = \jetpack_is_mobile() ? 'center-center' : $position;
$outer_class = \PRC\Platform\Block_Utils\classNames('wp-block-prc-block-popup-modal__outer', 'is-position-' . $position);

$block_wrapper_attrs = get_block_wrapper_attributes(array(
	'data-wp-interactive' => wp_json_encode(array(
		'namespace' => 'prc-block/popup-controller',
	)),
	'data-wp-key' => wp_unique_id('popup-modal-'),
	'data-wp-init' => 'callbacks.soundOff',
	'data-wp-class--is-active' => 'callbacks.isModalActive'
));

$is_video_modal = array_key_exists('popup-controller/className', $block->context) && 'is-style-video' === $block->context['popup-controller/className'];

$heading = wp_sprintf(
	'<div class="wp-block-prc-block-popup-modal__header"><h2>%1$s</h2></div>',
	array_key_exists('title', $attributes) ? $attributes['title'] : ''
);

$close_button = wp_sprintf(
	'<div class="wp-block-prc-block-popup-modal__close-button" data-wp-on--click="actions.close">%1$s</div>',
	'X',
);

// You can use this method...
echo wp_sprintf(
	'<div class="%1$s"><div %2$s>%3$s %4$s<div class="wp-block-prc-block-popup-modal__inner">%5$s</div></div></div>',
	$outer_class,
	$block_wrapper_attrs,
	$close_button,
	false === $is_video_modal ? $heading : '',
	$content,


);
