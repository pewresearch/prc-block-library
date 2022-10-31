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
