<?php
/**
 * Logo Block
 *
 * Logo SVG assets live in the shared /images/logos/ directory (wp-content/images/logos/)
 * rather than inside this plugin. Both the editor (via localized JS data) and the
 * PHP render reference that single location. If the assets directory is missing the
 * block silently skips registration.
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Logo
 * Version:           0.1.0
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Logo {

	/**
	 * Style handle for the logo block
	 *
	 * @var string
	 */
	public static $style_handle = 'prc-block-logo-style';

	/**
	 * Shared logo assets directory relative to WP_CONTENT_DIR / content_url().
	 *
	 * @var string
	 */
	private const ASSETS_DIR = 'images/logos/';

	/**
	 * Map of block style class suffix to SVG filename.
	 *
	 * @var array<string, string>
	 */
	private const STYLE_TO_ASSET = array(
		'primary-only'         => 'primary.svg',
		'primary-stable-white' => 'primary-white.svg',
		'alt-only'             => 'alternate.svg',
		'alt-stable-white'     => 'alternate-white.svg',
		'decoded-only'         => 'decoded.svg',
		'symbol-only'          => 'symbol.svg',
		'symbol-stable-white'  => 'symbol-white.svg',
		'pew-knight-only'      => 'pew-knight.svg',
	);

	/**
	 * Map of block style to light-mode asset filename for Safari/WebKit / Interactivity context.
	 * Dedicated light files have no prefers-color-scheme media query, so they stay
	 * dark-on-light even when the OS is in dark mode and the visitor has forced light.
	 *
	 * @var array<string, string>
	 */
	private const STYLE_TO_LIGHT_ASSET = array(
		'primary-only'         => 'primary-light.svg',
		'primary-stable-white' => 'primary-white.svg',
		'alt-only'             => 'alternate-light.svg',
		'alt-stable-white'     => 'alternate-white.svg',
		'decoded-only'         => 'decoded-light.svg',
		'symbol-only'          => 'symbol-light.svg',
		'symbol-stable-white'  => 'symbol-white.svg',
		'pew-knight-only'      => 'pew-knight-light.svg',
	);

	/**
	 * Map of block style to dark-mode asset filename for Safari/WebKit / Interactivity context.
	 * Used when prefers-color-scheme: dark is not applied inside SVG img on Safari/WebKit.
	 *
	 * @var array<string, string>
	 */
	private const STYLE_TO_DARK_ASSET = array(
		'primary-only'         => 'primary-white.svg',
		'primary-stable-white' => 'primary-white.svg',
		'alt-only'             => 'alternate-white.svg',
		'alt-stable-white'     => 'alternate-white.svg',
		'decoded-only'         => 'decoded-white.svg',
		'symbol-only'          => 'symbol-white.svg',
		'symbol-stable-white'  => 'symbol-white.svg',
		'pew-knight-only'      => 'pew-knight-logo-dark.svg',
	);

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
	 * Whether the shared logo assets directory exists and contains the
	 * primary logo (used as a canary for the whole set).
	 */
	private function assets_available(): bool {
		return is_file( WP_CONTENT_DIR . '/' . self::ASSETS_DIR . 'primary.svg' );
	}

	/**
	 * Gets the active logo style from block className.
	 *
	 * @param string $class_name Block className (e.g. "wp-block-prc-block-logo is-style-primary-only").
	 * @return string Style slug or 'primary-only' as default.
	 */
	private function get_style_from_classname( $class_name ) {
		if ( ! is_string( $class_name ) || '' === $class_name ) {
			return 'primary-only';
		}
		if ( preg_match( '/is-style-([a-z0-9-]+)/', $class_name, $m ) && isset( self::STYLE_TO_ASSET[ $m[1] ] ) ) {
			return $m[1];
		}
		return 'primary-only';
	}

	/**
	 * Gets the SVG URL for a given asset filename from the shared logos directory.
	 *
	 * @param string $filename Asset filename (e.g. 'primary.svg').
	 * @return string URL or empty string if not found.
	 */
	private function get_logo_url( $filename ) {
		$path = WP_CONTENT_DIR . '/' . self::ASSETS_DIR . $filename;
		if ( ! is_file( $path ) ) {
			do_action( 'qm/warn', 'Logo asset not found: ' . $filename );
			return '';
		}
		return content_url( self::ASSETS_DIR . $filename );
	}

	/**
	 * Renders the block callback for the Logo block.
	 *
	 * @param array     $attributes Block attributes.
	 * @param string    $content Block content.
	 * @param \WP_Block $block Block object.
	 * @return string
	 */
	public function render_block_callback( $attributes, $content, $block ) {
		$class_name    = isset( $attributes['className'] ) ? $attributes['className'] : '';
		$width         = isset( $attributes['width'] ) ? (int) $attributes['width'] : null;
		$justification = isset( $attributes['justification'] ) ? $attributes['justification'] : 'left';

		$style = $this->get_style_from_classname( $class_name );
		$asset = self::STYLE_TO_ASSET[ $style ] ?? 'primary.svg';
		$url   = $this->get_logo_url( $asset );

		if ( '' === $url ) {
			return '';
		}

		$light_asset = self::STYLE_TO_LIGHT_ASSET[ $style ] ?? $asset;
		$light_url   = $this->get_logo_url( $light_asset );
		if ( '' === $light_url ) {
			$light_url = $url;
		}

		$dark_asset = self::STYLE_TO_DARK_ASSET[ $style ] ?? $asset;
		$dark_url   = $this->get_logo_url( $dark_asset );
		if ( '' === $dark_url ) {
			$dark_url = $url;
		}

		$block_wrapper_attrs = get_block_wrapper_attributes(
			array(
				'class'                        => \PRC\BlockUtils\classNames(
					$class_name,
					array(
						'item-justified-left'   => 'left' === $justification,
						'item-justified-center' => 'center' === $justification,
						'item-justified-right'  => 'right' === $justification,
					)
				),
				'data-wp-interactive'          => wp_json_encode(
					array(
						'namespace' => 'prc-block/logo',
					)
				),
				'data-wp-context'              => wp_json_encode(
					array(
						'srcLight'   => $light_url,
						'srcDark'    => $dark_url,
						'currentSrc' => $url,
					)
				),
				'data-wp-init'                 => 'callbacks.setupSafariColorScheme',
				'data-wp-watch--safari-scheme' => 'callbacks.applySafariColorScheme',
			)
		);

		$width_style = null !== $width ? sprintf( 'max-width: %dpx;', $width ) : '';

		$site_url = get_site_url();
		$href     = ( 'decoded-only' === $style ) ? $site_url . '/decoded' : $site_url;

		$img = sprintf(
			'<img src="%1$s" alt="%2$s" loading="eager" data-wp-bind--src="context.currentSrc" />',
			esc_url( $url ),
			esc_attr__( 'Return to Home', 'pewresearch-logo' )
		);

		$link = sprintf(
			'<a href="%1$s" class="wp-block-prc-block-logo__link">%2$s</a>',
			esc_url( $href ),
			$img // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- img is built from esc_url
		);

		$inner = sprintf(
			'<div class="wp-block-prc-block-logo__dimensions" style="%1$s"><div class="wp-block-prc-block-logo__inner">%2$s</div></div>',
			esc_attr( $width_style ),
			$link // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- link built from esc_url/esc_attr
		);

		return sprintf(
			'<div %1$s>%2$s</div>',
			$block_wrapper_attrs,
			$inner // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- constructed from escaped values
		);
	}

	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 * Gracefully skips registration when the shared logo assets are not present.
	 *
	 * @hook init
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		if ( ! $this->assets_available() ) {
			do_action( 'qm/warn', 'Logo block: shared assets not found at ' . self::ASSETS_DIR . ', block not registered.' );
			return;
		}

		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/logo',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);

		$base_url   = content_url( self::ASSETS_DIR );
		$style_urls = array();
		foreach ( self::STYLE_TO_ASSET as $style => $filename ) {
			$style_urls[ $style ] = $base_url . $filename;
		}
		wp_add_inline_script(
			'prc-block-logo-editor-script',
			sprintf( 'window.prcBlockLogoAssets = %s;', wp_json_encode( $style_urls ) ),
			'before'
		);
	}
}
