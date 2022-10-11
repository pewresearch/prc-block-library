/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
// import './style.scss';
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name } = metadata;

const settings = {
	__experimentalLabel: ({ title }) => title || 'Menu Item', // Will change the label to match the title, #experimental.
	edit,
	save,
};

registerBlockType(name, { ...metadata, ...settings });
