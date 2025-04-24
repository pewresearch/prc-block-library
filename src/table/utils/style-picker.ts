/**
 * External Dependencies
 */
import type { Properties } from 'csstype';

/**
 * Internal dependencies
 */
import { parseCssValue, type FourCssValues } from './helper';

export interface DirectionProps {
	top: string;
	right: string;
	bottom: string;
	left: string;
}

export interface CornerProps {
	topLeft: string;
	topRight: string;
	bottomRight: string;
	bottomLeft: string;
}

export interface CrossProps {
	horizontal: string;
	vertical: string;
}

/**
 * Pick padding style as object from style object.
 *
 * @param stylesObj styles object.
 * @return padding styles object.
 */
export function pickPadding(stylesObj: Properties): DirectionProps {
	if (stylesObj.padding) {
		const paddingValues: FourCssValues = parseCssValue(stylesObj.padding);

		return {
			top: paddingValues[0],
			right: paddingValues[1],
			bottom: paddingValues[2],
			left: paddingValues[3],
		};
	}

	return {
		top: stylesObj?.paddingTop || '',
		right: stylesObj?.paddingRight || '',
		bottom: stylesObj?.paddingBottom || '',
		left: stylesObj?.paddingLeft || '',
	};
}

/**
 * Pick border-width style as object from style object.
 *
 * @param stylesObj styles object.
 * @return border-width styles object.
 */
export function pickBorderWidth(stylesObj: Properties): DirectionProps {
	if (stylesObj.borderWidth) {
		const borderWidthValues: FourCssValues = parseCssValue(
			stylesObj.borderWidth
		);

		return {
			top: borderWidthValues[0],
			right: borderWidthValues[1],
			bottom: borderWidthValues[2],
			left: borderWidthValues[3],
		};
	}

	return {
		top: stylesObj?.borderTopWidth || '',
		right: stylesObj?.borderRightWidth || '',
		bottom: stylesObj?.borderBottomWidth || '',
		left: stylesObj?.borderLeftWidth || '',
	};
}

/**
 * Pick border-color style as object from style object.
 *
 * @param stylesObj styles object.
 * @return border-color styles object.
 */
export function pickBorderColor(stylesObj: Properties): DirectionProps {
	if (stylesObj.borderColor) {
		const borderColorValues: FourCssValues = parseCssValue(
			stylesObj.borderColor
		);

		return {
			top: borderColorValues[0],
			right: borderColorValues[1],
			bottom: borderColorValues[2],
			left: borderColorValues[3],
		};
	}

	return {
		top: stylesObj?.borderTopColor || '',
		right: stylesObj?.borderRightColor || '',
		bottom: stylesObj?.borderBottomColor || '',
		left: stylesObj?.borderLeftColor || '',
	};
}

/**
 * Pick border-style style as object from style object.
 *
 * @param stylesObj styles object.
 * @return border-style styles object.
 */
export function pickBorderStyle(stylesObj: Properties): DirectionProps {
	if (stylesObj.borderStyle) {
		const borderStyleValues: FourCssValues = parseCssValue(
			stylesObj.borderStyle
		);

		return {
			top: borderStyleValues[0],
			right: borderStyleValues[1],
			bottom: borderStyleValues[2],
			left: borderStyleValues[3],
		};
	}

	return {
		top: stylesObj?.borderTopStyle || '',
		right: stylesObj?.borderRightStyle || '',
		bottom: stylesObj?.borderBottomStyle || '',
		left: stylesObj?.borderLeftStyle || '',
	};
}

/**
 * Pick border-radius style as object from style object.
 *
 * @param stylesObj                         styles object.
 * @param stylesObj.borderRadius
 * @param stylesObj.borderTopLeftRadius
 * @param stylesObj.borderTopRightRadius
 * @param stylesObj.borderBottomRightRadius
 * @param stylesObj.borderBottomLeftRadius
 * @return border-radius styles object.
 */
export function pickBorderRadius(stylesObj: Properties): CornerProps {
	if (stylesObj.borderRadius) {
		const borderRadiusValues: FourCssValues = parseCssValue(
			stylesObj.borderRadius
		);
		return {
			topLeft: borderRadiusValues[0],
			topRight: borderRadiusValues[1],
			bottomRight: borderRadiusValues[2],
			bottomLeft: borderRadiusValues[3],
		};
	}

	return {
		topLeft: stylesObj?.borderTopLeftRadius || '',
		topRight: stylesObj?.borderTopRightRadius || '',
		bottomRight: stylesObj?.borderBottomRightRadius || '',
		bottomLeft: stylesObj?.borderBottomLeftRadius || '',
	};
}

/**
 * Pick border-spacing style as object from style object.
 *
 * @param stylesObj styles object.
 * @return border-spacing styles object.
 */
export function pickBorderSpacing(stylesObj: Properties): CrossProps {
	const borderSpacingValues: FourCssValues = parseCssValue(
		stylesObj.borderSpacing || ''
	);

	return {
		horizontal: borderSpacingValues[0],
		vertical: borderSpacingValues[1],
	};
}
