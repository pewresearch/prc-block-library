<?php
/**
 * Color Palette Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Color Palette
 * Description:       Outputs a color square
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */
class Color_Palette {
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
			$loader->add_filter( 'prc_api_endpoints', $this, 'register_endpoint' );
		}
	}

	/**
	 * Register endpoint for getting theme colors
	 *
	 * @hook prc_api_endpoints
	 * @param mixed $endpoints
	 * @return void
	 */
	public function register_endpoint( $endpoints ) {
		array_push(
			$endpoints,
			array(
				'route'               => 'utils/get-theme-color',
				'methods'             => 'GET',
				'callback'            => array( $this, 'restfully_get_color' ),
				'args'                => array(
					'color' => array(
						'validate_callback' => function ( $param, $request, $key ) {
							return is_string( $param );
						},
					),
				),
				'permission_callback' => function () {
					return true;
				},
			)
		);
		return $endpoints;
	}

	/**
	 * Restfully get color
	 *
	 * @param \WP_REST_Request $request
	 * @return \WP_Error|\WP_REST_Response
	 */
	public function restfully_get_color( \WP_REST_Request $request ) {
		$color_slug = $request->get_param( 'color' );
		$colors     = wp_get_global_settings( array( 'color', 'palette', 'theme' ) );
		if ( ! is_array( $colors ) ) {
			return new WP_Error( 'prc-platform-color-palette', 'Failed to get colors' );
		}
		$picked_color = array_filter(
			$colors,
			function ( $color ) use ( $color_slug ) {
				return $color['slug'] === $color_slug;
			}
		);
		if ( empty( $picked_color ) ) {
			return $colors;
		}
		return array_pop( $picked_color );
	}


	/**
	 * Get the entire color palette as a slug => hex map
	 *
	 * @return array
	 */
	private function get_color_palette() {
		$colors = wp_get_global_settings( array( 'color', 'palette', 'theme' ) );
		if ( ! is_array( $colors ) ) {
			return array();
		}

		$palette = array();
		foreach ( $colors as $color ) {
			if ( isset( $color['slug'] ) && isset( $color['color'] ) ) {
				$palette[ $color['slug'] ] = $color['color'];
			}
		}
		return $palette;
	}

	/**
	 * Initialize interactivity state with the full color palette
	 * Only called once per page load
	 */
	private function init_interactivity_state() {
		static $initialized = false;

		if ( $initialized ) {
			return;
		}

		$palette = $this->get_color_palette();

		wp_interactivity_state(
			'prc-block/color-palette',
			array(
				'colorPalette' => $palette,
			)
		);

		$initialized = true;
	}

	/**
	 * Extract color slug from block classes
	 *
	 * @param string $classes Block classes.
	 * @return string|null Color slug or null if not found.
	 */
	private function extract_color_slug_from_classes( $classes ) {
		// Match pattern like "has-{slug}-background-color"
		if ( preg_match( '/has-([a-z0-9\-]+)-background-color/', $classes, $matches ) ) {
			return $matches[1];
		}
		return null;
	}

	/**
	 * Render callback for the block
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content    Block content.
	 * @param object $block      Block object.
	 * @return string
	 */
	public function render_callback( $attributes, $content, $block ) {
		// Initialize the interactivity state once per page
		$this->init_interactivity_state();

		// Get color slug from attributes or extract from classes
		$color_slug = isset( $attributes['colorSlug'] ) ? $attributes['colorSlug'] : '';
		
		// If not in attributes, try to extract from block wrapper classes
		if ( empty( $color_slug ) ) {
			// Get classes from block support
			$block_wrapper_attrs = get_block_wrapper_attributes();
			preg_match( '/class="([^"]*)"/', $block_wrapper_attrs, $class_matches );
			$classes = isset( $class_matches[1] ) ? $class_matches[1] : '';
			$color_slug = $this->extract_color_slug_from_classes( $classes );
		}

		// Get hex value from palette
		$palette = $this->get_color_palette();
		$hex     = isset( $palette[ $color_slug ] ) ? $palette[ $color_slug ] : null;

		// Build context for the Interactivity API
		$context = array(
			'colorSlug'    => $color_slug,
			'hex'          => $hex,
			'clicked'      => false,
			'visible'      => false,
			'disallowCopy' => false,
		);

		$block_wrapper_attrs = get_block_wrapper_attributes(
			array(
				'data-wp-interactive'       => wp_json_encode(
					array(
						'namespace' => 'prc-block/color-palette',
					)
				),
				'data-wp-context'           => wp_json_encode( $context ),
				'data-wp-init'              => 'callbacks.initColor',
				'data-wp-on--click'         => 'actions.copyToClipboard',
				'data-wp-on--mouseenter'    => 'actions.showTooltip',
				'data-wp-on--mouseleave'    => 'actions.hideTooltip',
			)
		);

		// Build display text
		$display_text = $hex ? strtoupper( $hex ) : 'Loading...';

		ob_start();
		?>
		<div <?php echo $block_wrapper_attrs; ?>>
			<span 
				class="color-text"
				data-wp-text="context.clicked ? '✓ Copied!' : (context.hex ? context.hex.toUpperCase() : 'Loading...')"
			>
				<?php echo esc_html( $display_text ); ?>
			</span>
			<div 
				class="color-tooltip" 
				data-wp-class--visible="context.visible"
			>
				<span class="color-tooltip-content">
					<?php echo esc_html( $color_slug ); ?>
				</span>
				<span class="color-tooltip-arrow"></span>
			</div>
		</div>
		<?php
		return ob_get_clean();
	}

	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/color-palette',
			array(
				'render_callback' => array( $this, 'render_callback' ),
			)
		);
	}
}
