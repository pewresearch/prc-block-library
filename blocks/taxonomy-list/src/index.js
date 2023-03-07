/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */

/**
 * External Dependencies
 */
import { navigation as icon } from '@wordpress/icons';

/**
 * WordPress Dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

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
import './editor.scss';
import Edit from './Edit';
import Save from './Save';
import transforms from './transforms';

import metadata from './block.json';

const { name } = metadata;

const settings = {
	icon,
	/**
	 * @see ./Edit.jsx
	 */
	edit: Edit,
	/**
	 * @see ./Save.jsx
	 */
	save: Save,
	/**
	 * @see ./transforms.js
	 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-registration/#transforms-optional
	 */
	transforms,
};

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType(name, { ...metadata, ...settings });