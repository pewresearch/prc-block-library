/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */

/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { registerBlockType, unregisterBlockType } from '@wordpress/blocks';
import domReady from '@wordpress/dom-ready';

/**
 * Internal Dependencies
 */
import transforms from './transforms';

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
import edit from './edit';
import icon from './icon';
import save from './save';
import metadata from './block.json';

const { name } = metadata;

const settings = {
	icon,
	edit,
	save,
	transforms,
};

registerBlockType(name, { ...metadata, ...settings });
