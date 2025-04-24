<?php
/**
 * Dialog Element Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use MatthiasMullie\Minify;

/**
 * Block Name:        Dialog Element
 * Requires at least: 6.7
 * Requires PHP:      8.2
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Dialog_Element {
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
			$loader->add_action( 'init', $this, 'block_init' );
			$loader->add_action( 'enqueue_block_assets', $this, 'enqueue_custom_backdrop_styles' );
		}
	}

	/**
	 * Enqueue custom backdrop styles
	 *
	 * @hook enqueue_block_assets, enqueue_block_editor_assets
	 * @return void
	 */
	public function enqueue_custom_backdrop_styles() {
		$colors = wp_get_global_settings( array( 'color', 'palette', 'theme' ) );
		ob_start();
		foreach ( $colors as $color ) {
			?>
			.wp-block-prc-block-dialog-element.has-backdrop-color.has-<?php echo esc_attr( $color['slug'] ); ?>-backdrop-color::backdrop  {
				background-color: var(--wp--preset--color--<?php echo esc_attr( $color['slug'] ); ?>);
				// We add opacity globally to the backdrop in style.scss.
			}
			<?php
		}
		$styles   = ob_get_clean();
		$minifier = new Minify\CSS( $styles );
		$styles   = $minifier->minify();
		wp_add_inline_style( 'prc-block-dialog-element-style', $styles );
	}

	/**
	 * Block init
	 *
	 * @hook init
	 * @return void
	 */
	public function block_init() {
		register_block_type_from_metadata( PRC_BLOCK_LIBRARY_DIR . '/build/dialog-element' );
	}
}
