<?php
namespace PRC\Platform\Blocks;

$controller_id = array_key_exists('controllerId', $attributes) ? $attributes['controllerId'] : '';

$is_video_modal = array_key_exists('isVideo', $attributes) ? $attributes['isVideo'] : false;

$block_wrapper_attrs = get_block_wrapper_attributes(array(
	'data-wp-interactive' => wp_json_encode(array(
		'namespace' => 'prc-block/popup-controller',
	)),
	'data-wp-context' => wp_json_encode(array(
		'id' => $controller_id,
	)),
	'data-wp-key' => wp_unique_id('popup-modal-'),
	'data-wp-init' => 'callbacks.soundOff',
	'data-wp-class--is-active' => 'callbacks.isModalActive',
	'data-controller-id' => $controller_id,
	'class' => \PRC\Platform\Block_Utils\classNames([
		'is-video' => $is_video_modal,
	])
));

$heading = wp_sprintf(
	'<div class="wp-block-prc-block-popup-modal__header"><h2>%1$s</h2></div>',
	array_key_exists('title', $attributes) ? $attributes['title'] : ''
);

$close_icon = \PRC\Platform\Icons\Render('light', 'circle-xmark');

$close_button = wp_sprintf(
	'<div class="wp-block-prc-block-popup-modal__close-button" data-wp-on--click="actions.close">%1$s</div>',
	$close_icon,
);

// You can use this method...
echo wp_sprintf(
	'<div %1$s>%2$s %3$s<div class="wp-block-prc-block-popup-modal__inner">%4$s</div></div>',
	$block_wrapper_attrs,
	$close_button,
	false === $is_video_modal ? $heading : '',
	$content
);
