<?php
use \WPackio as WPackio;

class Paragraph extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_admin_assets' ) );
			add_filter( 'render_block', array( $this, 'add_additional_frontend_styles' ), 10, 2 );
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
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );

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

new Paragraph( true );
