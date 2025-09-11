/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { register } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import edit from './edit';
import save from './save';
import icon from './icon';
import deprecated from './deprecated';
import metadata from './block.json';
import { store } from './store';


const { name } = metadata;

const settings = {
	icon,
	edit,
	save,
	deprecated,
};

registerBlockType(name, { ...metadata, ...settings });
register(store);
