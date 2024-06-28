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
 * @package    PRC\Platform\Blocks
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

	protected $active_theme;

	/**
	 * Define the core functionality of the platform as initialized by hooks.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {
		$this->version = '1.0.0';
		$this->plugin_name = 'prc-block-library';
		$this->active_theme = wp_get_theme();

		$this->load_dependencies();
		$this->gutenberg_config();
		$this->define_library_dependencies();
		$this->define_core_blocks();
		$this->define_prc_blocks();
	}

	/**
	 * Include a file from the plugin's includes directory.
	 * @param mixed $block_file_name
	 * @return WP_Error|void
	 */
	private function include_block($block_file_name) {
		$block_file_path = 'blocks/' . $block_file_name . '/' . $block_file_name . '.php';
		if ( file_exists( plugin_dir_path( dirname(__FILE__) ) . $block_file_path ) ) {
			require_once plugin_dir_path( dirname(__FILE__) ) . $block_file_path;
		} else {
			return new WP_Error( 'prc_block_library_missing_block', __( 'Block missing:: ' . $block_file_name, 'prc' ) );
		}
	}

	/**
	 * Include all blocks from the plugin's /blocks directory.
	 * @return void
	 */
	private function load_blocks() {
		$block_files = glob( PRC_BLOCK_LIBRARY_DIR . '/blocks/*', GLOB_ONLYDIR );
		foreach ($block_files as $block) {
			$block = basename($block);
			$loaded = $this->include_block($block);
			if ( is_wp_error( $loaded ) ) {
				error_log( $loaded->get_error_message() );
			}
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
		require_once plugin_dir_path( dirname(__FILE__) ) . '/includes/class-loader.php';
		// Load support classes.
		require_once plugin_dir_path( dirname(__FILE__) ) . '/includes/common-styles/class-common-styles.php';
		require_once plugin_dir_path( dirname(__FILE__) ) . '/includes/custom-text-formats/class-custom-text-formats.php';
		require_once plugin_dir_path( dirname(__FILE__) ) . '/includes/interactivity-api/class-interactivity-api.php';
		require_once plugin_dir_path( dirname(__FILE__) ) . '/includes/print-engine/class-print-engine.php';
		// Load blocks.
		$this->load_blocks();
		// Initialize the loader.
		$this->loader = new Loader();
	}

	/**
	 * Miscellaneous Gutenberg configuration for PRC Block Library.
	 * 1. Load core block assets separately
	 * 2. Register additional block categories
	 * 3. Register additional allowed HTML tags
	 */
	private function gutenberg_config() {
		/**
		 * Load core block assets separately
		 * Very advantageous for performance and allows for easier un-registering of core block styles. e.g. core/image
		 *
		 * @hook should_load_separate_core_block_assets
		 * @param mixed $load_separate_assets
		 * @return true
		 */
		add_filter(
			'should_load_separate_core_block_assets',
			'__return_true',
			10,
			1
		);
		// Add additional categories
		$this->loader->add_filter('block_categories_all', $this, 'register_block_categories', 10, 2);
		// Add additional allowed HTML tags
		$this->loader->add_filter('wp_kses_allowed_html', $this, 'allowed_html_tags', 10, 2);
	}

	/**
	 * Init additional library support classes
	 * 1. Apple News
	 * 2. Common Styles
	 * 3. Print Engine
	 * 4. @wordpress/interactivity api supports
	 */
	private function define_library_dependencies() {
		new Common_Styles( $this->get_loader() );
		new Custom_Text_Formats( $this->get_loader() );
		new Print_Engine( $this->get_loader() );
		new Interactivity_API( $this->get_loader() );
	}

	/**
	 * Init Core Blocks
	 */
	private function define_core_blocks() {
		new Core_Button($this->get_loader());
		new Core_Categories($this->get_loader());
		new Core_Cover($this->get_loader());
		new Core_Embed($this->get_loader());
		new Core_Group($this->get_loader());
		new Core_Heading($this->get_loader());
		new Core_Image($this->get_loader());
		new Core_List($this->get_loader());
		new Core_List_Item($this->get_loader());
		new Core_Media_text($this->get_loader());
		new Core_Navigation($this->get_loader());
		new Core_Paragraph($this->get_loader());
		new Core_Post_Content($this->get_loader());
		new Core_Post_Featured_Image($this->get_loader());
		new Core_Post_Title($this->get_loader());
		new Core_Pullquote($this->get_loader());
		new Core_Query($this->get_loader());
		new Core_Query_Pagination_Numbers($this->get_loader());
		new Core_Search($this->get_loader());
		new Core_Separator($this->get_loader());
		new Core_Social_Links($this->get_loader());
		new Core_Table($this->get_loader());
	}

	/**
	 * Init PRC Blocks
	 */
	private function define_prc_blocks() {
		new Accordion($this->get_loader());
		new Accordion_Controller($this->get_loader());
		new Attachment_Info($this->get_loader());
		new Audio_Player($this->get_loader());
		new Bylines_Display($this->get_loader());
		new Bylines_Query($this->get_loader());
		new Carousel_Controller($this->get_loader());
		new Carousel_Slide($this->get_loader());
		new Code_Syntax($this->get_Loader());
		new Collapsible($this->get_loader());
		new Collection_Kicker($this->get_loader());
		new Color_Palette($this->get_loader());
		new Copyright($this->get_loader());
		new Entity_As_Iframe($this->get_loader());
		new Fact_Sheet_Collection($this->get_loader());
		new Flip_Card_Controller( $this->get_loader() );
		new Flip_Card_Side( $this->get_loader() );
		new Footnotes($this->get_loader());
		new Form_Captcha($this->get_loader());
		new Form_Field($this->get_loader());
		new Form_Input_Checkbox($this->get_loader());
		new Form_Input_Select($this->get_loader());
		new Form_Input_Password($this->get_loader());
		new Form_Input_Text($this->get_loader());
		new Grid_Column($this->get_loader());
		new Grid_Controller($this->get_loader());
		new Icon($this->get_loader());
		new Logo($this->get_loader());
		new Lorem_Ipsum($this->get_loader());
		new Mailchimp_Form($this->get_loader());
		new Mailchimp_Select($this->get_loader());
		new Navigation_Mega_Menu($this->get_loader());
		new Playground($this->get_loader());
		new Popular_Story($this->get_loader());
		new Popup_Content($this->get_loader());
		new Popup_Controller($this->get_loader());
		new Popup_Modal($this->get_loader());
		new Post_Parent_Title($this->get_loader());
		new Post_Taxonomy_Terms($this->get_loader());
		new Progress_Bar($this->get_loader());
		new Promo($this->get_loader());
		new Promo_Rotator($this->get_loader());
		new Related_Posts_Query($this->get_loader());
		new Report_Materials($this->get_loader());
		new Report_Pagination($this->get_loader());
		new Responsive_Container_Controller($this->get_loader());
		new Responsive_Container_View($this->get_loader());
		new Roper_DB_Search($this->get_loader());
		new Social_Share_Sheet($this->get_loader());
		new Social_Share_Text_Link($this->get_loader());
		new Social_Share_URL_Field($this->get_loader());
		new Staff_Context_Provider($this->get_loader());
		new Staff_Info($this->get_loader());
		new Staff_Query($this->get_loader());
		new Story_Item($this->get_loader());
		new Sub_Title($this->get_loader());
		new Table_Of_Contents($this->get_loader());
		new Tabs_Controller($this->get_loader());
		new Tabs_Menu($this->get_loader());
		new Tabs_Menu_Item($this->get_loader());
		new Tabs_Pane($this->get_loader());
		new Tabs_Panes($this->get_loader());
		new Taxonomy_Index_AZ_Controller($this->get_loader());
		new Taxonomy_Index_AZ_List($this->get_loader());
		new Taxonomy_Index_List_Controller($this->get_loader());
		new Taxonomy_List($this->get_loader());
		new Taxonomy_List_Link($this->get_loader());
		new Taxonomy_Search($this->get_loader());
		new Yoast_SEO_Breadcrumbs($this->get_loader());
	}

	/**
	 * Establishes additional block categories for the block library.
	 * 1. Content Curation
	 * 2. Marketing
	 * 3. Forms
	 * 4. Editorial Product
	 *
	 * @hook block_categories_all
	 * @param mixed $block_categories
	 * @param mixed $block_editor_context
	 * @return mixed
	 */
	public function register_block_categories( $block_categories, $block_editor_context ) {
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
					'slug'  => 'forms',
					'title' => __( 'Forms', 'prc-block-library-categories' ),
				),
				array(
					'slug' => 'editorial-product',
					'title' => __( 'Editorial Product', 'prc-block-library-categories' ),
					'icon' => 'lightbulb'
				),
				array(
					'slug' => 'interactivity',
					'title' => __( 'Interactivity API', 'prc-block-library-categories' ),
					'icon' => 'lightbulb'
				)
			)
		);
	}

	/**
	 * Filter the allowed html tags and attributes for sanitization.
	 * Adds support for iframe, input, svg tags, and additional div and img attributes.
	 * We're also extended additional aria attributes to the a tag.
	 *
	 * @hook wp_kses_allowed_html
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
