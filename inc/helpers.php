<?php

/**
 * Port of classNames JS library
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
	function classNames() {
		$args = func_get_args();

		$data = array_reduce(
			$args,
			function ( $carry, $arg ) {
				if ( is_array( $arg ) ) {
					return array_merge( $carry, $arg );
				}

				$carry[] = $arg;
				return $carry;
			},
			array()
		);

		$classes = array_map(
			function ( $key, $value ) {
				$condition = $value;
				$return    = $key;

				if ( is_int( $key ) ) {
					$condition = null;
					$return    = $value;
				}

				$isArray          = is_array( $return );
				$isObject         = is_object( $return );
				$isStringableType = ! $isArray && ! $isObject;

				$isStringableObject = $isObject && method_exists( $return, '__toString' );

				if ( ! $isStringableType && ! $isStringableObject ) {
					return null;
				}

				if ( $condition === null ) {
					return $return;
				}

				return $condition ? $return : null;

			},
			array_keys( $data ),
			array_values( $data )
		);

		$classes = array_filter( $classes );

		return implode( ' ', $classes );
	}
}
