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
        title: __('PRC Post Publish Date'),
        description: __(
            'The post published date, useful when building out post headers.',
        ),
        category,
        attributes,
        edit,
        save,
    },
];

export default settings;
