/**
 * WordPress dependencies
 */
import { useStyleOverride } from '@wordpress/block-editor';

/**
 * Gets the color styles for the navigation mega menu block.
 *
 * @param {Object} options            - Options object.
 * @param {Object} options.attributes - Block attributes.
 * @return {Object} CSS custom properties map
 */
function getColorStyles({ attributes } = {}) {
	const {
		customMenuItemBackgroundColor,
		customMenuItemTextColor,
		customMenuItemActiveBackgroundColor,
		customMenuItemActiveTextColor,
		customMenuOverlayBackgroundColor,
		customMenuOverlayTextColor,
		customMenuActiveBorderColor,
	} = attributes || {};

	// Helper to normalize color objects (preset { slug } vs direct value).
	function getColorValue(color) {
		if (!color) {
			return null;
		}
		if (typeof color === 'object' && color.slug) {
			return `var(--wp--preset--color--${color.slug})`;
		}
		return color;
	}

	const colorVarMap = {
		'--custom-menu-item-background-color': getColorValue(
			customMenuItemBackgroundColor
		),
		'--custom-menu-item-text-color': getColorValue(customMenuItemTextColor),
		'--custom-menu-item-active-background-color': getColorValue(
			customMenuItemActiveBackgroundColor
		),
		'--custom-menu-item-active-text-color': getColorValue(
			customMenuItemActiveTextColor
		),
		'--custom-menu-overlay-background-color': getColorValue(
			customMenuOverlayBackgroundColor
		),
		'--custom-menu-overlay-text-color': getColorValue(
			customMenuOverlayTextColor
		),
		'--custom-menu-active-brdr-color': getColorValue(
			customMenuActiveBorderColor
		),
	};

	return colorVarMap;
}

/**
 * Injects color CSS custom properties for the navigation mega menu block.
 * This uses the style engine pattern to inject scoped CSS variables that can
 * be referenced in the block's stylesheet using design tokens.
 *
 * @param {Object} props
 * @param {Object} props.attributes Block attributes
 * @param {string} props.clientId   Block client ID
 * @return {null} No UI output
 */
export default function StyleEngine({ attributes, clientId }) {
	const colorVarMap = getColorStyles({ attributes });

	// Build scoped CSS only for defined values to avoid unnecessary empty declarations.
	const declarations = Object.entries(colorVarMap)
		.filter(([, value]) => !!value)
		.map(([name, value]) => `\t${name}: ${value};`)
		.join('\n');

	const css =
		clientId && declarations.length
			? `#block-${clientId} {\n${declarations}\n}`
			: '';

	useStyleOverride({ css });

	return null;
}
