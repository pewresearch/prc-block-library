<?php
namespace PRC\Platform\Blocks;
use WP_HTML_Tag_Processor;
use MatthiasMullie\Minify;
use MatthiasMullie\Minify\Exceptions\IOException;

/**
 * Block Name:        Logo
 * Version:           0.1.0
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Logo {
	public static $block_json = null;
	public static $version;
	public static $block_name;
	public static $style_handle = null;
	public static $dir = __DIR__;

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/logo/build/block.json';
		self::$block_json = \wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		self::$version = self::$block_json['version'];
		self::$block_name = self::$block_json['name'];
		self::$style_handle = 'prc-block-logo-style';
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
			$loader->add_action( 'enqueue_block_assets', $this, 'enqueue_custom_fill_styles' );
		}
	}

	public function get_logo($logo_file) {
		$path = plugin_dir_path( __FILE__ ) . '/assets/' . $logo_file;
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
		$minifier = new Minify\CSS($styles);
		return $minifier->minify();
	}

	/**
	 * Enqueues the CSS for the text color SVG fill styles for the Logo block.
	 * @hook enqueue_block_assets
	 * @throws IOException
	 */
	public function enqueue_custom_fill_styles() {
		$styles = $this->generate_text_color_svg_fill_styles();
		if ( is_wp_error($styles) ) {
			return;
		}
		wp_add_inline_style( self::$style_handle, $styles );
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$classname = array_key_exists('className', $attributes) ? $attributes['className'] : '';
		$width = array_key_exists('width', $attributes) ? $attributes['width'] . 'px' : '100%';
		$justification = array_key_exists('justification', $attributes) ? $attributes['justification'] : 'left';
		$dark_mode_enabled = array_key_exists('darkModeEnabled', $attributes) ? $attributes['darkModeEnabled'] : false;

		$block_wrapper_attrs = get_block_wrapper_attributes(array(
			'class' => \PRC\Platform\Block_Utils\classNames($classname, array(
				'item-justified-left' => 'left' === $justification,
				'item-justified-center' => 'center' === $justification,
				'item-justified-right' => 'right' === $justification,
				'has-dark-mode-support' => $dark_mode_enabled,
			))
		));

		$logo = new WP_HTML_Tag_Processor( $this->get_logo( 'primary.svg') );
		if ( $logo->next_tag() ) {
			$logo->set_attribute('data-browser-theme', 'light');
		}

		$logo_white = new WP_HTML_Tag_Processor( $this->get_logo( 'primary-white.svg' ) );
		if ( $logo_white->next_tag() ) {
			$logo_white->set_attribute('data-browser-theme', 'dark');
		}

		$logo_alt = new WP_HTML_Tag_Processor( $this->get_logo( 'alternate.svg' ) );
		if ( $logo_alt->next_tag() ) {
			$logo_alt->set_attribute('data-browser-theme', 'light');
		}

		$logo_alt_white = new WP_HTML_Tag_Processor( $this->get_logo( 'alternate-white.svg' ) );
		if ( $logo_alt_white->next_tag() ) {
			$logo_alt_white->set_attribute('data-browser-theme', 'dark');
		}

		$decoded = new WP_HTML_Tag_Processor( $this->get_logo( 'decoded.svg' ) );
		$decoded_white = new WP_HTML_Tag_Processor( $this->get_logo( 'decoded-white.svg' ) );
		if ( $decoded_white->next_tag() ) {
			$decoded_white->set_attribute('data-browser-theme', 'dark');
		}
		$site_url = get_site_url();

		ob_start();
		?>
		<div class="wp-block-prc-block-logo__dimensions" style="max-width: <?php echo $width;?>;">
			<div class="wp-block-prc-block-logo__inner">
				<a class="wp-block-prc-block-logo__inner__logo" href="<?php echo esc_url($site_url);?>" alt="Return to Home" name="Pew Research Center Logo">
					<?php
					echo $logo;
					echo $logo_white;
					?>
				</a>
				<a class="wp-block-prc-block-logo__inner__logo-alt" href="<?php echo esc_url($site_url);?>" alt="Return to Home" name="Pew Research Center Logo">
					<?php
					echo $logo_alt;
					echo $logo_alt_white;
					?>
				</a>
				<a class="wp-block-prc-block-logo__inner__decoded" href="<?php echo esc_url($site_url);?>/decoded" alt="Return to Home" name="Pew Research Center Logo">
					<?php
					echo $decoded;
					echo $decoded_white;
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
	* @hook init
	*
	* @see https://developer.wordpress.org/reference/functions/register_block_type/
	*/
	public function block_init() {
		$block = register_block_type( self::$dir . '/build', array(
			'render_callback' => array($this, 'render_block_callback'),
		) );
	}

}
