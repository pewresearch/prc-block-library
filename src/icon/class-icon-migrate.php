<?php
/**
 * Map `prc-block/icon` comments onto `core/icon`.
 *
 * @package PRC\Platform\Blocks
 */

declare(strict_types=1);

namespace PRC\Platform\Blocks;

/**
 * Shared mapper for the Block API transform and the VIP CLI rewrite.
 */
class Icon_Migrate {

	/**
	 * Source block name.
	 *
	 * @var string
	 */
	public const SOURCE_BLOCK = 'prc-block/icon';

	/**
	 * Target block name.
	 *
	 * @var string
	 */
	public const TARGET_BLOCK = 'core/icon';

	/**
	 * Default `library` from `block.json`.
	 *
	 * @var string
	 */
	public const DEFAULT_LIBRARY = 'prc';

	/**
	 * Default `icon` from `block.json`.
	 *
	 * @var string
	 */
	public const DEFAULT_ICON = 'star';

	/**
	 * Default `size` from `block.json`.
	 *
	 * @var float
	 */
	public const DEFAULT_SIZE = 1.0;

	/**
	 * Historical `prc-block/icon` names → curated fill names.
	 *
	 * Keep in sync with `\PRC\Platform\Icons\icon_name_aliases()`.
	 *
	 * @param string $icon Saved icon slug.
	 * @return string
	 */
	private static function resolve_icon_name( string $icon ): string {
		if ( function_exists( '\\PRC\\Platform\\Icons\\resolve_icon_name' ) ) {
			return \PRC\Platform\Icons\resolve_icon_name( $icon );
		}
		return $icon;
	}

	/**
	 * Map legacy attributes onto `core/icon`.
	 *
	 * Maps `icon` and `size` onto `icon` + `style.dimensions.width`. Drops the
	 * FA `library` axis (PRC-721). Remaps historical names (`pdf`,
	 * `column-chart`) onto curated fills. Preserves other authored attributes
	 * (`className`, `anchor`, colors, remaining `style`).
	 *
	 * @param array $attributes Legacy block attributes.
	 * @return array core/icon attributes.
	 */
	public static function map_attributes( array $attributes ): array {
		$icon = isset( $attributes['icon'] ) && is_string( $attributes['icon'] ) && '' !== $attributes['icon']
			? self::resolve_icon_name( $attributes['icon'] )
			: self::DEFAULT_ICON;
		$size = self::DEFAULT_SIZE;
		if ( isset( $attributes['size'] ) && is_numeric( $attributes['size'] ) ) {
			$size = (float) $attributes['size'];
		}

		unset( $attributes['library'], $attributes['size'] );

		$style      = isset( $attributes['style'] ) && is_array( $attributes['style'] ) ? $attributes['style'] : array();
		$dimensions = isset( $style['dimensions'] ) && is_array( $style['dimensions'] ) ? $style['dimensions'] : array();

		$dimensions['width'] = $size . 'em';
		$style['dimensions'] = $dimensions;

		$attributes['icon']  = 'prc/' . $icon;
		$attributes['style'] = $style;

		return $attributes;
	}

	/**
	 * Rewrite `prc-block/icon` comments in serialized post_content.
	 *
	 * Fast-path when the source block name is absent. Idempotent.
	 *
	 * @param string $content Serialized post content.
	 * @return string
	 */
	public static function rewrite_content( string $content ): string {
		if ( ! str_contains( $content, 'wp:prc-block/icon' ) ) {
			return $content;
		}

		$blocks  = parse_blocks( $content );
		$changed = false;
		$blocks  = self::rewrite_blocks( $blocks, $changed );

		if ( ! $changed ) {
			return $content;
		}

		return serialize_blocks( $blocks );
	}

	/**
	 * Recursively replace source blocks.
	 *
	 * @param array $blocks  Parsed blocks.
	 * @param bool  $changed Set true when a block is rewritten.
	 * @return array
	 */
	public static function rewrite_blocks( array $blocks, bool &$changed ): array {
		foreach ( $blocks as $index => $block ) {
			if ( isset( $block['innerBlocks'] ) && is_array( $block['innerBlocks'] ) && ! empty( $block['innerBlocks'] ) ) {
				$blocks[ $index ]['innerBlocks'] = self::rewrite_blocks( $block['innerBlocks'], $changed );
			}

			if ( ( $block['blockName'] ?? '' ) !== self::SOURCE_BLOCK ) {
				continue;
			}

			$attrs            = is_array( $block['attrs'] ?? null ) ? $block['attrs'] : array();
			$blocks[ $index ] = array(
				'blockName'    => self::TARGET_BLOCK,
				'attrs'        => self::map_attributes( $attrs ),
				'innerBlocks'  => array(),
				'innerHTML'    => '',
				'innerContent' => array(),
			);
			$changed          = true;
		}

		return $blocks;
	}
}
