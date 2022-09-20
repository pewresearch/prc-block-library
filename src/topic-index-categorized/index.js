/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name } = metadata;

const settings = {
	__experimentalLabel: ({ heading }) => heading,
	edit,
	save,
};

registerBlockType(name, { ...metadata, ...settings });
