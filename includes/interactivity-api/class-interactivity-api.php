<?php
namespace PRC\Platform\Blocks;

class Interactivity_API {
	public static $handle = 'prc-block-library--interactivity-api';
	public $version;

	public function __construct($loader) {
		$this->init($loader);
	}

	public function init($loader) {
		$loader->add_action('enqueue_block_editor_assets', $this, 'init_assets');
		$loader->add_filter('block_type_metadata', $this, 'add_attributes', 100, 1);
		$loader->add_filter('block_type_metadata_settings', $this, 'add_settings', 110, 2);
	}

	/**
	* Register the control assets.
	* @hook enqueue_block_editor_assets
	*/
	public function init_assets() {
		$asset_file = include(  plugin_dir_path( __FILE__ )  . 'build/index.asset.php' );
		wp_enqueue_script(
			self::$handle,
			plugins_url( 'build/index.js', __FILE__ ),
			$asset_file['dependencies'],
			$asset_file['version'],
		);
	}

	/**
	* Add isInteractive (boolean) and interactiveContext (string) attributes to all blocks.
	*
	* @hook block_type_metadata
	* @param mixed $metadata
	* @return mixed
	*/
	public function add_attributes( $metadata ) {
		if ( ! array_key_exists( 'attributes', $metadata ) ) {
			return $metadata;
		}

		// Should this block be interactive?
		if ( ! array_key_exists( 'isInteractive', $metadata['attributes'] ) ) {
			$metadata['attributes']['isInteractive'] = array(
				'type'    => 'boolean',
				'default' => false,
			);
		}

		// The namespace that this block will use to interact with the interactivity api.
		if ( ! array_key_exists( 'interactiveNamespace', $metadata['attributes'] ) ) {
			$metadata['attributes']['interactiveNamespace'] = array(
				'type'    => 'string',
			);
		}

		// Subsume interactivity by whatever block contains this block. This is useful for more complex use cases of the interactivity api where you want the directives of this block to be directly controlled by the parent block. Especially use if you want to render this block out as a template and use in a wp-template directive. See Facet-Tempalte for an example of this.
		if ( ! array_key_exists( 'interactiveSubsumption', $metadata['attributes'] ) ) {
			$metadata['attributes']['interactiveSubsumption'] = array(
				'type'    => 'boolean',
				'default' => false,
			);
		}

		return $metadata;
	}

	/**
	* Add prc-block/interactiveNamespace to the uses_context array for blocks that support interactivity api.
	* @hook block_type_metadata_settings 100, 2
	* @param mixed $settings
	* @param mixed $metadata
	* @return mixed
	*/
	public function add_settings(array $settings, array $metadata) {
		if ( isset($settings['supports']['interactivity']) && $settings['supports']['interactivity'] ) {
			$settings['uses_context'] = array_merge(
				array_key_exists('uses_context', $settings) ? $settings['uses_context'] : array(),
				array(
					"prc-block/interactiveNamespace"
				)
			);
			$settings['provides_context'] = array_merge(
				array_key_exists('provides_context', $settings) ? $settings['provides_context'] : array(),
				array(
					"prc-block/interactiveNamespace" => "interactiveNamespace"
				)
			);
		}
		return $settings;
	}
}
