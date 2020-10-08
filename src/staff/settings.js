import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';
import transforms from './transforms';

const { name, category, attributes } = metadata;

const settings = [
    name,
    {
        title: __('PRC Staffer'),
        description: __(
            'Paste a staff link and return a staff member with their photo, name, and job title.',
        ),
        category,
        attributes,
        supports: {
            // Hide this block from the inserter.
            // This block can only be inserted by pasting in a staffer url.
            inserter: false,
        },
        edit,
        save,
        transforms,
    },
];

export default settings;
