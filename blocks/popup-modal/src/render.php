<?php
namespace PRC\Platform\Blocks;

$block_wrapper_attrs = get_block_wrapper_attributes(array(
	'data-wp-interactive' => wp_json_encode(array(
		'namespace' => 'prc-block/popup-controller',
	)),
	'data-wp-context' => wp_json_encode(array(
		'id' => array_key_exists('controllerId', $attributes) ? $attributes['controllerId'] : '',
	)),
	'data-wp-key' => wp_unique_id('popup-modal-'),
	'data-wp-init' => 'callbacks.soundOff',
	'data-wp-class--is-active' => 'callbacks.isModalActive'
));

$is_video_modal = array_key_exists('isVideo', $attributes) ? $attributes['isVideo'] : false;

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
	'<div %1$s>%2$s %3$s<div class="wp-block-prc-block-popup-modal__inner">%4$s</div></div>',
	$block_wrapper_attrs,
	$close_button,
	false === $is_video_modal ? $heading : '',
	$content
);
