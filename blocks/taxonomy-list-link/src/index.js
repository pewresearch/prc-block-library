/**
 * External Dependencies
 */
import { link as icon } from '@wordpress/icons';

/**
 * WordPress Dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

import './style.scss';
import './editor.scss';
import edit from './edit';
import save from './save';
import variations from './variations';

import metadata from './block.json';

const { name, title } = metadata;

const settings = {
	__experimentalLabel: ({ label }) => label || title,
	icon,
	edit,
	save,
	variations,
};

registerBlockType(name, { ...metadata, ...settings });
