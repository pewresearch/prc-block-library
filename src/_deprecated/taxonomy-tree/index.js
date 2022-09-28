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
import './style.scss';

const { name } = metadata;

const settings = {
    title: __('DEPRECATED: Tree List'),
    description: 'DEPRECATED: A tree list that can be expanded.',
    category: 'layout',
    icon: 'networking',
    keywords: [__('Taxonomy Tree'), __('Taxonomies'), __('Tree')],
    edit,
    save,
};

registerBlockType(name, { ...metadata, ...settings });
