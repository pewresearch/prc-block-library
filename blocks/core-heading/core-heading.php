<?php
/**
 * Block Name:        core/heading
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class CoreHeading extends PRC_Block_Library {
	public static $test = null;
	public static $block_name = 'core/heading';
	public static $block_json = null;
	public static $view_style_handle = null;
	public static $editor_script_handle = null;
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

	public function __construct($init = false) {
		if ( true === $init ) {
			$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/core-heading/build/block.json';
			self::$block_json = wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
			self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );

			add_action( 'init', array($this, 'init_assets') );
			add_action( 'init', array( $this, 'register_new_styles' ), 0 );
			add_action( 'enqueue_block_editor_assets', array($this, 'register_editor_assets') );
			add_filter( 'prc_grid_row_classes_DEPRECATED', array( $this, 'add_section_header_class_to_row' ), 10, 2 );
			add_filter( 'block_type_metadata', array( $this, 'add_attributes' ), 100, 1 );
			add_filter( 'block_type_metadata_settings', array( $this, 'add_settings' ), 10, 2 );
			add_filter( 'render_block', array( $this, 'render' ), 10, 2 );
		}
	}

	public function init_assets() {
		self::$editor_script_handle = register_block_script_handle( self::$block_json, 'editorScript' );
		self::$view_style_handle    = register_block_style_handle( self::$block_json, 'style' );
	}

	public function register_new_styles() {
		foreach( self::$styles as $style_args ) {
			register_block_style(
				self::$block_name,
				$style_args,
			);
		}
	}

	public function register_editor_assets() {
		wp_enqueue_script( self::$editor_script_handle );
		wp_enqueue_style( self::$view_style_handle );
	}

	/**
	 * DEPRECATED: Add section-header class to row if first block is a section header
	 * @param mixed $classes
	 * @param mixed $parsed_row_block
	 * @return mixed
	 */
	public function add_section_header_class_to_row( $classes, $parsed_row_block ) {
		$inner_blocks = array_pop( $parsed_row_block['innerBlocks'] );
		if ( 'prc-block/column' !== $inner_blocks['blockName'] ) {
			return $classes;
		}
		if ( array_key_exists('width', $inner_blocks['attrs']) && 16 === $inner_blocks['attrs']['width'] ) {
			return $classes;
		}
		if ( empty($inner_blocks['innerBlocks'] ) ) {
			return $classes;
		}

		$first_block = $inner_blocks['innerBlocks'][0];

		if ( 'core/group' === $first_block['blockName'] ) {
			$first_block = $first_block['innerBlocks'][0];
		}

		if ( ! is_array( $first_block ) ) {
			return $classes;
		}

		if ( array_key_exists( 'className', $first_block['attrs'] ) && 'core/heading' === $first_block['blockName'] && 'is-style-section-header' === $first_block['attrs']['className'] ) {
			$classes['has section heading'] = true;
		}

		return $classes;
	}

	/**
	* Register additional attributes for the core-heading block.
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
	* @param string $block_content
	* @param mixed $block
	* @return mixed
	*/
	public function render( $block_content, $block ) {
		if ( self::$block_name !== $block['blockName'] || is_admin() ) {
			return $block_content;
		}

		wp_enqueue_style( self::$view_style_handle );

		if ( array_key_exists('isChapter', $block['attrs']) && true === $block['attrs']['isChapter'] ) {
			// regex add is-chapter="true" to the h element in $block_content.
			$block_content = preg_replace( '/<h([1-6])/', '<h$1 data-is-chapter="true"', $block_content );
		}

		return $block_content;
	}

}

new CoreHeading(true);
