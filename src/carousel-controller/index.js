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
import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import edit from './edit';
import save from './save';
import { HorizontalIcon as icon, VerticalIcon } from './icons';
import variations from './variations';
import transforms from './transforms';
import './style.scss';
import './editor.scss';

import metadata from './block.json';

const { name } = metadata;

const settings = {
	icon,
	edit,
	save,
	variations,
	transforms,
};

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType(name, { ...metadata, ...settings });
