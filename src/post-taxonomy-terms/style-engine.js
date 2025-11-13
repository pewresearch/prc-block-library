/**
 * WordPress dependencies
 */
import { useStyleOverride } from '@wordpress/block-editor';

/**
 * Gets the color styles for the post-taxonomy-terms block.
 *
 * @param {Object} attributes Block attributes
 * @returns {Object} Color variable map
 */
function getColorStyles({ attributes }) {
	const {
		customHoverBackgroundColor,
		customHoverTextColor,
		customActiveBackgroundColor,
		customActiveTextColor,
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
		'--hover-background-color': getColorValue(customHoverBackgroundColor),
		'--hover-text-color': getColorValue(customHoverTextColor),
		'--active-background-color': getColorValue(customActiveBackgroundColor),
		'--active-text-color': getColorValue(customActiveTextColor),
	};

	return colorVarMap;
}

/**
 * Injects color CSS custom properties for the post-taxonomy-terms block, mirroring the pattern
 * used by the tabs block (scoped to `#block-{ clientId }`). This replaces the prior
 * class-based color system so that these values participate in style engine cascade
 * like other dynamic style overrides.
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

	const colorVarMap = getColorStyles({ attributes });

	// Build scoped CSS only for defined values to avoid unnecessary empty declarations.
	const declarations = Object.entries(colorVarMap)
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
