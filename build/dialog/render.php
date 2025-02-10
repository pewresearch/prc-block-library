<?php

// This is the only non core function we use. It's a wrapper for deep usage of the Jetpack device detection class.
$current_device = \PRC\Platform\get_current_device();

$block_namespace = 'prc-block/dialog';

$block_id = array_key_exists( 'dialogId', $attributes ) ? $attributes['dialogId'] : null;

$auto_activation_timer = array_key_exists( 'autoActivationTimer', $attributes ) ? $attributes['autoActivationTimer'] : -1;

$dialog_type = array_key_exists( 'dialogType', $attributes ) ? $attributes['dialogType'] : 'modal';

$widths = array_key_exists( 'widths', $attributes ) ? $attributes['widths'] : array(
	'desktop' => 640,
	'tablet'  => 480,
);

$animation_duration = array_key_exists( 'animationDuration', $attributes ) ? $attributes['animationDuration'] : 500;

$enable_deep_link = array_key_exists( 'enableDeepLink', $attributes ) ? $attributes['enableDeepLink'] : false;

if ( ! $block_id ) {
	return;
}

// Why not use context here? Because I want to be able to easily close and open this dialog from other namespaces. By using state this is as easy as `store('prc-block/dialog').state[blockId].isOpen = true;` which would open the dialog given the blockId.
wp_interactivity_state(
	$block_namespace,
	array(
		'currentDevice' => $current_device,
		$block_id       => array(
			'id'                      => $block_id,
			'type'                    => $dialog_type,
			'activationTimerDuration' => (int) $auto_activation_timer,
			'animationDuration'       => (int) $animation_duration,
			'isOpen'                  => get_query_var( 'dialogId' ) === $block_id,
			'enableDeepLink'          => $enable_deep_link,
			'isClosing'               => false,
			'videoPressAPI'           => false,
			'dialogElemId'            => null,
			'widths'                  => $widths,
		),
	)
);

$block_wrapper_attrs = array(
	'data-wp-interactive'              => $block_namespace,
	'data-wp-context'                  => wp_json_encode(
		array(
			'id' => $block_id,
		)
	),
	'id'                               => $block_id,
	'data-wp-key'                      => $block_id,
	'data-wp-init--dialog-elm'         => 'callbacks.onInitIdentifyDialogElem',
	'data-wp-init--on-auto-activation' => 'callbacks.onAutoActivation',
	'data-wp-on-document--keydown'     => 'callbacks.onESCKey',
	'data-wp-watch--on-dialog-open'    => 'callbacks.onOpen',
	'data-wp-watch--on-dialog-close'   => 'callbacks.onClose',
	'data-wp-on-window--resize'        => 'callbacks.onResize',
	'data-wp-bind--style'              => 'callbacks.getStyle',
);

// Non Core Addition for VideoPress Support:
$block_wrapper_attrs['data-wp-init--videopress'] = 'callbacks.onVideoPressInit';
$block_wrapper_attrs                             = get_block_wrapper_attributes( $block_wrapper_attrs );

echo wp_sprintf(
	'<div %1$s>%2$s</div>',
	$block_wrapper_attrs,
	$content,
);
