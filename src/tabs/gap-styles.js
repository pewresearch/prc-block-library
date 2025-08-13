/**
 * WordPress dependencies
 */
import {
	__experimentalGetGapCSSValue as getGapCSSValue,
	useStyleOverride,
} from '@wordpress/block-editor';

export default function GapStyles( { blockGap, clientId, orientation } ) {
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
	const gap = `#block-${ clientId } {
		--wp--style--unstable-tabs-list-gap: ${ listGapValue };
		--wp--style--unstable-tabs-gap: ${ gapValue };
	}`;

	useStyleOverride( { css: gap } );

	return null;
}
