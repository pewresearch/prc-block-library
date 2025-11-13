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
class Supports {
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
	 * View script handle
	 *
	 * @var string
	 */
	public $view_script_handle;

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
			$loader->add_action( 'init', $this, 'register_assets' );
			$loader->add_action( 'enqueue_block_editor_assets', $this, 'enqueue_editor_assets' );
			$loader->add_action( 'enqueue_block_assets', $this, 'enqueue_styles' );
			$loader->add_filter( 'block_type_metadata', $this, 'add_attributes', 100, 1 );
			$loader->add_filter( 'render_block', $this, 'add_supports_to_rendered_block', 100, 2 );
		}
	}

	/**
	 * Register assets
	 *
	 * @hook init
	 * @return void
	 */
	public function register_assets() {
		$assets_file      = include plugin_dir_path( __FILE__ ) . '/index.asset.php';
		$view_assets_file = include plugin_dir_path( __FILE__ ) . '/view.asset.php';
		$block_json       = json_decode( file_get_contents( plugin_dir_path( __FILE__ ) . '/block.json' ), true );

		$editor_script_handle = 'prc-block-supports-editor-script';
		$script               = wp_register_script(
			$editor_script_handle,
			plugins_url( 'index.js', __FILE__ ),
			$assets_file['dependencies'],
			$assets_file['version'],
			true
		);
		if ( $script ) {
			$this->editor_script_handle = $editor_script_handle;
		} else {
			do_action( 'qm/debug', 'Failed to register editor script' );
		}

		$style_handle = 'prc-block-supports-style';
		$style        = wp_register_style(
			$style_handle,
			plugins_url( 'style-index.css', __FILE__ ),
			array(),
			$assets_file['version']
		);
		if ( $style ) {
			$this->style_handle = $style_handle;
		} else {
			do_action( 'qm/debug', 'Failed to register style' );
		}

		$view_script_handle = '@prc-block/supports-view-script';
		$module_url         = plugins_url( 'view.js', __FILE__ );
		$module             = wp_register_script_module(
			$view_script_handle,
			$module_url,
			$view_assets_file['dependencies'],
			$view_assets_file['version']
		);
		if ( $module ) {
			$this->view_script_handle = $view_script_handle;
		} else {
			do_action(
				'qm/debug',
				'Failed to register view script module' . print_r(
					array(
						'module_url' => $module_url,
						'handle'     => $view_script_handle,
						'module'     => $module,
					),
					true
				)
			);
		}

		do_action(
			'qm/debug',
			'Registered:' . print_r(
				array(
					'editor_script' => $this->editor_script_handle,
					'style_handle'  => $this->style_handle,
					'view_script'   => $this->view_script_module_handle,
				),
				true
			)
		);
	}

	/**
	 * Register editor assets
	 *
	 * @hook enqueue_block_editor_assets
	 * @return void
	 */
	public function enqueue_editor_assets() {
		wp_enqueue_script( $this->editor_script_handle );
	}

	/**
	 * Register editor style
	 *
	 * @hook enqueue_block_assets
	 * @return void
	 */
	public function enqueue_styles() {
		wp_enqueue_style( $this->style_handle );
		$styles = $this->generate_styles();
		if ( is_wp_error( $styles ) ) {
			return;
		}
		wp_add_inline_style( $this->style_handle, $styles );
	}

	/**
	 * Generate styles for stuck background and text colors.
	 *
	 * @return string
	 */
	public function generate_styles() {
		$colors = wp_get_global_settings( array( 'color', 'palette', 'theme' ) );
		ob_start();
		foreach ( $colors as $color ) {
			$slug = $color['slug'];
			?>
			[class*="wp-block-"].js-is-sticky.has-sticky-background.has-sticky-background-<?php echo $slug; ?>-color,
			[class*="wp-block-"].js-is-stuck.has-sticky-background.has-sticky-background-<?php echo $slug; ?>-color {
				background-color: var(--wp--preset--color--<?php echo $slug; ?>)!important;
			}
			[class*="wp-block-"].js-is-sticky.has-sticky-text.has-sticky-text-<?php echo $slug; ?>-color,
			[class*="wp-block-"].js-is-stuck.has-sticky-text.has-sticky-text-<?php echo $slug; ?>-color {
				color: var(--wp--preset--color--<?php echo $slug; ?>)!important;
			}
			<?php
		}
		$styles   = ob_get_clean();
		$minifier = new Minify\CSS( $styles );
		return $minifier->minify();
	}

	/**
	 * Register additional attributes for supports.
	 *
	 * @hook block_type_metadata 100, 1
	 * @param mixed $metadata Metadata.
	 * @return mixed
	 */
	public function add_attributes( $metadata ) {
		if ( ! is_array( $metadata ) || ! array_key_exists( 'attributes', $metadata ) ) {
			return $metadata;
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
	 * Adds support features to the rendered block.
	 *
	 * @hook render_block 100, 2
	 * @param mixed $block_content
	 * @param mixed $block
	 * @return mixed
	 */
	public function add_supports_to_rendered_block( $block_content, $block ) {
		if ( is_admin() ) {
			return $block_content;
		}

		wp_enqueue_style( $this->style_handle );
		$is_sticky = ! empty( $block['attrs']['style']['position']['type'] ) && 'sticky' === $block['attrs']['style']['position']['type'];
		if ( $is_sticky && $this->view_script_handle ) {
			wp_enqueue_script_module( $this->view_script_module_handle );
		}

		$has_is_sticky_background_color = array_key_exists( 'isStuckBackground', $block['attrs'] ) && ! empty( $block['attrs']['isStuckBackground'] );
		$has_is_sticky_text_color       = array_key_exists( 'isStuckText', $block['attrs'] ) && ! empty( $block['attrs']['isStuckText'] );
		$max_width                      = array_key_exists( 'maxWidth', $block['attrs'] ) ? $block['attrs']['maxWidth'] : array();

		$w = new WP_HTML_Tag_Processor( $block_content );
		if ( $w->next_tag() ) {
			if ( $is_sticky && $this->view_script_handle ) {
				// Init sticky script.
				$w->set_attribute( 'data-wp-init--sticky', 'prc-block/supports::callbacks.onInit' );
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
