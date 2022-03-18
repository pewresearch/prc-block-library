<?php
use \WPackio as WPackio;

class Media_Text extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_admin_assets' ) );
			add_filter( 'render_block', array( $this, 'add_additional_frontend_styles' ), 10, 2 );
		}
	}

	public function enqueue_frontend_assets() {
		$ver = parent::$version;
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', $ver, 'plugin', parent::$plugin_file );

		$enqueue->enqueue(
			'blocks',
			'media-text',
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

	public function add_additional_frontend_styles( $block_content, $block ) {
		if ( 'core/media-text' === $block['blockName'] ) {
			$this->enqueue_frontend_assets();
		}
		return $block_content;
	}

	public function enqueue_admin_assets() {
		$ver = parent::$version;
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', $ver, 'plugin', parent::$plugin_file );

		$enqueue->enqueue(
			'blocks',
			'media-text',
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

new Media_Text( true );
