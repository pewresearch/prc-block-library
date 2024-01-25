<?php
namespace PRC\Platform\Blocks;
use MatthiasMullie\Minify;

class Additional_Color_Supports extends Common_Styles {
	public static $handle = 'prc-block-library--additional-color-supports';

	public function __construct() {}

	/**
	 * @hook enqueue_block_assets
	 * @return void
	 */
	public function register_style() {
		wp_register_style(
			self::$handle,
			false,
		);
		wp_add_inline_style(
			self::$handle,
			$this->generate_color_styles()
		);
	}

	/**
	 * Generates dynamic styles for border, active, and hover color attributes.
	 * @return mixed
	 */
	public function generate_color_styles() {
		$colors = wp_get_global_settings(array('color', 'palette', 'theme'));

		ob_start();
		foreach( $colors as $color ) {
			$slug = $color['slug'];
			echo wp_sprintf(
				'.has-border-%1$s-color {%2$s}',
				$slug,
				'border-color: var(--wp--preset--color--' . $slug . ') !important;'
			);

			echo wp_sprintf(
				'.has-active-%1$s-color.is-active, .has-active-%1$s-color.is-active > a, .has-active-%1$s-color.is-active > span {%2$s}',
				$slug,
				'color: var(--wp--preset--color--' . $slug . ') !important;'
			);

			echo wp_sprintf(
				'.has-active-%1$s-background-color.is-active {%2$s}',
				$slug,
				'background-color: var(--wp--preset--color--' . $slug . ') !important;'
			);

			echo wp_sprintf(
				'.has-focus-%1$s-background-color:focus, .has-focus-%1$s-background-color:active {%2$s}',
				$slug,
				'background-color: var(--wp--preset--color--' . $slug . ') !important;'
			);

			echo wp_sprintf(
				'.has-focus-%1$s-color:focus,
				.has-focus-%1$s-color:active, {%2$s}',
				$slug,
				'color: var(--wp--preset--color--' . $slug . ') !important;'
			);

			echo wp_sprintf(
				'.has-hover-%1$s-color:hover, .has-hover-%1$s-color:hover > a, .has-hover-%1$s-color:hover > span {%2$s}',
				$slug,
				'color: var(--wp--preset--color--' . $slug . ') !important;'
			);

			echo wp_sprintf(
				'.has-hover-%1$s-background-color:hover {%2$s}',
				$slug,
				'background-color: var(--wp--preset--color--' . $slug . ');'
			);
		}
		$styles = ob_get_clean();
		$minifier = new Minify\CSS($styles);
		return $minifier->minify();
	}

	private function get_classname_as_array($prefix = 'has-hover', $attribute_key = 'hoverTextColor', $suffix = 'color', $attributes = array()) {
		// first check if the key is in attributes and if not then return false
		if ( !array_key_exists($attribute_key, $attributes) ) {
			return false;
		}
		return array(
			$prefix . '-' . $suffix => $attributes[$attribute_key],
			$prefix . '-' . $attributes[$attribute_key] . '-' . $suffix => $attributes[$attribute_key],
		);
	}

	public function get_list_classnames(
		$prefix = 'wp-block-prc-block-',
		$is_active = false,
		$attributes = array(
			'hoverTextColor' => null,
			'hoverBackgroundColor' => null,
			'activeTextColor' => null,
			'activeBackgroundColor' => null,
		)
	) {
		$key_pairs = array(
			'has-hover' => array(
				'key' => 'hoverTextColor',
				'suffix' => 'color',
			),
			'has-hover' => array(
				'key' => 'hoverBackgroundColor',
				'suffix' => 'background-color',
			),
			'has-active' => array(
				'key' => 'activeTextColor',
				'suffix' => 'color',
			),
			'has-active' => array(
				'key' => 'activeBackgroundColor',
				'suffix' => 'background-color',
			),
			'has-focus' => array(
				'key' => 'activeTextColor',
				'suffix' => 'color',
			),
			'has-focus' => array(
				'key' => 'activeBackgroundColor',
				'suffix' => 'background-color',
			),
		);

		$logical_classnames = array(
			'is-active' => $is_active,
		);

		foreach ($key_pairs as $key => $value) {
			$classnames = $this->get_classname_as_array(
				$key,
				$value['key'],
				$value['suffix'],
				$attributes
			);
			if ( $classnames ) {
				$logical_classnames = array_merge(
					$logical_classnames,
					$classnames
				);
			}
		}

		return \PRC\Platform\Block_Utils\classNames(
			$prefix . '__list-item',
			$logical_classnames
		);
	}
}
