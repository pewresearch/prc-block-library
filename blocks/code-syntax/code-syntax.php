<?php
namespace PRC\Platform\Blocks;
/**
 * Block Name:        Code Syntax
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */

class Code_Syntax {
	public static $version = '0.1.0';
	public static $dir = __DIR__;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'block_init' ) );
			add_action( 'wp_enqueue_scripts', array( $this, 'register_typekit_font' ) );
			add_action( 'after_setup_theme', function() {
				// Load monospace font in editor
				add_editor_style('https://use.typekit.net/lih4wwo.css');
			} );
		}
	}

	/**
	* Registers the block using the metadata loaded from the `block.json` file.
	* Behind the scenes, it registers also all assets so they can be enqueued
	* through the block editor in the corresponding context.
	*
	* @see https://developer.wordpress.org/reference/functions/register_block_type/
	*/
	public function block_init() {
		register_block_type( self::$dir . '/build' );
	}

	public function register_typekit_font() {
		wp_register_style( 'prc-font-monospace', 'https://use.typekit.net/lih4wwo.css' );
	}
}

new Code_Syntax(true);
