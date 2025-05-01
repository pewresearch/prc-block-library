<?php
/**
 * Helper class for Table block
 *
 * @package PRC\Platform\Blocks\Table;
 * @author Aki Hamano, Seth Rubenstein
 * @license GPL-2.0+
 */

namespace PRC\Platform\Blocks\Table;

/**
 * Helper class for Table block
 *
 * @package PRC\Platform\Blocks\Table;
 * @author Aki Hamano, Seth Rubenstein
 * @license GPL-2.0+
 */
class Helper {

	/**
	 * Get default block style
	 *
	 * @return string
	 */
	public static function get_block_css( $prefix = '' ) {
		$selector = "{$prefix}." . FTB_BLOCK_CLASS;

		// CSS selectors.
		$styles = array(
			"{$selector} > table"       => '',
			"{$selector}.is-style-stripes tbody tr:nth-child(odd) th" => '',
			"{$selector}.is-style-stripes tbody tr:nth-child(odd) td" => '',
			"{$selector}.is-style-stripes tbody tr:nth-child(even) th" => '',
			"{$selector}.is-style-stripes tbody tr:nth-child(even) td" => '',
			"{$selector} > table tr th, {$selector} > table tr td" => '',
			"{$selector} > table tr th" => '',
			"{$selector} > table tr td" => '',
			"{$selector} > table tr th, {$selector} table > tr td" => '',
		);

		$option = get_option( FTB_OPTION_PREFIX . '_block_style', Settings::OPTIONS['block_style']['default'] );

		// Genelate styles based on Global setting.
		foreach ( $option as $key => $value ) {
			if ( '' === $value || null === $value ) {
				continue;
			}

			switch ( $key ) {
				case 'table_width':
					$styles[ "{$selector} > table" ] .= "width:{$value};";
					break;
				case 'table_max_width':
					$styles[ "{$selector} > table" ] .= "max-width:{$value};";
					break;
				case 'table_border_collapse':
					$styles[ "{$selector} > table" ] .= "border-collapse:{$value};";
					break;
				case 'row_odd_color':
					$styles[ "{$selector}.is-style-stripes tbody tr:nth-child(odd) th" ] .= "background-color:{$value};";
					$styles[ "{$selector}.is-style-stripes tbody tr:nth-child(odd) td" ] .= "background-color:{$value};";
					break;
				case 'row_even_color':
					$styles[ "{$selector}.is-style-stripes tbody tr:nth-child(even) th" ] .= "background-color:{$value};";
					$styles[ "{$selector}.is-style-stripes tbody tr:nth-child(even) td" ] .= "background-color:{$value};";
					break;
				case 'cell_text_align':
					$styles[ "{$selector} > table tr th, {$selector} > table tr td" ] .= "text-align:{$value};";
					break;
				case 'cell_vertical_align':
					$styles[ "{$selector} > table tr th, {$selector} > table tr td" ] .= "vertical-align:{$value};";
					break;
				case 'cell_text_color_th':
					$styles[ "{$selector} > table tr th" ] .= "color:{$value};";
					break;
				case 'cell_text_color_td':
					$styles[ "{$selector} > table tr td" ] .= "color:{$value};";
					break;
				case 'cell_background_color_th':
					$styles[ "{$selector} > table tr th" ] .= "background-color:{$value};";
					break;
				case 'cell_background_color_td':
					$styles[ "{$selector} > table tr td" ] .= "background-color:{$value};";
					break;
				case 'cell_hover_background_color':
					$styles[ "{$selector} > table tr:hover td" ] .= "background-color:{$value};";
					break;
				case 'cell_padding':
					$padding_styles = self::get_padding_styles( $value );
					if ( $padding_styles ) {
						$styles[ "{$selector} > table tr th, {$selector} > table tr td" ] .= $padding_styles;
					}
					break;
				case 'cell_border_width':
					$styles[ "{$selector} > table tr th, {$selector} > table tr td" ] .= "border-width:{$value};";
					break;
				case 'cell_border_style':
					$styles[ "{$selector} > table tr th, {$selector} > table tr td" ] .= "border-style:{$value};";
					break;
				case 'cell_border_color':
					$styles[ "{$selector} > table tr th, {$selector} > table tr td" ] .= "border-color:{$value};";
					break;
			}
		}

		$css = '';

		foreach ( $styles as $selector => $values ) {
			if ( $values ) {
				$css .= "{$selector} { $values }";
			}
		}

		return $css;
	}

