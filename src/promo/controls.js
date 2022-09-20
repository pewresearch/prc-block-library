/**
 * External Dependencies
 */
import { HeadingLevelToolbar } from '@prc-app/shared';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useEffect } from '@wordpress/element';
import { BlockControls } from '@wordpress/block-editor';

/**
 * Credit: https://awik.io/determine-color-bright-dark-using-javascript/
 */
function lightOrDark(color) {
	// Variables for red, green, blue values
	let r;
	let g;
	let b;
	let hsp;

	// Check the format of the color, HEX or RGB?
	if (color.match(/^rgb/)) {
		// If RGB --> store the red, green, blue values in separate variables
		color = color.match(
			/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/,
		);

		r = color[1];
		g = color[2];
		b = color[3];
	} else {
		// If hex --> Convert it to RGB: http://gist.github.com/983661
		color = +`0x${color.slice(1).replace(5 > color.length && /./g, '$&$&')}`;

		r = color >> 16;
		g = (color >> 8) & 255;
		b = color & 255;
	}

	// HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
	hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

	// Using the HSP value, determine whether the color is light or dark
	if (127.5 < hsp) {
		return 'light';
	}

	return 'dark';
}

export default function Controls({
	hasDarkBackground,
	headingLevel,
	icon,
	setAttributes,
}) {
	return (
		<BlockControls>
			<HeadingLevelToolbar
				selectedLevel={headingLevel}
				onChange={(newLevel) => setAttributes({ headingLevel: newLevel })}
			/>
		</BlockControls>
	);
}
