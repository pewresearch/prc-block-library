/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import icon from './icon';
import transforms from './transforms';
import deprecated from './deprecated';
import './style.scss';
import './editor.scss';

import metadata from './block.json';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon,
	edit,
	save,
	transforms,
	deprecated,
};

registerBlockType(name, { ...metadata, ...settings });
