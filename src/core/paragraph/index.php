<?php
require_once PRC_VENDOR_DIR . '/autoload.php';
use \WPackio as WPackio;

class Core_Paragraph extends PRC_Block_Library {
	public static $block_name = 'core/paragraph';
	public static $version = '1.0.1';
	public static $styles = array(
		array(
			'name' => '',
			'label' => 'Default',
			'isDefault' => true,
		),
		array(
			'name' => 'has-big-number',
			'label' => 'Big Number',
		)
	);

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array($this, 'register_new_styles'), 0 );
			add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_admin_assets' ) );
			add_filter( 'render_block', array( $this, 'add_additional_frontend_styles' ), 10, 2 );
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

	public function enqueue_frontend_assets() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );
		$proceed = is_admin() && get_current_screen()->is_block_editor || !is_admin();
		// This is such a primitive block that it will affect styling in admin if ever accidentally called like in the help system.
		if ( $proceed ) {
			$enqueue->enqueue(
				'blocks',
				'paragraph',
				array(
					'js'        => false,
					'css'       => true,
					'js_dep'    => array(),
					'css_dep'   => array(),
					'in_footer' => true,
					'media'     => 'all',
				)
			);
		}
	}

	public function add_additional_frontend_styles( $block_content, $block ) {
		if ( 'core/paragraph' === $block['blockName'] ) {
			$this->enqueue_frontend_assets();
		}
		return $block_content;
	}

	public function enqueue_admin_assets() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', self::$version, 'plugin', parent::$plugin_file );

		$enqueue->enqueue(
			'blocks',
			'paragraph',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);
	}
}

new Core_Paragraph( true );
