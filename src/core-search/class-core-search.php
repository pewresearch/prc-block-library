<?php
/**
 * Core Search Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Core Search
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Core_Search {
	/**
	 * Block name
	 *
	 * @var string
	 */
	public $block_name = 'core/search';

	/**
	 * Block JSON
	 *
	 * @var array
	 */
	public $block_json;

	/**
	 * Style handle
	 *
	 * @var string
	 */
	public $style_handle;

	/**
	 * Constructor
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		$this->block_json = prc_block_library_manifest( 'core-search' );
		$this->init( $loader );
	}

	/**
	 * Initialize the block
	 *
	 * @param mixed $loader Loader.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'register_assets' );
			$loader->add_action( 'enqueue_block_assets', $this, 'register_style' );
			$loader->add_filter( 'render_block', $this, 'render', 100, 2 );
		}
	}

	/**
	 * Register assets
	 *
	 * @hook init
	 * @return void
	 */
	public function register_assets() {
		$this->style_handle = register_block_style_handle(
			$this->block_json,
			'style'
		);
	}

	/**
	 * Register style
	 *
	 * @hook enqueue_block_assets
	 * @return void
	 */
	public function register_style() {
		wp_enqueue_style( $this->style_handle );
	}

	/**
	 * Render the core/search block
	 *
	 * @hook render_block
	 * @param string $block_content Block content.
	 * @param mixed  $block Block.
	 * @return mixed
	 */
	public function render( $block_content, $block ) {
		if ( $this->block_name !== $block['blockName'] || is_admin() ) {
			return $block_content;
		}

		$post_type = get_post_type();

		wp_enqueue_style( $this->style_handle );

		// For Decoded searches, ensure submissions include ep_filter_formats=decoded via hidden input.
		if ( is_string( $block_content ) && 'decoded' === $post_type ) {
			$already_present = ( false !== stripos( $block_content, 'name="ep_filter_formats"' ) ) || ( false !== stripos( $block_content, "name='ep_filter_formats'" ) );
			if ( ! $already_present ) {
				$hidden_input  = '<input type="hidden" name="ep_filter_formats" value="decoded" />';
				$block_content = preg_replace( '/<\\/form>/i', $hidden_input . '</form>', $block_content, 1 );
			}
		}

		return $block_content;
	}
}
