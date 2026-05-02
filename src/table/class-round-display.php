<?php
/**
 * Half-up rounding and plain-text parsing for table cell display (PHP parity with round-display.ts).
 *
 * @package PRC\Platform\Blocks\Table
 */

namespace PRC\Platform\Blocks\Table;

/**
 * Parity with plugins/prc-block-library/src/table/utils/round-display.ts — keep test cases aligned.
 */
class Round_Display {

	/**
	 * Strip HTML tags (regex parity with stripHtmlToPlain).
	 *
	 * @param string $html HTML fragment.
	 * @return string
	 */
	public static function strip_html_to_plain( $html ) {
		return (string) preg_replace( '/<[^>]*>/', '', $html );
	}

	/**
	 * Round half away from zero at decimal places (parity with roundHalfUp).
	 *
	 * @param float $value Numeric value.
	 * @param int   $decimal_places 0–10.
	 * @return string
	 * @throws \RangeException When out of range.
	 */
	public static function round_half_up( $value, $decimal_places ) {
		$decimal_places = (int) $decimal_places;
		if ( $decimal_places < 0 || $decimal_places > 10 ) {
			throw new \RangeException( 'round_half_up: decimal_places must be between 0 and 10' );
		}
		$factor  = 10 ** $decimal_places;
		$shifted = $value * $factor;
		$rounded = (int) round( $shifted );
		$result  = $rounded / $factor;
		return number_format( $result, $decimal_places, '.', '' );
	}

	/**
	 * Parse date-like plain text; return timestamp or null (parity with parseDate in round-display.ts).
	 *
	 * @param string $text Trimmed plain text.
	 * @return int|null Unix ms not used; seconds * 1000 parity not required for sort key — we only need null vs non-null for rounding skip.
	 */
	public static function parse_date( $text ) {
		$text = (string) $text;
		if ( strlen( $text ) < 6 ) {
			return null;
		}

		if ( preg_match( '/^(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})$/', $text, $m ) ) {
			$t = mktime( 0, 0, 0, (int) $m[2], (int) $m[3], (int) $m[1] );
			return false !== $t ? $t : null;
		}

		if ( preg_match( '/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/', $text, $m ) ) {
			$first  = (int) $m[1];
			$second = (int) $m[2];
			$year   = (int) $m[3];
			if ( $first > 12 ) {
				$day   = $first;
				$month = $second;
			} else {
				$month = $first;
				$day   = $second;
			}
			$t = mktime( 0, 0, 0, $month, $day, $year );
			return false !== $t ? $t : null;
		}

		// strtotime() interprets some decimal-only strings as relative times; Date.parse() returns NaN
		// for those (parity with round-display.ts). Do not treat them as dates.
		if ( preg_match( '/^-?0\.\d+$/', $text ) ) {
			return null;
		}
		if ( preg_match( '/^-?\d+\.\d+$/', $text ) ) {
			$unsigned = preg_replace( '/^-/', '', $text );
			$parts    = explode( '.', $unsigned, 2 );
			$head     = isset( $parts[0] ) ? $parts[0] : '';
			if ( strlen( $head ) !== 4 ) {
				return null;
			}
		}

		$parsed = strtotime( $text );
		if ( false !== $parsed && ! preg_match( '/^\d+$/', $text ) ) {
			return $parsed;
		}

		return null;
	}

	/**
	 * Parse duration plain text (parity with parseDuration).
	 *
	 * @param string $text Plain text.
	 * @return int|null Minutes.
	 */
	public static function parse_duration( $text ) {
		if ( ! preg_match( '/^\s*(?:(\d+)\s*(?:h|hr)s?)?\s*(?:(\d+)\s*(?:m|min)s?)?\s*$/i', $text, $m ) ) {
			return null;
		}
		$hours   = isset( $m[1] ) && '' !== $m[1] ? (int) $m[1] : 0;
		$minutes = isset( $m[2] ) && '' !== $m[2] ? (int) $m[2] : 0;
		$total   = $hours * 60 + $minutes;
		return 0 === $total ? null : $total;
	}

	/**
	 * Parse floating number for rounding (parity with parseFloatingNumberForRounding).
	 *
	 * @param string $plain Plain text.
	 * @return array{num: float, has_percent: bool}|null
	 */
	public static function parse_floating_number_for_rounding( $plain ) {
		$t = trim( (string) $plain );
		if ( '' === $t ) {
			return null;
		}
		if ( null !== self::parse_date( $t ) ) {
			return null;
		}
		if ( null !== self::parse_duration( $t ) ) {
			return null;
		}
		$cleaned = preg_replace( '/[$€£¥,]/u', '', $t );
		$cleaned = preg_replace( '/%$/', '', (string) $cleaned );
		$cleaned = trim( (string) $cleaned );
		if ( ! is_numeric( $cleaned ) ) {
			return null;
		}
		$num = (float) $cleaned;
		if ( ! is_finite( $num ) ) {
			return null;
		}
		$has_percent = (bool) preg_match( '/%$/', $t );
		return array(
			'num'         => $num,
			'has_percent' => $has_percent,
		);
	}

	/**
	 * Phase A: plain text / no tag that looks like an element child in the HTML string (parity with roundPlainHtmlTextForDisplay).
	 *
	 * @param string $html            Cell inner HTML.
	 * @param int    $decimal_places 1–10.
	 * @return string|null Rounded display string or null if unchanged.
	 */
	public static function round_plain_html_text_for_display( $html, $decimal_places ) {
		$decimal_places = (int) $decimal_places;
		if ( $decimal_places < 1 || $decimal_places > 10 ) {
			return null;
		}
		if ( preg_match( '/<[a-z][\s\S]*/i', $html ) ) {
			return null;
		}
		$plain = trim( self::strip_html_to_plain( $html ) );
		if ( '' === $plain ) {
			return null;
		}
		$parsed = self::parse_floating_number_for_rounding( $plain );
		if ( null === $parsed ) {
			return null;
		}
		$out = self::round_half_up( $parsed['num'], $decimal_places );
		return $parsed['has_percent'] ? $out . '%' : $out;
	}

	/**
	 * Effective decimal places for a body/footer cell (parity with view.js getEffectiveRoundDecimals).
	 *
	 * @param string|null $v_col_attr            data-prc-v-col.
	 * @param string|null $cell_round_attr       data-prc-round-decimals.
	 * @param array       $column_round_decimals Indexed by virtual column.
	 * @return int|null
	 */
	public static function get_effective_round_decimals( $v_col_attr, $cell_round_attr, array $column_round_decimals ) {
		if ( null === $v_col_attr || '' === $v_col_attr ) {
			return null;
		}
		$v_col = (int) $v_col_attr;
		if ( $v_col < 0 ) {
			return null;
		}
		if ( null !== $cell_round_attr && '' !== $cell_round_attr ) {
			$c = (int) $cell_round_attr;
			if ( $c >= 1 && $c <= 10 ) {
				return $c;
			}
		}
		if ( isset( $column_round_decimals[ $v_col ] ) && is_numeric( $column_round_decimals[ $v_col ] ) ) {
			$col = (int) $column_round_decimals[ $v_col ];
			if ( $col >= 1 && $col <= 10 ) {
				return $col;
			}
		}
		return null;
	}
}
