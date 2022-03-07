/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { formatListNumbered as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import './style.scss';

const { name, category, attributes } = metadata;

const settings = {
    title: __('Post Sub Title'),
    description: __('A sub title that appears under the post title.'),
    icon,
    category,
    attributes,
    edit,
    save: () => null,
};

registerBlockType(name, { ...metadata, ...settings });
