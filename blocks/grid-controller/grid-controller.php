<?php
/**
 * Block Name:        Grid Controller
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class GridController extends PRC_Block_Library {
	public static $version = '0.1.0';
	public static $dir = __DIR__;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action('init', array($this, 'block_init'));
			add_action('wp_enqueue_scripts', array($this, 'enqueue_custom_divider_styles'));
			add_action('enqueue_block_editor_assets', array($this, 'enqueue_custom_divider_styles'));
		}
	}

	
	public function generate_grid_divider_styles() {
		if ( !function_exists('wp_get_global_settings') ) {
			return new WP_Error('missing_function', 'wp_get_global_settings() is missing');
		}

		$colors = wp_get_global_settings();
		$colors = $colors['color']['palette']['theme'];

		ob_start();
		foreach( $colors as $color ) {
			$slug = $color['slug'];
			?>
			.wp-block-prc-block-grid-controller.has-divider.has-<?php echo $slug; ?>-divider-color .wp-block-prc-block-grid-column:after  {
				border-color: var(--wp--preset--color--<?php echo $slug; ?>) !important;
			}
			<?php
		}
		$styles = ob_get_clean();
		return $styles;
	}

	public function enqueue_custom_divider_styles() {
		$styles = $this->generate_grid_divider_styles();
		if ( is_wp_error($styles) ) {
			return;
		}
		wp_add_inline_style( 'prc-block-grid-controller-style', $styles );
	}

	/**
	* Registers the block using the metadata loaded from the `block.json` file.
	* Behind the scenes, it registers also all assets so they can be enqueued
	* through the block editor in the corresponding context.
	*
	* @see https://developer.wordpress.org/reference/functions/register_block_type/
	*/
	public function block_init() {
		register_block_type( self::$dir . '/build' );
	}

}

new GridController(true);
