<?php
namespace PRC\Platform\Blocks;

/**
 * Block Name:        Core Paragraph
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Core_Paragraph {
	public static $block_json = null;
	public static $version;
	public static $block_name = 'core/paragraph';
	public static $view_script_handle = null;
	public static $editor_script_handle = null;
	public static $style_handle = null;
	public static $styles = array(
		array(
			'name' => 'has-big-number',
			'label' => 'Big Number',
		)
	);

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/core-paragraph/build/block.json';
		self::$block_json = \wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		self::$version = self::$block_json['version'];
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action('init', $this, 'register_assets');
			$loader->add_action('enqueue_block_assets', $this, 'register_style');
			$loader->add_action('enqueue_block_editor_assets', $this, 'register_editor_script');
			$loader->add_filter('prc-block-library/apple-news/components/init', $this, 'apple_news_init_component', 10, 1);
			$loader->add_filter('prc-block-library/apple-news/text-styles', $this, 'apple_news_text_style');
			$loader->add_filter('prc-block-library/apple-news/components/text-styles', $this, 'apple_news_component_text_style');
			$loader->add_filter('render_block', $this, 'render', 100, 2);
		}
	}

	/**
	 * @hook init
	 * @return void
	 */
	public function register_assets() {
		self::$editor_script_handle = register_block_script_handle( self::$block_json, 'editorScript' );
		self::$style_handle    = register_block_style_handle( self::$block_json, 'style' );
		$this->register_new_styles();
	}

	/**
	 * @hook prc-block-library/apple-news/components/init
	 * @param mixed $components
	 * @return void
	 */
	public function apple_news_init_component($components) {
		if ( !array_key_exists('bignumber', $components) ) {
			$components['bignumber'] = '\\Apple_Exporter\\Components\\Core_Paragraph_Big_Number';
		}
		return $components;
	}

	/**
	 * @hook prc-block-library/apple-news/text-styles
	 * return $text_styles
	 */
	public function apple_news_text_style($text_styles) {
		$text_styles['default-tag-bignumstrong'] = [
			'fontName' => 'Helvetica-Bold',
			'fontSize' => 22,
			'lineHeight' => 32,
			'tracking' => -0.025,
			'linkStyle' => [
				'textColor' => '#346ead',
				'underline' => true,
			],
		];
		return $text_styles;
	}

	/**
	 * @hook prc-block-library/apple-news/components/text-styles
	 * return $component_text_styles
	 */
	public function apple_news_component_text_style($component_text_styles) {
		$component_text_styles['body-bignumber'] = [
			'textAlignment' => 'left',
			'fontName' => 'Georgia',
			'fontSize' => 18,
			'tracking' => 0,
			'lineHeight' => 32,
			'textColor' => '#2a2a2a',
			'linkStyle' => [
				'textColor' => '#346ead',
				'underline' => true,
			],
			'dropCapStyle' => [
				'numberOfLines' => 2,
				'fontName' => 'Helvetica-Bold',
				'textColor' => '#ec9f2e',
				'padding' => 1,
				'backgroundColor' => '#fff',
				'numberOfCharacters' => 1,
			],
			'paragraphSpacingBefore' => 22,
			'paragraphSpacingAfter' => 22,
		];

		$component_text_styles['body-bignumber-2-digit'] = [
			'textAlignment' => 'left',
			'fontName' => 'Georgia',
			'fontSize' => 18,
			'tracking' => 0,
			'lineHeight' => 32,
			'textColor' => '#2a2a2a',
			'linkStyle' => [
				'textColor' => '#346ead',
				'underline' => true,
			],
			'dropCapStyle' => [
				'numberOfLines' => 3,
				'fontName' => 'Helvetica-Bold',
				'textColor' => '#ec9f2e',
				'padding' => 0,
				'backgroundColor' => '#fff',
				'numberOfCharacters' => 2,
				'numberOfRaisedLines' => 0,
			],
			'paragraphSpacingBefore' => 22,
			'paragraphSpacingAfter' => 22,
		];
		return $component_text_styles;
	}

	public function register_new_styles() {
		foreach( self::$styles as $style_args ) {
			register_block_style(
				self::$block_name,
				$style_args,
			);
		}
	}

	/**
	 * @hook enqueue_block_editor_assets
	 */
	public function register_editor_script() {
		wp_enqueue_script( self::$editor_script_handle );
	}

	/**
	 * @hook enqueue_block_assets
	 */
	public function register_style() {
		wp_enqueue_style( self::$style_handle );
	}

	/**
	* Render the "core/paragraph" block
	* @hook render_block
	* @param string $block_content
	* @param mixed $block
	* @return mixed
	*/
	public function render( $block_content, $block ) {
		if ( self::$block_name !== $block['blockName'] || is_admin() ) {
			return $block_content;
		}

		// wp_enqueue_style( self::$style_handle );

		return $block_content;
	}

}
