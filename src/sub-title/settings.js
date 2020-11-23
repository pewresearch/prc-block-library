import { __ } from '@wordpress/i18n';
import { formatListNumbered as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';

const { name, category, attributes } = metadata;

const settings = [
    name,
    {
        title: __('PRC Sub-Title'),
        description: __(
            'Add a sub title under the post title',
        ),
        icon,
        category,
        attributes,
        example: {
            attributes: {
                value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            },
        },
        supports: {
            multiple: false
        },
        edit,
        save: () => null,
    },
];

export default settings;
