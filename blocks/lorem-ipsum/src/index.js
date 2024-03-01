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
import { __ } from '@wordpress/i18n';
import { registerBlockType, createBlock } from '@wordpress/blocks';

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

import metadata from './block.json';

const { name } = metadata;

const transforms = {
	from: [
		{
			type: 'enter',
			regExp: /%ipsum/,
			transform: ({ content }) => {
				const match = content.match(/%ipsum\s*(\d+)/);
				const number = match && match[1] ? parseInt(match[1], 10) : 1;
				return createBlock('prc-block/lorem-ipsum', {
					totalParagraphs: number || 1,
				});
			},
		},
	],
};

const settings = {
	/**
	 * @see ./Edit.jsx
	 */
	edit: Edit,
	/**
	 * @see ./Save.jsx
	 */
	save: Save,

	transforms,
};

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType(name, { ...metadata, ...settings });
