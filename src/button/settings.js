import { __ } from '@wordpress/i18n';
import edit from './edit';
import save from './save';

const settings = [
    'prc-block/button',
    {
        // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
        title: __('Button'), // Block title.
        icon: 'admin-appearance', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
        category: 'layout', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
        keywords: [__('prc'), __('button')],
        styles: [
            // {
            //     name: '',
            //     label: 'Standard',
            //     isDefault: true,
            // },
            // {
            //     name: 'fluid',
            //     label: 'Fluid',
            // },
        ],
        supports: {
            html: false, // We do not want to give people the ability to edit the raw html of this block.
        },
        // Attributes are really react props.
        attributes: {
            color: {
                type: 'string',
                default: '',
            },
            label: {
                type: 'string',
                // source: 'html',
                // selector: '.ui.button',
                default: '',
            },
            url: {
                type: 'string',
                default: '',
            },
        },

        edit,
        save,
    },
];

export default settings;
