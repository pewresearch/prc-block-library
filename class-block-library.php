<?php
namespace PRC\Platform\Blocks;

use WP_Error;

/**
 * The core plugin class, responsible for loading all dependencies, defining
 * the plugin version, and registering the hooks that define the plugin.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    PRC_Platform
 * @author     Seth Rubenstein <srubenstein@pewresearch.org>
 */
class Library {

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      Loader    $loader    Maintains and registers all hooks for the plugin.
	 */
	protected $loader;

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $plugin_name    The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;

	/**
	 * The current version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;

	/**
	 * Define the core functionality of the platform as initialized by hooks.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {
		$this->version = '1.0.0';
		$this->plugin_name = 'prc-block-library';

		$this->load_dependencies();

		$this->gutenberg_config();
	}

	public function get_block_assets($block_name) {

	}

	public function get_active_theme_colors($color_key = null) {
		// Well get all the colors from theme json and then if a color key is provided we'll return that object.
	}

	/**
	 * Include a file from the plugin's includes directory.
	 * @param mixed $block_file_name
	 * @return WP_Error|void
	 */
	private function include($block_file_name) {
		if ( file_exists( plugin_dir_path( dirname(__FILE__) ) . 'blocks/' . $block_file_name ) ) {
			require_once plugin_dir_path( dirname(__FILE__) ) . 'blocks/' . $block_file_name;
		} else {
			return new WP_Error( 'prc_block_library_missing_block', __( 'Block missing.', 'prc' ) );
		}
	}

	private function include_blocks() {
		// get all folders in the blocks directory as an array
		$block_files = glob( PRC_BLOCK_LIBRARY_DIR . '/blocks/*', GLOB_ONLYDIR );
		foreach ($block_files as $block) {
			$block = basename($block);
			$this->include($block . '.php');
		}
	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function load_dependencies() {
		// Load plugin loading class.
		require_once plugin_dir_path( dirname(__FILE__) ) . 'class-loader.php';

		$this->include_blocks();

		// Initialize the loader.
		$this->loader = new Loader();
	}

	private function gutenberg_config() {
		// Remove the "Block Directory" from the block inserter.
		remove_action( 'enqueue_block_editor_assets', 'wp_enqueue_editor_block_directory_assets' );

		// Disable loading remote block patterns, we only want local or database block patterns.
		$this->loader->add_filter(
			'should_load_remote_block_patterns',
			$this,
			'disable_remote_block_patterns',
			10,
			1
		);
		// Only load assets when a block is used. This allows us to unregister core block styles and use our own.
		$this->loader->add_filter(
			'should_load_separate_core_block_assets',
			$this,
			'load_core_block_assets_separately',
			10,
			1
		);

		$this->loader->add_filter('block_categories_all', $this, 'register_block_categories', 10, 2);
		$this->loader->add_filter('safe_style_css', $this, 'allowed_inline_styles', 10, 1);
		$this->loader->add_filter('wp_kses_allowed_html', $this, 'allowed_html_tags', 10, 2);
	}

	private function define_story_item_hooks() {
		// register the block.
	}

	private function disable_remote_block_patterns($should_load_remote) {
		return false;
	}

	private function load_core_block_assets_separately($load_separate_assets) {
		return true;
	}

	/**
	 * @hook block_categories_all
	 */
	/**
	 * Establishes new block categories for the block library.
	 * @param mixed $block_categories
	 * @param mixed $block_editor_context
	 * @return mixed
	 */
	private function register_block_categories( $block_categories, $block_editor_context ) {
		return array_merge(
			$block_categories,
			array(
				array(
					'slug'  => 'content-curation',
					'title' => __( 'Content Curation', 'prc-block-library-categories' ),
				),
				array(
					'slug'  => 'marketing',
					'title' => __( 'Marketing', 'prc-block-library-categories' ),
				),
				array(
					'slug' => 'editorial-product',
					'title' => __( 'Editorial Product', 'prc-block-library-categories' ),
					'icon' => 'lightbulb'
				)
			)
		);
	}

	/**
	 * Filter the allowed style attributes for sanitization.
	 * @hook safe_style_css
	 *
	 * @param mixed $styles
	 * @return mixed
	 */
	public function allowed_inline_styles( $styles ) {
		$styles[] = 'container';
		$styles[] = '@container';
		return $styles;
	}

	/**
	 * Filter the allowed html tags and attributes for sanitization.
	 * @hook wp_kses_allowed_html
	 *
	 * @param array $allowed_tags Allowed tags.
	 * @return array Allowed tags.
	 */
	public static function allowed_html_tags( $allowed_tags, $context ) {
		$allowed_tags['iframe'] = array(
			'class' => true,
			'loading' => true,
			'src' => true,
			'width' => true,
			'height' => true,
			'frameborder' => true,
			'allowfullscreen' => true,
			'title' => true,
			'style' => true,
		);
		$allowed_tags['input'] = array(
			'class' => true,
			'id' => true,
			'name' => true,
			'type' => true,
			'value' => true,
			'placeholder' => true,
			'required' => true,
			'disabled' => true,
			'style' => true,
		);
		$allowed_tags['div']['style']  = true;
		$allowed_tags['img']['srcset'] = true;
		$allowed_tags['img']['sizes']  = true;
		$allowed_tags['picture']       = true;
		$allowed_tags['source']        = array(
			'srcset' => true,
			'media'  => true,
			'type'   => true,
			'height' => true,
			'width'  => true,
		);

		// Add SVG Support
		// @TODO: Is this still necessary with 10up's SVG plugin? - @sethrubenstein
		$allowed_tags['svg']  = array(
			'xmlns'       => array(),
			'fill'        => array(),
			'viewbox'     => array(),
			'role'        => array(),
			'aria-hidden' => array(),
			'focusable'   => array(),
		);
		$allowed_tags['path'] = array(
			'd'    => array(),
			'fill' => array(),
		);
		$allowed_tags['rect'] = array(
			'x'      => array(),
			'y'      => array(),
			'width'  => array(),
			'height' => array(),
			'fill'   => array(),
		);
		// End SVG Support

		$allowed_tags['a'] = array_merge(
			array(
				'aria-controls' => true,
				'aria-selected' => true,
				'aria-role' => true,
			),
			$allowed_tags['a']
		);
		return $allowed_tags;
	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    1.0.0
	 */
	public function run() {
		$this->loader->run();
	}

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     1.0.0
	 * @return    string    The name of the plugin.
	 */
	public function get_plugin_name() {
		return $this->plugin_name;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     1.0.0
	 * @return    PRC_Platform_Loader    Orchestrates the hooks of the plugin.
	 */
	public function get_loader() {
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     1.0.0
	 * @return    string    The version number of the plugin.
	 */
	public function get_version() {
		return $this->version;
	}

}
