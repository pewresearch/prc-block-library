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
import './style.scss';
import './editor.scss';
import Edit from './Edit';
import Save from './Save';

import metadata from './block.json';

const { name } = metadata;

const settings = {
	icon: () => (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
			<path d="M208 237.7L229.2 280H186.8L208 237.7zM416 280C416 293.3 405.3 304 392 304C378.7 304 368 293.3 368 280C368 266.7 378.7 256 392 256C405.3 256 416 266.7 416 280zM512 32C547.3 32 576 60.65 576 96V416C576 451.3 547.3 480 512 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H512zM229.5 173.3C225.4 165.1 217.1 160 208 160C198.9 160 190.6 165.1 186.5 173.3L114.5 317.3C108.6 329.1 113.4 343.5 125.3 349.5C137.1 355.4 151.5 350.6 157.5 338.7L162.8 328H253.2L258.5 338.7C264.5 350.6 278.9 355.4 290.7 349.5C302.6 343.5 307.4 329.1 301.5 317.3L229.5 173.3zM416 212.1C408.5 209.4 400.4 208 392 208C352.2 208 320 240.2 320 280C320 319.8 352.2 352 392 352C403.1 352 413.6 349.5 423 344.1C427.4 349.3 433.4 352 440 352C453.3 352 464 341.3 464 328V184C464 170.7 453.3 160 440 160C426.7 160 416 170.7 416 184V212.1z" />
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

console.log('Registering promo', settings);

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType(name, { ...metadata, ...settings });