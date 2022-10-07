/**
 * WordPress Dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { trendingUp } from '@wordpress/icons';

/**
 * Internal Dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';
import './style.scss';

const { name } = metadata;

const settings = {
	icon: trendingUp,
	edit,
	save,
};

registerBlockType(name, { ...metadata, ...settings });
