/**
 * WordPress Dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import './style.scss';
import edit from './edit';
import save from './save';
import icon from './icon';

import metadata from './block.json';

const { name } = metadata;

const settings = {
	edit,
	save,
	icon,
};

registerBlockType(name, { ...metadata, ...settings });
