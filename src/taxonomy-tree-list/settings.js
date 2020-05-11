
import { __ } from '@wordpress/i18n';
import edit from './edit';
import save from './save';

const settings = [
    'prc-block/taxonomy-tree-list',
    {
        title: __('Tree List (Inner)'),
        description: 'A tree list that can be expanded.',
        category: 'layout',
        icon: 'networking',
        keywords: [__('Taxonomy Tree'), __('Taxonomies'), __('Tree')],
        supports: {
            html: false,
            align: false,
        },
        attributes: {
            subheading: {
                type: 'string',
                source: 'html',
                selector: '.header',
                default: '',
            },
            list: {
                type: 'string',
                multiline: 'li',
                source: 'html',
                selector: '.visible-list',
                default: '',
            },
            moreEnabled: {
                type: 'boolean',
            },
            moreList: {
                type: 'string',
                multiline: 'li',
                source: 'html',
                selector: '.hidden-list',
                default: '',
            },
        },
        parent: [ 'prc-block/taxonomy-tree' ],
        edit,
        save,
    },
];

export default settings;
