<?php
/**
 * CLI checks for the light-dark() KSES allowance (Linear PRC-545).
 *
 * Run from prc-block-library: php tests/kses-light-dark-php-test.php
 *
 * @package PRC\Platform\Blocks
 */

/**
 * @param bool   $cond Condition.
 * @param string $msg  Message.
 */
function prc_light_dark_assert( $cond, $msg ) {
	if ( ! $cond ) {
		fwrite( STDERR, "FAIL: $msg\n" );
		exit( 1 );
	}
}

/**
 * Invoke Plugin::allow_light_dark_css() without running the plugin constructor.
 *
 * @param bool   $allow_css       Incoming decision.
 * @param string $css_test_string CSS declaration under test.
 * @return bool
 */
function prc_allow_light_dark( $allow_css, $css_test_string ) {
	static $instance = null;
	if ( null === $instance ) {
		require_once dirname( __DIR__ ) . '/includes/class-plugin.php';
		$reflection = new ReflectionClass( PRC\Platform\Blocks\Plugin::class );
		$instance   = $reflection->newInstanceWithoutConstructor();
	}

	return $instance->allow_light_dark_css( $allow_css, $css_test_string );
}

// Palette values ship as light-dark() — these must pass.
prc_light_dark_assert(
	true === prc_allow_light_dark( false, 'background-color:light-dark(#f7f7f1, #26251f)' ),
	'hex light-dark background-color should be allowed'
);
prc_light_dark_assert(
	true === prc_allow_light_dark( false, 'color:light-dark(rgb(0, 0, 0), rgb(240, 240, 240))' ),
	'light-dark with nested rgb() should be allowed'
);
prc_light_dark_assert(
	true === prc_allow_light_dark( false, '--hover-background-color:light-dark(#fff, #000)' ),
	'custom property with light-dark value should be allowed'
);
prc_light_dark_assert(
	true === prc_allow_light_dark( false, 'border-top-color:light-dark(#dadbdb, #3a3a3a)' ),
	'light-dark border color should be allowed'
);

// Already-allowed declarations pass through untouched.
prc_light_dark_assert(
	true === prc_allow_light_dark( true, 'background-color:red' ),
	'already-allowed css should stay allowed'
);

// Declarations without light-dark keep the incoming (disallowed) decision.
prc_light_dark_assert(
	false === prc_allow_light_dark( false, 'background-color:red' ),
	'non-light-dark css should keep incoming decision'
);
prc_light_dark_assert(
	false === prc_allow_light_dark( false, 'background-color:rgb(0,0,0)' ),
	'bare rgb() should not be allowed by this filter'
);

// Smuggling attempts stay blocked. Note: core strips *valid* url() values
// from the test string before this filter runs (background urls are
// core-allowed on their own); a url( remaining here means core rejected it,
// so the callback must not rescue the declaration.
prc_light_dark_assert(
	false === prc_allow_light_dark( false, 'background:light-dark(#fff,#000) url(javascript:alert(1))' ),
	'light-dark alongside a core-rejected url() should stay blocked'
);
prc_light_dark_assert(
	false === prc_allow_light_dark( false, 'background:light-dark(=,})' ),
	'disallowed characters inside light-dark() should not be stripped'
);
prc_light_dark_assert(
	false === prc_allow_light_dark( false, 'width:expression(light-dark(#fff,#000))' ),
	'expression() wrapping light-dark should stay blocked'
);
prc_light_dark_assert(
	false === prc_allow_light_dark( false, 'background:light-dark(#fff,#000);color:calc(1px' ),
	'unbalanced parens outside light-dark should stay blocked'
);

echo "OK: kses light-dark allowance checks passed\n";
exit( 0 );
