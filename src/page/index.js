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
    title: __('Page'),
    description: 'Insert a stylized card that links to a apge.',
    category: 'layout',
    keywords: [__('Page')],
    edit,
    save,
};

registerBlockType(name, { ...metadata, ...settings });
