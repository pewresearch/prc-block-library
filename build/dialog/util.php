<?php
namespace PRC\Platform\Blocks\Dialog;

/**
 * Create a fully parsed modal block.
 *
 * @param array $args {
 *  @type string $title The title of the modal.
 *  @type string $content The content of the modal.
 *  @type string $trigger The trigger for the modal.
 * }
 */
function create_dialog( $args = array() ) {
	$args      = wp_parse_args(
		$args,
		array(
			'id'                    => null,
			'content'               => '',
			'trigger'               => '',
			'dialogAttributes'      => array(
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
			'disengageClickHandler' => false,
		)
	);
	$dialog_id = $args['id'] ?? md5( wp_json_encode( $args ) );
	ob_start();
	?>
<!-- wp:prc-block/dialog {"className":"is-style-standard", "dialogId": "<?php echo $dialog_id; ?>"} -->
<!-- wp:prc-block/dialog-trigger {"disengageClickHandler": "<?php echo $args['disengageClickHandler']; ?>"} -->
	<?php echo $args['trigger']; ?>
<!-- /wp:prc-block/dialog-trigger -->

<!-- wp:prc-block/dialog-element <?php echo wp_json_encode( $args['dialogAttributes'] ); ?> -->
	<?php echo $args['content']; ?>
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
 * @param array $args {
 * @type string $title The title of the modal.
 * @type string $content The content of the modal.
 * @type string $trigger The trigger for the modal.
 * }
 * @return string
 */
function render_dialog( $args = array() ) {
	$dialog = create_dialog( $args );
	if ( ! empty( $dialog ) ) {
		return render_block( $dialog );
	}
	return '';
}
