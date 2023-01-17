<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$block_wrapper_attrs = get_block_wrapper_attributes();

// You can use this method...
echo wp_sprintf(
	'<div %1$s>%2$s</div>',
	$block_wrapper_attrs,
	$content,
);

// Or you can use this method...
?>

<div <?php echo $block_wrapper_attrs; ?>>
	<?php esc_html_e( 'Example Dynamic – hello from a dynamic block!', 'story-item' ); ?>
	<?php print_r( $attributes ); ?>
	<?php echo $content; ?>
</div>
