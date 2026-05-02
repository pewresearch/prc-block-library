<?php
/**
 * CLI parity checks for Round_Display and Rounding_Walker (run: php tests/table-round-display-php-test.php from prc-block-library).
 *
 * @package PRC\Platform\Blocks\Table
 */

require_once dirname( __DIR__ ) . '/build/table/class-round-display.php';
require_once dirname( __DIR__ ) . '/build/table/class-table-rounding-walker.php';

use PRC\Platform\Blocks\Table\Round_Display;
use PRC\Platform\Blocks\Table\Rounding_Walker;

/**
 * @param bool   $cond Condition.
 * @param string $msg  Message.
 */
function prc_assert( $cond, $msg ) {
	if ( ! $cond ) {
		fwrite( STDERR, "FAIL: $msg\n" );
		exit( 1 );
	}
}

// round-display.test.ts parity (subset).
prc_assert( Round_Display::round_half_up( 2.016, 2 ) === '2.02', 'round_half_up 2.016,2' );
prc_assert( Round_Display::round_half_up( 2.016, 1 ) === '2.0', 'round_half_up 2.016,1' );
prc_assert( Round_Display::round_half_up( 2.6, 0 ) === '3', 'round_half_up 2.6,0' );
prc_assert( Round_Display::round_half_up( -2.016, 2 ) === '-2.02', 'round_half_up negative' );

prc_assert( Round_Display::round_plain_html_text_for_display( '2.016', 2 ) === '2.02', 'round plain' );
prc_assert( null === Round_Display::round_plain_html_text_for_display( '<strong>2.016</strong>', 2 ), 'skip rich html' );
prc_assert( null === Round_Display::parse_floating_number_for_rounding( '2024-01-15' ), 'skip iso date' );

// strtotime vs Date.parse: long decimals must still round (see class-round-display.php parse_date guards).
prc_assert( null !== Round_Display::parse_floating_number_for_rounding( '0.7607736700954824' ), 'parse float 0.76…' );
prc_assert( Round_Display::round_plain_html_text_for_display( '0.7607736700954824', 1 ) === '0.8', 'round 0.76…' );
prc_assert( Round_Display::round_plain_html_text_for_display( '3.09013106186308', 1 ) === '3.1', 'round 3.09…' );

$html = '<figure class="wp-block-prc-block-table"><table><tbody><tr><td data-prc-v-col="0">2.016</td></tr></tbody></table></figure>';
$out  = Rounding_Walker::apply(
	$html,
	array(
		'columnRoundDecimals' => array( 2 ),
	)
);
prc_assert( false !== strpos( $out, '2.02' ), 'walker rounds' );
prc_assert( false !== strpos( $out, 'data-sort-value' ), 'walker sort attr' );

fwrite( STDOUT, "table-round-display-php-test: OK\n" );
exit( 0 );
