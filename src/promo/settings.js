import { __ } from '@wordpress/i18n';
import edit from './edit';
import save from './save';

import electionIconURL, {
    // eslint-disable-next-line no-unused-vars
    ReactComponent as electionSVG,
} from './icons/election-icon.svg';

const settings = [
    'prc-block/promo',
    {
        // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
        title: __('Promo'), // Block title.
        icon: 'format-aside', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
        category: 'widgets', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
        keywords: [__('prc'), __('ad'), __('promo'), __('pancake')],
        styles: [
            {
                name: '',
                label: 'Standard',
                isDefault: true,
            },
            {
                name: 'pancake',
                label: 'Pancake (Text Centered)',
            },
            {
                name: 'pancake-stacked',
                label: 'Pancake (Text Stacked)',
            },
            {
                name: 'pancake-form',
                label: 'Pancake (Form)',
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
                    name: 'prc-block/button',
                    attributes: { color: '#d3aa20', label: 'DONATE', url: '' },
                },
            ],
        },
        // Attributes are really react props.
        attributes: {
            header: {
                type: 'string',
                default: '',
            },
            description: {
                type: 'string',
                default: '',
            },
            backgroundColor: {
                type: 'string',
                default: '#fff',
            },
            borderColor: {
                type: 'string',
                default: '#fff',
            },
            pancake: {
                type: 'boolean',
                default: false,
            },
        },
        edit,
        save,
    },
];

export default settings;
