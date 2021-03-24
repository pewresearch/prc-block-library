/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name } = metadata;

const settings = {
    title: __('Topic Index A-Z Controller'),
    description:
        'Controls the layout and quick select functionality of the topic A-Z index',
    category: 'layout',
    keywords: [__('Topic Index AZ'), __('A-Z')],
    edit,
    save,
};

registerBlockType(name, { ...metadata, ...settings });
