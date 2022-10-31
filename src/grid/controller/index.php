<?php
use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/block-name` block.
 *
 * @package gutenberg
 */

class Grid_Controller extends PRC_Block_Library {
	public static $block_name = 'prc-block/grid-controller';
	public static $version = 1.0;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	/**
	 * Build an array with CSS classes and inline styles defining the colors
	 * which will be applied to the grid controller markup in the front-end.
	 *
	 * @param array $attributes Grid Controller block attributes.
	 *
	 * @return array Colors CSS classes.
	 */
	public function build_css_colors( $attributes ) {
		$color_css_classes = array();

		// Text color.
		$has_named_text_color  = array_key_exists( 'textColor', $attributes );

		// If has text color.
		if ( $has_named_text_color ) {
			// Add has-text-color class.
			$color_css_classes[] = 'has-text-color';
		}

		if ( $has_named_text_color ) {
			// Add the color class.
			$color_css_classes[] = sprintf( 'has-%s-color', $attributes['textColor'] );
		}

		// Background color.
		$has_named_background_color  = array_key_exists( 'backgroundColor', $attributes );

		// If has background color.
		if ( $has_named_background_color ) {
			// Add has-background class.
			$color_css_classes[] = 'has-background';
		}

		if ( $has_named_background_color ) {
			// Add the background-color class.
			$color_css_classes[] = sprintf( 'has-%s-background-color', $attributes['backgroundColor'] );
		}

		// Divider color.
		$has_named_divider_color  = array_key_exists( 'dividerColor', $attributes );

		// If has divider color.
		if ( $has_named_divider_color ) {
			// Add has-divider class.
			$color_css_classes[] = 'has-divider';
		}

		if ( $has_named_divider_color ) {
			// Add the divider color class.
			$color_css_classes[] = sprintf( 'has-%s-divider-color', $attributes['dividerColor'] );
		}

		return $color_css_classes;
	}

	/**
	 * Build an array with CSS classes and inline styles defining the font sizes
	 * which will be applied to the grid controller markup in the front-end.
	 *
	 * @param array $attributes Grid Controller block attributes.
	 *
	 * @return array Font size CSS classes and inline styles.
	 */
	function block_core_navigation_build_css_font_sizes( $attributes ) {
		// CSS classes.
		$font_sizes = array(
			'css_classes'   => array(),
			'inline_styles' => '',
		);

		$has_named_font_size  = array_key_exists( 'fontSize', $attributes );
		$has_custom_font_size = array_key_exists( 'customFontSize', $attributes );

		if ( $has_named_font_size ) {
			// Add the font size class.
			$font_sizes['css_classes'][] = sprintf( 'has-%s-font-size', $attributes['fontSize'] );
		} elseif ( $has_custom_font_size ) {
			// Add the custom font size inline style.
			$font_sizes['inline_styles'] = sprintf( 'font-size: %spx;', $attributes['customFontSize'] );
		}

		return $font_sizes;
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$css_classes = $this->build_css_colors($attributes);
		$block_attrs = get_block_wrapper_attributes(array(
			'class' => classNames($css_classes),
		));

		return wp_sprintf(
			'<div %1$s>%2$s</div>',
			$block_attrs,
			$content
		);
	}

	public function register_block() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', self::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'grid-controller',
			array(
				'js'        => true,
				'css'       => true,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . '/controller',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'style'           => array_pop( $registered['css'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Grid_Controller( true );
