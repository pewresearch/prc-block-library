/**
 * WordPress Dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';
import transforms from './transforms';
import icon from './Icon';

const { name } = metadata;

// https://gist.github.com/sethrubenstein/93f4fa162511e8eb2577695db6fec41e

const settings = {
	icon,
	transforms,
	edit,
	save,
	__experimentalLabel: ({ file }) => `Gist: ${file}` || 'GitHub Gist', // Will change the label to match the title, #experimental.
};

registerBlockType(name, { ...metadata, ...settings });
