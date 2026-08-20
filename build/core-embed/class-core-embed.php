<?php
/**
 * Core Embed Block
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Core Embed
 * Version:           0.1.0
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */
class Core_Embed {
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
	 * Constructor
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		$this->block_json = prc_block_library_manifest( 'core-embed' );
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
			$loader->add_action( 'init', $this, 'register_embed_handlers' );
			$loader->add_action( 'enqueue_block_editor_assets', $this, 'register_editor_script' );
			$loader->add_filter( 'pre_oembed_result', $this, 'filter_pre_oembed_result', 10, 3 );
		}
	}

	/**
	 * Register assets
	 *
	 * @hook init
	 */
	public function register_assets() {
		$this->editor_script_handle = register_block_script_handle( $this->block_json, 'editorScript' );
	}

	/**
	 * Register editor script
	 *
	 * @hook enqueue_block_editor_assets
	 */
	public function register_editor_script() {
		wp_enqueue_script( $this->editor_script_handle );
	}

	/**
	 * Register a SlideShare embed handler so core/embed does not depend on the removed oEmbed provider.
	 *
	 * @hook init
	 */
	public function register_embed_handlers() {
		wp_embed_register_handler(
			'prc-slideshare',
			'#https?://(?:www\.)?slideshare\.net/.+#i',
			array( $this, 'handle_slideshare_embed' )
		);
	}

	/**
	 * Return iframe HTML for SlideShare URLs before WordPress calls the dead oEmbed API.
	 *
	 * The block editor preview uses the oEmbed REST proxy, which never consults
	 * wp_embed_register_handler. This filter is what keeps "Convert to link" from firing.
	 *
	 * @hook pre_oembed_result
	 * @param mixed  $result Existing oEmbed HTML or null.
	 * @param string $url    Candidate URL.
	 * @param mixed  $args   oEmbed args.
	 * @return mixed
	 */
	public function filter_pre_oembed_result( $result, $url, $args ) {
		if ( ! is_string( $url ) ) {
			return $result;
		}
		$html = self::get_slideshare_embed_html(
			$url,
			is_array( $args ) ? $args : array()
		);
		if ( false === $html ) {
			return $result;
		}
		return $html;
	}

	/**
	 * WP_Embed handler callback for SlideShare URLs.
	 *
	 * @param array  $matches Regex matches.
	 * @param array  $attr    Shortcode attributes.
	 * @param string $url     Original URL.
	 * @param array  $rawattr Raw attributes.
	 * @return string
	 */
	public function handle_slideshare_embed( $matches, $attr, $url, $rawattr ) { // phpcs:ignore Generic.CodeAnalysis.UnusedFunctionParameter.FoundAfterLastUsed
		$html = self::get_slideshare_embed_html(
			(string) $url,
			is_array( $attr ) ? $attr : array()
		);
		if ( false !== $html ) {
			return $html;
		}
		$safe = self::escape_attribute( (string) $url );
		return '<a href="' . $safe . '">' . $safe . '</a>';
	}

	/**
	 * Classify a SlideShare URL and return the iframe src.
	 *
	 * @param string $url URL.
	 * @return array{kind: string, iframe_src: string}|null
	 */
	public static function parse_slideshare_url( string $url ): ?array {
		$parts = parse_url( $url );
		if ( ! is_array( $parts ) ) {
			return null;
		}
		$host = strtolower( (string) ( $parts['host'] ?? '' ) );
		if ( ! in_array( $host, array( 'slideshare.net', 'www.slideshare.net' ), true ) ) {
			return null;
		}

		$path = trim( (string) ( $parts['path'] ?? '' ), '/' );
		if ( '' === $path ) {
			return null;
		}
		$segments = explode( '/', $path );
		$count    = count( $segments );

		if ( $count >= 4 && 'slideshow' === $segments[0] && 'embed_code' === $segments[1] && 'key' === $segments[2] ) {
			$key = $segments[3];
			if ( 1 !== preg_match( '/^[A-Za-z0-9]+$/', $key ) ) {
				return null;
			}
			return array(
				'kind'       => 'embed-key',
				'iframe_src' => 'https://www.slideshare.net/slideshow/embed_code/key/' . $key,
			);
		}

		if ( $count >= 3 && 'slideshow' === $segments[0] && 'embed_code' === $segments[1] && 'key' !== $segments[2] ) {
			$id = $segments[2];
			if ( 1 !== preg_match( '/^[0-9]+$/', $id ) ) {
				return null;
			}
			return array(
				'kind'       => 'embed-numeric',
				'iframe_src' => 'https://www.slideshare.net/slideshow/embed_code/' . $id,
			);
		}

		if ( $count >= 3 && 'slideshow' === $segments[0] && 'embed_code' !== $segments[1] ) {
			$id = $segments[ $count - 1 ];
			if ( 1 === preg_match( '/^[0-9]+$/', $id ) ) {
				return array(
					'kind'       => 'slideshow',
					'iframe_src' => 'https://www.slideshare.net/slideshow/embed_code/' . $id,
				);
			}
			return null;
		}

		$reserved = array(
			'slideshow',
			'static',
			'account',
			'login',
			'signup',
			'search',
			'explore',
			'mobile',
			'api',
			'embed',
			'oembed',
		);
		if ( $count >= 2 && ! in_array( $segments[0], $reserved, true ) && '' !== $segments[1] ) {
			$user = rawurlencode( $segments[0] );
			$slug = rawurlencode( $segments[1] );
			return array(
				'kind'       => 'public',
				'iframe_src' => 'https://www.slideshare.net/' . $user . '/' . $slug,
			);
		}

		return null;
	}

	/**
	 * Build iframe markup for a SlideShare URL.
	 *
	 * @param string $url  URL.
	 * @param array  $args Optional width/height.
	 * @return string|false
	 */
	public static function get_slideshare_embed_html( string $url, array $args = array() ): string|false {
		$parsed = self::parse_slideshare_url( $url );
		if ( null === $parsed ) {
			return false;
		}

		$width = isset( $args['width'] ) ? (int) $args['width'] : 595;
		if ( $width <= 0 ) {
			$width = 595;
		}
		$height = isset( $args['height'] ) ? (int) $args['height'] : (int) round( $width * 485 / 595 );
		if ( $height <= 0 ) {
			$height = (int) round( $width * 485 / 595 );
		}

		$src = self::escape_attribute( $parsed['iframe_src'] );
		return sprintf(
			'<iframe title="%1$s" src="%2$s" width="%3$d" height="%4$d" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" allowfullscreen loading="lazy"></iframe>',
			'SlideShare presentation',
			$src,
			$width,
			$height
		);
	}

	/**
	 * Escape a URL or attribute value without requiring WordPress in CLI tests.
	 *
	 * @param string $value Raw value.
	 * @return string
	 */
	private static function escape_attribute( string $value ): string {
		if ( function_exists( 'esc_url' ) && preg_match( '#^https?://#i', $value ) ) {
			return esc_url( $value );
		}
		if ( function_exists( 'esc_attr' ) ) {
			return esc_attr( $value );
		}
		return htmlspecialchars( $value, ENT_QUOTES, 'UTF-8' );
	}
}
