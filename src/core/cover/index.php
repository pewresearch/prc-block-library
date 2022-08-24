<?php
require_once PRC_VENDOR_DIR . '/autoload.php';
use \WPackio as WPackio;

class Core_Cover extends PRC_Block_Library {
	public static $block_name = 'core/column';
	public static $version = '1.0.1';

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_new_styles' ), 0 );
			add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_editor_assets' ) );
			add_filter( 'render_block', array( $this, 'render' ), 100, 2 );
		}
	}

	public function register_new_styles() {
		register_block_style(
			self::$block_name,
			array(
				'name' => 'disable-mobile-collapse',
				'label' => 'Disable Mobile Collapse',
			),
		);
	}

	public function enqueue_assets($css = true, $js = false) {
		$enqueue       = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );
		$enqueue->enqueue(
			'blocks',
			'cover',
			array(
				'js'        => $js,
				'css'       => $css,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
	}

	public function render( $block_content, $block ) {
		if ( self::$block_name !== $block['blockName'] || is_admin() ) {
			return $block_content;
		}

		$this->enqueue_assets();

		return $block_content;
	}

	/**
	 * Enqueue a modification plugin for the core/group block and override the render_callback
	 *
	 * @uses Enqueue
	 */
	public function enqueue_editor_assets() {
		$this->enqueue_assets(true, true);
	}
}

new Core_Cover( true );
