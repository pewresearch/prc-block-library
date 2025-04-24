<?php
/**
 * Core Group Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

use WP_HTML_Tag_Processor;
use MatthiasMullie\Minify;

/**
 * Block Name:        Core Group
 * Version:           1.0.0
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */
class Core_Group {
	/**
	 * Block JSON
	 *
	 * @var array
	 */
	public $block_json;

	/**
	 * Editor script handle
	 *
	 * @var string
	 */
	public $editor_script_handle;

	/**
	 * Style handle
	 *
	 * @var string
	 */
	public $style_handle;

	/**
	 * View script module handle
	 *
	 * @var string
	 */
	public $view_script_module_handle;

	/**
	 * Size styles
	 *
	 * @var array
	 */
	public static $size_styles = array(
		array(
			'name'         => 'fluid',
			'label'        => 'Fluid',
			'inline_style' => '.wp-block-group.is-style-fluid{width: 100%; max-width: 100%}',
		),
		array(
			'name'         => '200-wide',
			'label'        => '200px Wide',
			'inline_style' => '.wp-block-group.is-style-200-wide, .wp-block[data-type="core/group"].is-style-200-wide {width: 100%!important; max-width: 200px!important}',
		),
		array(
			'name'         => '250-wide',
			'label'        => '250px Wide',
			'inline_style' => '.wp-block-group.is-style-250-wide, .wp-block[data-type="core/group"].is-style-250-wide {width: 100%!important; max-width: 250px!important}',
		),
		array(
			'name'         => '300-wide',
			'label'        => '300px Wide',
			'inline_style' => '.wp-block-group.is-style-300-wide, .wp-block[data-type="core/group"].is-style-300-wide {width: 100%!important; max-width: 300px!important}',
		),
		array(
			'name'         => '320-wide',
			'label'        => '320px Wide (half the content well)',
			'inline_style' => '.wp-block-group.is-style-320-wide, .wp-block[data-type="core/group"].is-style-320-wide {width: 100%!important; max-width: 320px!important}',
		),
		array(
			'name'         => '420-wide',
			'label'        => '420px Wide',
			'inline_style' => '.wp-block-group.is-style-420-wide, .wp-block[data-type="core/group"].is-style-420-wide {width: 100%!important; max-width: 420px!important}',
		),
		array(
			'name'         => '640-wide',
			'label'        => '640px Wide (full content well)',
			'inline_style' => '.wp-block-group.is-style-640-wide, .wp-block[data-type="core/group"].is-style-640-wide {width: 100%!important; max-width: 640px!important}',
		),
		array(
			'name'         => 'dynamic-wide',
			'label'        => 'Dynamic Wide Template',
			'inline_style' => '.wp-block-group.is-style-dynamic-wide, .wp-block[data-type="core/group"].is-style-dynamic-wide {width: 100%!important; max-width: var(--wp--custom--content-size-wide)!important}',
		),
		array(
			'name'         => 'collapse-row-on-mobile',
			'label'        => 'Collapse Row on Mobile',
			'inline_style' => '.wp-block-group.is-style-collapse-row-on-mobile, .wp-block[data-type="core/group"].is-style-collapse-row-on-mobile {width: 100%!important; max-width: 100%!important}',
		),
	);

	/**
	 * Constructor
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		$block_json       = prc_block_library_manifest( 'core-group' );
		$this->block_json = $block_json;
		$this->init( $loader );
	}

	/**
	 * Initialize the block
	 *
	 * @param mixed $loader Loader.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'register_new_styles', 10 );
			$loader->add_action( 'init', $this, 'register_assets' );
			$loader->add_action( 'enqueue_block_editor_assets', $this, 'register_editor_assets' );
			$loader->add_action( 'enqueue_block_assets', $this, 'register_editor_style' );
			$loader->add_filter( 'block_type_metadata', $this, 'add_attributes', 100, 1 );
			$loader->add_filter( 'block_type_metadata_settings', $this, 'add_settings', 100, 2 );
			$loader->add_filter( 'render_block', $this, 'render', 100, 2 );
		}
	}

	/**
	 * Register new styles
	 *
	 * @hook init
	 * @return void
	 */
	public function register_new_styles() {
		foreach ( self::$size_styles as $style_args ) {
			register_block_style(
				'core/group',
				$style_args,
			);
		}
	}

