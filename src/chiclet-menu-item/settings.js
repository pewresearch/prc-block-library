import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name, category, attributes } = metadata;

const settings = [
    name,
    {
        apiVersion: 2,
        title: __('PRC Chiclet Menu Item'),
        description: __('Menu item for Chiclet Menu blocks.'),
        category,
        attributes,
        edit,
        save,
    },
];

export default settings;
