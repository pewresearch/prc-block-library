import { __ } from '@wordpress/i18n';
import { megaphone as icon } from '@wordpress/icons';
import edit from './edit';
import save from './save';

const settings = [
    'prc-block/promo',
    {
        // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
        title: __('Promo'), // Block title.
        icon, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
        category: 'widgets', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
        keywords: [__('prc'), __('ad'), __('promo'), __('pancake')],
        styles: [
            {
                name: '',
                label: 'Standard (Text Centered)',
                isDefault: true,
            },
            {
                name: 'pancake',
                label: 'Pancake (Text Horizontally Centered)',
            },
            {
                name: 'pancake-stacked',
                label: 'Pancake (Text Stacked)',
            },
            {
                name: 'left-aligned',
                label: 'Left Aligned (Mailchimp Promo)',
            },
        ],
        supports: {
            html: false, // We do not want to give people the ability to edit the raw html of this block.
        },
        example: {
            attributes: {
                header: 'Facts are more important than ever',
                description:
                    'In times of uncertainty, good decisions demand good data. Please support our research with a financial contribution.',
            },
            innerBlocks: [
                {
                    name: 'prc-block/menu-link',
                    attributes: {
                        className: 'is-style-button',
                        color: '#d3aa20',
                        label: 'DONATE',
                        url: '',
                    },
                },
            ],
        },
        // Attributes are really react props.
        attributes: {
            header: {
                type: 'string',
                source: 'html',
                selector: '.text > h2',
                default: '',
            },
            description: {
                type: 'string',
                default: '<p></p>',
            },
            backgroundColor: {
                type: 'string',
                default: '',
            },
            borderColor: {
                type: 'string',
                default: '',
            },
            sansSerif: {
                type: 'boolean',
                default: false,
            },
            icon: {
                type: 'string',
                default: '',
            },
        },
        edit,
        save,
    },
];

export default settings;
