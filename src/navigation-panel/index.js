/**
 * WordPress Dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import './style.scss';
import './editor.scss';
import edit from './edit';
import save from './save';
import metadata from './block.json';
import icon from './icon';

const { name } = metadata;

const settings = {
	icon,
	edit,
	save,
};

registerBlockType(name, { ...metadata, ...settings });
