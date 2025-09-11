<?php
/**
 * Dialog Block Utilities
 *
 * @package PRC\Platform\Blocks\Dialog
 */

namespace PRC\Platform\Blocks\Dialog;

/**
 * Create a fully parsed modal block.
 *
 * @param array $args The args.
 * @return array|null Parsed block, or null on failure.
 */
function create_dialog( $args = array() ) {
	$args      = wp_parse_args(
		$args,
		array(
			'id'               => null,
			'content'          => '',
			'trigger'          => '',
			'dialogAttributes' => array(
				'backgroundColor' => 'ui-white',
				'backdropColor'   => 'ui-black',
				'style'           => array(
					'padding' => array(
						'top'    => 'var:preset|spacing|30',
						'right'  => 'var:preset|spacing|30',
						'bottom' => 'var:preset|spacing|30',
						'left'   => 'var:preset|spacing|30',
					),
					'shadow'  => 'var:preset|shadow|shallow',
					'border'  => array(
						'radius' => '12px',
						'width'  => '1px',
					),
				),
			),
		)
	);
	$dialog_id = $args['id'] ?? md5( wp_json_encode( $args ) );
	ob_start();
	?>
<!-- wp:prc-block/dialog {"className":"is-style-standard", "dialogId": "<?php echo $dialog_id; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>"} -->
<!-- wp:prc-block/dialog-trigger {} -->
	<?php echo $args['trigger']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
<!-- /wp:prc-block/dialog-trigger -->

<!-- wp:prc-block/dialog-element <?php echo wp_json_encode( $args['dialogAttributes'] ); ?> -->
	<?php echo $args['content']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
<!-- /wp:prc-block/dialog-element -->
<!-- /wp:prc-block/dialog -->
	<?php
	$dialog = ob_get_clean();
	$blocks = parse_blocks( $dialog );
	return ! empty( $blocks ) ? $blocks[0] : null;
}


/**
 * Render a dialog block.
 *
 * @param array $args The args.
 * @return string
 */
function render_dialog( $args = array() ) {
	$dialog = create_dialog( $args );
	if ( ! empty( $dialog ) ) {
		return render_block( $dialog );
	}
	return '';
}
