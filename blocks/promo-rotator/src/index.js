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

import metadata from './block.json';

const { name } = metadata;

const settings = {
	icon: () => (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
			<path d="M341.1 0l9.4 15 63.8 102.1L464.8 88l12 20.8L444.6 229 324.4 196.8l-12-20.8 46.5-26.8L305.7 64l-35.4 0-33.5 53.6-55.5-32L225.4 15l9.4-15 17.7 0 70.8 0 17.7 0zm99.2 279.5l55.5-32 43.3 69.3 10.2 16.3-9.6 16.7-32 55.4L492.2 432 483 448H464.5L352 448v56H328l-88-88 88-88h24v56l94 0 6.3-10.9 22.4-38.8-34.3-54.8zM96.7 221.1L48 193l12-20.8L180.2 140l32.2 120.2-12 20.8-48.3-27.9-50.8 81.3L130 384l62 0v64l-80.5 0L93 448l-9.2-16L36.3 349.7l-9.6-16.7 10.2-16.3 59.8-95.7z" />
		</svg>
	),
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
