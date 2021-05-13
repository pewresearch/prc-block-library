import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import edit from './edit';

const settings = [
    'prc-block/post-subtitle',
    {
        title: __('Subtitle'),
        icon: 'admin-appearance',
        category: 'layout',
        keywords: [__('prc'), __('subtitle')],
        supports: {
            html: false,
        },
        attributes: {
            content: {
                type: 'string',
                default: 'Subtitle',
                source: 'meta',
                meta: 'sub_headline',
            },
        },

        edit,
        save: ({ attributes, className }) => <Fragment />,
    },
];

export default settings;
