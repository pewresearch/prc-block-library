/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';
import { select } from '@wordpress/data';
import { unregisterBlockStyle } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor. All other files
 * get applied to the editor only.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

const BLOCKNAME = 'core/image';

/**
 * Remove the "Rounded" style from the core/image block.
 */
domReady(() => {
	if (null === select('core/editor')) {
		return;
	}
	unregisterBlockStyle(BLOCKNAME, ['rounded']);
});
