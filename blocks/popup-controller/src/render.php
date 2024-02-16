<?php
$block_namespace = 'prc-block/popup-controller';

$block_id = md5($content);

// Why not use context here? Because I want to be able to easily close and open this modal from other namespaces. By using state this is as easy as store('prc-block/popup-controller').state[blockId].isActive = true; would open the modal by the id. This is a very powerful feature when used in conjunction with other store's and the store's ability to listen to changes in state.
wp_interactivity_state($block_namespace, array(
	$block_id => array(
		'isActive' => false,
	),
));

$block_wrapper_attrs = get_block_wrapper_attributes(array(
	'data-wp-interactive' => wp_json_encode(array(
		'namespace' => $block_namespace,
	)),
	'data-wp-context' => wp_json_encode(array(
		'id' => $block_id,
	)),
	'id' => $block_id,
	'data-wp-key' => wp_unique_id('popup-controller-'),
	'data-wp-class--is-active' => 'state.'.$block_id.'.isActive',
	'data-wp-on-document--keydown' => 'callbacks.onESCKey',
	'data-wp-on-window--click' => 'callbacks.onWindowClickCloseModal',
));

echo wp_sprintf(
	'<div %1$s>%2$s</div>',
	$block_wrapper_attrs,
	$content,
);
