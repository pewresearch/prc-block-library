import { __ } from '@wordpress/i18n';
import { share as icon } from '@wordpress/icons';

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
        title: __('PRC Social Toolbar'), // title as it will show in gutenburg editor
        description: __('Creating a social toolbar'), // description  as it will show in gutenburg editor
        icon,
        category,
        keywords: [__('share')],
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
