<?php

class Media_Text_Block extends PRC_Block_Library {

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'admin_enqueue_scripts', array( $this, 'register_assets' ), 0 );
			add_action( 'wp_enqueue_scripts', array( $this, 'register_assets' ) );
		}
	}

	/**
	 * Add inline styles to the wp-block-media-text block
	 * @return void
	 * @throws LogicException
	 */
	public function register_assets() {
		ob_start();
		?>
		.wp-block-media-text {
			margin-block-end: var(--wp--custom--margin-block-end, 1.5em);
		}
		.wp-block-media-text > .wp-block-media-text__content {
			border-left: 3px solid white;
		}
		.wp-block-media-text > .wp-block-media-text__content > .wp-block-quote {
			padding-left: 0;
			padding-right: 0;
			margin: 0;
		}
		.wp-block-media-text cite {
			line-height: 1em;
			text-align: right;
			display: block;
			width: calc(100% + 8%);
			margin-left: -4%;
			text-transform: inherit;
			letter-spacing: 1px;
		}
		.wp-block-media-text cite:before {
			top: -0.45em;
			position: relative;
			border: none;
			content: "_";
		}
		.wp-block-media-text.has-text-color > .wp-block-media-text__content > .wp-block-quote,
		.wp-block-media-text.has-text-color > .wp-block-media-text__content > .wp-block-quote cite {
			color: inherit!important;
		}
		.wp-block-media-text.has-text-color cite:before {
			border-color: inherit!important;
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
