import { __ } from '@wordpress/i18n';
import edit from '../edit';
import save from '../save';
import variations from '../variations/lede';

const settings = [
    'prc-block/lede-layout',
    {
        title: __('Lede Layout'),
        description: 'Preconfigured advanced columns layouts for use in laying out Topics, Home, and Program pages.',
        category: 'layout',
        icon: 'schedule',
        keywords: [__('Lede')],
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
            divided: {
                type: 'boolean',
                default: true,
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
