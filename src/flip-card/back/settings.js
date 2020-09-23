import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name, category, attributes, parent } = metadata;

const settings = [
    name,
    {
        title: __('PRC Flip Card (Back)'),
        description: __('Back of the flip card'),
        category,
        attributes,
        edit,
        save,
        parent,
    },
];

export default settings;
