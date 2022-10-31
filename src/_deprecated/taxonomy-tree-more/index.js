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
    title: __('DEPRECATED: Taxonomy Tree More'),
    description: 'DEPRECATED: Use core/navigation and submenu blocks instead.',
    category: 'layout',
    edit,
    save,
};

registerBlockType(name, { ...metadata, ...settings });
