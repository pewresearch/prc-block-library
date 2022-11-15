/**
 * WordPress Dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';
import Icon from './Icon';

const { name } = metadata;

const settings = {
	edit,
	save,
	icon: Icon,
};

registerBlockType(name, { ...metadata, ...settings });
