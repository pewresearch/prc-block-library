/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';
import variations from './variations';

const { name } = metadata;

const settings = {
    edit,
    save,
	variations,
};

registerBlockType(name, { ...metadata, ...settings });