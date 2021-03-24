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
    title: __('Topic Index Search Field'),
    description:
        'Allows user to search for a term and redirect to its listing page. Allows restricting searches to a root term.',
    category: 'layout',
    keywords: [__('Topic Search'), __('Search')],
    edit,
    save,
};

registerBlockType(name, { ...metadata, ...settings });
