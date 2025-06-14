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
import edit from './edit';
import icon from './icon';
import save from './save';
import metadata from './block.json';

const { name, title } = metadata;

const settings = {
	icon,
	edit,
	__experimentalLabel: ({ label }) =>
		label && label.length > 0 ? label : title,
	save,
};

registerBlockType(name, { ...metadata, ...settings });
