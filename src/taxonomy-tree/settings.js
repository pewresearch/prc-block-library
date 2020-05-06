
import { __ } from '@wordpress/i18n';
import edit from './edit';
import save from './save';

const settings = [
    'prc-block/taxonomy-tree',
    {
        title: __('Tree List'),
        description: 'A tree list that can be expanded.',
        category: 'layout',
        icon: 'networking',
        keywords: [__('Taxonomy Tree'), __('Taxonomies'), __('Tree')],
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
