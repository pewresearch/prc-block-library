import { __, _x } from '@wordpress/i18n';
import { pullquote as icon } from '@wordpress/icons';

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
        title: __('PRC Pullquote'),
        description: __(
            'Give special visual emphasis to a quote from your text.',
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
    },
];

export default settings;
