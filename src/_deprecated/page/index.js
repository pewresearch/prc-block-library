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
	title: __('DEPRECATED: Page'),
	description: 'DEPRECATED: Use the "Page Card" pattern instead.',
	category: 'layout',
	keywords: [__('Page')],
	edit,
	save,
};

registerBlockType(name, { ...metadata, ...settings });
