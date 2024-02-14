/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';
import { registerBlockStyle, unregisterBlockStyle } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor. All other files
 * get applied to the editor only.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */

import './style.scss';

domReady(() => {
	registerBlockStyle('core/navigation', {
		name: 'pills',
		label: 'Pills',
	});
	registerBlockStyle('core/navigation', {
		name: 'mega-menu',
		label: 'Mega Menu',
	});
	registerBlockStyle('core/navigation', {
		name: 'divided-links',
		label: 'Divided Links',
	});
});
