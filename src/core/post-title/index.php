<?php

class Core_Post_Title extends PRC_Block_Library {
	public static $block_name = 'core/post-title';
	public static $version = '1.0.1';

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_new_styles' ), 0 );
		}
	}

	/**
	 * Add aditional wp-block-post-title style
	 * @TODO I dont think this is actually being used however, we may want to remove it.
	 * @return void
	 * @throws LogicException
	 */
	public function register_new_styles() {
		ob_start();

		?>
		.wp-block-post-title.is-style-essay-title {
			font-size: 48px!important;
			line-height: 1.2!important;
		}
		<?php
		$style = normalize_whitespace( ob_get_clean() );
		register_block_style(
			'core/post-title',
			array(
				'name'         => 'essay-title',
				'label'        => __( 'Essay Title', 'prc-block-library' ),
				'inline_style' => $style,
			)
		);
	}
}

new Core_Post_Title( true );
