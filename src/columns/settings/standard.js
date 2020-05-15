
import { __ } from '@wordpress/i18n';
import edit from '../edit';
import save from '../save';
import variations from '../variations/standard';

const settings = [
    'prc-block/columns',
    {
        title: __('Columns'),
        description: '.',
        category: 'layout',
        icon: 'layout',
        keywords: [__('Columns'), __('Column')],
        supports: {
            html: false,
            align: false,
            lightBlockWrapper: true,
        },
        variations,
        attributes: {
            size: {
                type: 'string',
                default: ''
            },
            equal: {
                type: 'boolean',
                default: false,
            },
            doubling: {
                type: 'boolean',
                default: true,
            },
            stackable: {
                type: 'boolean',
                default: true,
            },
        },
        edit,
        save,
    },
];

export default settings;
