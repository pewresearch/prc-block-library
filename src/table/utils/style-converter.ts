/**
 * External Dependencies
 */
import type { Properties } from 'csstype';

/**
 * Convert inline CSS styles to object.
 *
 * @param inlineStyles Inline CSS styles.
 * @return CSS styles object.
 */
export function convertToObject(inlineStyles: string | undefined): Properties {
	if (!inlineStyles) {
		return {};
	}

	return inlineStyles
		.split(';')
		.filter((style) => style.split(':')[0] && style.split(':')[1])
		.map((style) => [
			style
				.split(':')[0]
				.trim()
				.replace(/-./g, (c) => c.substr(1).toUpperCase()),
			style.split(':')[1].trim(),
		])
		.reduce(
			(styleObj, style) => ({
				...styleObj,
				[style[0]]: style[1],
			}),
			{}
		);
}

/**
 * Convert CSS styles object to Inline CSS styles.
 *
 * @param stylesObj CSS styles object.
 * @return Inline CSS styles
 */
export function convertToInline(stylesObj: Properties): string {
	const lines: string[] = Object.keys(stylesObj).reduce<string[]>(
		(result: string[], key: string) => {
			const property = key
				.replace(/([a-z])([A-Z])/g, '$1-$2')
				.toLowerCase();
			const value = stylesObj[key as keyof Properties];

			if (
				value !== undefined &&
				(typeof value === 'string' || value === 0)
			) {
				result.push(`${property}:${value};`);
			}
			return result;
		},
		[] as string[]
	);

	return lines.join('');
}
