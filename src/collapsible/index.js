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
    title: __('PRC Collapsible'),
    description: __('Add a block that displays content in a single accordion.'),
    keywords: [__('Collapsible'), __('Accordion'), __('How we did this')],
    edit,
    save,
};

registerBlockType(name, { ...metadata, ...settings });
