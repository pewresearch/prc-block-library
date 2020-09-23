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
        title: __('PRC Flip Card'),
        description: __('An unstyled card that has a front and back'),
        category,
        attributes,
        supports: {
            align: ['left', 'right'],
        },
        edit,
        save,
    },
];

export default settings;
