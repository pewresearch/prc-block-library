/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { navigation as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
// import './style.scss';
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name } = metadata;

const settings = {
	icon,
	edit,
	save,
};

registerBlockType(name, { ...metadata, ...settings });
