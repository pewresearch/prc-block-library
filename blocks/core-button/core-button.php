<?php
namespace PRC\Platform\Blocks;
use WP_HTML_Tag_Processor;

/**
 * Block Name:        Button
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */

class Core_Button {
	public static $block_json;
	public static $version;
	public static $block_name = 'core/button';
	public static $view_style_handle = null;
	public static $editor_script_handle = null;

	public function __construct( $loader ) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/core-button/build/block.json';
		self::$block_json = wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		self::$version = self::$block_json['version'];
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'register_assets' );
			$loader->add_action( 'enqueue_block_editor_assets', $this, 'register_editor_script' );
			$loader->add_action( 'enqueue_block_assets', $this, 'register_editor_style' );
			$loader->add_filter( 'block_type_metadata_settings', $this, 'add_settings', 100, 2 );
			$loader->add_filter( 'prc-block-library/apple-news/components/layouts', $this, 'apple_news_layout' );
			$loader->add_filter( 'prc-block-library/apple-news/components/styles', $this, 'apple_news_style' );
			$loader->add_filter( 'prc-block-library/apple-news/components/text-styles', $this, 'apple_news_text_style' );
			$loader->add_filter( 'render_block', $this, 'render', 10, 2 );
		}
	}

	/**
	* Register the block's assets.
	* @hook init
	*/
	public function register_assets() {
		self::$editor_script_handle = register_block_script_handle( self::$block_json, 'editorScript' );
		self::$view_style_handle    = register_block_style_handle( self::$block_json, 'style' );
	}

	/**
	* Register the block's editor assets.
	* @hook enqueue_block_editor_assets
	*/
	public function register_editor_script() {
		wp_enqueue_script( self::$editor_script_handle );
	}

	/**
	* Register the block's style assets.
	* @hook enqueue_block_assets
	*/
	public function register_editor_style() {
		wp_enqueue_style( self::$view_style_handle );
	}

	/**
	* Register additional settings, like context, for the core/button block.
	*
	* @hook block_type_metadata_settings
	* @param mixed $settings
	* @param mixed $metadata
	* @return mixed
	*/
	public function add_settings(array $settings, array $metadata) {
		if ( self::$block_name === $metadata['name'] ) {
			$settings['interactivity'] = true;
		}
		return $settings;
	}

	/**
	 * @hook prc-block-library/apple-news/components/layouts
	 * return $component_layouts
	 */
	public function apple_news_layout($component_layouts) {
		// Define the default button styles and settings:
		$component_layouts['link-button-layout'] = [
			'margin' => [
				'bottom' => 20,
			],
			'padding' => [
				'top' => 10,
				'bottom' => 10,
				'left' => 15,
				'right' => 15,
			],
		];
		return $component_layouts;
	}

	/**
	 * @hook prc-block-library/apple-news/components/styles
	 * return $component_styles
	 */
	public function apple_news_style($component_styles) {
		$component_styles['default-link-button'] = [
			'backgroundColor' => '#000',
			'mask' => [
				'type' => 'corners',
				'radius' => 0,
			],
		];
		return $component_styles;
	}

	/**
	 * @hook prc-block-library/apple-news/components/text-styles
	 * return $component_text_styles
	 */
	public function apple_news_text_style($component_text_styles) {
		$component_text_styles['default-link-button-text-style'] = [
			'textColor' => '#FFF',
			'fontName' => 'Helvetica-Bold',
			'fontSize' => 18,
		];
		return $component_text_styles;
	}

	/**
	* Adds @wordpress/interactivity api handlers for core/button block.
	*
	* @uses:
	* - actions.onButtonClick
	* - actions.onButtonMouseEnter
	* - state.$button_id.text
	* - state.$button_id.isHidden
	* - state.$button_id.isDisabled
	* - state.$button_id.isError
	* - state.$button_id.isSuccess
	* - state.$button_id.isProcessing
	*
	* @hook render_block
	* @param string $block_content
	* @param mixed $block
	* @return mixed
	*/
	public function render( $block_content, $block ) {
		if ( self::$block_name !== $block['blockName'] || is_admin() ) {
			return $block_content;
		}

		$is_interactive = is_array($block['attrs']) && array_key_exists('isInteractive', $block['attrs']) ? $block['attrs']['isInteractive'] : false;
		$target_namespace = array_key_exists( 'interactiveNamespace', $block['attrs'] ) ? $block['attrs']['interactiveNamespace'] : null;

		if ( $is_interactive && null !== $target_namespace ) {
			preg_match('/<a[^>]*>(.*?)<\/a>/', $block_content, $matches);
			$button_text = $matches[1];

			$tag_processor = new WP_HTML_Tag_Processor($block_content);
			$tag_processor->next_tag('a');

			$input_name = array_key_exists('metadata', $block['attrs']) && array_key_exists('name', $block['attrs']['metadata']) ? $block['attrs']['metadata']['name'] : null;

			$button_id = null !== $input_name ? sanitize_title($input_name) : wp_unique_id('core-button-');

			wp_interactivity_state(
				$target_namespace,
				array(
					$button_id => array(
						'isHidden' => false,
						'isDisabled' => false,
						'isError' => false,
						'isSuccess' => false,
						'isProcessing' => false,
						'text' => $button_text,
					),
				)
			);

			// Re-set the ID attribute to the button_id.
			$tag_processor->set_attribute('id', $button_id);

			$tag_processor->set_attribute('data-wp-interactive', wp_json_encode(array(
				'namespace' => $target_namespace,
			)));

			// Action Directives:
			$tag_processor->set_attribute(
				'data-wp-on--click',
				$target_namespace.'::actions.onButtonClick'
			);
			$tag_processor->set_attribute(
				'data-wp-on--mouseenter',
				$target_namespace.'::actions.onButtonMouseEnter'
			);

			// Inner Text Directive:
			$tag_processor->set_attribute(
				'data-wp-text',
				$target_namespace.'::state.'.$button_id.'.text'
			);

			// Classname Directives:
			$tag_processor->set_attribute(
				'data-wp-class--is-error',
				$target_namespace.'::state.'.$button_id.'.isError'
			);
			$tag_processor->set_attribute(
				'data-wp-class--is-success',
				$target_namespace.'::state.'.$button_id.'.isSuccess'
			);
			$tag_processor->set_attribute(
				'data-wp-class--is-processing',
				$target_namespace.'::state.'.$button_id.'.isProcessing'
			);
			$tag_processor->set_attribute(
				'data-wp-class--is-disabled',
				$target_namespace.'::state.'.$button_id.'.isDisabled'
			);

			// HTML Attribute Directives:
			$tag_processor->set_attribute(
				'data-wp-bind--hidden',
				$target_namespace.'::state.'.$button_id.'.isHidden'
			);

			$block_content = $tag_processor->get_updated_html();
		}

		return $block_content;
	}

}
