/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
// import './style.scss';
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name } = metadata;

const settings = {
    title: __('Topic Index - Condensed View'),
    description: __('The condensed, or "schwoopy" version of the topic index.'),
    keywords: [__('Topics'), __('Topic'), __('Index'), __('Schwoopy')],
    edit,
    save,
};

registerBlockType(name, { ...metadata, ...settings });
