/**
 * External Dependencies
 */
import type { Properties } from 'csstype';

/**
 * Internal Dependencies
 */
import { cleanEmptyObject, sanitizeUnitValue } from './helper';
import type { CornerProps, DirectionProps } from './style-picker';

function getCssPropertyWithFourDirection(
	property: keyof Properties,
	top: string,
	right: string,
	bottom: string,
	left: string
): Properties {
	if (top === right && top === bottom && top === left) {
		return {
			[property]: top,
		};
	}

	if (top === bottom && left === right) {
		return {
			[property]: `${top} ${left}`,
		};
	}

	if (left === right) {
		return {
			[property]: `${top} ${left} ${bottom}`,
		};
	}

	return {
		[property]: `${top} ${right} ${bottom} ${left}`,
	};
}

/**
 * Update padding style of styles object.
 *
 * @param styles Styles object.
 * @param values padding values object.
 * @return  New Styles object.
 */
export function updatePadding(
	styles: Properties,
	values: Partial<DirectionProps> | undefined
): Properties {
	if (!values) {
		return styles;
	}

	const top = values.top ? sanitizeUnitValue(values.top) : undefined;
	const right = values.right ? sanitizeUnitValue(values.right) : undefined;
	const bottom = values.bottom ? sanitizeUnitValue(values.bottom) : undefined;
	const left = values.left ? sanitizeUnitValue(values.left) : undefined;

	const {
		padding,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,
		...newStyles
	} = styles;

	if (!top || !right || !bottom || !left) {
		return {
			...newStyles,
			...cleanEmptyObject({
				paddingTop: top,
				paddingRight: right,
				paddingBottom: bottom,
				paddingLeft: left,
			}),
		};
	}

	return {
		...newStyles,
		...getCssPropertyWithFourDirection('padding', top, right, bottom, left),
	};
}

/**
 * Update border-width style of styles object.
 *
 * @param styles Styles object.
 * @param values border-width values object.
 * @return  New Styles object.
 */
export function updateBorderWidth(
	styles: Properties,
	values: Partial<DirectionProps> | undefined
): Properties {
	if (!values) {
		return styles;
	}

	const top = values.top ? sanitizeUnitValue(values.top) : undefined;
	const right = values.right ? sanitizeUnitValue(values.right) : undefined;
	const bottom = values.bottom ? sanitizeUnitValue(values.bottom) : undefined;
	const left = values.left ? sanitizeUnitValue(values.left) : undefined;

	const {
		borderWidth,
		borderTopWidth,
		borderRightWidth,
		borderBottomWidth,
		borderLeftWidth,
		...newStyles
	} = styles;

	if (!top || !right || !bottom || !left) {
		return {
			...newStyles,
			...cleanEmptyObject({
				borderTopWidth: top,
				borderRightWidth: right,
				borderBottomWidth: bottom,
				borderLeftWidth: left,
			}),
		};
	}

	return {
		...newStyles,
		...getCssPropertyWithFourDirection(
			'borderWidth',
			top,
			right,
			bottom,
			left
		),
	};
}

/**
 * Update border-style style of styles object.
 *
 * @param styles Styles object.
 * @param values border-style values object.
 * @return New Styles object.
 */
export function updateBorderStyle(
	styles: Properties,
	values: Partial<DirectionProps> | undefined
): Properties {
	if (!values) {
		return styles;
	}

	const top = values.top ?? undefined;
	const right = values.right ?? undefined;
	const bottom = values.bottom ?? undefined;
	const left = values.left ?? undefined;

	const {
		borderStyle,
		borderTopStyle,
		borderRightStyle,
		borderBottomStyle,
		borderLeftStyle,
		...newStyles
	} = styles;

	if (!top || !right || !bottom || !left) {
		return {
			...newStyles,
			...cleanEmptyObject({
				borderTopStyle: top,
				borderRightStyle: right,
				borderBottomStyle: bottom,
				borderLeftStyle: left,
			}),
		};
	}

	return {
		...newStyles,
		...getCssPropertyWithFourDirection(
			'borderStyle',
			top,
			right,
			bottom,
			left
		),
	};
}

/**
 * Update border-color style of styles object.
 *
 * @param styles Styles object.
 * @param values border-color values object.
 * @return New Styles object.
 */
export function updateBorderColor(
	styles: Properties,
	values: Partial<DirectionProps> | undefined
): Properties {
	if (!values) {
		return styles;
	}

	const top = values.top ?? undefined;
	const right = values.right ?? undefined;
	const bottom = values.bottom ?? undefined;
	const left = values.left ?? undefined;

	const {
		borderColor,
		borderTopColor,
		borderRightColor,
		borderBottomColor,
		borderLeftColor,
		...newStyles
	} = styles;

	if (!top || !right || !bottom || !left) {
		return {
			...newStyles,
			...cleanEmptyObject({
				borderTopColor: top,
				borderRightColor: right,
				borderBottomColor: bottom,
				borderLeftColor: left,
			}),
		};
	}

	return {
		...newStyles,
		...getCssPropertyWithFourDirection(
			'borderColor',
			top,
			right,
			bottom,
			left
		),
	};
}

/**
 * Update border-spacing style of styles object.
 *
 * @param styles            Styles object.
 * @param values            border-spacing values object.
 * @param values.horizontal
 * @param values.vertical
 * @return New Styles object.
 */
export function updateBorderSpacing(
	styles: Properties,
	values: { horizontal?: string; vertical?: string } | undefined
): Properties {
	if (!values) {
		return styles;
	}

	const { borderSpacing, ...newStyles } = styles;

	const horizontal = values.horizontal
		? sanitizeUnitValue(values.horizontal)
		: undefined;
	const vertical = values.vertical
		? sanitizeUnitValue(values.vertical)
		: undefined;

	if (horizontal === undefined && vertical === undefined) {
		return newStyles;
	}
	if (horizontal === vertical) {
		return {
			...newStyles,
			borderSpacing: horizontal,
		};
	}

	return {
		...newStyles,
		borderSpacing: `${horizontal} ${vertical}`,
	};
}

/**
 * Update border-radius style of styles object.
 *
 * @param styles Styles object.
 * @param values border-radius values object.
 * @return  New Styles object.
 */
export function updateBorderRadius(
	styles: Properties,
	values: Partial<CornerProps> | undefined
): Properties {
	if (!values) {
		return styles;
	}

	const topLeft = values?.topLeft
		? sanitizeUnitValue(values.topLeft)
		: undefined;
	const topRight = values?.topRight
		? sanitizeUnitValue(values.topRight)
		: undefined;
	const bottomRight = values?.bottomRight
		? sanitizeUnitValue(values.bottomRight)
		: undefined;
	const bottomLeft = values?.bottomLeft
		? sanitizeUnitValue(values.bottomLeft)
		: undefined;

	const {
		borderRadius,
		borderTopLeftRadius,
		borderTopRightRadius,
		borderBottomRightRadius,
		borderBottomLeftRadius,
		...newStyles
	} = styles;

	if (!topLeft || !topRight || !bottomRight || !bottomLeft) {
		return {
			...newStyles,
			...cleanEmptyObject({
				borderTopLeftRadius: topLeft,
				borderTopRightRadius: topRight,
				borderBottomRightRadius: bottomRight,
				borderBottomLeftRadius: bottomLeft,
			}),
		};
	}

	return {
		...newStyles,
		...getCssPropertyWithFourDirection(
			'borderRadius',
			topLeft,
			topRight,
			bottomRight,
			bottomLeft
		),
	};
}
