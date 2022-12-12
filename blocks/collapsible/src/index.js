/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */

/**
 * WordPress Dependencies
 */
import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';

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
import Edit from './Edit';
import Save from './Save';

import metadata from './block.json';

const { name } = metadata;

const settings = {
	icon: () => (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
			<path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 368C269.3 368 280 357.3 280 344V280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H280V168C280 154.7 269.3 144 256 144C242.7 144 232 154.7 232 168V232H168C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H232V344C232 357.3 242.7 368 256 368z" />
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

registerBlockVariation('core/group', {
	name: 'accordion',
	title: 'Accordion',
	description: 'Display a set of collapsible blocks as an accordion',
	attributes: {},
	innerBlocks: [
		[
			'prc-block/collapsible',
			{},
			[
				[
					name,
					{
						className: 'is-style-accordion',
					},
				],
			],
		],
	],
	scope: ['block'],
});
