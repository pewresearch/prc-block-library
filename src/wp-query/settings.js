import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name, category, attributes } = metadata;

const settings = [
    name,
    {
        title: __('PRC WP Query'),
        description: __(
            'Query posts using wp query arguments and return story item blocks.',
        ),
        category,
        attributes,
        providesContext: {
            'prc-block/wp-query': 'pinned',
        },
        edit,
        save,
    },
];

export default settings;
