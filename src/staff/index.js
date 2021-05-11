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
// import transforms from './transforms';
import './style.scss';

const { name } = metadata;

const settings = {
    title: __('Staff Member'),
    description: 'Reference a staff member.',
    category: 'layout',
    keywords: [__('Staff')],
    edit,
    save,
    // transforms,
};

registerBlockType(name, { ...metadata, ...settings });
