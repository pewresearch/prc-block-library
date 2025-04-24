<?php
/**
 * Version Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Version
 * Description:       Get the latest version for various PRC_ constants.
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Version {
	/**
	 * Block JSON
	 *
	 * @var null
	 */
	public $block_json = null;

	/**
	 * Block Name
	 *
	 * @var null
	 */
	public $block_name;

	/**
	 * Editor Script Handle
	 *
	 * @var null
	 */
	public $editor_script_handle;

	/**
	 * Constructor
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		$this->block_json = prc_block_library_manifest( 'version' );
		$this->block_name = $this->block_json['name'];
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
			$loader->add_action( 'init', $this, 'register_assets' );
			$loader->add_action( 'enqueue_block_editor_assets', $this, 'register_editor_script' );
		}
	}

	/**
	 * Register assets
	 *
	 * @hook init
	 * @return void
	 */
	public function register_assets() {
		$this->editor_script_handle = register_block_script_handle( $this->block_json, 'editorScript' );
	}

	/**
	 * Register editor script
	 *
	 * @hook enqueue_block_editor_assets
	 * @return void
	 */
	public function register_editor_script() {
		wp_enqueue_script( $this->editor_script_handle );
	}

	/**
	 * Get the version info for the block binding depending on the 'module' source_args given.
	 *
	 * @param array    $source_args The source_args for the block binding.
	 * @param WP_Block $block Block.
	 * @param string   $attribute_name Attribute name.
	 * @return string|null
	 */
	public function get_version_info_for_block_binding( $source_args, $block, $attribute_name ) {
		$block_name = $block->name;
		if ( ! in_array( $block_name, array( 'core/paragraph' ) ) ) {
			return null;
		}
		$module_to_check = $source_args['module'];
		if ( 'platform' === $module_to_check ) {
			return 'Version: ' . PRC_PLATFORM_VERSION . ' "' . PRC_PLATFORM_RELEASE_NAME . '"';
		} if ( 'block-library' === $module_to_check ) {
			return 'Version: ' . PRC_BLOCK_LIBRARY_VERSION;
		}
		return 'Version: ' . PRC_PLATFORM_VERSION . ' "' . PRC_PLATFORM_RELEASE_NAME . '"';
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
		register_block_bindings_source(
			'prc-platform/version',
			array(
				'label'              => __( 'Version Info', 'prc-block-library' ),
				'get_value_callback' => array( $this, 'get_version_info_for_block_binding' ),
			)
		);
	}
}
