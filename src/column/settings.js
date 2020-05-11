
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
            // Is this column comprised of story items
            items: {
                type: 'boolean',
                default: false,
            },
            divided: {
                type: 'boolean',
                default: false,
            }
        },
        parent: [ 'prc-block/columns', 'prc-block/lede-layout' ],
        // inserter: false,
        edit,
        save,
    },
];

export default settings;
