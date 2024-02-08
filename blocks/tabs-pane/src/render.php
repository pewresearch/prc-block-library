<?php
namespace PRC\Platform\Blocks;

$uuid = array_key_exists( 'uuid', $attributes ) ? $attributes['uuid'] : false;
if ( ! $uuid ) {
	return;
}
$is_dialog = array_key_exists( 'isDialog', $attributes ) ? $attributes['isDialog'] : false;

$block_wrapper_attrs = get_block_wrapper_attributes(
	array(
		'class' => \PRC\Platform\Block_Utils\classNames( array(
			'wp-block-prc-block-tabs-pane__dialog' => $is_dialog,
		) ),
		'aria-role'   => 'tabpanel',
		'data-wp-interactive' => wp_json_encode(array('namespace' => 'prc-block/tabs-controller')),
		'data-wp-key' => 'panel-' . $uuid,
		'data-wp-class--is-active' => 'callbacks.isActive',
		'data-wp-context' => wp_json_encode(array('uuid' => $uuid)),
		'data-wp-watch' => 'callbacks.onTabWatch'
	)
);

ob_start();
?>
<div
	class="wp-block-prc-block-tabs-pane__dialog-overlay"
	id="pane-overlay-%1$s"
	data-wp-interactive="<?php echo wp_json_encode(array('namespace' => 'prc-block/tabs-controller')); ?>"
	data-wp-on--click="actions.hideDialog"
></div>
<div class="wp-block-prc-block-tabs-pane__dialog-modal" id="pane-modal-%1$s">
	<div class="wp-block-prc-block-tabs-pane__dialog__inner">
		<div class="wp-block-prc-block-tabs-pane__dialog__header">
			<h2 class="wp-block-prc-block-tabs-pane__dialog__title">
				%2$s
			</h2>
			<button
				type="button"
				aria-label="Close"
				class="wp-block-prc-block-tabs-pane__dialog__close"
				data-wp-interactive="1"
				data-wp-on--click="actions.hideDialog"
			>
				X
			</button>
		</div>
		<div class="wp-block-prc-block-tabs-pane__dialog__body">
			%3$s
		</div>
	</div>
</div>
<?php
$dialog_template = ob_get_clean();
$dialog_template = wp_sprintf(
	$dialog_template,
	'xyz',
	'Test Modal',
	$content,
);

echo wp_sprintf(
	'<section %1$s>%2$s</section>',
	$block_wrapper_attrs,
	! $is_dialog ? $content : $dialog_template,
);
