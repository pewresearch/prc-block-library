import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import edit from './edit';

const settings = [
    'prc-block/post-subtitle',
    {
        // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
        title: __('Subtitle'), // Block title.
        icon: 'admin-appearance', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
        category: 'layout', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
        keywords: [__('prc'), __('subtitle')],
        supports: {
            html: false, // We do not want to give people the ability to edit the raw html of this block.
        },
        // Attributes are really react props.
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
