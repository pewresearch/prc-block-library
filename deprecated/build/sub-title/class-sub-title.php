<?php
/**
 * Sub Title Block (deprecated)
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

if ( defined( 'WP_CLI' ) && \WP_CLI ) {
	require_once __DIR__ . '/class-sub-title-migrate-cli.php';
}

/**
 * Block Name:        Post Sub-Title (deprecated)
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Sub_Title {
	/**
	 * Loader.
	 *
	 * @var mixed
	 */
	public $loader;

	/**
	 * Constructor
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		$this->loader = $loader;
		$this->init();
	}

	/**
	 * Initialize the block
	 */
	public function init() {
		$this->loader->add_action( 'init', $this, 'block_init' );
	}

	/**
	 * Render callback for legacy block instances.
	 *
	 * Unmigrated in-content duplicates are suppressed on the frontend.
	 * Templates and patterns should use the core/heading sub-title variation instead.
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content    Block content.
	 * @param object $block      Block object.
	 * @return string
	 */
	public function render_callback( $attributes, $content, $block ) {
		return '';
	}

	/**
	 * Registers the deprecated block using metadata from the deprecated build directory.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/deprecated/build/sub-title',
			array(
				'render_callback' => array( $this, 'render_callback' ),
			)
		);
	}
}
