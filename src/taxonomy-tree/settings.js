
import { __ } from '@wordpress/i18n';
import edit from './edit';
import save from './save';

const settings = [
    'prc-block/taxonomy-tree',
    {
        title: __('Taxonomy Tree'),
        description: 'A tree view of a selected taxonomy and term.',
        category: 'layout',
        icon: 'networking',
        keywords: [__('Taxonomy Tree'), __('Taxonomies')],
        supports: {
            html: false,
            align: false,
        },
        attributes: {
            taxonomy: {
                type: 'string',
                default: false,
            },
            term: {
                type: 'string',
                default: false,
            },
            termsSelected: {
                type: 'array',
            },
        },
        edit,
        save,
    },
];

export default settings;