	/**
	 * Register assets
	 *
	 * @hook init
	 * @return void
	 */
	public function register_assets() {
		$this->editor_script_handle      = register_block_script_handle( $this->block_json, 'editorScript' );
		$this->style_handle              = register_block_style_handle( $this->block_json, 'style' );
		$this->view_script_module_handle = register_block_script_module_id( $this->block_json, 'viewScriptModule' );
	}

	/**
	 * Register editor assets
	 *
	 * @hook enqueue_block_editor_assets
	 * @return void
	 */
	public function register_editor_assets() {
		wp_enqueue_script( $this->editor_script_handle );
	}

	/**
	 * Register editor style
	 *
	 * @hook enqueue_block_assets
	 * @return void
	 */
	public function register_editor_style() {
		wp_enqueue_style( $this->style_handle );
		$styles = $this->generate_interior_divider_styles();
		if ( is_wp_error( $styles ) ) {
			return;
		}
		wp_add_inline_style( $this->style_handle, $styles );
	}

	/**
	 * Generate interior divider styles
	 *
	 * @return string
	 */
	public function generate_interior_divider_styles() {
		$colors = wp_get_global_settings( array( 'color', 'palette', 'theme' ) );
		ob_start();
		foreach ( $colors as $color ) {
			$slug = $color['slug'];
			?>
			.wp-block-group.has-interior-divider.has-<?php echo $slug; ?>-interior-divider-color {
				--divider-color: var(--wp--preset--color--<?php echo $slug; ?>);
			}
			.wp-block-group.js-is-sticky.has-sticky-background.has-sticky-background-<?php echo $slug; ?>-color,
			.wp-block-group.js-is-stuck.has-sticky-background.has-sticky-background-<?php echo $slug; ?>-color {
				background-color: var(--wp--preset--color--<?php echo $slug; ?>)!important;
			}
			.wp-block-group.js-is-sticky.has-sticky-text.has-sticky-text-<?php echo $slug; ?>-color,
			.wp-block-group.js-is-stuck.has-sticky-text.has-sticky-text-<?php echo $slug; ?>-color {
				color: var(--wp--preset--color--<?php echo $slug; ?>)!important;
			}
			<?php
		}
		$styles   = ob_get_clean();
		$minifier = new Minify\CSS( $styles );
		return $minifier->minify();
	}

	/**
	 * Register additional attributes for the core-group block
	 *
	 * @hook block_type_metadata 100, 1
	 * @param mixed $metadata Metadata.
	 * @return mixed
	 */
	public function add_attributes( $metadata ) {
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
		if ( ! array_key_exists( 'maxWidth', $metadata['attributes'] ) ) {
			$metadata['attributes']['maxWidth'] = array(
				'type'    => 'object',
				'default' => array(
					'desktop' => null,
					'tablet'  => null,
					'mobile'  => null,
				),
			);
		}
		if ( ! array_key_exists( 'dividerColor', $metadata['attributes'] ) ) {
			$metadata['attributes']['dividerColor'] = array(
				'type' => 'string',
			);
		}
		if ( ! array_key_exists( 'isStuckBackground', $metadata['attributes'] ) ) {
			$metadata['attributes']['isStuckBackground'] = array(
				'type' => 'string',
			);
		}
		if ( ! array_key_exists( 'isStuckText', $metadata['attributes'] ) ) {
			$metadata['attributes']['isStuckText'] = array(
				'type' => 'string',
			);
		}
		return $metadata;
	}

	/**
	 * Register additional settings, like context, for the core-group block.
	 * Currently we're allowing the group block to have grid context.
	 * There is no active use case for this, more an experiment to see what uses may emerge.
	 *
	 * @hook block_type_metadata_settings 100, 2
	 * @param mixed $settings
	 * @param mixed $metadata
	 * @return mixed
	 */
	public function add_settings( array $settings, array $metadata ) {
		if ( 'core/group' === $metadata['name'] ) {
			$settings['supports']['interactivity'] = true;
			$settings['uses_context']              = array_merge(
				array_key_exists( 'uses_context', $settings ) ? $settings['uses_context'] : array(),
				array(
					'grid/column/desktop/span',
					'grid/column/desktop/start',
					'grid/column/desktop/row',
					'grid/column/tablet/span',
					'grid/column/tablet/start',
					'grid/column/tablet/row',
					'grid/column/mobile/span',
					'grid/column/mobile/start',
					'grid/column/mobile/row',
				)
			);
		}
		return $settings;
	}

