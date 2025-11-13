/**
 * WordPress dependencies
 */
import {
	__experimentalGetGapCSSValue as getGapCSSValue,
	useStyleOverride,
} from '@wordpress/block-editor';

/**
 * Gets the gap styles for the grid-column block.
 *
 * @param {Object} param0
 * @param {Object} param0.attributes Block attributes
 * @return {Object} Gap CSS custom properties map
 */
function getGapStyles({ attributes }) {
	const { style } = attributes || {};
	const { spacing } = style || {};
	const { blockGap } = spacing || {};
	
	// Fallback value for gap
	const fallbackValue = `var( --wp--style--grid-column-gap-default, var( --wp--style--block-gap, 0.5em ) )`;
	let gapValue = fallbackValue;

	// Check for a value.
	if (!!blockGap) {
		gapValue =
			typeof blockGap === 'string'
				? getGapCSSValue(blockGap)
				: getGapCSSValue(blockGap?.top) || fallbackValue;
	}

	const gapMap = {
		'--grid-column-gap-default': fallbackValue,
		'--grid-column-gap': gapValue,
	};

	return gapMap;
}

/**
 * Injects gap CSS custom properties for the grid-column block.
 * These values are scoped to `#block-{ clientId }` and participate in
 * the style engine cascade like other dynamic style overrides.
 *
 * @param {Object} props
 * @param {Object} props.attributes Block attributes
 * @param {string} props.clientId   Block client ID
 * @return {null} No UI output
 */
export default function StyleEngine({ attributes, clientId }) {
	const gapVarMap = getGapStyles({ attributes });

	// Build scoped CSS only for defined values to avoid unnecessary empty declarations.
	const declarations = Object.entries(gapVarMap)
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
