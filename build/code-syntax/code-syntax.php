<?php
namespace PRC\Platform\Blocks;
/**
 * Block Name:        Code Syntax
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */

class Code_Syntax {
	public static $monospace_font_src = 'https://use.typekit.net/lih4wwo.css';

	public function __construct($loader) {
		$this->init($loader);
	}
	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
			$loader->add_action( 'after_setup_theme', $this, 'register_typekit_editor_font' );
		}
	}

	/**
	* Registers the block using the metadata loaded from the `block.json` file.
	* Behind the scenes, it registers also all assets so they can be enqueued
	* through the block editor in the corresponding context.
	* @hook init
	*
	* @see https://developer.wordpress.org/reference/functions/register_block_type/
	*/
	public function block_init() {
		wp_register_style( 'prc-font-monospace', self::$monospace_font_src );
		register_block_type_from_metadata( PRC_BLOCK_LIBRARY_DIR . '/build/code-syntax', [
			'render_callback' => [$this, 'render_block_callback'],
		] );
	}

	/**
	 * @hook after_setup_theme
	 */
	public function register_typekit_editor_font() {
		add_editor_style(self::$monospace_font_src);
	}

	/**
	 * @hook enqueue_block_assets
	 * @return void
	 */
	public function register_typekit_view_font() {
		wp_enqueue_style( 'prc-font-monospace' );
	}
}

