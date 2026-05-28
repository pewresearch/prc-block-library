<?php
/**
 * CLI checks for carousel controller color sanitization.
 *
 * Run from prc-block-library: php tests/carousel-controller-resolve-color-php-test.php
 *
 * @package PRC\Platform\Blocks
 */

require_once dirname( __DIR__ ) . '/src/carousel-controller/class-carousel-controller.php';

use PRC\Platform\Blocks\Carousel_Controller;

/**
 * @param bool   $cond Condition.
 * @param string $msg  Message.
 */
function prc_carousel_color_assert( $cond, $msg ) {
	if ( ! $cond ) {
		fwrite( STDERR, "FAIL: $msg\n" );
		exit( 1 );
	}
}

/**
 * @param string $value Input color attribute.
 * @return string
 */
function prc_resolve_carousel_color( $value ) {
	$controller = new Carousel_Controller( null );
	$method     = new ReflectionMethod( Carousel_Controller::class, 'resolve_color_value' );
	$method->setAccessible( true );

	return $method->invoke( $controller, $value );
}

if ( ! function_exists( 'sanitize_html_class' ) ) {
	/**
	 * Minimal stub for CLI when WordPress is not bootstrapped.
	 *
	 * @param string $class_name Class or slug fragment.
	 * @return string
	 */
	function sanitize_html_class( $class_name ) {
		$class_name = strtolower( (string) $class_name );
		$class_name = preg_replace( '/[^a-z0-9-]+/', '', $class_name );

		return is_string( $class_name ) ? $class_name : '';
	}
}

// Preset slugs.
prc_carousel_color_assert(
	'var(--wp--preset--color--black)' === prc_resolve_carousel_color( 'black' ),
	'preset slug wraps to theme var'
);
prc_carousel_color_assert(
	'var(--wp--preset--color--pew-blue)' === prc_resolve_carousel_color( 'pew-blue' ),
	'hyphenated preset slug'
);

// Literals.
prc_carousel_color_assert(
	'#336699' === prc_resolve_carousel_color( '#336699' ),
	'hex color'
);
prc_carousel_color_assert(
	'var(--wp--preset--color--black)' === prc_resolve_carousel_color( 'var(--wp--preset--color--black)' ),
	'preset var literal'
);
prc_carousel_color_assert(
	'rgb(12, 34, 56)' === prc_resolve_carousel_color( 'rgb(12, 34, 56)' ),
	'rgb() color'
);

// Injection attempts must not return attacker-controlled CSS.
prc_carousel_color_assert(
	'' === prc_resolve_carousel_color( '#fff; background-image: url(https://evil.example/track)' ),
	'reject semicolon injection in hex'
);
prc_carousel_color_assert(
	'' === prc_resolve_carousel_color( 'var(--x); background: url(https://evil.example)' ),
	'reject non-theme var() injection'
);
prc_carousel_color_assert(
	'' === prc_resolve_carousel_color( 'rgb(0,0,0); } * { background: url(https://evil.example) }' ),
	'reject semicolon injection in rgb()'
);
prc_carousel_color_assert(
	'' === prc_resolve_carousel_color( 'black); } body { background: red' ),
	'reject slug breakout'
);
prc_carousel_color_assert(
	'' === prc_resolve_carousel_color( 'url(https://evil.example/x.png)' ),
	'reject url() color'
);

fwrite( STDOUT, "carousel-controller-resolve-color-php-test: OK\n" );
exit( 0 );
