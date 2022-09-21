/**
 * WordPress Dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { formatListNumbered as icon } from '@wordpress/icons';

/**
 * Internal Dependencies
 */
import metadata from './block.json';
import edit from './edit';
import './style.scss';

const { name } = metadata;

const settings = {
	icon,
	edit,
	save: () => null,
};

registerBlockType(name, { ...metadata, ...settings });
