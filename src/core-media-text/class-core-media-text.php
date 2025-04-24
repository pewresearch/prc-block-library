<?php
/**
 * Core Media Text Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use WP_HTML_Tag_Processor;

/**
 * Block Name:        Core Media-Text
 * Version:           0.1.0
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Core_Media_Text {
	/**
	 * Block name
	 *
	 * @var string
	 */
	public static $block_name = 'core/media-text';

	/**
	 * Constructor
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		$this->init( $loader );
	}

	/**
	 * Initialize the block
	 *
	 * @param mixed $loader Loader.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_filter( 'block_type_metadata', $this, 'default_align_center', 100, 1 );
			$loader->add_action( 'enqueue_block_assets', $this, 'register_style' );
		}
	}

	/**
	 * Default align center
	 *
	 * @hook block_type_metadata
	 * @param mixed $metadata Metadata.
	 * @return mixed
	 */
	public function default_align_center( $metadata ) {
		if ( self::$block_name !== $metadata['name'] ) {
			return $metadata;
		}

		if ( array_key_exists( 'align', $metadata['attributes'] ) ) {
			$metadata['attributes']['align'] = array(
				'type'    => 'string',
				'default' => 'center',
			);
			$metadata['supports']['align']   = array( 'wide', 'full', 'center' );
		}

		return $metadata;
	}

	/**
	 * Register style
	 *
	 * @hook enqueue_block_assets
	 */
	public function register_style() {
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
