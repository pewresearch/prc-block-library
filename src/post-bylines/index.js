import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { people } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';
import './style.scss';

const { name } = metadata;

const settings = {
	icon: people,
    edit,
    save,
};

registerBlockType(name, { ...settings, ...metadata });
