<?php

class Core_Separator extends PRC_Block_Library {
	public static $block_name = 'core/seperator';
	public static $version = '1.0.1';

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array($this, 'remove_styles') );
			add_filter( 'render_block', array( $this, 'render_divider' ), 10, 2 );
		}
	}

	public function remove_styles() {
		unregister_block_style( self::$block_name, 'wide');
	}

	public function render_divider( $block_content, $block ) {
		if ( 'core/separator' !== $block['blockName'] ) {
			return $block_content;
		}

		return $block_content;
	}
}

new Core_Separator( true );
