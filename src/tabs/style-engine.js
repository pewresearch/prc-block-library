/**
 * WordPress dependencies
 */
import {
	__experimentalGetGapCSSValue as getGapCSSValue,
	useStyleOverride,
} from '@wordpress/block-editor';


/**
 * Gets the gap styles for the tab block.
 *
 * @param {*} param0
 * @returns {null} No UI.
 */
function getGapStyles( { attributes } ) {
	const { style, orientation } = attributes || {};
	const { spacing } = style || {};
	const { blockGap } = spacing || {};
	//--wp--style--tabs-list-gap-default should be used by themes that want to set a default
	// gap on the tabs list.
	const fallbackValue = `var( --wp--style--tabs-gap-default, var( --wp--style--block-gap, 0.5em ) )`;
	let listGapValue = fallbackValue;
	let gapValue = fallbackValue;

	// Check for a value.
	if ( !! blockGap ) {
		listGapValue =
			typeof blockGap === 'string'
				? getGapCSSValue( blockGap )
				: getGapCSSValue( blockGap?.left ) || fallbackValue;
		gapValue =
			typeof blockGap === 'string'
				? getGapCSSValue( blockGap )
				: getGapCSSValue( blockGap?.top ) || fallbackValue;
	}

	if ( orientation === 'vertical' ) {
		const _listGapValue = listGapValue;
		const _gapValue = gapValue;
		listGapValue = _gapValue;
		gapValue = _listGapValue;
	}

	// The unstable tabs list gap calculation requires a real value (such as `0px`) and not `0`.
	const gapMap = {
		'--wp--style--unstable-tabs-list-gap': listGapValue === '0' ? '0px' : listGapValue,
		'--wp--style--unstable-tabs-gap': gapValue,
	};

	return gapMap;
}

function getColorStyles({ attributes}) {
	const {
		customTabInactiveColor,
		customTabHoverColor,
		customTabActiveColor,
		customTabTextColor,
		customTabActiveTextColor,
		customTabHoverTextColor,
	} = attributes || {};

	// Helper to normalize color objects (preset { slug } vs direct value).
	function getColorValue( color ) {
		if ( ! color ) {
			return null;
		}
		if ( typeof color === 'object' && color.slug ) {
			return `var(--wp--preset--color--${ color.slug })`;
		}
		return color;
	}

	const colorVarMap = {
		'--custom-tab-inactive-color': getColorValue( customTabInactiveColor ),
		'--custom-tab-active-color': getColorValue( customTabActiveColor ),
		'--custom-tab-hover-color': getColorValue( customTabHoverColor ),
		'--custom-tab-text-color': getColorValue( customTabTextColor ),
		'--custom-tab-active-text-color': getColorValue( customTabActiveTextColor ),
		'--custom-tab-hover-text-color': getColorValue( customTabHoverTextColor ),
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
 * @returns {null} No UI output
 */
export default function StyleEngine( { attributes, clientId } ) {
	if ( ! clientId ) {
		return null;
	}

	const gapVarMap = getGapStyles( { attributes } );
	const colorVarMap = getColorStyles( { attributes } );

	const styleVarMap = {
		...gapVarMap,
		...colorVarMap,
	};

	// Build scoped CSS only for defined values to avoid unnecessary empty declarations.
	const declarations = Object.entries( styleVarMap )
		.filter( ( [ , value ] ) => !! value )
		.map( ( [ name, value ] ) => `\t${ name }: ${ value };` )
		.join( '\n' );

	if ( declarations.length ) {
		useStyleOverride( {
			css: `#block-${ clientId } {\n${ declarations }\n}`,
		} );
	}

	return null;
}