	/**
	 * Get responsive style with dynamic breakpoints
	 *
	 * @return string
	 */
	public static function get_responsive_css( $prefix = '' ) {
		$selector   = "{$prefix}." . FTB_BLOCK_CLASS;
		$breakpoint = get_option( FTB_OPTION_PREFIX . '_breakpoint', Settings::OPTIONS['breakpoint']['default'] );
		$max_width  = $breakpoint;
		$min_width  = $max_width + 1;

		return <<<EOM
		@media screen and (min-width:{$min_width}px) {
			{$selector}.is-scroll-on-pc {
				overflow-x: scroll;
			}
			{$selector}.is-scroll-on-pc table {
				max-width: none;
				align-self: self-start;
			}
		}
		@media screen and (max-width:{$max_width}px) {
			{$selector}.is-scroll-on-mobile {
				overflow-x: scroll;
			}
			{$selector}.is-scroll-on-mobile table {
				max-width: none;
				align-self: self-start;
			}
			{$selector} table.is-stacked-on-mobile th,
			{$selector} table.is-stacked-on-mobile td {
				width: 100%!important;
				display: block;
			}
		}
		EOM;
	}

	/**
	 * Minify CSS
	 *
	 * @return string
	 */
	public static function minify_css( $css ) {
		$replaces = array();

    // phpcs:disable Generic.Formatting.MultipleStatementAlignment
		$replaces['/@charset [^;]+;/'] = '';
		$replaces['/([\s:]url\()[\"\']([^\"\']+)[\"\'](\)[\s;}])/'] = '${1}${2}${3}';
		$replaces['/(\/\*(?=[!]).*?\*\/|\"(?:(?!(?<!\\\)\").)*\"|\'(?:(?!(?<!\\\)\').)*\')|\s+/'] = '${1} ';
		$replaces['/(\/\*(?=[!]).*?\*\/|\"(?:(?!(?<!\\\)\").)*\"|\'(?:(?!(?<!\\\)\').)*\')|\/\*.*?\*\/|\s+([:])\s+|\s+([)])|([(:])\s+/s'] = '${1}${2}${3}${4}';
		$replaces['/\s*(\/\*(?=[!]).*?\*\/|\"(?:(?!(?<!\\\)\").)*\"|\'(?:(?!(?<!\\\)\').)*\'|[ :]calc\([^;}]+\)[ ;}]|[!$&+,\/;<=>?@^_{|}~]|\A|\z)\s*/s'] = '${1}';
    // phpcs:enable

		$css = preg_replace( array_keys( $replaces ), array_values( $replaces ), $css );
		return $css;
	}

	/**
	 * Get padding styles from string value or array values
	 *
	 * @return string
	 */
	public static function get_padding_styles( $values ) {
		if ( gettype( $values ) === 'string' ) {
			return "padding:{$values};";
		}

		if ( gettype( $values ) !== 'array' ) {
			return null;
		}

		$default_values = array(
			'top'    => '',
			'right'  => '',
			'bottom' => '',
			'left'   => '',
		);
		$values         = array_merge( $default_values, $values );

		if ( '' !== $values['top'] && '' !== $values['right'] && '' !== $values['bottom'] && '' !== $values['left'] ) {
			$padding_value = self::get_shorhand_css_value( $values['top'], $values['right'], $values['bottom'], $values['left'] );
			return "padding:{$padding_value};";
		}

		$styles = null;

		foreach ( array( 'top', 'right', 'bottom', 'left' ) as $side ) {
			if ( '' === $values[ $side ] ) {
				continue;
			}

			$styles .= "padding-{$side}:{$values[ $side ]};";
		}

		return $styles;
	}

	/**
	 * Get CSS value in consideration of short-hand from four values
	 *
	 * @return string
	 */
	public static function get_shorhand_css_value( $top, $right, $bottom, $left ) {
		if ( $top === $right && $top === $bottom && $top === $left ) {
			return $top;
		}

		if ( $top === $bottom && $left === $right ) {
			return "{$top} {$left}";
		}

		if ( $left === $right ) {
			return "{$top} {$left} {$bottom}";
		}

		return "{$top} {$right} {$bottom} {$left}";
	}
}
