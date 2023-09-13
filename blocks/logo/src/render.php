<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

if ( is_admin() ) {
	return;
}

$is_decoded = 'decoded' === get_template();
$classname = array_key_exists('className', $attributes) ? $attributes['className'] : '';
$width = array_key_exists('width', $attributes) ? $attributes['width'] . 'px' : '100%';
$justification = array_key_exists('justification', $attributes) ? $attributes['justification'] : 'left';
$dark_mode_enabled = array_key_exists('darkModeEnabled', $attributes) ? $attributes['darkModeEnabled'] : false;

$block_wrapper_attrs = get_block_wrapper_attributes(array(
	'class' => classNames($classname, array(
		'item-justified-left' => 'left' === $justification,
		'item-justified-center' => 'center' === $justification,
		'item-justified-right' => 'right' === $justification,
		'has-dark-mode-support' => $dark_mode_enabled,
	))
));

// get the logo.svg file contents as a string
$src_url = str_replace( '/build', '/assets', plugin_dir_url( __FILE__ ) );
// if https is enabled, use the https version of the logo
if ( is_ssl() ) {
	$src_url = str_replace( 'http://', 'https://', $src_url );
}

$logo = wpcom_vip_file_get_contents( $src_url . 'primary.svg' );
// using wp_html_tag_processor add data-browser-theme="light" to the svg tag
$logo = new WP_Html_Tag_Processor( $logo );
if ( $logo->next_tag() ) {
	$logo->set_attribute('data-browser-theme', 'light');
}

$logo_white = wpcom_vip_file_get_contents( $src_url . 'primary-white.svg' );
$logo_white = new WP_Html_Tag_Processor( $logo_white );
if ( $logo_white->next_tag() ) {
	$logo_white->set_attribute('data-browser-theme', 'dark');
}

$logo_alt = wpcom_vip_file_get_contents( $src_url . 'alternate.svg' );
$logo_alt = new WP_Html_Tag_Processor( $logo_alt );
if ( $logo_alt->next_tag() ) {
	$logo_alt->set_attribute('data-browser-theme', 'light');
}

$logo_alt_white = wpcom_vip_file_get_contents( $src_url . 'alternate-white.svg' );
$logo_alt_white = new WP_Html_Tag_Processor( $logo_alt_white );
if ( $logo_alt_white->next_tag() ) {
	$logo_alt_white->set_attribute('data-browser-theme', 'dark');
}

$site_url = get_site_url();

ob_start();
?>
<div class="wp-block-prc-block-logo__dimensions" style="max-width: <?php echo $width;?>;">
	<div class="wp-block-prc-block-logo__inner">
		<a class="wp-block-prc-block-logo__inner__logo" href="<?php echo esc_url($site_url);?>" alt="Return to Home">
			<?php
			echo $logo;
			echo $logo_white;
			?>
		</a>
		<a class="wp-block-prc-block-logo__inner__logo-alt" href="<?php echo esc_url($site_url);?>" alt="Return to Home">
			<?php
			echo $logo_alt;
			echo $logo_alt_white;
			?>
		</a>
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

