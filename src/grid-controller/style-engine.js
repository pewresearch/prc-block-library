/**
 * WordPress dependencies
 */
import {
	__experimentalGetGapCSSValue as getGapCSSValue,
	useStyleOverride,
} from '@wordpress/block-editor';

/**
 * Gets the grid gutter (gap) styles for the grid-controller block.
 *
 * @param {Object} params
 * @param {Object} params.attributes Block attributes
 * @returns {Object} CSS variable map
 */
function getGutterStyles({ attributes }) {
	const { style } = attributes || {};
	const { spacing } = style || {};
	const { blockGap } = spacing || {};

	// Default fallback for grid gutter
	const fallbackValue = 'var(--wp--style--block-gap, 24px)';
	let gutterValue = fallbackValue;

	// Check for a value - grid-controller uses horizontal gap
	if (!!blockGap) {
		gutterValue =
			typeof blockGap === 'string'
				? getGapCSSValue(blockGap)
				: getGapCSSValue(blockGap?.left) || fallbackValue;
	}

	// The grid gutter calculation requires a real value (such as `0px`) and not `0`
	const gutterMap = {
		'--grid-gutter': gutterValue === '0' ? '0px' : gutterValue,
	};

	return gutterMap;
}

/**
 * Gets the divider color styles for the grid-controller block.
 *
 * @param {Object} params
 * @param {Object} params.attributes Block attributes
 * @returns {Object} CSS variable map
 */
function getDividerColorStyles({ attributes }) {
	const { dividerColor } = attributes || {};

	// Helper to normalize color values (preset slug vs direct value)
	function getColorValue(color) {
		if (!color) {
			return null;
		}
		// If it's a slug string (e.g., "ui-gray-light"), convert to CSS variable
		if (typeof color === 'string') {
			return `var(--wp--preset--color--${color})`;
		}
		// If it's an object with slug property
		if (typeof color === 'object' && color.slug) {
			return `var(--wp--preset--color--${color.slug})`;
		}
		return color;
	}

	const colorVarMap = {
		'--divider-color': getColorValue(dividerColor),
	};

	return colorVarMap;
}

/**
 * Injects CSS custom properties for the grid-controller block, mirroring the pattern
 * used by the tabs block. This replaces inline style attributes with scoped CSS
 * that participates in the style engine cascade.
 *
 * @param {Object} props
 * @param {Object} props.attributes Block attributes
 * @param {string} props.clientId   Block client ID
 * @returns {null} No UI output
 */
export default function StyleEngine({ attributes, clientId }) {
	if (!clientId) {
		return null;
	}

	const gutterVarMap = getGutterStyles({ attributes });
	const colorVarMap = getDividerColorStyles({ attributes });

	const styleVarMap = {
		...gutterVarMap,
		...colorVarMap,
	};

	// Build scoped CSS only for defined values to avoid unnecessary empty declarations
	const declarations = Object.entries(styleVarMap)
		.filter(([, value]) => !!value)
		.map(([name, value]) => `\t${name}: ${value};`)
		.join('\n');

	if (declarations.length) {
		useStyleOverride({
			css: `#block-${clientId} {\n${declarations}\n}`,
		});
	}

	return null;
}
