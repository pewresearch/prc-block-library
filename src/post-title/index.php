<?php
require_once PRC_VENDOR_DIR . '/autoload.php';

use \WPackio as WPackio;

class Post_Title_Block extends PRC_Block_Library {

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_new_styles' ), 0 );
		}
	}

	/**
	 * Add aditional wp-block-post-title style
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

new Post_Title_Block( true );
