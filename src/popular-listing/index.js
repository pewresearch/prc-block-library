/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';
import './style.scss';

const { name } = metadata;

const settings = {
    title: __('PRC Popular Listing'),
    description: 'Displays the "Most Popular" Listing .',
    edit,
    save,
};

registerBlockType(name, { ...metadata, ...settings });
