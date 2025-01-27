<?php
namespace PRC\Platform\Blocks\Accordion_Controller;

/**
 * Create a fully parsed accordion controller block.
 * @param array $args {
 * }
 */
function create_accordion($args = [
	'accordions' => [
		{
			'title' => '',
			'content' => ''
		}
	],
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
