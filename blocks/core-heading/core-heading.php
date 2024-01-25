<?php
namespace PRC\Platform\Blocks;
use WP_HTML_Tag_Processor;

/**
 * Block Name:        core/heading
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Core_Heading {
	public static $block_json = null;
	public static $version;
	public static $block_name = 'core/heading';
	public static $view_script_handle = null;
	public static $editor_script_handle = null;
	public static $style_handle = null;

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/core-heading/build/block.json';
		self::$block_json = \wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		self::$version = self::$block_json['version'];
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action('init', $this, 'register_assets');
			$loader->add_action('enqueue_block_editor_assets', $this, 'register_editor_script');
			$loader->add_action('enqueue_block_assets', $this, 'register_editor_style');
			$loader->add_filter('block_type_metadata', $this, 'add_attributes', 100, 1);
			$loader->add_filter('block_type_metadata_settings', $this, 'add_settings', 100, 2);
			$loader->add_filter('render_block', $this, 'render', 100, 2);
		}
	}

	public static $styles = array(
		array(
			'name' => 'section-header',
			'label' => 'Section Header',
		),
		array(
			'name' => 'sub-header',
			'label' => 'Sub Header',
		),
		array(
			'name' => 'hidden',
			'label' => 'Hidden',
		),
	);


	/**
	 * @hook init
	 * @return void
	 */
	public function register_assets() {
		self::$editor_script_handle = register_block_script_handle( self::$block_json, 'editorScript' );
		self::$style_handle    = register_block_style_handle( self::$block_json, 'style' );
		$this->register_new_styles();
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
	 * @return void
	 */
	public function register_editor_script() {
		wp_enqueue_script( self::$editor_script_handle );
	}

	/**
	 * @hook enqueue_block_assets
	 * @return void
	 */
	public function register_editor_style() {
		wp_enqueue_style( self::$style_handle );
	}

	/**
	* Register additional attributes for the core-heading block.
	* @hook block_type_metadata
	* @param mixed $metadata
	* @return mixed
	*/
	public function add_attributes( $metadata ) {
		if ( self::$block_name !== $metadata['name'] ) {
			return $metadata;
		}

		if ( ! array_key_exists( 'isChapter', $metadata['attributes'] ) ) {
			$metadata['attributes']['isChapter'] = array(
				'type'    => 'boolean',
				'default' => false,
			);
		}
		if ( ! array_key_exists( 'altTocText', $metadata['attributes'] ) ) {
			$metadata['attributes']['altTocText'] = array(
				'type'    => 'string',
				'default' => '',
			);
		}

		return $metadata;
	}

	/**
	* Register additional settings, like context, for the core-heading block.
	* @hoook block_type_metadata_settings
	* @param mixed $settings
	* @param mixed $metadata
	* @return mixed
	*/
	public function add_settings(array $settings, array $metadata) {
		if ( self::$block_name === $metadata['name'] ) {
			$settings['attributes']['level']['default'] = 4;
		}
		return $settings;
	}

	/**
	* Render the core-heading block
	* @hook render_block
	* @param string $block_content
	* @param mixed $block
	* @return mixed
	*/
	public function render( $block_content, $block ) {
		if ( self::$block_name !== $block['blockName'] || is_admin() ) {
			return $block_content;
		}

		wp_enqueue_style( self::$style_handle );

		$heading_tag = new WP_HTML_Tag_Processor( $block_content );
		$heading_tag->next_tag();
		$id = $heading_tag->get_attribute('id');

		// if $id begins with an h- then remove the h- from the id. for example h-testing-a-heading-w-an-anchor-tag should just become testing-a-heading-w-an-anchor-tag and if it has an integer immediately following the h- then replace the integer with a word that too. for example h-1-testing-a-heading-w-an-anchor-tag should just become one-testing-a-heading-w-an-anchor-tag, and h-5-things-you-need-to-know would become five-things-you-need-to-know

		if ( $id ) {
			if ( preg_match( '/^h-(\d+)-/', $id, $matches ) ) {
				$number = $matches[1];
				$number = intval( $number );
				$number = \convert_number_to_words( $number );
				if ( is_wp_error( $number ) ) {
					$id = preg_replace( '/^h-(\d+)-/', '', $id );
				} else {
					$id = preg_replace( '/^h-(\d+)-/', $number . '-', $id );
				}
			} else {
				$id = preg_replace( '/^h-/', '', $id );
			}
		}

		$heading_tag->set_attribute( 'id', $id );

		if ( array_key_exists('isChapter', $block['attrs']) && true === $block['attrs']['isChapter'] ) {
			$heading_tag->set_attribute( 'data-is-chapter', 'true' );
		}

		$block_content = $heading_tag->get_updated_html();

		return $block_content;
	}

}
