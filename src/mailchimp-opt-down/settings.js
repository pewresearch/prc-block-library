import { __ } from '@wordpress/i18n';
import edit from './edit';
import save from './save';

const settings = [
    'prc-block/mailchimp-opt-down',
    {
        // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
        title: __('Mailchimp Opt-down Form'), // Block title.
        icon: 'feedback', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
        category: 'widgets', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
        keywords: [
            __('prc'),
            __('mailchimp'),
            __('newsletter'),
            __('newsletter signup'),
        ],
        supports: {
            html: false, // We do not want to give people the ability to edit the raw html of this block.
        },
        // Attributes are really react props.
        attributes: {
            interest: {
                type: 'string',
                default: '',
            },
        },
        edit,
        save,
    },
];

export default settings;
