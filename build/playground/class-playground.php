<?php
/**
 * Playground Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use WP_Block_Type_Registry;

/**
 * Block Name:        Playground
 * Description:       A dev only block prc-block&#x2F;playground provides a simple way to see all blocks and&#x2F;or components at once, delete it and drop it back in to start fresh.
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Playground {
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
		}
	}

	/**
	 * Construct the template
	 *
	 * @return array
	 */
	public function construct_template() {
		$block_template = array();
		$block_types    = WP_Block_Type_Registry::get_instance()->get_all_registered();
		// filter our prc-block/playground to prevent recursion error
		$block_types = array_filter(
			$block_types,
			function ( $block_type ) {
				return $block_type->name !== 'prc-block/playground';
			}
		);
		// filter out any with block_type->name containing newsletterglue
		$block_types = array_filter(
			$block_types,
			function ( $block_type ) {
				return strpos( $block_type->name, 'newsletterglue' ) === false;
			}
		);
		// filter out any with block_type->parent that have non null values
		$block_types = array_filter(
			$block_types,
			function ( $block_type ) {
				return is_null( $block_type->parent );
			}
		);
		foreach ( $block_types as $block_type ) {
			$block_template[] = array( $block_type->name, array() );
		}
		return $block_template;
	}

	/**
	 * Render the block, only if its not on production.
	 *
	 * @param array  $attributes Block attributes
	 * @param string $content Block content
	 * @param array  $block WP_Block object
	 * @return string
	 */
	public function render_block_callback( $attributes, $content, $block ) {
		if ( 'production' === wp_get_environment_type() ) {
			return;
		}

		$wrapper_attributes = get_block_wrapper_attributes();

		return wp_sprintf(
			'<div %1$s>%2$s</div>',
			$wrapper_attributes,
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
		if ( 'production' === wp_get_environment_type() ) {
			return;
		}

		// Construct the template BEFORE we register the playground block, otherwise we get a recursion error.
		$template = $this->construct_template();

		$block                = register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/playground',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
		$block                = (array) $block;
		$editor_script_handle = $block['editor_script_handles'][0];
		wp_localize_script(
			$editor_script_handle,
			'prcPlayground',
			array(
				'blockTemplate' => $template,
			)
		);
	}
}
