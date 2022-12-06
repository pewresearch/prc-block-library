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
		<svg
			width={24}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 512 512"
			preserveAspectRatio="xMidYMid meet"
			focusable="false"
		>
			<path d="M224 0h64V32H448l64 64-64 64H32V32H224V0zm0 224V192h64v32H480V352H64L0 288l64-64H224zm64 160V512H224V384h64z" />
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