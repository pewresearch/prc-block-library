/**
 * WordPress Dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { columns as icon } from '@wordpress/icons';

/**
 * Internal Dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';
import transforms from './transforms';
import variations from './variations';
import './style.scss';

const { name } = metadata;

const settings = {
	icon,
	edit,
	save,
	transforms,
	variations,
};

registerBlockType(name, { ...metadata, ...settings });
