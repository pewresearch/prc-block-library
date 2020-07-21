import { __ } from '@wordpress/i18n';
import { column as icon } from '@wordpress/icons';
import edit from './edit';
import save from './save';

const settings = [
    'prc-block/column',
    {
        title: __('PRC Column'),
        description: __('A single column within a columns block.'),
        category: 'layout',
        icon,
        keywords: [__('Column')],
        supports: {
            html: false,
            align: false,
        },
        attributes: {
            width: {
                type: 'integer',
                default: 0,
            },
            // Legacy, does nothing
            items: {
                type: 'boolean',
                default: false,
            },
        },
        parent: ['prc-block/columns'],
        // inserter: false,
        edit,
        save,
    },
];

export default settings;
