<?php
namespace PRC\Platform\Blocks;
use WP_HTML_Tag_Processor;
/**
 * Block Name:        Core Media-Text
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Core_Media_Text {

	public static $block_name = "core/media-text";

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_filter( 'block_type_metadata', array( $this, 'default_align_center' ), 100, 1 );
			add_action( 'admin_enqueue_scripts', array( $this, 'register_assets' ), 0 );
			add_action( 'wp_enqueue_scripts', array( $this, 'register_assets' ) );
		}
	}

	public function default_align_center( $metadata ) {
		if ( self::$block_name !== $metadata['name'] ) {
			return $metadata;
		}

		if ( array_key_exists( 'align', $metadata['attributes'] ) ) {
			$metadata['attributes']['align'] = array(
				'type'    => 'string',
				'default' => 'center',
			);
			$metadata['supports']['align'] = array('wide', 'full', 'center');
		}

		return $metadata;
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
			margin-block-end: 1.5em;
		}
		@media (min-width: 768px) {
			.wp-block-media-text > .wp-block-media-text__content {
				border-left: 3px solid white;
			}
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
			font-size: 15px;
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

new Core_Media_Text(true);
