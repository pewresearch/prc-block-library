import { __ } from '@wordpress/i18n';
import edit from './edit';
import save from './save';

const settings = [
    'prc-block/a-z-taxonomy-list',
    {
        title: __('A-Z Taxonomy List'),
        description: 'A taxonomy list sorted by alphabetical.',
        category: 'layout',
        icon: 'networking',
        keywords: [__('Taxonomy List'), __('Taxonomies'), __('A-Z'), __('AZ')],
        supports: {
            html: false,
            align: false,
        },
        attributes: {
            heading: {
                type: 'string',
                source: 'html',
                selector: 'h2',
                default: '',
            },
        },
        edit,
        save,
    },
];

export default settings;
