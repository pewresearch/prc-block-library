<?php
namespace PRC\Platform\Blocks;
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$attributes         = wp_parse_args(
	$attributes,
	array(
		'icon'    => '',
		'hasForm' => false,
	)
);
$class_name         = array_key_exists( 'className', $attributes ) ? $attributes['className'] : 'is-style-standard';
$has_form           = array_key_exists( 'hasForm', $attributes ) ? $attributes['hasForm'] : false;
$has_icon           = ! empty( $attributes['icon'] ) && 'is-style-asymmetrical' !== $class_name;
$icon_url           = plugin_dir_url( __DIR__ ) . 'assets/' . $attributes['icon'] . '.svg';
$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'id'    => md5( wp_json_encode( $attributes ) ),
		'class' => \PRC\Platform\Block_Utils\classNames(
			$class_name,
			array(
				'has-icon'            => $has_icon,
				'has-large-icon'      => 'alexa' === $attributes['icon'],
				'has-form'            => $has_form,
			)
		),
		// 'data-wp-interactive' => true,
	)
);

?>
<div <?php echo $wrapper_attributes; ?>>
	<div class='wp-block-prc-block-promo__inner-container'>
		<?php
		if ( $has_icon ) {
			echo '<div class="wp-block-prc-block-promo__icon"><img src="' . esc_url( $icon_url ) . '"/></div>';
		}
		?>
		<?php echo $content;?>
	</div>
</div>
