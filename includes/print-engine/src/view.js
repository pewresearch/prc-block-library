/* eslint-disable max-len */
/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor. All other files
 * get applied to the editor only.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './print.scss';

domReady(() => {
	console.log('🖨️ Print Engine (BETA) is ready!');
	window.addEventListener('beforeprint', (event) => {
		console.log('Before print do these actions...', event);
	});
	// Hook the print function onto the beta print engine report material:
	document
		.querySelector('li[data-material-type="printEngineBeta"] a')
		.addEventListener('click', (event) => {
			event.preventDefault();
			window.print();
		});
});
