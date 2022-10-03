/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';
import icon from './icon';

const { name } = metadata;

const settings = {
	icon,
	edit,
	save,
};

registerBlockType(name, { ...metadata, ...settings });
