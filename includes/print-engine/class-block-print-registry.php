<?php
/**
 * Block Print Registry.
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Static registry mapping block names to print callbacks and stylesheets.
 *
 * Other plugins register their callbacks and styles on the
 * `prc_print_engine_register_block_callbacks` action, which fires at init
 * priority 5. Markup callbacks receive the rendered block HTML, the parsed
 * block array, and the current post; they return transformed HTML for print.
 *
 * Two style channels are available:
 *
 * - register_style()       → styles for the print engine web view (?pdf=true).
 *                            Output bare, no @media wrapper. Use for layout,
 *                            typography, and structural rules that apply to the
 *                            print engine page rendered in the browser.
 *
 * - register_print_style() → styles for @media print (browser print dialog /
 *                            html2pdf). Output wrapped in @media print { }.
 *                            Use for rules that should only fire when printing.
 *
 * Both accept an absolute file path (read at collection time) or a raw CSS string.
 *
 * Example:
 *   add_action( 'prc_print_engine_register_block_callbacks', function() {
 *       Block_Print_Registry::register(
 *           'my-plugin/my-block',
 *           function( string $content, array $block, \WP_Post $post ): string {
 *               return '<div class="print-block">' . $content . '</div>';
 *           }
 *       );
 *       // Web view styles (print engine page layout):
 *       Block_Print_Registry::register_style(
 *           'my-plugin/my-block',
 *           '.print-block { page-break-inside: avoid; }'
 *       );
 *       // @media print styles (browser print / pdf generation):
 *       Block_Print_Registry::register_print_style(
 *           'my-plugin/my-block',
 *           __DIR__ . '/print.css'
 *       );
 *   } );
 *
 * @package PRC\Platform\Blocks
 */
class Block_Print_Registry {

	/**
	 * Registered block-name → callable map.
	 * Callback signature: fn(string $block_content, array $block, \WP_Post $post): string
	 *
	 * @var array<string, callable>
	 */
	private static array $callbacks = array();

	/**
	 * Registered block-name → CSS map for the print engine web view (?pdf=true).
	 * Output bare (no @media wrapper).
	 *
	 * @var array<string, string>
	 */
	private static array $styles = array();

	/**
	 * Registered block-name → CSS map for @media print (browser print / html2pdf).
	 * Output wrapped in @media print { }.
	 *
	 * @var array<string, string>
	 */
	private static array $print_styles = array();

	/**
	 * Register a markup callback for a block type in print/PDF view.
	 *
	 * @param string   $block_name Fully-qualified block name (e.g. 'prc-chart-builder/controller').
	 * @param callable $callback   fn(string $block_content, array $block, \WP_Post $post): string
	 *                             Transforms the rendered block HTML for print. Returns transformed HTML.
	 */
	public static function register( string $block_name, callable $callback ): void {
		self::$callbacks[ $block_name ] = $callback;
	}

	/**
	 * Get the registered callback for a block type, if any.
	 *
	 * @param string $block_name Fully-qualified block name.
	 * @return callable|null
	 */
	public static function get( string $block_name ): ?callable {
		return self::$callbacks[ $block_name ] ?? null;
	}

	/**
	 * Check if a block type has a registered markup callback.
	 *
	 * @param string $block_name Fully-qualified block name.
	 * @return bool
	 */
	public static function has( string $block_name ): bool {
		return isset( self::$callbacks[ $block_name ] );
	}

	/**
	 * Register a stylesheet for the print engine web view (?pdf=true).
	 *
	 * CSS is output bare (no @media wrapper) and applies only when the print
	 * engine page is rendered in the browser. Use for layout and typography
	 * rules specific to the print engine page structure.
	 *
	 * Accepts either an absolute file path (read at collection time) or a raw
	 * CSS string (used directly).
	 *
	 * @param string $block_name  Fully-qualified block name.
	 * @param string $css_or_path Absolute file path to a CSS file, or raw CSS string.
	 */
	public static function register_style( string $block_name, string $css_or_path ): void {
		self::$styles[ $block_name ] = $css_or_path;
	}

	/**
	 * Get the raw print-view style entry for a block type (path or CSS string).
	 *
	 * @param string $block_name Fully-qualified block name.
	 * @return string|null
	 */
	public static function get_style( string $block_name ): ?string {
		return self::$styles[ $block_name ] ?? null;
	}

	/**
	 * Get all registered print-view styles as resolved CSS strings.
	 *
	 * File paths are read; raw CSS strings are returned as-is.
	 *
	 * @return array<int, string> Array of CSS strings.
	 */
	public static function get_all_styles(): array {
		return self::resolve_styles( self::$styles );
	}

	/**
	 * Register a stylesheet to be wrapped in @media print.
	 *
	 * CSS is output inside @media print { } and applies when printing via the
	 * browser print dialog or html2pdf. Use for rules that should only fire
	 * during actual print/PDF generation.
	 *
	 * Accepts either an absolute file path (read at collection time) or a raw
	 * CSS string (used directly).
	 *
	 * @param string $block_name  Fully-qualified block name.
	 * @param string $css_or_path Absolute file path to a CSS file, or raw CSS string.
	 */
	public static function register_print_style( string $block_name, string $css_or_path ): void {
		self::$print_styles[ $block_name ] = $css_or_path;
	}

	/**
	 * Get the raw @media-print style entry for a block type (path or CSS string).
	 *
	 * @param string $block_name Fully-qualified block name.
	 * @return string|null
	 */
	public static function get_print_style( string $block_name ): ?string {
		return self::$print_styles[ $block_name ] ?? null;
	}

	/**
	 * Get all registered @media-print styles as resolved CSS strings.
	 *
	 * File paths are read; raw CSS strings are returned as-is.
	 *
	 * @return array<int, string> Array of CSS strings.
	 */
	public static function get_all_print_styles(): array {
		return self::resolve_styles( self::$print_styles );
	}

	/**
	 * Resolve a map of block-name → path-or-CSS into plain CSS strings.
	 *
	 * @param array<string, string> $map
	 * @return array<int, string>
	 */
	private static function resolve_styles( array $map ): array {
		$resolved = array();
		foreach ( $map as $css_or_path ) {
			if ( is_file( $css_or_path ) && is_readable( $css_or_path ) ) {
				// phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents -- Reading local plugin file, not remote.
				$resolved[] = (string) file_get_contents( $css_or_path );
			} else {
				$resolved[] = $css_or_path;
			}
		}
		return $resolved;
	}
}
