<?php
namespace PRC\Platform\Blocks\Popup_Controller;

/**
 * Create a fully parsed modal block.
 * @param array $args {
 *  @type string $title The title of the modal.
 *  @type string $content The content of the modal.
 *  @type string $trigger The trigger for the modal.
 * }
 */
function create_modal($args = [
	'title' => '',
	'content' => '',
	'trigger' => '',
	'backgroundColor' => 'ui-white',
]) {
	ob_start();
?>
<!-- wp:prc-block/popup-controller {"className":"is-style-standard"} -->
<!-- wp:prc-block/popup-content {"disengageClickHandler": true} -->
<?php echo $args['trigger'];?>
<!-- /wp:prc-block/popup-content -->

<!-- wp:prc-block/popup-modal {"title":"<?php echo esc_html($args['title']);?>","backgroundColor":"<?php echo esc_attr($args['backgroundColor']);?>"} -->
<p><?php echo $args['content'];?></p>
<!-- /wp:prc-block/popup-modal -->
<!-- /wp:prc-block/popup-controller -->
<?php
	$modal = ob_get_clean();
	$blocks = parse_blocks($modal);
	return !empty($blocks) ? $blocks[0] : null;
}
