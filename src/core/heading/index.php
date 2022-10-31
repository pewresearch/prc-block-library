<?php
require_once PRC_VENDOR_DIR . '/autoload.php';
use \WPackio as WPackio;

class Core_Heading extends PRC_Block_Library {
	public static $block_name = 'core/heading';
	public static $version = '1.0.1';
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


	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_new_styles' ), 0 );
			add_filter( 'prc_grid_row_classes_DEPRECATED', array( $this, 'add_section_header_class_to_row' ), 10, 2 );
			add_action( 'enqueue_block_editor_assets', array( $this, 'add_assets_to_block_editor' ) );
			add_filter( 'render_block', array( $this, 'render' ), 10, 2 );
		}
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
	 * Enqueue a modification plugin for the core/group block and override the render_callback
	 *
	 * @uses Enqueue
	 */
	public function add_assets_to_block_editor() {
		$this->enqueue_assets( true, true );
	}

	public function enqueue_assets( $js = true, $css = true ) {
		$block_js_deps = array( 'wp-blocks', 'wp-dom-ready', 'wp-i18n', 'wp-polyfill' );
		$enqueue       = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );
		$enqueue->enqueue(
			'blocks',
			'heading',
			array(
				'js'        => $js,
				'css'       => $css,
				'js_dep'    => true === $js ? $block_js_deps : array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
	}

	public function render( $block_content, $block ) {
		if ( 'core/heading' !== $block['blockName'] ) {
			return $block_content;
		}

		$this->enqueue_assets( false );

		return $block_content;
	}
}

new Core_Heading( true );
