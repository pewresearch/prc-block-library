<?php
/**
 * Block Name:        Logo
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Logo extends PRC_Block_Library {
	public static $version = '0.1.0';
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

	/**
	 * Generates the CSS for the text color SVG fill styles using the color palette defined in theme.json
	 */
	public function generate_text_color_svg_fill_styles() {
		if ( !function_exists('wp_get_global_settings') ) {
			return new WP_Error('missing_function', 'wp_get_global_settings() is missing');
		}

		$colors = wp_get_global_settings();
		$colors = $colors['color']['palette']['theme'];

		ob_start();
		foreach( $colors as $color ) {
			$slug = $color['slug'];
			$color = $color['color'];
			?>
			.wp-block-prc-block-logo.has-<?php echo $slug; ?>-color .wp-block-prc-block-logo__inner .dark,
			.wp-block-prc-block-logo.has-<?php echo $slug; ?>-color .wp-block-prc-block-logo__inner .logo_svg__dark,
			.wp-block-prc-block-logo.has-<?php echo $slug; ?>-color .wp-block-prc-block-logo__inner .logo-alt_svg__dark {
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

	/**
	* Registers the block using the metadata loaded from the `block.json` file.
	* Behind the scenes, it registers also all assets so they can be enqueued
	* through the block editor in the corresponding context.
	*
	* @see https://developer.wordpress.org/reference/functions/register_block_type/
	*/
	public function block_init() {
		$block = register_block_type( self::$dir . '/build' );
	}

}

new Logo(true);
