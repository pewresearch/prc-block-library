<?php
/**
 * Plugin class.
 *
 * @package PRC\Platform\Blocks
 */

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
class Plugin {

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
		$this->version     = '3.0.0';
		$this->plugin_name = 'prc-block-library';

		$this->load_dependencies();
		$this->define_patterns();
		$this->gutenberg_config();
		$this->define_library_dependencies();
		$this->define_core_blocks();
		$this->define_prc_blocks();
		$this->define_deprecated_blocks();
	}

	/**
	 * Include a file from the plugin's includes directory.
	 *
	 * @param mixed $block_file_name Block file name.
	 * @return WP_Error|void
	 */
	private function include_block( $block_file_name ) {
		$dev_mode        = 'local' === wp_get_environment_type();
		$block_src       = $dev_mode ? 'src' : 'build';
		$block_file_path = $block_src . '/' . $block_file_name . '/class-' . $block_file_name . '.php';
		if ( file_exists( plugin_dir_path( __DIR__ ) . $block_file_path ) ) {
			require_once plugin_dir_path( __DIR__ ) . $block_file_path;
		} else {
			/* translators: %s: Block file name */
			return new WP_Error( 'prc_block_library_missing_block', sprintf( __( 'Block missing:: %s', 'prc' ), $block_file_name ) );
		}
	}

	/**
	 * Include all blocks from the plugin's /blocks directory.
	 *
	 * @return void
	 */
	private function load_blocks() {
		$dev_mode    = 'local' === wp_get_environment_type();
		$block_src   = $dev_mode ? 'src' : 'build';
		$block_files = glob( PRC_BLOCK_LIBRARY_DIR . '/' . $block_src . '/*', GLOB_ONLYDIR );
		foreach ( $block_files as $block ) {
			$block = basename( $block );
			// If the folder name starts with _ or . then it is private or a work in progress and should not be loaded.
			if ( '_' === $block[0] || '.' === $block[0] ) {
				continue;
			}
			$this->include_block( $block );
		}
	}

	/**
	 * Include all deprecated blocks from the plugin's /deprecated directory.
	 *
	 * @return void
	 */
	private function load_deprecated_blocks() {
		$dev_mode    = 'local' === wp_get_environment_type();
		$block_src   = $dev_mode ? 'deprecated/src' : 'deprecated/build';
		$block_files = glob( PRC_BLOCK_LIBRARY_DIR . '/' . $block_src . '/*', GLOB_ONLYDIR );
		if ( ! $block_files ) {
			return;
		}
		foreach ( $block_files as $block ) {
			$block_name      = basename( $block );
			$block_file_path = $block_src . '/' . $block_name . '/class-' . $block_name . '.php';
			if ( file_exists( plugin_dir_path( __DIR__ ) . $block_file_path ) ) {
				require_once plugin_dir_path( __DIR__ ) . $block_file_path;
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
		// Composer dependencies are loaded by the main plugin file via
		// Jetpack Autoloader; see prc-block-library.php.

		// Load plugin loading class.
		require_once plugin_dir_path( __DIR__ ) . '/includes/class-loader.php';
		// Load block visibility classes.
		require_once plugin_dir_path( __DIR__ ) . '/includes/block-visibility/class-block-visibility.php';
		// Load support classes.
		require_once plugin_dir_path( __DIR__ ) . '/includes/custom-text-formats/class-custom-text-formats.php';
		require_once plugin_dir_path( __DIR__ ) . '/includes/interactivity-api/class-interactivity-api.php';
		require_once plugin_dir_path( __DIR__ ) . '/includes/pagination/class-pagination.php';
		// Print engine extracted to plugins/prc-print-engine.
		require_once plugin_dir_path( __DIR__ ) . '/includes/supports/class-supports.php';
		require_once plugin_dir_path( __DIR__ ) . '/includes/class-markdown-for-agents-integration.php';
		require_once plugin_dir_path( __DIR__ ) . '/includes/class-email-newsletter-integration.php';
		require_once plugin_dir_path( __DIR__ ) . '/includes/class-story-item-topic-label.php';

		// Load blocks.
		$this->load_blocks();
		$this->load_deprecated_blocks();
		// Initialize the loader.
		$this->loader = new Loader();
	}

	/**
	 * Register block patterns from the plugin patterns directory.
	 */
	private function define_patterns() {
		$this->loader->add_action( 'plugins_loaded', $this, 'register_patterns', 5 );
	}

	/**
	 * Load pattern PHP files via the platform pattern loader.
	 *
	 * @hook plugins_loaded
	 */
	public function register_patterns(): void {
		if ( ! function_exists( '\PRC\Platform\Core\Patterns\register_plugin_patterns' ) ) {
			return;
		}

		\PRC\Platform\Core\Patterns\register_plugin_patterns(
			'prc-block-library',
			PRC_BLOCK_LIBRARY_DIR . '/patterns',
			array(
				'category_label' => __( 'Block Library', 'prc-block-library' ),
				'text_domain'    => 'prc-block-library',
			)
		);
	}

	/**
	 * Miscellaneous Gutenberg configuration for PRC Block Library.
	 * 1. Load core block assets separately
	 * 2. Register additional block categories
	 * 3. Register additional allowed HTML tags
	 */
	private function gutenberg_config() {
		/**
		 * Register block metadata collections when the Turbo/wp-scripts build
		 * has produced the manifest. Skip when missing so local VIP without a
		 * full build does not trip WP_Block_Metadata_Registry::_doing_it_wrong
		 * or include() Warnings (Sentry PRC-PLATFORM-PHP-M3 / PHP-KY).
		 */
		$library_manifest = PRC_BLOCK_LIBRARY_DIR . '/build/blocks-manifest.php';
		if ( file_exists( $library_manifest ) ) {
			wp_register_block_metadata_collection(
				PRC_BLOCK_LIBRARY_DIR . '/build',
				$library_manifest
			);
		}

		$deprecated_manifest = PRC_BLOCK_LIBRARY_DIR . '/deprecated/build/blocks-manifest.php';
		if ( file_exists( $deprecated_manifest ) ) {
			wp_register_block_metadata_collection(
				PRC_BLOCK_LIBRARY_DIR . '/deprecated/build',
				$deprecated_manifest
			);
		}

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
		// Add additional categories.
		$this->loader->add_filter( 'block_categories_all', $this, 'register_block_categories', 10, 1 );
		// Add additional allowed HTML tags.
		$this->loader->add_filter( 'wp_kses_allowed_html', $this, 'allowed_html_tags', 100, 2 );
		// Allow additional inline styles.
		$this->loader->add_filter( 'safe_style_css', $this, 'allowed_inline_styles', 10, 1 );
		// Allow light-dark() color values in inline styles.
		$this->loader->add_filter( 'safecss_filter_attr_allow_css', $this, 'allow_light_dark_css', 10, 2 );
		// Disable Remote Data Blocks example block.
		add_filter( 'remote_data_blocks_register_example_block', '__return_false' );
		// Signal support for PRC Blocks to RDB.
		$this->loader->add_filter( 'remote_data_blocks_template_blocks', $this, 'signal_rdb_template_support' );
	}

	/**
	 * Signal support to Remote Data Blocks which PRC Blocks are supported as "RDB templates".
	 *
	 * @param array $template_blocks The template blocks.
	 * @return array The template blocks.
	 */
	public function signal_rdb_template_support( $template_blocks ) {
		$template_blocks[] = 'prc-block/tabs';
		$template_blocks[] = 'core/tabs';
		return $template_blocks;
	}

	/**
	 * Init additional library support classes
	 */
	private function define_library_dependencies() {
		new Block_Visibility( $this->get_loader() );
		new Custom_Text_Formats( $this->get_loader() );
		new Interactivity_API( $this->get_loader() );
		new Pagination( $this->get_loader() );
		// Print engine extracted to plugins/prc-print-engine.
		new Supports( $this->get_loader() );
		new Markdown_For_Agents_Integration( $this->get_loader() );
		new Email_Newsletter_Integration( $this->get_loader() );
		new Story_Item_Topic_Label( $this->get_loader() );
	}

	/**
	 * Init Core Blocks
	 */
	private function define_core_blocks() {
		// Core Block Library Modifications.
		new Core_Accordion( $this->get_loader() );
		new Core_Button( $this->get_loader() );
		new Core_Categories( $this->get_loader() );
		new Core_Code( $this->get_loader() );
		new Core_Cover( $this->get_loader() );
		new Core_Details( $this->get_loader() );
		new Core_Dialog( $this->get_loader() );
		new Core_Embed( $this->get_loader() );
		new Core_File( $this->get_loader() );
		new Core_Group( $this->get_loader() );
		new Core_Heading( $this->get_loader() );
		new Core_Image( $this->get_loader() );
		new Core_List( $this->get_loader() );
		new Core_List_Item( $this->get_loader() );
		new Core_Media_text( $this->get_loader() );
		new Core_Navigation( $this->get_loader() );
		new Core_Paragraph( $this->get_loader() );
		new Core_Post_Content( $this->get_loader() );
		new Core_Post_Title( $this->get_loader() );
		new Core_Pullquote( $this->get_loader() );
		new Core_Query_Pagination_Numbers( $this->get_loader() );
		new Core_Query( $this->get_loader() );
		new Core_Search( $this->get_loader() );
		new Core_Separator( $this->get_loader() );
		new Core_Social_Links( $this->get_loader() );
		new Core_Table( $this->get_loader() );
		new Core_Tabs( $this->get_loader() );
	}

	/**
	 * Init PRC Blocks
	 */
	private function define_prc_blocks() {
		new Animation( $this->get_loader() );
		new Attachments_List( $this->get_loader() );
		new Attachments_Pagination( $this->get_loader() );
		new Audio_Player( $this->get_loader() );
		new Breadcrumbs( $this->get_loader() );
		new Card( $this->get_loader() );
		new Carousel_Controller( $this->get_loader() );
		new Carousel_Slide( $this->get_loader() );
		new Code_Syntax( $this->get_Loader() );
		new Color_Palette( $this->get_loader() );
		new Copyright( $this->get_loader() );
		new Dark_Mode_Toggle( $this->get_loader() );
		new Entity_As_Iframe( $this->get_loader() );
		new Flip_Card_Controller( $this->get_loader() );
		new Flip_Card_Side( $this->get_loader() );
		new Footnotes( $this->get_loader() );
		new Form_Input_Checkbox( $this->get_loader() );
		new Form_Input_Select( $this->get_loader() );
		new Form_Input_Select_Range( $this->get_loader() );
		new Form_Input_Password( $this->get_loader() );
		new Form_Input_Radio_Group( $this->get_loader() );
		new Form_Input_Range( $this->get_loader() );
		new Form_Input_Text( $this->get_loader() );
		new Form_Input_Textarea( $this->get_loader() );
		new Icon( $this->get_loader() );
		new Logo( $this->get_loader() );
		new Lorem_Ipsum( $this->get_loader() );
		new Navigation_Mega_Menu( $this->get_loader() );
		new Navigation_Panel( $this->get_loader() );
		new Playground( $this->get_loader() );
		new Popular_Story( $this->get_loader() );
		new Dialog( $this->get_loader() );
		new Dialog_Trigger( $this->get_loader() );
		new Dialog_Element( $this->get_loader() );
		new Post_Parent_Title( $this->get_loader() );
		new Post_Taxonomy_Terms( $this->get_loader() );
		new Progress_Bar( $this->get_loader() );
		new Promo( $this->get_loader() );
		new Promo_Rotator( $this->get_loader() );
		new Responsive_Container_Controller( $this->get_loader() );
		new Responsive_Container_View( $this->get_loader() );
		/**
		 * TODO: new Render_To_Region( $this->get_loader() );
		 */
		new Roper_DB_Search( $this->get_loader() );
		new Show_More( $this->get_loader() );
		new Social_Share_Sheet( $this->get_loader() );
		new Social_Share_Text_Link( $this->get_loader() );
		new Social_Share_URL_Field( $this->get_loader() );
		new Story_Item( $this->get_loader() );
		new Table_Of_Contents( $this->get_loader() );
		new Taxonomy_Index_AZ_Controller( $this->get_loader() );
		new Taxonomy_Index_AZ_List( $this->get_loader() );
		new Taxonomy_Index_List_Controller( $this->get_loader() );
		new Taxonomy_List( $this->get_loader() );
		new Taxonomy_List_Link( $this->get_loader() );
		new Taxonomy_Search( $this->get_loader() );
		new Timeline( $this->get_loader() );
		new Timeline_Slide( $this->get_loader() );
		new Tokens_List( $this->get_loader() );
		new Version( $this->get_loader() );
		new Navigation_Panels( $this->get_loader() );
	}

	/**
	 * Init Deprecated Blocks
	 *
	 * These blocks have been superseded by core equivalents but remain
	 * registered for backward compatibility with existing content.
	 */
	private function define_deprecated_blocks() {
		new Accordion( $this->get_loader() );
		new Accordion_Controller( $this->get_loader() );
		new Collapsible( $this->get_loader() );
		new Grid_Column( $this->get_loader() );
		new Grid_Controller( $this->get_loader() );
		new Tab( $this->get_loader() );
		new Tabs( $this->get_loader() );
		new Sub_Title( $this->get_loader() );
		new Mailchimp_Form( $this->get_loader() );
		new Mailchimp_Select( $this->get_loader() );
	}

	/**
	 * Establishes additional block categories for the block library.
	 * 1. Content Curation
	 * 2. Marketing
	 * 3. Forms
	 * 4. Editorial Product
	 *
	 * @hook block_categories_all
	 *
	 * @param mixed $block_categories Block categories.
	 * @return mixed
	 */
	public function register_block_categories( $block_categories ) {
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
					'slug'  => 'editorial-product',
					'title' => __( 'Editorial Product', 'prc-block-library-categories' ),
					'icon'  => 'lightbulb',
				),
				array(
					'slug'  => 'interactivity',
					'title' => __( 'Interactivity API', 'prc-block-library-categories' ),
					'icon'  => 'lightbulb',
				),
			)
		);
	}

	/**
	 * Add @container css rules to allowed safe style css.
	 *
	 * @hook safe_style_css
	 *
	 * @param mixed $styles The styles.
	 * @return mixed The styles.
	 */
	public function allowed_inline_styles( $styles ) {
		$styles[] = 'container';
		$styles[] = '@container';
		return $styles;
	}

	/**
	 * Allow CSS declarations containing the light-dark() color function.
	 *
	 * The prc-design-system palette defines every color as a light-dark()
	 * value, which blocks (e.g. the Power Table's cell color controls) inline
	 * as raw style attribute values. Core's safecss_filter_attr() rejects any
	 * declaration containing a function outside its allowlist
	 * (var|calc|min|max|minmax|clamp|repeat), so those declarations are
	 * stripped on save for users without `unfiltered_html` — on this multisite
	 * platform, everyone. See Linear PRC-545.
	 *
	 * Mirrors core's own strip-and-retest approach: remove well-formed
	 * light-dark() functions whose contents are restricted to color-value
	 * characters (with one nesting level for rgb()-style arguments), then
	 * re-apply core's disallowed-character check to the remainder. Only
	 * returns true when a light-dark() function was actually stripped and the
	 * remainder is clean; everything else defers to the incoming decision.
	 *
	 * @hook safecss_filter_attr_allow_css
	 *
	 * @param bool   $allow_css       Whether the CSS declaration is considered safe.
	 * @param string $css_test_string The CSS declaration being tested.
	 * @return bool Whether the CSS declaration is allowed.
	 */
	public function allow_light_dark_css( $allow_css, $css_test_string ) {
		if ( $allow_css ) {
			return $allow_css;
		}

		if ( ! str_contains( $css_test_string, 'light-dark(' ) ) {
			return $allow_css;
		}

		// Color-value characters only: hex, keywords, percentages, commas,
		// slashes, dots, whitespace, and one nesting level of parentheses for
		// rgb()/hsl()-style arguments with the same restricted contents.
		$inner    = '[a-zA-Z0-9#%.,\/\s-]';
		$stripped = preg_replace(
			"/\blight-dark\((?:{$inner}|[a-zA-Z-]+\({$inner}*\))*\)/",
			'',
			$css_test_string
		);

		if ( null === $stripped || $stripped === $css_test_string ) {
			return $allow_css;
		}

		// Core's disallowed-character check from safecss_filter_attr().
		return ! preg_match( '%[\\\(&=}]|/\*%', $stripped );
	}

	/**
	 * Filter the allowed html tags and attributes for sanitization.
	 * Adds support for iframe, input, svg tags, and additional div and img attributes.
	 * We're also extended additional aria attributes to the a tag.
	 *
	 * @hook wp_kses_allowed_html
	 * @param array $allowed_tags Allowed tags.
	 * @param array $context Context.
	 * @return array Allowed tags.
	 */
	public static function allowed_html_tags( $allowed_tags, $context ) {
		$allowed_tags['iframe']        = array(
			'class'           => true,
			'loading'         => true,
			'src'             => true,
			'width'           => true,
			'height'          => true,
			'frameborder'     => true,
			'allowfullscreen' => true,
			'title'           => true,
			'style'           => true,
		);
		$allowed_tags['input']         = array(
			'class'       => true,
			'id'          => true,
			'name'        => true,
			'type'        => true,
			'value'       => true,
			'placeholder' => true,
			'required'    => true,
			'disabled'    => true,
			'style'       => true,
			'checked'     => true,
			'role'        => true,
		);
		$allowed_tags['textarea']      = array(
			'class'       => true,
			'id'          => true,
			'name'        => true,
			'type'        => true,
			'value'       => true,
			'placeholder' => true,
			'required'    => true,
			'disabled'    => true,
			'style'       => true,
			'checked'     => true,
		);
		$allowed_tags['form']          = array(
			'class' => true,
			'id'    => true,
			'style' => true,
		);
		$allowed_tags['div']['style']              = true;
		$allowed_tags['div']['data-icon-position'] = true;
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

		// Add SVG Support.
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

		$allowed_tags['a'] = array_merge(
			array(
				'aria-controls' => true,
				'aria-selected' => true,
				'aria-role'     => true,
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
