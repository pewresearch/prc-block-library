<?php
namespace PRC\Platform\Blocks;
use WP_Html_Tag_Processor;

/**
 * Block Name:        Logo
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Logo {
	public static $version = '1.0.0';
	public static $dir = __DIR__;

	public function __construct( $init = false ) {
		if ( defined('PRC_PLATFORM') && true !== PRC_PLATFORM ) {
			return;
		}
		if ( true === $init ) {
			add_action('init', array($this, 'block_init'));
			add_action('wp_enqueue_scripts', array($this, 'enqueue_custom_fill_styles'));
			add_action('enqueue_block_editor_assets', array($this, 'enqueue_custom_fill_styles'));
		}
	}

	public function get_file($path) {
		$path = realpath( $path );

		if ( ! $path || ! @is_file( $path ) ) {
			return '';
		}

		return @file_get_contents( $path );
	}

	/**
	 * Generates the CSS for the text color SVG fill styles using the color palette defined in theme.json
	 */
	public function generate_text_color_svg_fill_styles() {
		$colors = wp_get_global_settings(array('color', 'palette', 'theme'));

		ob_start();
		foreach( $colors as $color ) {
			$slug = $color['slug'];
			$color = $color['color'];
			?>
			.wp-block-prc-block-logo.has-<?php echo $slug; ?>-color .wp-block-prc-block-logo__inner [data-browser-theme="light"] path {
				fill: <?php echo $color; ?> !important;
			}
			<?php
		}
		$styles = ob_get_clean();
		return $styles;
	}

	public function enqueue_custom_fill_styles() {
		$styles = $this->generate_text_color_svg_fill_styles();
		if ( is_wp_error($styles) ) {
			return;
		}
		wp_add_inline_style( 'prc-block-logo-style', $styles );
	}

	public function render_block_callback( $attributes, $content, $block ) {
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

		$logo = $this->get_file( plugin_dir_path( __FILE__ ) . '/assets/primary.svg');
		// using wp_html_tag_processor add data-browser-theme="light" to the svg tag
		$logo = new WP_Html_Tag_Processor( $logo );
		if ( $logo->next_tag() ) {
			$logo->set_attribute('data-browser-theme', 'light');
		}

		$logo_white = $this->get_file( plugin_dir_path( __FILE__ ) . '/assets/primary-white.svg' );
		$logo_white = new WP_Html_Tag_Processor( $logo_white );
		if ( $logo_white->next_tag() ) {
			$logo_white->set_attribute('data-browser-theme', 'dark');
		}

		$logo_alt = $this->get_file( plugin_dir_path( __FILE__ ) . '/assets/alternate.svg' );
		$logo_alt = new WP_Html_Tag_Processor( $logo_alt );
		if ( $logo_alt->next_tag() ) {
			$logo_alt->set_attribute('data-browser-theme', 'light');
		}

		$logo_alt_white = $this->get_file( plugin_dir_path( __FILE__ ) . '/assets/alternate-white.svg' );
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
		return wp_sprintf(
			'<div %1$s>%2$s</div>',
			$block_wrapper_attrs,
			$content,
		);

	}

	/**
	* Registers the block using the metadata loaded from the `block.json` file.
	* Behind the scenes, it registers also all assets so they can be enqueued
	* through the block editor in the corresponding context.
	*
	* @see https://developer.wordpress.org/reference/functions/register_block_type/
	*/
	public function block_init() {
		$block = register_block_type( self::$dir . '/build', array(
			'render_callback' => array($this, 'render_block_callback'),
		) );
	}

}

new Logo(true);
