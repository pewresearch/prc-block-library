
import { __ } from '@wordpress/i18n';
import { columns as icon } from '@wordpress/icons';
import edit from '../edit';
import save from '../save';
import variations from '../variations/standard';

const settings = [
    'prc-block/columns',
    {
        title: __('PRC Columns'),
        description: __(
            'Add a block that displays content in multiple columns, then add whatever content blocks you’d like.'
        ),
        category: 'layout',
        icon,
        keywords: [__('Columns'), __('Column')],
        supports: {
            html: false,
            align: false,
            // lightBlockWrapper: true,
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
            divided: {
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
