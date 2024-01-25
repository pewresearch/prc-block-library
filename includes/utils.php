<?php
/**
 * Utility functions
 * Please wrap functions in an if ( ! function_exists() ) { } block to avoid conflicts.
 */

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


/**
 * A standardized function to throw and log errors.
 * @param string $group
 * @param string $code
 * @param string $message
 * @param bool $post = WP_Post object
 * @param bool $error_obj = WP_Error object
 * @return Exception|false
 */
function prc_log_error( $group = 'GENERAL ALERT', $code = '', $message = '', $error_obj = array() ) {
	$error = $group . ' | ' . $message;
	$e = new WP_Error( $code, sprintf( '%s', $error ), $error_obj );
	$exception = false;
	if (is_wp_error($e)) {
		$exception = new \Exception($e->get_error_message(), $e->get_error_code());
	}

	if ( function_exists( 'wp_sentry_safe' ) ) {
		wp_sentry_safe(
		function ( \Sentry\State\HubInterface $client ) use ( $exception ) {
			$client->captureException($exception);
		}
		);
	}

	if ( 'production' !== wp_get_environment_type() ) {
		error_log( $error );
		if ( $error_obj ) {
			error_log( print_r( $error_obj, true ) );
		}
	}

	return $exception;
}
