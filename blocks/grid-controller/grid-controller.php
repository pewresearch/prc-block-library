<?php
namespace PRC\Platform\Blocks;
use MatthiasMullie\Minify;

/**
 * Block Name:        Grid Controller
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Grid_Controller {
	public static $block_json = null;
	public static $version;
	public static $block_name;
	public static $view_script_handle = null;
	public static $editor_script_handle = null;
	public static $style_handle = null;
	public static $dir = __DIR__;

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/grid-controller/build/block.json';
		self::$block_json = \wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		self::$version = self::$block_json['version'];
		self::$block_name = self::$block_json['name'];
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action('init', $this, 'block_init');
			$loader->add_action('enqueue_block_assets', $this, 'enqueue_custom_divider_styles');
		}
	}

	public function generate_grid_divider_styles() {
		$colors = wp_get_global_settings(array('color', 'palette', 'theme'));
		ob_start();
		foreach( $colors as $color ) {
			$slug = $color['slug'];
			?>
			.wp-block-prc-block-grid-controller.has-divider.has-<?php echo $slug; ?>-divider-color  {
				--divider-color: var(--wp--preset--color--<?php echo $slug; ?>);
			}
			<?php
		}
		$styles = ob_get_clean();
		$minifier = new Minify\CSS($styles);
		return $minifier->minify();
	}

	/**
	 * @hook enqueue_block_assets, enqueue_block_editor_assets
	 * @return void
	 */
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
	* @hook init
	*
	* @see https://developer.wordpress.org/reference/functions/register_block_type/
	*/
	public function block_init() {
		register_block_type( self::$dir . '/build' );
	}

}
