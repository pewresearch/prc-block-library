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
    title: __('WP Object'),
    description: 'Insert a chart, interactive, or template-block object.',
    category: 'layout',
    edit,
    save,
};

registerBlockType(name, { ...metadata, ...settings });
