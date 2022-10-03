/**
 * WordPress Dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import metadata from './block.json';
import edit from './edit';
import icon from './icon';
import './style.scss';

const { name } = metadata;

const settings = {
	icon,
	edit,
	save: () => null,
};

registerBlockType(name, { ...metadata, ...settings });
