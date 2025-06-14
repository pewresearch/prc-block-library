/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import './style.scss';
import metadata from './block.json';
import edit from './edit';
import save from './save';
import icon from './icon';
import variations from './variations';

const { name } = metadata;

const settings = {
	icon,
	edit,
	save,
	variations,
};

registerBlockType(name, { ...metadata, ...settings });
