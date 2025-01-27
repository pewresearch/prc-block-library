/**
 * WordPress Dependencies
 */
import { addFilter } from '@wordpress/hooks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor. All other files
 * get applied to the editor only.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';
import './editor.scss';

const BLOCKNAME = 'core/button';
const BLOCKIDENTIFIER = 'prc-block-library/core-button';

/**
 * Add support for interactivity api to the core button block.
 *
 * @param {Object} settings Settings for the block.
 *
 * @return {Object} settings Modified settings.
 */
addFilter(
	'blocks.registerBlockType',
	`${BLOCKIDENTIFIER}-supports`,
	(settings) => {
		if (BLOCKNAME !== settings.name) {
			return settings;
		}
		settings.supports = {
			...settings.supports,
			interactivity: true,
		};
		// I want singular button blocks to be available anywhere and everywhere.
		delete settings.parent;
		return settings;
	},
	10
);
