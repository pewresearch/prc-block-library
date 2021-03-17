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
    title: __('Block Title'),
    description: 'Block description.',
    category: 'layout',
    keywords: [__('Block Keyword 1'), __('Block Keyword 2')],
    edit,
    save,
};

registerBlockType(name, { ...metadata, ...settings });
