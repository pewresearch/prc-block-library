<?php

class Media_Text_Block extends PRC_Block_Library {

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'admin_enqueue_scripts', array( $this, 'register_assets' ), 0 );
			add_action( 'wp_enqueue_scripts', array( $this, 'register_assets' ) );
		}
	}

	/**
	 * Override the wp-block-media-text style
	 * @return void
	 * @throws LogicException
	 */
	public function register_assets() {
		ob_start();
		?>
		.wp-block-media-text {
			margin-block-end: 1.5em;
		}
		<?php
		$style = ob_get_clean();
		if ( is_admin() ) {
			wp_add_inline_style( 'wp-block-library', $style );
		} else {
			wp_add_inline_style( 'wp-block-media-text', $style );
		}
	}
}

new Media_Text_Block( true );
