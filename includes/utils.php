<?php
/**
 * Utility functions
 * Please wrap functions in an if ( ! function_exists() ) { } block to avoid conflicts.
 */

/**
 * Port of classNames JS library, modernized with PHP 8 features.
 * Ported from https://github.com/cstro/classnames-php
 */
if ( ! function_exists( 'classNames' ) ) {
	/**
	 * The classNames function takes any number of arguments which can be a string or array.
	 * When using an array, if the value associated with a given key is falsy, that key won't be included in the output.
	 * If no value is given the true is assumed.
	 *
	 * classNames('foo'); // 'foo'
	 * classNames(['foo' => true]); // 'foo'
	 * classNames('foo', ['bar' => false, 'baz' => true]); // 'foo baz'
	 * classNames(['foo', 'bar' => true]) // 'foo bar'
	 *
	 * @return string
	 */
	function classNames(...$args): string {
        $data = array_reduce($args, function($carry, $arg) {
            if (is_array($arg)) {
                return array_merge($carry, $arg);
            }

            $carry[] = $arg;
            return $carry;
        }, []);

        $classes = array_map(function($key, $value) {
            $condition = $value;
            $return = $key;

            if (is_int($key)) {
                $condition = null;
                $return = $value;
            }

            $is_array = is_array($return);
            $is_object = is_object($return);
            $is_stringable_type = !($is_array || $is_object);
            $is_stringable_object = $is_object && method_exists($return, '__toString');

            if (!$is_stringable_type && !$is_stringable_object) {
                return null;
            }

            if ($condition === null) {
                return $return;
            }

            return $condition ? $return : null;
        }, array_keys($data), array_values($data));

        $classes = array_filter($classes);

        return implode(' ', $classes);
    }
}

/**
 * Converts a number to a string of words. Stops at 999, we need to be sane about how many possibilities we support and text length.
 */
if ( ! function_exists('conver_number_to_words') ) {
	function convert_number_to_words($num) {
		if (!is_int($num)) {
		  return new WP_Error('invalid_input', 'Input must be an integer.');
		}

		$ones = array(
		  0 => 'zero', 1 => 'one', 2 => 'two', 3 => 'three', 4 => 'four',
		  5 => 'five', 6 => 'six', 7 => 'seven', 8 => 'eight', 9 => 'nine'
		);
		$tens = array(
		  0 => '', 1 => 'ten', 2 => 'twenty', 3 => 'thirty', 4 => 'forty',
		  5 => 'fifty', 6 => 'sixty', 7 => 'seventy', 8 => 'eighty', 9 => 'ninety'
		);
		$hundreds = array(
		  'hundred', 'thousand'
		);

		if ($num < 0 || $num >= 1000) {
		  return new WP_Error('out_of_range', 'Input must be between 0 and 999.');
		}

		if ($num == 0) {
		  return esc_html($ones[0]);
		}

		$result = '';
		$hundred = (int) ($num / 100);
		$ten = (int) ($num / 10) % 10;
		$one = $num % 10;

		if ($hundred > 0) {
		  $result .= $ones[$hundred] . ' ' . $hundreds[0];
		}

		if ($ten > 0 || $one > 0) {
		  if (!empty($result)) {
			$result .= ' ';
		  }

		  if ($ten < 2) {
			$result .= $ones[$ten * 10 + $one];
		  } else {
			$result .= $tens[$ten];
			if ($one > 0) {
			  $result .= '-' . $ones[$one];
			}
		  }
		}

		return esc_html($result);
	}
}
