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

const { name, title } = metadata;

const settings = {
	icon,
	__experimentalLabel: ({ label }) => label || title, // Will change the label to match the label attr, #experimental.
	edit,
	save: () => null,
};

registerBlockType(name, { ...metadata, ...settings });
