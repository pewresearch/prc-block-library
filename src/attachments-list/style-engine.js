/**
 * External Dependencies
 */
import { getBlockGapSupportValue } from '@prc/block-utils';

/**
 * WordPress dependencies
 */
import { useStyleOverride } from '@wordpress/block-editor';

/**
 * Gets the color styles for the attachments-list block.
 *
 * @param {Object} attributes Block attributes
 * @returns {Object} Color variable map
 */
function getStyles({ attributes }) {
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
		'--block-gap': getBlockGapSupportValue(attributes),
	};

	return colorVarMap;
}

/**
 * Injects color CSS custom properties for the attachments-list block.
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

	const varMap = getStyles({ attributes });

	const declarations = Object.entries(varMap)
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
