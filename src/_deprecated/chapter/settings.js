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
        title: __('DEPRECATED: PRC Chapter'),
        description: __(
            'DEPRECATED: Use core/heading block with chapter set to true instead.',
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
