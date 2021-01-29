/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name } = metadata;

const settings = {
    title: __('PRC Post Publish Date'),
    description: __(
        'The post published date, useful when building out post headers.',
    ),
    edit,
    save,
};

registerBlockType(name, { ...metadata, ...settings });
