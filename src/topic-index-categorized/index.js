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
    title: __('Topic Index Categorized'),
    description:
        'A collapsible list that allows taxonomy trees to be inserted.',
    category: 'layout',
    keywords: [__('Topic Index'), __('Categorized'), __('Topic')],
    edit,
    save,
};

registerBlockType(name, { ...metadata, ...settings });