	/**
	 * Render the core/group block
	 *
	 * @hook render_block 100, 2
	 * @param mixed $block_content
	 * @param mixed $block
	 * @return mixed
	 */
	public function render( $block_content, $block ) {
		if ( 'core/group' !== $block['blockName'] || is_admin() ) {
			return $block_content;
		}

		wp_enqueue_style( $this->style_handle );
		// Check if $block_content contains is-style-baseball-card
		if ( strpos( $block_content, 'is-style-baseball-card' ) !== false ) {
			wp_enqueue_style( 'prc-block-library--baseball-card' );
		}
		$is_sticky = ! empty( $block['attrs']['style']['position']['type'] ) && 'sticky' === $block['attrs']['style']['position']['type'];
		if ( $is_sticky ) {
			wp_enqueue_script_module( $this->view_script_module_handle );
		}

		$responsive_options             = array_key_exists( 'responsiveContainerQuery', $block['attrs'] ) ? $block['attrs']['responsiveContainerQuery'] : array();
		$hide_on_desktop                = array_key_exists( 'hideOnDesktop', $responsive_options ) ? $responsive_options['hideOnDesktop'] : false;
		$hide_on_tablet                 = array_key_exists( 'hideOnTablet', $responsive_options ) ? $responsive_options['hideOnTablet'] : false;
		$hide_on_mobile                 = array_key_exists( 'hideOnMobile', $responsive_options ) ? $responsive_options['hideOnMobile'] : false;
		$is_responsive                  = $hide_on_desktop || $hide_on_tablet || $hide_on_mobile;
		$has_divider_color              = array_key_exists( 'dividerColor', $block['attrs'] ) && ! empty( $block['attrs']['dividerColor'] );
		$has_is_sticky_background_color = array_key_exists( 'isStuckBackground', $block['attrs'] ) && ! empty( $block['attrs']['isStuckBackground'] );
		$has_is_sticky_text_color       = array_key_exists( 'isStuckText', $block['attrs'] ) && ! empty( $block['attrs']['isStuckText'] );
		$max_width                      = array_key_exists( 'maxWidth', $block['attrs'] ) ? $block['attrs']['maxWidth'] : array();

		$w = new WP_HTML_Tag_Processor( $block_content );
		if ( $w->next_tag() ) {

			if ( $is_sticky ) {
				$w->set_attribute(
					'data-wp-interactive',
					wp_json_encode(
						array(
							'namespace' => 'prc-block/core-group',
						)
					)
				);
				$w->set_attribute( 'data-wp-init--sticky', 'callbacks.onInit' );
				if ( $has_is_sticky_background_color ) {
					$w->add_class( 'has-sticky-background' );
					$w->add_class(
						wp_sprintf(
							'has-sticky-background-%s-color',
							esc_attr( $block['attrs']['isStuckBackground'] )
						)
					);
				}
				if ( $has_is_sticky_text_color ) {
					$w->add_class( 'has-sticky-text' );
					$w->add_class(
						wp_sprintf(
							'has-sticky-text-%s-color',
							esc_attr( $block['attrs']['isStuckText'] )
						)
					);
				}
			}

			if ( $is_responsive && $hide_on_desktop ) {
				$w->set_attribute( 'data-hide-on-desktop', 'true' );
			}
			if ( $is_responsive && $hide_on_tablet ) {
				$w->set_attribute( 'data-hide-on-tablet', 'true' );
			}
			if ( $is_responsive && $hide_on_mobile ) {
				$w->set_attribute( 'data-hide-on-mobile', 'true' );
			}
			if ( $has_divider_color ) {
				$w->add_class( 'has-interior-divider' );
				$w->add_class( 'has-' . $block['attrs']['dividerColor'] . '-interior-divider-color' );
			}
			if ( $max_width ) {
				$w->add_class( 'has-max-width-constraint' );

				$styles = array(
					'--max-width__desktop: ' . $max_width['desktop'] . ';',
					'--max-width__tablet: ' . $max_width['tablet'] . ';',
					'--max-width__mobile: ' . $max_width['mobile'] . ';',
				);
				$styles = implode( ' ', $styles );
				// Add the styles to the style attribute, create if it doesnt exist, add to if it does.
				$existing_styles = $w->get_attribute( 'style' );
				if ( $existing_styles ) {
					// Sanity check.
					$existing_styles = rtrim( $existing_styles );
					$existing_styles = rtrim( $existing_styles, ';' ) . ';';
					$styles          = $existing_styles . ' ' . $styles;
				}
				$w->set_attribute( 'style', $styles );
			}
		}

		return $w->get_updated_html();
	}
}
