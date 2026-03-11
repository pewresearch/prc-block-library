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
import './editor.scss';
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
