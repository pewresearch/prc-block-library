
import { __ } from '@wordpress/i18n';
import edit from './edit';
import save from './save';

const settings = [
    'prc-block/column',
    {
        title: __('Column'),
        description: '.',
        category: 'layout',
        icon: 'grid',
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
        },
        parent: [ 'prc-block/columns' ],
        // inserter: false,
        edit,
        save,
    },
];

export default settings;
