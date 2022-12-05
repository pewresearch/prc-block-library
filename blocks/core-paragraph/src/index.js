/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';

/**
 * Internal Dependencies
 */

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor. All other files
 * get applied to the editor only.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Supports "Big Number" style
 */
const addCounterResetToBody = () => {
	const blockEditorRoot = document.querySelector(
		'.block-editor-block-list__layout.is-root-container',
	);
	if (blockEditorRoot) {
		blockEditorRoot.style.counterReset = 'section';
	}
};

domReady(() => {
	addCounterResetToBody();
});
