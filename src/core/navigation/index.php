<?php
if ( function_exists( 'register_block_style' ) ) {
	// add_action('wp_eneueue_scripts', function(){
	// 	wp_register_style(
	// 		'prc-block-library-core-navigation-styles',
	// 		plugins_url( 'style.css', __FILE__ ),
	// 		array(),
	// 		filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
	// 	);
	// });
	add_action('init', function(){
		wp_register_style(
			'prc-block-library-core-navigation-styles',
			plugins_url( 'style.css', __FILE__ ),
			array(),
			filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
		);
		ob_start();
		?>
		.wp-block-navigation.is-style-pills .wp-block-navigation-item {
			border: 1px solid #EAEAEA;
			border-radius: 3px;
			padding: .7857142857em 1.5em;
			text-align: center;
			text-decoration: none;
			transition: opacity .1s ease, background-color .1s ease,color .1s ease, box-shadow .1s ease,background .1s ease;
		}
		.wp-block-navigation.is-style-pills .wp-block-navigation-item:hover {
			background-color: #EAEAEA;
		}
		<?php $style = ob_get_clean();
		register_block_style(
			'core/navigation',
			array(
				'name'   => 'pills',
				'label'  => __( 'Pills', 'prc-block-library' ),
				'inline_style' => $style,
				'style_handle'  => 'prc-block-library-core-navigation-styles'
			)
		);
	});
}

