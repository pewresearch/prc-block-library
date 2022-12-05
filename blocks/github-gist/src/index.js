/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */

// Examples:
// https://gist.github.com/sethrubenstein/93f4fa162511e8eb2577695db6fec41e
// https://gist.github.com/sethrubenstein/907b09e5734f2524a03bac2ebb7951eb

/**
 * External Dependencies
 */

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
import Edit from './Edit';
import Save from './Save';
import Icon from './Icon';

import metadata from './block.json';

const { name, title } = metadata;

const settings = {
	icon: Icon,
	__experimentalLabel: ({ file }) =>
		0 < file.length ? `Gist: ${file}` : title, // Will change the label to match the title, #experimental.
	/**
	 * @see ./Edit.jsx
	 */
	edit: Edit,
	/**
	 * @see ./Save.jsx
	 */
	save: Save,
};

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType(name, { ...metadata, ...settings });
