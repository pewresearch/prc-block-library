<?php
/**
 * Block Visibility
 *
 * @package PRC\Platform\Blocks
 */
namespace PRC\Platform\Blocks;

/**
 * Block Visibility
 *
 * @package PRC\Platform\Blocks
 */
class Block_Visibility {
	/**
	 * The common name for script and style assets
	 *
	 * @var string $asset_name The common name for script and style assets.
	 */
	public static $asset_name = 'prc-block-visibility';

	/**
	 * Constructor
	 *
	 * @param mixed $loader The loader.
	 */
	public function __construct( $loader ) {
		$loader->add_action( 'enqueue_block_editor_assets', $this, 'enqueue_assets', 20 );
		$loader->add_filter( 'block_type_metadata', $this, 'back_compat_core_group_attributes', 100, 1 );
		$loader->add_filter( 'render_block_core/group', $this, 'back_compat_core_group_render', 10, 2 );
	}

	/**
	 * Enqueue block editor assets
	 *
	 * @hook enqueue_block_editor_assets 20
	 */
	public function enqueue_assets() {
		if ( ! is_admin() ) {
			return;
		}
		$asset_file = include plugin_dir_path( __FILE__ ) . 'build/index.asset.php';
		wp_enqueue_style(
			self::$asset_name,
			plugins_url( 'build/style-index.css', __FILE__ ),
			array(),
			$asset_file['version'],
		);

		wp_enqueue_script(
			self::$asset_name,
			plugins_url( 'build/index.js', __FILE__ ),
			$asset_file['dependencies'],
			$asset_file['version'],
			true,
		);
	}

	/**
	 * Register back compatability for core/group block to add visibility classes.
	 *
	 * @hook block_type_metadata 100, 1
	 * @param mixed $metadata Metadata.
	 * @return mixed
	 */
	public function back_compat_core_group_attributes( $metadata ) {
		if ( 'core/group' !== $metadata['name'] ) {
			return $metadata;
		}
		if ( ! array_key_exists( 'responsiveContainerQuery', $metadata['attributes'] ) ) {
			$metadata['attributes']['responsiveContainerQuery'] = array(
				'type'    => 'object',
				'default' => array(
					'hideOnDesktop' => false,
					'hideOnTablet'  => false,
					'hideOnMobile'  => false,
				),
			);
		}
		return $metadata;
	}

	/**
	 * Process back compatability for core/group block to add visibility classes.
	 *
	 * @hook render_block_core/group 10, 2
	 *
	 * @param string $content The block content.
	 * @param array  $block   The block data.
	 * @return string Filtered content.
	 */
	public function back_compat_core_group_render( $content, $block ) {
		$attributes = $block['attrs'];
		$responsive = $attributes['responsiveContainerQuery'] ?? null;
		if ( ! $responsive || ! is_array( $responsive ) ) {
			return $content;
		}
		// Check that the hideOnDesktop, hideOnTablet, and hideOnMobile keys exist.
		if ( ! array_key_exists( 'hideOnDesktop', $responsive ) ) {
			$responsive['hideOnDesktop'] = false;
		}
		if ( ! array_key_exists( 'hideOnTablet', $responsive ) ) {
			$responsive['hideOnTablet'] = false;
		}
		if ( ! array_key_exists( 'hideOnMobile', $responsive ) ) {
			$responsive['hideOnMobile'] = false;
		}
		// Use WP_HTML_Tag_Processor to add classes to the wrapper div.
		$tag = new \WP_HTML_Tag_Processor( $content );
		$tag->next_tag();
		if ( $responsive['hideOnDesktop'] ) {
			$tag->add_class( 'block-visibility-hide-large-screen prc-block-visibility__desktop' );
		}
		if ( $responsive['hideOnTablet'] ) {
			$tag->add_class( 'block-visibility-hide-medium-screen prc-block-visibility__tablet' );
		}
		if ( $responsive['hideOnMobile'] ) {
			$tag->add_class( 'block-visibility-hide-small-screen prc-block-visibility__mobile' );
		}
		return $tag->get_updated_html();
	}
}
