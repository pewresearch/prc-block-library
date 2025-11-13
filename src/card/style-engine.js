/**
 * WordPress dependencies
 */
import {
	__experimentalGetGapCSSValue as getGapCSSValue,
	useStyleOverride,
} from '@wordpress/block-editor';

function getColorStyles({ attributes }) {
	const { customHeadingTextColor, customHeadingBackgroundColor } =
		attributes || {};

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
		'--custom-heading-text-color': getColorValue(customHeadingTextColor),
		'--custom-heading-background-color': getColorValue(
			customHeadingBackgroundColor
		),
	};

	return colorVarMap;
}

/**
 * Injects color CSS custom properties for the tabs block, mirroring the pattern
 * used by gap-styles (scoped to `#block-{ clientId }`). This replaces the prior
 * inline-style object return value approach so that these values participate in
 * style engine cascade like other dynamic style overrides.
 *
 * @param {Object} props
 * @param {Object} props.attributes Block attributes
 * @param {string} props.clientId   Block client ID
 * @return {null} No UI output
 */
export default function StyleEngine({ attributes, clientId }) {
	if (!clientId) {
		return null;
	}

	const colorVarMap = getColorStyles({ attributes });

	const styleVarMap = {
		...colorVarMap,
	};

	// Build scoped CSS only for defined values to avoid unnecessary empty declarations.
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
