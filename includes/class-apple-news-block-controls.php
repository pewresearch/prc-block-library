<?php
/**
 * Apple News inspector attributes for core/image and core/group.
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Registers the namespaced appleNews block attribute used by the inspector.
 */
class Apple_News_Block_Controls {

	/**
	 * Blocks that expose the Apple News inspector panel.
	 *
	 * @var string[]
	 */
	public const BLOCKS = array( 'core/image', 'core/group' );

	/**
	 * Constructor.
	 *
	 * @param Loader $loader Hook loader.
	 */
	public function __construct( $loader ) {
		$loader->add_filter( 'block_type_metadata', $this, 'add_attributes', 100, 1 );
	}

	/**
	 * Register appleNews on image and group without changing web render.
	 *
	 * @hook block_type_metadata 100, 1
	 *
	 * @param mixed $metadata Block metadata.
	 * @return mixed
	 */
	public function add_attributes( $metadata ) {
		if ( ! is_array( $metadata ) || ! isset( $metadata['name'] ) ) {
			return $metadata;
		}

		if ( ! in_array( $metadata['name'], self::BLOCKS, true ) ) {
			return $metadata;
		}

		if ( ! isset( $metadata['attributes'] ) || ! is_array( $metadata['attributes'] ) ) {
			$metadata['attributes'] = array();
		}

		if ( ! array_key_exists( 'appleNews', $metadata['attributes'] ) ) {
			$metadata['attributes']['appleNews'] = array(
				'type'    => 'object',
				'default' => array(),
			);
		}

		return $metadata;
	}
}
