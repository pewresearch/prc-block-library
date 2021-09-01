/**
 * WordPress Dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name } = metadata;
 
const settings = {
    title: __('PRC Flip Card (Back)'),
    description: __('Back of the flip card'),
    edit,
    save,
};

registerBlockType(name, { ...metadata, ...settings });