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
    title: __('Taxonomy Tree More'),
    description: 'A collapsible list of more content for the Taxonomy Tree.',
    category: 'layout',
    edit,
    save,
};

registerBlockType(name, { ...metadata, ...settings });
