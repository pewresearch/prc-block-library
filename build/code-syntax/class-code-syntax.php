<?php
/**
 * Code Syntax Block
 *
 * @package PRC\Platform\Blocks
 */

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
	/**
	 * Monospace font source
	 *
	 * @var string
	 */
	public static $monospace_font_src = 'https://use.typekit.net/lih4wwo.css';

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
			$loader->add_action( 'after_setup_theme', $this, 'register_typekit_editor_font' );
		}
	}

	/**
	 * Render callback for the block
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content    Block content.
	 * @param object $block      Block object.
	 * @return string
	 */
	public function render_callback( $attributes, $content, $block ) {
		wp_enqueue_style( 'prc-font-monospace' );

		$detectedLanguage    = array_key_exists( 'detectedLanguage', $attributes ) ? $attributes['detectedLanguage'] : '';
		$forceLanguage       = array_key_exists( 'forceLanguage', $attributes ) ? $attributes['forceLanguage'] : '';
		$block_wrapper_attrs = get_block_wrapper_attributes();

		return wp_sprintf(
			'<div %1$s data-language="%2$s"><div class="wp-block-prc-block-code-syntax__ui"></div>%3$s</div>',
			$block_wrapper_attrs,
			! empty( $forceLanguage ) ? $forceLanguage : $detectedLanguage,
			$content,
		);
	}

	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @hook init
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		wp_register_style( 'prc-font-monospace', self::$monospace_font_src );
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/code-syntax',
			array(
				'render_callback' => array( $this, 'render_callback' ),
			)
		);
	}

	/**
	 * Register typekit editor font
	 *
	 * @hook after_setup_theme
	 */
	public function register_typekit_editor_font() {
		add_editor_style( self::$monospace_font_src );
	}

	/**
	 * Register typekit view font
	 *
	 * @hook enqueue_block_assets
	 */
	public function register_typekit_view_font() {
		wp_enqueue_style( 'prc-font-monospace' );
	}
}
