<?php
if ( function_exists( 'register_block_style' ) ) {
	add_action('after_setup_theme', function(){
		wp_register_style(
			'prc-block-library-core-navigation-styles',
			plugins_url( 'style.css', __FILE__ ),
			array(),
			filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
		);
		register_block_style(
			'core/navigation',
			array(
				'name'   => 'pills',
				'label'  => __( 'Pills', 'prc-block-library' ),
				'style_handle'  => 'prc-block-library-core-navigation-styles'
			)
		);
	});
}

