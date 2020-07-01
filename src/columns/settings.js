import { __ } from '@wordpress/i18n';
import edit from './edit';
import save from './save';
import variations from './variations';

const settings = [
    'prc-block/columns',
    {
        title: __('PRC Columns'),
        description: __(
            'Add a block that displays content in multiple columns, then add whatever content blocks you’d like.',
        ),
        category: 'layout',
        icon: (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-hidden="true"
                focusable="false"
            >
                <path d="M19 6H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-4.1 1.5v10H10v-10h4.9zM5.5 17V8c0-.3.2-.5.5-.5h2.5v10H6c-.3 0-.5-.2-.5-.5zm14 0c0 .3-.2.5-.5.5h-2.6v-10H19c.3 0 .5.2.5.5v9z" />
            </svg>
        ),
        keywords: [__('Columns'), __('Column')],
        supports: {
            html: false,
            align: false,
            // lightBlockWrapper: true,
        },
        variations,
        attributes: {
            size: {
                type: 'string',
                default: '',
            },
            equal: {
                type: 'boolean',
                default: false,
            },
            divided: {
                type: 'boolean',
                default: false,
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
