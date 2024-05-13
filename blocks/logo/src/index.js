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
import { addFilter } from '@wordpress/hooks';

/**
 * Internal Dependencies
 */
import './style.scss';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor. All other files
 * get applied to the editor only.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import metadata from './block.json';
import icon from './icon';
import edit from './edit';

const { name } = metadata;

const settings = {
	icon,
	edit,
};

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType(name, { ...metadata, ...settings });

/**
 * Make logo available to core/navigation block
 */
addFilter(
	'blocks.registerBlockType',
	'prc-block-logo-add-to-navigation',
	(blockSettings, blockName) => {
		if (blockName === 'core/navigation') {
			return {
				...blockSettings,
				allowedBlocks: [
					...(blockSettings.allowedBlocks ?? []),
					'prc-block/logo',
				],
			};
		}
		return blockSettings;
	}
);
