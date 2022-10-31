/**
 * WordPress Dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { column as icon } from '@wordpress/icons';

/**
 * Internal Dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';
import variations from './variations';
import './style.scss';

const { name } = metadata;

const settings = {
	icon,
	edit,
	save,
	variations,
};

registerBlockType(name, { ...metadata, ...settings });
