
import { __ } from '@wordpress/i18n';
import edit from './edit';
import save from './save';
import variations from './variations';

const settings = [
    'prc-block/columns',
    {
        title: __('Columns'),
        description: '.',
        category: 'layout',
        icon: 'grid',
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
        },
        edit,
        save,
    },
];

export default settings;
