<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$block_wrapper_attrs = get_block_wrapper_attributes();

// get the logo.svg file contents as a string
$logo = file_get_contents( str_replace( '/build', '/assets', plugin_dir_url( __FILE__ ) ) . 'logo.svg' );
$logo_alt = file_get_contents( str_replace( '/build', '/assets', plugin_dir_url( __FILE__ ) ) . 'logo-alt.svg' );
$site_url = get_site_url();

ob_start();
?>
<div class="wp-block-prc-block-logo__inner">
	<a class="wp-block-prc-block-logo__inner__logo" href="<?php echo esc_url($site_url);?>" alt="Return to Home">
		<?php echo $logo;?>
	</a>
	<div class="wp-block-prc-block-logo__mobile__menu-trigger">
		Menu
	</div>
	<a class="wp-block-prc-block-logo__inner__logo-alt" href="<?php echo esc_url($site_url);?>" alt="Return to Home">
		<?php echo $logo_alt;?>
	</a>
	<div class="wp-block-prc-block-logo__mobile__search-trigger">
		Search
	</div>
</div>
<?php
$content = ob_get_clean();

// You can use this method...
echo wp_sprintf(
    '<div %1$s>%2$s</div>',
    $block_wrapper_attrs,
    $content,
);

