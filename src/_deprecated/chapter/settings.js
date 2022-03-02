import { __ } from '@wordpress/i18n';
import { formatListNumbered as icon } from '@wordpress/icons';

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
        title: __('PRC Chapter'),
        description: __(
            'Build a table of contents for this post using the chapter block.',
        ),
        icon,
        category,
        attributes,
        example: {
            attributes: {
                value: 'Chapter Title',
            },
        },
        edit,
        save,
		supports: {
			inserter: false,
		}
    },
];

export default settings;
