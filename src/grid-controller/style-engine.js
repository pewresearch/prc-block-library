/* eslint-disable react-hooks/rules-of-hooks */
/**
 * WordPress dependencies
 */
import {
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalGetGapCSSValue as getGapCSSValue,
	useStyleOverride,
} from '@wordpress/block-editor';

/**
 * Gets the grid gutter (gap) styles for the grid-controller block.
 *
 * @param {Object} params
 * @param {Object} params.attributes Block attributes
 * @return {Object} CSS variable map
 */
function getGutterStyles({ attributes }) {
	const { style } = attributes || {};
	const { spacing } = style || {};
	const { blockGap } = spacing || {};

	const fallbackValue = 'var(--wp--style--block-gap, 24px)';
	let gutterValue = fallbackValue;

	if (!!blockGap) {
		gutterValue =
			typeof blockGap === 'string'
				? getGapCSSValue(blockGap)
				: getGapCSSValue(blockGap?.left) || fallbackValue;
	}

	const gutterMap = {
		'--grid-gutter': gutterValue === '0' ? '0px' : gutterValue,
	};

	return gutterMap;
}

/**
 * Gets the divider styles for the grid-controller block.
 *
 * @param {Object} params
 * @param {Object} params.attributes Block attributes
 * @return {Object} CSS variable map
 */
function getDividerStyles({ attributes }) {
	const { dividerColor, dividerStyle, dividerWidth, dividerInset } =
		attributes || {};

	function getColorValue(color) {
		if (!color) {
			return null;
		}
		if (typeof color === 'string') {
			return `var(--wp--preset--color--${color})`;
		}
		if (typeof color === 'object' && color.slug) {
			return `var(--wp--preset--color--${color.slug})`;
		}
		return color;
	}

	const varMap = {
		'--divider-color': getColorValue(dividerColor),
	};

	if (dividerStyle && dividerStyle !== 'solid') {
		varMap['--divider-style'] = dividerStyle;
	}

	if (dividerWidth && dividerWidth !== 1) {
		varMap['--divider-width'] = `${dividerWidth}px`;
	}

	if (dividerInset && dividerInset > 0) {
		varMap['--divider-inset'] = `${dividerInset}px`;
	}

	return varMap;
}

/**
 * Injects CSS custom properties for the grid-controller block, mirroring the pattern
 * used by the tabs block. This replaces inline style attributes with scoped CSS
 * that participates in the style engine cascade.
 *
 * @param {Object} props
 * @param {Object} props.attributes Block attributes
 * @param {string} props.clientId   Block client ID
 * @return {null} No UI output
 */
export default function StyleEngine({ attributes, clientId }) {
	const gutterVarMap = getGutterStyles({ attributes });
	const dividerVarMap = getDividerStyles({ attributes });

	const styleVarMap = {
		...gutterVarMap,
		...dividerVarMap,
	};

	const declarations = Object.entries(styleVarMap)
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
