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
            'The WP Query block provides a handful of arguments depending on post type that will return the intendend block. You can pin results so that subsequent updates add to rather than replace.',
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