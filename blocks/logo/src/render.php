<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$is_decoded = 'decoded' === get_template();
$classname = array_key_exists('className', $attributes) ? $attributes['className'] : '';
$width = array_key_exists('width', $attributes) ? $attributes['width'] . 'px' : '100%';
$justification = array_key_exists('justification', $attributes) ? $attributes['justification'] : 'left';

$block_wrapper_attrs = get_block_wrapper_attributes(array(
	'class' => classNames($classname, array(
		'item-justified-left' => 'left' === $justification,
		'item-justified-center' => 'center' === $justification,
		'item-justified-right' => 'right' === $justification,
	))
));

// get the logo.svg file contents as a string
$logo = file_get_contents( str_replace( '/build', '/assets', plugin_dir_url( __FILE__ ) ) . 'primary.svg' );
// using wp_html_tag_processor add data-browser-theme="light" to the svg tag
$logo = new WP_Html_Tag_Processor( $logo );
$logo->next_tag();
$logo->set_attribute('data-browser-theme', 'light');

$logo_white = file_get_contents( str_replace( '/build', '/assets', plugin_dir_url( __FILE__ ) ) . 'primary-white.svg' );
$logo_white = new WP_Html_Tag_Processor( $logo_white );
$logo_white->next_tag();
$logo_white->set_attribute('data-browser-theme', 'dark');

$logo_alt = file_get_contents( str_replace( '/build', '/assets', plugin_dir_url( __FILE__ ) ) . 'alternate.svg' );
$logo_alt = new WP_Html_Tag_Processor( $logo_alt );
$logo_alt->next_tag();
$logo_alt->set_attribute('data-browser-theme', 'light');

$logo_alt_white = file_get_contents( str_replace( '/build', '/assets', plugin_dir_url( __FILE__ ) ) . 'alternate-white.svg' );
$logo_alt_white = new WP_Html_Tag_Processor( $logo_alt_white );
$logo_alt_white->next_tag();
$logo_alt_white->set_attribute('data-browser-theme', 'dark');

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

