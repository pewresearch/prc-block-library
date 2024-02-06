<?php
namespace PRC\Platform\Blocks;
use MatthiasMullie\Minify;
use WP_HTML_Tag_Processor;
use WP_Block_Type_Registry;

class Print_Engine {
	public static $block_library_version;
	public static $active_theme;
	public static $handle = 'prc-block-library-print-engine';
	public static $view_asset_file;
	public static $controls_asset_file;
	public static $version;

	public function __construct($loader) {
		self::$view_asset_file = include(  plugin_dir_path( __FILE__ )  . 'build/index.asset.php' );
		self::$version = self::$view_asset_file['version'];
		self::$controls_asset_file = include(  plugin_dir_path( __FILE__ )  . 'build/controls.asset.php' );
		$this->init($loader);
	}

	public function init($loader) {
		$loader->add_action( 'wp_enqueue_scripts', $this, 'register_view_script' );
		$loader->add_action( 'enqueue_block_editor_assets', $this, 'register_editor_script' );
		$loader->add_action( 'enqueue_block_assets', $this, 'register_style' );
		$loader->add_filter( 'block_type_metadata', $this, 'add_attributes', 100, 1 );
		$loader->add_filter( 'render_block', $this, 'render', 100, 2 );
	}

	/**
	 * @hook wp_enqueue_scripts
	 * @return void
	 */
	public function register_editor_script() {
		wp_enqueue_script(
			self::$handle . '-controls',
			plugins_url( 'build/controls.js', __FILE__ ),
			self::$controls_asset_file['dependencies'],
			self::$version,
			true
		);
	}

	/**
	 * @hook wp_enqueue_scripts
	 * @return void
	 */
	public function register_view_script() {
		wp_enqueue_script(
			self::$handle,
			plugins_url( 'build/index.js', __FILE__ ),
			self::$view_asset_file['dependencies'],
			self::$version,
			true
		);
	}

	public function get_block_names($filter_by_namespace = null) {
		$block_names = array();
		$block_types = WP_Block_Type_Registry::get_instance()->get_all_registered();
		foreach ( $block_types as $block_type ) {
			if ( !is_null($filter_by_namespace) && strpos($block_type->name, $filter_by_namespace) === 0 ) {
				$block_names[] = $block_type->name;
			} else if ( is_null($filter_by_namespace) ) {
				$block_names[] = $block_type->name;
			}
		}
		return $block_names;
	}

	public function register_block_styles() {
		$block_names = $this->get_block_names('prc-block');
		$block_styles = apply_filters('prc_block_styles', '', $block_names);
		$block_styles = '@media print { ' . $block_styles . ' }';
		$minifier = new Minify\CSS($block_styles);
		$block_styles = $minifier->minify();
		return wp_add_inline_style( self::$handle, $block_styles );
	}

	/**
	 * @hook enqueue_block_assets
	 * @return void
	 */
	public function register_style() {
		wp_enqueue_style(
			self::$handle,
			plugins_url( 'build/index.css', __FILE__ ),
			array(),
			self::$version,
		);
		$this->register_block_styles();
	}

	/**
	* Register additional attributes for the core-group block.
	* @hook block_type_metadata 100, 1
	* @param mixed $metadata
	* @return mixed
	*/
	public function add_attributes( $metadata ) {
		if ( is_array($metadata) && array_key_exists('attributes', $metadata) && ! array_key_exists( 'printEngine', $metadata['attributes'] ) ) {
			$metadata['attributes']['printEngine'] = array(
				'type'    => 'object',
				'default' => array(
					'hideOnPrint' => false,
					'displayOnPrint'  => false,
				),
			);
		}

		return $metadata;
	}

	public function generate_dynamic_cover_sheet() {
		$cover_sheet = '<div class="prc-block-library-print-engine__cover-sheet" data-display-on-print="true">';
		$cover_sheet .= '<div class="prc-block-library-print-engine__cover-sheet__content">';
		$cover_sheet .= '<h1 class="prc-block-library-print-engine__cover-sheet__title wp-block-post-title">'.get_the_title().'</h1>';
		$cover_sheet .= '<p class="prc-block-library-print-engine__cover-sheet__description">This is a preview of how your content will look when printed by the print engine...</p>';
		$cover_sheet .= '</div>';
		$cover_sheet .= '</div>';
		return $cover_sheet;
	}

	/**
	 * @hook render_block 100, 2
	 * @param mixed $block_content
	 * @param mixed $block
	 * @return mixed
	 */
	public function render( $block_content, $block ) {
		if ( is_admin() || !is_string($block_content) ) {
			return $block_content;
		}
		if (is_singular('page')) {
			return $block_content;
		}
		if ( 'core/post-content' === $block['blockName'] ) {
			return $this->generate_dynamic_cover_sheet() . $block_content;
		}
		if ( !$block['attrs'] ) {
			return $block_content;
		}

		$attributes = array_key_exists('attrs', $block) ? $block['attrs'] : array();
		$print_options = array_key_exists('printEngine', $attributes) ? $attributes['printEngine'] : array();
		$hide_on_print = array_key_exists('hideOnPrint', $print_options) ? $print_options['hideOnPrint'] : false;
		$display_on_print = array_key_exists('displayOnPrint', $print_options) ? $print_options['displayOnPrint'] : false;

		// using the new WP_HTML_Tag_Processor add data-hide-on-X to the block
		$w = new WP_HTML_Tag_Processor( $block_content );
		if ( $w->next_tag() ) {
			if ( $hide_on_print ) {
				$w->set_attribute( 'data-hide-on-print', 'true' );
			}
			if ( $display_on_print ) {
				$w->set_attribute( 'data-display-on-print', 'true' );
			}
		}

		return $w->get_updated_html();
	}
}
